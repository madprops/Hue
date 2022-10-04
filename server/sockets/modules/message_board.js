module.exports = function (Hue) {
  // Handles message board posting
  Hue.handler.public.message_board_post = async function (socket, data) { 
    if (!data.message) {
      return
    }

    if (data.message.length > Hue.config.max_message_board_post_length) {
      return
    }

    if (data.message.split("\n").length > Hue.config.max_num_newlines) {
      return
    }

    let linkdata

    // If it's an edit
    if (data.id) {
      let info = await Hue.db_manager.get_room(["id", socket.hue_room_id])
    
      for (let post of info.message_board_posts) {
        if (post.id === data.id) {
          if (post.user_id !== socket.hue_user_id) {
            return
          }

          if (!linkdata) {
            linkdata = await Hue.handler.process_message_links(data.message)
          }

          post.message = data.message
          post.link_title = linkdata.link_title
          post.link_description = linkdata.link_description
          post.link_image = linkdata.link_image
          post.link_url = linkdata.link_url
          Hue.handler.room_emit(socket, "edited_message_board_post", post)
          return
        }
      }
    }

    if (!Hue.handler.is_admin_or_op(socket)) {
      let userinfo = await Hue.db_manager.get_user(["id", socket.hue_user_id])

      let diff = Date.now() - userinfo.last_message_board_post_date
      let wait = Hue.sconfig.message_board_wait_delay * 60 * 1000

      if (diff < wait) {
        let remaining = wait - diff
        Hue.handler.user_emit(socket, "message_board_wait", {remaining: remaining})
        return
      }
    }

    if (!linkdata) {
      linkdata = await Hue.handler.process_message_links(data.message)
    }

    data.link_title = linkdata.title,
    data.link_description = linkdata.description
    data.link_image = linkdata.image
    data.link_url = linkdata.url
    
    let item = Hue.handler.push_message_board_post(socket, data)
    Hue.handler.room_emit(socket, "new_message_board_post", item)

    let userinfo = await Hue.db_manager.get_user(["id", socket.hue_user_id])
    userinfo.last_message_board_post_date = Date.now()
  }

  // Pushes pushing room message board posts
  Hue.handler.push_message_board_post = function (socket, data) {
    let item = {
      user_id: socket.hue_user_id,
      username: socket.hue_username,
      message: data.message,
      link_title: data.link_title,
      link_description: data.link_description,
      link_image: data.link_image,
      link_url: data.link_url,
      date: Date.now(),
      id: Hue.handler.generate_message_board_post_id(),
    }

    Hue.db_manager.push_item("rooms", socket.hue_room_id, "message_board_posts", item)
    return item
  }

  // Generates IDs for message board posts
  Hue.handler.generate_message_board_post_id = function () {
    return `${Date.now()}_${Hue.utilz.random_sequence(3)}`
  }

  // Deletes a message board post
  Hue.handler.public.delete_message_board_post = async function (socket, data) {
    if (!data.id) {
      return
    }

    let info = await Hue.db_manager.get_room(["id", socket.hue_room_id])

    for (let i = 0; i < info.message_board_posts.length; i++) {
      let item = info.message_board_posts[i]

      if (item.id === data.id) {
        let current_role = info.keys[item.user_id] || Hue.vars.default_role

        if (item.user_id !== socket.hue_user_id) {
          if (!socket.hue_superuser) {
            if (current_role === "admin") {
              Hue.handler.user_emit(socket, "forbidden_user", {})
              return
            } else if (current_role === "op") {
              if (socket.hue_role !== "admin") {
                Hue.handler.user_emit(socket, "forbidden_user", {})
                return
              }
            } else {
              if (!Hue.handler.is_admin_or_op(socket)) {
                Hue.handler.user_emit(socket, "forbidden_user", {})
                return
              }
            }
          }
        }

        info.message_board_posts.splice(i, 1)

        Hue.handler.room_emit(socket, "message_board_post_deleted", {
          id: data.id,
        })

        if (item.user_id !== socket.hue_user_id) {
          Hue.handler.push_admin_log_message(socket, "deleted a message from the message board")         
        }
        
        return
      }
    }
  }

  // Remove all message board posts
  Hue.handler.public.clear_message_board = async function (socket, data) {
    if (!Hue.handler.is_admin(socket)) {
      Hue.handler.anti_spam_ban(socket)
      return
    }
    
    let info = await Hue.db_manager.get_room(["id", socket.hue_room_id])
    info.message_board_posts = []

    Hue.handler.room_emit(socket, "message_board_cleared", {
      username: socket.hue_username, user_id: socket.hue_user_id
    })

    Hue.handler.push_admin_log_message(socket, "cleared the message board")
  }
}