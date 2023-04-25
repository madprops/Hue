module.exports = function (Hue) {
  // Get a file name using the date and random numbers
  Hue.handler.generate_media_file_name = function (extension) {
    return `${Date.now()}_${Hue.utilz.random_sequence(3)}.${extension}`
  }

  // Handles sliced media uploads
  Hue.handler.upload_media = async function (socket, data, type) {
    if (data.file === undefined) {
      return
    }

    if (data.extension === undefined) {
      return
    }

    let size = data.file.byteLength / 1024

    if (size === 0 || size > Hue.config[`max_${type}_size`]) {
      return
    }

    let file_name = Hue.handler.generate_media_file_name(data.extension)
    let container = Hue.vars.path.join(Hue.vars.media_root, "room", socket.hue_room_id, type)

    if (!Hue.vars.fs.existsSync(container)) {
      Hue.vars.fs.mkdirSync(container, { recursive: true })
    }

    let path = Hue.vars.path.join(container, file_name)

    try {
      await Hue.vars.fsp.writeFile(path, data.file)

      let obj = {}

      obj.src = file_name
      obj.username = socket.hue_username
      obj.size = size
      obj.type = "upload"
      obj.comment = data.comment
      obj.file_name = data.file_name

      await Hue.handler.do_change_media(socket, obj, type)
    } catch (err) {
      Hue.logger.log_error(err)
      Hue.handler.user_emit(socket, "upload_error", {})
    }
  }

  // Completes media source changes
  Hue.handler.do_change_media = async function (socket, data, type) {
    let room_id, user_id

    if (typeof socket === "object") {
      room_id = socket.hue_room_id
      user_id = socket.hue_user_id
    } else {
      room_id = socket
      user_id = "none"
    }

    let id = Hue.handler.generate_message_id()
    let date = Date.now()
    let comment = data.comment || data.file_name || ""
    let size = data.size || 0
    let title = ""
    let likes = []

    if (data.title) {
      title = Hue.vars.he.decode(data.title)
    }

    if (data.query === undefined) {
      data.query = ""
    }

    if (!data.username) {
      user_id = ""
    }

    Hue.handler.room_emit(room_id, `${type}_source_changed`, {
      id: id,
      user_id: user_id,
      source: data.src,
      username: data.username,
      title: title,
      size: size,
      date: date,
      type: data.type,
      query: data.query,
      comment: comment,
      likes: likes
    })

    let message = {
      type: type,
      data: {
        id: id,
        date: date,
        user_id: user_id,
        source: data.src,
        username: data.username,
        title: title,
        size: size,
        type: data.type,
        query: data.query,
        comment: comment,
        likes: likes
      }
    }

    Hue.db_manager.push_item("rooms", socket.hue_room_id, "log_messages", message)

    // Remove left over files
    if (data.type === "upload") {
      let container = Hue.vars.path.join(Hue.vars.media_root, "room", socket.hue_room_id, type)

      if (!Hue.vars.fs.existsSync(container)) {
        return
      }

      try {
        let files = await Hue.vars.fsp.readdir(container)

        files.sort().reverse()

        for (let file of files.slice(Hue.sconfig[`max_stored_${type}`])) {
          let path = Hue.vars.path.join(container, file)

          Hue.vars.fs.unlink(path, function (err) {
            if (err) {
              Hue.logger.log_error(err)
            }
          })
        }
      } catch (err) {
        Hue.logger.log_error(err)
      }
    }
  }

  // Edit the comment of a media change
  Hue.handler.public.edit_media_comment = async function (socket, data) {
    let edited = false
    let info = await Hue.db_manager.get_room(["id", socket.hue_room_id])

    for (let i = 0; i < info.log_messages.length; i++) {
      let message = info.log_messages[i]

      if (message.type !== data.type) {
        continue
      }

      if (message.data.id === data.id) {
        if (message.data.user_id === socket.hue_user_id) {
          message.data.comment = data.comment
          edited = true
          break
        } else {
          return
        }
      }
    }

    if (edited) {
      info.modified = Date.now()

      Hue.handler.room_emit(socket, "edited_media_comment", {
        type: data.type,
        id: data.id,
        comment: data.comment
      })
    }
  }

  // Delete all media files of a certain type from a room
  Hue.handler.delete_media_files = async function (room_id, type) {
    let container = Hue.vars.path.join(Hue.vars.media_root, "room", room_id, type)

    if (!Hue.vars.fs.existsSync(container)) {
      return
    }

    try {
      let files = await Hue.vars.fsp.readdir(container)

      for (let file of files) {
        let path = Hue.vars.path.join(container, file)

        Hue.vars.fs.unlink(path, function (err) {
          if (err) {
            Hue.logger.log_error(err)
          }
        })
      }
    } catch (err) {
      Hue.logger.log_error(err)
    }
  }

  // Get the last media object from the message log
  Hue.handler.get_last_media = async function (room_id, type) {
    let info = await Hue.db_manager.get_room(["id", room_id])

    for (let item of info.log_messages.slice(0).reverse()) {
      if (item.type === type) {
        return item.data
      }
    }
  }
}