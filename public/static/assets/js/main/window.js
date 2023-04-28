// Changes the tab title to reflect activity
// The character used depends on the activity type
// Either general activity, or highlighted activity
Hue.alert_title = (mode) => {
  let modes = [1, 2]

  if (!modes.includes(mode)) {
    return
  }

  if (mode === 1 && Hue.alert_mode !== 0) {
    return
  }

  if (mode === 2 && Hue.alert_mode === 2) {
    return
  }

  Hue.alert_mode = mode
  Hue.generate_favicon(mode)
}

// Removes the activity favicon
Hue.remove_alert_title = () => {
  if (Hue.alert_mode > 0) {
    Hue.alert_mode = 0
  }

  if (Hue.favicon_mode > 0) {
    Hue.generate_favicon(0)
  }
}

// Sets the tab title
Hue.set_title = (s) => {
  document.title = s.substring(0, Hue.config.max_title_length)
}

// Updates the tab title
// Taking into account the room name and topic
Hue.update_title = () => {
  let t = Hue.room_name

  if (Hue.topic !== ``) {
    t += ` ${Hue.config.title_separator} ${Hue.topic}`
  }

  Hue.set_title(t)
}

// Starts the listener to check when the client is visible or not
// A function is executed on visibility change
// Blur event is also included to handle some cases
Hue.activate_visibility_listener = () => {
  Hue.ev(document, `visibilitychange`, () => {
    Hue.process_visibility()
  }, false)
}

// This runs after a visibility change
// Does things depending if the client is visible or not
Hue.process_visibility = () => {
  Hue.has_focus = !document.hidden

  if (Hue.has_focus) {
    Hue.on_focus()
  }
  else {
    Hue.on_unfocus()
  }
}

// This runs when the client regains visibility
Hue.on_focus = () => {
  Hue.change_media({type: `image`, force: false, play: false})
  Hue.change_media({type: `tv`, force: false, play: false})
  Hue.remove_alert_title()
  Hue.show_fresh_messages()
  Hue.focus_input()
  Hue.check_latest_highlight()

  if (!Hue.chat_scrolled_on_unfocus) {
    Hue.goto_bottom(true)
  }
}

// This runs when the client loses visibility
Hue.on_unfocus = () => {
  Hue.chat_scrolled_on_unfocus = Hue.chat_scrolled
}

// Starts window resize events
Hue.resize_events = () => {
  Hue.ev(window, `resize`, () => {
    Hue.resize_timer()
  })
}

// What to do after a window resize
Hue.on_resize = () => {
  Hue.fix_frames()
  Hue.resize_activity_bar()
  Hue.scroll_to_radio_station()
}