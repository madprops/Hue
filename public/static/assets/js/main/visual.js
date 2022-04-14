// Remove & add vertical or horizontal separators
Hue.apply_separator = function (el, cls) {
  Hue.els(":scope > .separator", el).forEach(it => {
    it.remove()
  })

  let elems = Array.from(el.children).filter(it => {
    return it.style.display !== "none" && !it.classList.contains("nodisplay")
  })

  for (let i=0; i<elems.length; i++) {
    if (i === elems.length - 1) {
      break
    }

    let sep = Hue.div("separator")
    sep.classList.add(cls)
    elems[i].insertAdjacentElement("afterend", sep)
  }
}

// Add horizontal separators
Hue.horizontal_separator = function (el) {
  Hue.apply_separator(el, "horizontal_separator")
}

// Add vertical separators
Hue.vertical_separator = function (el) {
  Hue.apply_separator(el, "vertical_separator")
}

// Applies separation to generic horizontal separator classes
Hue.setup_generic_separators = function () {
  Hue.els(".generic_horizontal_separator").forEach(it => {
    Hue.horizontal_separator(it)
  })

  Hue.els(".generic_vertical_separator").forEach(it => {
    Hue.vertical_separator(it)
  })
}

// This hides the loading animation and makes the main container visible
Hue.make_main_container_visible = function () {
  Hue.el("#loading").style.opacity = 0
  Hue.el("#main_container").style.opacity = 1
  Hue.el("#main_container").style.pointerEvents = "initial"

  setTimeout(function () {
    Hue.el("#loading").style.display = "none"
  }, 1600)
}

// Setup font loading events
Hue.setup_fonts = function () {
  document.fonts.ready.then(function () {
    Hue.on_fonts_loaded()
  })
}

// After the font finished loading
Hue.on_fonts_loaded = function () {
  Hue.goto_bottom(true)
}

// Setups the confirm window
Hue.setup_confirm = function () {
  Hue.el("#confirm_button_confirm").addEventListener("click", function () {
    Hue.on_confirm()
  })
}

// Shows the confirm window
Hue.show_confirm = function (message, action, action_cancel) {  
  Hue.el("#confirm_message").textContent = message
  Hue.confirm_action = action
  Hue.confirm_action_cancel = action_cancel
  Hue.msg_confirm.show()
}

// On confirm action
Hue.on_confirm = function () {
  if (Hue.confirm_action) {
    Hue.confirm_action()
    Hue.confirm_action = undefined
  }

  Hue.msg_confirm.close()
}

// On confirm cancel action
Hue.on_confirm_cancel = function () {
  if (Hue.confirm_action_cancel) {
    Hue.confirm_action_cancel()
    Hue.confirm_action_cancel = undefined
  }
}

// Simple window for messages
Hue.show_info = function (s, title = "Info") {
  Hue.msg_info.show([title, s])
}

// Show autoclose window
Hue.show_info_autoclose = function (s, title = "Info") {
  Hue.msg_info_autoclose.show([title, s])
}

// Simple window for messages
Hue.checkmsg = function (s) {
  if (Hue.modal_open) {
    Hue.show_info(s)
  } else {
    Hue.feedback(s)
  }
}

// Shows feedback with the current date in the nice date format
Hue.show_current_date = function () {
  Hue.checkmsg(Hue.utilz.nice_date())
}

// Start timeago checks
Hue.start_timeago = function () {
  setInterval(() => {
    Hue.timeago_action()
  }, Hue.timeago_delay)
}

// The timeago action
Hue.timeago_action = function () {
  Hue.els(".chat_area").forEach(it => {
    Hue.els(".chat_timeago", it).forEach(it2 => {
      let message = it2.closest(".message")
      it2.textContent = Hue.utilz.timeago(Hue.dataset(message, "date"))
    })
  })

  Hue.els("#media .media_info_container").forEach(it => {
    Hue.el(".media_info_timeago", it).textContent = Hue.utilz.timeago(Hue.dataset(it, "date"))
  })

  if (Hue.msg_modal_image.is_open()) {
    Hue.el("#modal_image_header_info .modal_image_timeago")
      .textContent = Hue.utilz.timeago(Hue.loaded_modal_image.date)
  }  
}

// Show a message for a small time and close
Hue.flash_info = function (title, text) {
  let el = Hue.el("#flash_info")
  let text_el = Hue.el("#flash_info_text")
  text_el.textContent = text
  let title_el = Hue.el("#flash_info_title_text")
  title_el.textContent = title
  let icon_el = Hue.el("#flash_info_title_icon")
  jdenticon.update(icon_el, title)
  el.style.display = "flex"
  Hue.flash_info_timer()
}

// Hide the flash info window
Hue.hide_flash_info = function () {
  let el = Hue.el("#flash_info")
  el.style.display = "none"
}

// Get some element measurements
Hue.get_element_sizes = function () {
  Hue.panel_height = Hue.el("#footer").offsetHeight
}