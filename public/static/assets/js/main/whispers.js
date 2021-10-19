// Shows the window to write whispers
Hue.write_popup_message = function (usernames = [], type = "user") {
  let c_usernames = []

  if (usernames.length === 0) {
    if (type === "user") {
      return false
    }
  } else {
    for (let u of usernames) {
      let cu = Hue.check_user_in_room(u)
      
      if (cu) {
        c_usernames.push(cu)
      } else {
        return false
      }
    }
  }

  let title 

  if (type === "user") {
    title = `Whisper to ${Hue.utilz.nice_list(c_usernames)}`
  } else {
    title = `Whisper (${type})`
  }

  if (type === "user") {
    Hue.el("#write_message_add_user").style.display = "block"
  } else {
    Hue.el("#write_message_add_user").style.display = "none"
  }

  Hue.message_usernames = c_usernames
  Hue.msg_message.set_title(Hue.utilz.make_html_safe(title))
  Hue.message_type = type

  Hue.msg_message.show(function () {
    Hue.el("#write_message_area").focus()
    Hue.sending_whisper = false
  })
}

// Updates the user receivers in the whisper window after picking a username in the user list
Hue.update_whisper_users = function (username) {
  if (!Hue.message_usernames.includes(username)) {
    Hue.message_usernames.push(username)
  } else {
    if (Hue.message_usernames.length === 1) {
      return false
    }

    for (let i = 0; i < Hue.message_usernames.length; i++) {
      let u = Hue.message_usernames[i]

      if (u === username) {
        Hue.message_usernames.splice(i, 1)
        break
      }
    }
  }

  let title = `Whisper to ${Hue.utilz.nice_list(Hue.message_usernames)}`
  Hue.msg_message.set_title(Hue.utilz.make_html_safe(title))
  Hue.msg_userlist.close()
}

// Submits the whisper window form
// Handles different types of whispers
Hue.send_popup_message = function () {
  if (Hue.sending_whisper) {
    return false
  }

  Hue.sending_whisper = true

  let message = Hue.utilz.remove_multiple_empty_lines(Hue.el("#write_message_area").value).trim()
  let diff = Hue.config.max_whispers_post_length - message.length

  if (diff === Hue.config.max_whispers_post_length) {
    Hue.sending_whisper = false
    return false
  } else if (diff < 0) {
    Hue.checkmsg(`Character limit exceeded by ${Math.abs(diff)}`)
    Hue.sending_whisper = false
    return false
  }

  let message_split = message.split("\n")
  let num_lines = message_split.length

  if (num_lines > Hue.config.max_num_newlines) {
    Hue.checkmsg("Too many linebreaks")
    Hue.sending_whisper = false
    return false
  }

  let ans = Hue.send_whisper(message)

  if (ans) {
    Hue.msg_message.close(function () {
      Hue.sending_whisper = false
    })

    Hue.el("#write_message_area").value = ""
  } else {
    Hue.sending_whisper = false
  }
}

// On whisper received
Hue.whisper_received = function (data) {
  let message = `Whisper from ${data.username}`
  let func = function () { Hue.show_whisper(data) }
  let item = Hue.make_info_popup_item({icon: "envelope", message: message, push: false})

  let open = Hue.get_setting("open_whispers_automatically") && !Hue.screen_locked
  data.notification = Hue.push_whisper(message, func, open)
  
  if (open) {
    Hue.show_whisper(data)
    Hue.on_activity("whisper")
  } else {
    Hue.show_popup(Hue.make_info_popup(func), item)
  }
}

// Shows a whisper message
Hue.show_whisper = function (data) {
  let button_func = function () {}
  let title, button_html
  let usr

  if (data.usernames === undefined) {
    title = `Whisper from ${data.username}`
    usr = [data.username]
  } else {
    title = `Whisper sent to ${Hue.utilz.nice_list(data.usernames)}`
    usr = data.usernames
  }

  button_html = Hue.utilz.nonbreak("Send Whisper")

  button_func = function () {
    Hue.write_popup_message(usr)
  }
  
  let modal = Hue.create_modal({window_class: "!whisper_width"}, "whisper")
  modal.set(Hue.template_sent_message())
  modal.set_title(Hue.utilz.make_html_safe(title))
  
  let message_html = Hue.utilz.make_html_safe(data.message)
  message_html = Hue.parse_text(message_html)

  modal.show(function () {
    let container = modal.content
    let text_el = container.querySelector(".sent_message_text")
    text_el.innerHTML = message_html
    Hue.urlize(text_el)
    let button_el = container.querySelector(".sent_message_button")

    if (data.type === "user") {
      button_el.innerHTML = button_html
      button_el.addEventListener("click", button_func)
    } else {
      button_el.style.display = "none"
    }
    
    Hue.setup_whispers_click(text_el, usr[0])
  })

  if (!Hue.dataset(data.notification, "read")) {
    let text = data.notification.textContent.replace(/\s\(unread\)$/, "")
    data.notification.textContent = text
    Hue.dataset(data.notification, "read", true)
    Hue.update_whispers_unread_count()
  }
}

