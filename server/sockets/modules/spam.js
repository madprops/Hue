module.exports = (App) => {
  App.handler.start_anti_spam = (data) => {
    App.handler.anti_spam_users = {}
    App.handler.anti_spam_timeout()
  }

  // Starts a timeout to check spam on sockets
  App.handler.anti_spam_timeout = () => {
    setTimeout(() => {
      App.handler.anti_spam_timeout_action()
    }, App.sconfig.anti_spam_check_delay)
  }

  // What to do on each anti spam iteration
  App.handler.anti_spam_timeout_action = () => {
    for (let key in App.handler.anti_spam_users) {
      let user = App.handler.anti_spam_users[key]
      if (user.banned) {
        if (Date.now() > user.banned_until) {
          user.banned = false
          user.banned_until = 0
          user.level = 0
        }
      }
      else if (user.level > 0) {
        user.level -= 1
      }
    }

    App.handler.anti_spam_timeout()
  }

  // Add spam points and check if user is banned
  App.handler.add_spam = async (socket, amount = 1) => {
    return new Promise((resolve, reject) => {
      if (!App.handler.anti_spam_users[socket.hue_ip_address]) {
        App.handler.anti_spam_users[socket.hue_ip_address] = {
          level: 0,
          banned: false,
          banned_until: 0,
        }
      }

      let user = App.handler.anti_spam_users[socket.hue_ip_address]

      if (user.banned) {
        App.handler.anti_spam_kick(socket)
        return resolve(`already_banned`)
      }

      user.level += amount

      if (user.level >= App.sconfig.anti_spam_max_limit) {
        App.handler.anti_spam_ban(socket)
      }

      return resolve(`ok`)
    })
  }

  // Kick a user
  App.handler.anti_spam_kick = (socket) => {
    socket.hue_kicked = true
    socket.hue_info1 = `the anti-spam system`
    App.handler.get_out(socket)
  }

  // Ban a user from connecting
  App.handler.anti_spam_ban = (socket, minutes = App.sconfig.anti_spam_ban_duration) => {
    let user = App.handler.anti_spam_users[socket.hue_ip_address]

    if (!user) {
      return
    }

    user.banned = true
    user.banned_until = Date.now() + (minutes * 1000 * 60)
    App.logger.log_error(`IP banned: ${socket.hue_ip_address}`)
    App.handler.anti_spam_kick(socket)
  }

  // Get anti spam level
  App.handler.get_spam_level = (socket) => {
    let user = App.handler.anti_spam_users[socket.hue_ip_address]

    if (user) {
      return user.level
    }
    
    return 0
  }
}