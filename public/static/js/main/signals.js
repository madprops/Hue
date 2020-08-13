// Reloads the client
Hue.reload_client = function () {
  Hue.user_leaving = true
  window.location = window.location
}

// Reloads the client with a delay
Hue.delay_reload_client = function (delay) {
  setTimeout(function () {
    Hue.reload_client()
  }, delay)
}

// Reconnect asynchronously
Hue.refresh_client = function () {
  if (Hue.connecting || Hue.room_locked || Hue.socket.connected) {
    return false
  }

  Hue.connecting = true
  Hue.start_socket()
}

// Send a signal to an Electron client
Hue.electron_signal = function (func, data = {}) {
  if (window["electron_api"] === undefined) {
    return false
  }

  if (window["electron_api"][func] !== undefined) {
    window["electron_api"][func](data)
  }
}

// Simple emit to check server response
Hue.ping_server = function () {
  Hue.socket_emit("ping_server", { date: Date.now() })
}

// Calculates how much time the pong response took to arrive
Hue.pong_received = function (data) {
  let nice_time = Hue.utilz.nice_time(Date.now(), data.date)
  Hue.feedback(`Pong: ${nice_time}`)
}

// Only for superusers
// Sends a system restart signal that tells all clients to refresh
Hue.send_system_restart_signal = function () {
  Hue.socket_emit("system_restart_signal", {})
}

// Shows a message saying the client disconnects
// When clicked the client is refreshed
Hue.show_reload_button = function () {
  Hue.feedback(
    "Disconnected. Click to reload, or middle click to activate auto connect",
    {
      onclick: function () {
        Hue.refresh_client()
      },
      onmiddleclick: function () {
        Hue.modify_setting("autoconnect true", false, true)
        Hue.refresh_client()
      },
      brk: Hue.get_chat_icon("plug")
    }
  )
}