// Sends a whisper to user(s)
Hue.send_whisper = function (message) {
  if (Hue.message_type === "system_broadcast") {
    Hue.do_send_whisper({message: message, usernames: [], type: Hue.message_type})
    return true
  }

  let usernames = Hue.message_usernames

  if (!usernames) {
    return false
  }

  let discarded = []
  let approved = []

  for (let u of usernames) {
    if (!Hue.usernames.includes(u)) {
      discarded.push(u)
    } else {
      approved.push(u)
    }
  }

  if (approved.length === 0) {
    return false
  }

  Hue.do_send_whisper({message: message, usernames: approved, type: Hue.message_type})

  return true
}

// Does the whisper emit
Hue.do_send_whisper = function (data, show = true) {
  Hue.socket_emit("whisper", data)

  if (show) {
    let func = function () {
      Hue.show_whisper(data)
    }

    let msg = ""
    
    if (data.type === "user") {
      msg = `Whisper sent to ${Hue.utilz.nice_list(data.usernames)}`
    } else if (data.type === "system_broadcast") {
      msg = "System Broadcast Sent"
    }

    let item = Hue.make_info_popup_item({icon: "envelope", message: msg, push: false})
    Hue.show_popup(Hue.make_info_popup(func), item)
    data.notification = Hue.push_whisper(msg, func, true)
  }
}

// Setups whispers click events
Hue.setup_whispers_click = function (content, username) {
  content.querySelectorAll(".whisper_link").forEach(it => {
    it.addEventListener("click", function () {
      Hue.write_popup_message([username], "user")
    })
  })
}

// Setups the message window
Hue.setup_message_window = function () {
  Hue.el("#write_message_send_button").addEventListener("click", function () {
    Hue.send_popup_message()
  })

  Hue.el("#write_message_add_user").addEventListener("click", function () {
    Hue.show_userlist_window("whisper")
  })
}

// Pushes a new whisper to the whispers window
Hue.push_whisper = function (message, on_click, read) {
  let d = Date.now()
  let t = Hue.utilz.nice_date(d)
  let message_html = `<div class='whispers_message'>${Hue.utilz.make_html_safe(message)}</div>`
  let item = Hue.div("whispers_item modal_item")
  item.innerHTML = `<div class='whispers_item_content action dynamic_title'>${message_html}`
  let content = item.querySelector(".whispers_item_content")
  content.title = t

  Hue.dataset(content, "otitle", t)
  Hue.dataset(content, "date", d)
  Hue.dataset(content, "read", read)

  if (read) {
    content.textContent = message
  } else {
    content.textContent = `${message} (unread)`
  }

  content.addEventListener("click", function () {
    on_click()
  })

  Hue.el("#whispers_container").prepend(item)
  
  let items = Hue.els("#whispers_container .whispers_item")

  if (items.length > Hue.config.whispers_crop_limit) {
    Hue.els("#whispers_container .whispers_item").slice(-1)[0].remove()
  }

  Hue.update_whispers_unread_count()

  return content
}

// Shows information about the recent whispers
Hue.show_whispers = function (filter = "") {
  Hue.msg_whispers.show(function () {
    if (filter.trim()) {
      Hue.el("#whispers_filter").value = filter
      Hue.do_modal_filter()
    }
  })
}

// Updates the whispers unread count
Hue.update_whispers_unread_count = function () {
  Hue.el("#header_whispers_count").textContent = `(${Hue.get_unread_whispers()})`
}

// Get a list of unread whispers
Hue.get_unread_whispers = function () {
  let num_unread = 0

  Hue.els(".whispers_item_content").forEach(it => {
    if (!Hue.dataset(it, "read")) {
      num_unread += 1
    }
  })

  return num_unread
}