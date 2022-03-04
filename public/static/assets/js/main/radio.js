// Setup radios
Hue.setup_radio = function () {
  if (Hue.config.radios.length === 0) {
    Hue.room_state.radio_enabled = false
    return
  }

  for (let radio of Hue.config.radios) {
    Hue.start_radio(radio)
  }
  
  Hue.create_radio_item_volume()
  Hue.apply_radio_volume(Hue.room_state.radio_volume)
  
  Hue.create_radio_item_buttons()
  Hue.fill_radio_queue()

  Hue.el("#footer_radio_icon_container").addEventListener("wheel", function (e) {
    Hue.change_radio_volume(e.deltaY > 0 ? "down" : "up")
  })

  Hue.el("#radio_controls").addEventListener("wheel", function (e) {
    Hue.change_radio_volume(e.deltaY > 0 ? "down" : "up")
  })

  Hue.el("#radio_items").addEventListener("mouseenter", function () {
    Hue.start_radio_unslide_timeout()
  })

  Hue.el("#radio_items").addEventListener("mouseleave", function () {
    Hue.start_radio_slide_timeout()
  })

  Hue.slide_radio()
  Hue.change_radio_state(Hue.room_state.radio_enabled)
  Hue.start_radio_dj_loop()
}

// Start a radio from a radio object
Hue.start_radio = function (radio) {
  let win = Hue.create_radio_window()
  win.hue_radio_name = radio.name
  win.hue_radio_url = radio.url
  win.hue_radio_metadata = radio.metadata
  win.hue_playing = false
  win.hue_date_started = Date.now()
  win.create()

  win.set_title(radio.name)
  win.set(Hue.template_radio_window())
  Hue.setup_radio_player(win)

  Hue.el(".radio_reload", win.window).addEventListener("click", function () {
    Hue.clear_radio_metadata(win)
    Hue.get_radio_metadata(win)
    Hue.start_radio_metadata_loop()
  })

  Hue.el(".radio_clipboard", win.window).addEventListener("click", function () {
    Hue.copy_string(Hue.get_radio_string(win))
    Hue.showmsg("Copied to clipboard", true)
  })  

  Hue.el(".radio_search", win.window).addEventListener("click", function () {
    let s = Hue.get_radio_string(win)
    let url = `https://www.youtube.com/results?search_query=${s}`
    Hue.goto_url(url, "tab", true)
  })
  
  Hue.horizontal_separator(Hue.el(".radio_buttons", win.content))
  Hue.create_radio_item(win)
  Hue.radio_windows.push(win)
}

// Get radio player element
Hue.get_radio_player = function (win) {
  return Hue.el(".radio_player", win.content)
}

// Setup events on radio player
Hue.setup_radio_player = function (win) {
  let player = Hue.get_radio_player(win)
    
  player.addEventListener("play", function () {
    win.hue_playing = true
    Hue.check_radio_playing(win)
    Hue.check_any_radio_playing()
  })
  
  player.addEventListener("pause", function () {
    win.hue_playing = false
    Hue.check_radio_playing(win)
    Hue.check_any_radio_playing()
  }) 
}

// Stop all radio players except active one
Hue.stop_radio_players = function (win) {
  for (let w of Hue.radio_windows) {
    if (win && win.hue_radio_url === w.hue_radio_url) {
      continue
    }

    Hue.pause_radio(w)
  }
}

// Apply style to playing radio
Hue.check_radio_playing = function (win) {
  if (win.hue_playing) {
    win.hue_radio_item.classList.add("radio_item_playing")
    win.hue_radio_item.classList.add("glowing")
  } else {
    win.hue_radio_item.classList.remove("radio_item_playing")
    win.hue_radio_item.classList.remove("glowing")
  }
}

// Make radio items visible or invisible
Hue.toggle_radio = function () {
  Hue.room_state.radio_enabled = !Hue.room_state.radio_enabled
  Hue.change_radio_state(Hue.room_state.radio_enabled)
  Hue.fix_frames()
  Hue.save_room_state()
}

// Enable or disable radio based on radio enabled
Hue.change_radio_state = function (what) {
  if (what) {
    Hue.el("#radio_items").classList.remove("nodisplay")
    Hue.el("#footer_radio_icon use").href.baseVal = "#icon_star-solid"
  } else {
    Hue.el("#radio_items").classList.add("nodisplay")
    Hue.el("#footer_radio_icon use").href.baseVal = "#icon_star"
  }
}

// Play or pause radio
Hue.check_radio_play = function (win) {
  if (win.hue_playing) {
    Hue.pause_radio(win)
  } else {
    Hue.play_radio(win)
  }
}

// Play the audio player with a cache-busted url
Hue.play_radio = function (win = Hue.playing_radio, play = true) {
  if (!win) {
    return
  }

  Hue.stop_radio_players(win)

  Hue.playing_radio = win
  Hue.scroll_to_radio_item()
  Hue.announce_radio()

  if (play) {
    let player = Hue.get_radio_player(win)
    player.src = Hue.utilz.cache_bust_url(win.hue_radio_url)
    player.play()
  }
}

// Pause the audio player
Hue.pause_radio = function (win = Hue.playing_radio) {
  if (!win) {
    return
  }

  Hue.get_radio_player(win).pause()
}

// Scroll stations list to playing item
Hue.scroll_to_radio_item = function () {
  if (Hue.playing_radio) {
    Hue.playing_radio.hue_radio_item.scrollIntoView({
      block: "center"
    })
  }
}

// Fetch a radio's metadata
Hue.get_radio_metadata = function (win) {
  Hue.loginfo(`Checking metadata: ${win.hue_radio_url}`)

  let artist_el = Hue.el(".radio_metadata_artist", win.content)
  let title_el = Hue.el(".radio_metadata_title", win.content)
  
  if (artist_el.textContent === "" && title_el.textContent === "") {
    artist_el.style.display = "initial"
    artist_el.textContent = "Loading..."
    title_el.style.display = "none"
  }

  if (!win.hue_radio_metadata) {
    artist_el.textContent = "Metadata not available"
    return
  }

  fetch(win.hue_radio_metadata)
  
  .then(res => res.json())
  
  .then(out => {
    let artist = ""
    let title = ""

    if (out.icestats && out.icestats.source) {
      if (Symbol.iterator in Object(out.icestats.source)) {
        let p = new URL(win.hue_radio_url).pathname.split("/").pop()
        for (let source of out.icestats.source) {
          if (source.listenurl.includes(p) && (source.artist || source.title)) {
            if (source.artist) {
              artist = source.artist
            }

            if (source.title) {
              title = source.title
            }
            
            break
          }
        }
      } else {
        artist = out.icestats.source.artist
        title = out.icestats.source.title
      }
    } else if (out.song) {
      if (Array.isArray(out.song)) {
        if (out.song[0].artist) {
          artist = out.song[0].artist
        }
  
        if (out.song[0].title) {
          title = out.song[0].title
        }
      } else {
        if (out.song.artist) {
          artist = out.song.artist
        }
  
        if (out.song.title) {
          title = out.song.title
        }
      }
    } else if (out.songs) {
      if (out.songs[0].artist) {
        artist = out.songs[0].artist
      }

      if (out.songs[0].title) {
        title = out.songs[0].title
      }
    }

    if (artist) {
      artist_el.innerHTML = Hue.utilz.make_html_safe(artist)
      artist_el.style.display = "initial"
    } else {
      artist_el.textContent = ""
      artist_el.style.display = "none"
    }

    if (title) {
      title_el.innerHTML = Hue.utilz.make_html_safe(title)
      title_el.style.display = "initial"
    } else {
      title_el.textContent = ""
      title_el.style.display = "none"
    }
  })

  .catch(err => {
    artist_el.textContent = "Metadata not available"
  })
}

// Start metadata loop while radio audio window is open
Hue.start_radio_metadata_loop = function (win) {
  Hue.stop_radio_metadata_loop()

  Hue.radio_metadata_interval = setInterval(function () {
    Hue.get_radio_metadata(win)
  }, Hue.config.radio_metadata_check_delay)
}

// Stop metadata check loop
Hue.stop_radio_metadata_loop = function () {
  clearInterval(Hue.radio_metadata_interval)
  Hue.radio_metadata_interval = undefined
}

// Check if any radio is playing
Hue.radio_is_playing = function () {
  return Hue.radio_windows.some(x => x.hue_playing)
}

// Check if any radio is playing and perform actions
Hue.check_any_radio_playing = function () {
  if (Hue.radio_is_playing()) {
    Hue.el("#footer_radio_icon").classList.add("rotate")
    Hue.el("#radio_button_playstop use").href.baseVal = "#icon_pause"
    Hue.update_input_placeholder(`Listening to ${Hue.playing_radio.hue_radio_name}`)
  } else {
    Hue.el("#footer_radio_icon").classList.remove("rotate")
    Hue.el("#radio_button_playstop use").href.baseVal = "#icon_play"
    Hue.update_input_placeholder()
  }
}

// Clear radio metadata window
Hue.clear_radio_metadata = function (win) {
  Hue.el(".radio_metadata_artist", win.content).textContent = ""
  Hue.el(".radio_metadata_title", win.content).textContent = ""
}

// Create radio item
Hue.create_radio_item = function (win) {
  let container = Hue.div("radio_item action")
  container.innerHTML = Hue.template_radio_item()
  
  let icon = Hue.el(".radio_item_icon", container)
  jdenticon.update(icon, win.hue_radio_name)
  
  let name = Hue.el(".radio_item_name", container)
  name.textContent = win.hue_radio_name
  
  container.addEventListener("click", function () {
    Hue.check_radio_play(win)
  })

  container.addEventListener("auxclick", function (e) {
    if (e.which === 2) {
      win.show()
    }
  })

  win.hue_radio_item = container
  Hue.el("#radio_stations").append(container)
}

// Create a specialized radio button
Hue.create_radio_item_buttons = function (name, on_click) {
  let container = Hue.div("radio_item")
  container.id = "radio_item_buttons"
  container.innerHTML = Hue.template_radio_item_buttons()

  Hue.el("#radio_button_random", container).addEventListener("click", function () {
    Hue.play_random_radio()
  })

  Hue.el("#radio_button_dj", container).addEventListener("click", function () {
    Hue.toggle_radio_dj()
  })

  Hue.el("#radio_button_playstop", container).addEventListener("click", function () {
    Hue.radio_playstop()
  })
  
  Hue.el("#radio_button_info", container).addEventListener("click", function () {
    if (Hue.playing_radio) {
      Hue.playing_radio.show()
    }
  })

  Hue.el("#radio_controls").append(container)
}

// Create volume widget item for radio
Hue.create_radio_item_volume = function () {
  let container = Hue.div("radio_item")
  container.id = "radio_item_volume"
  container.innerHTML = Hue.template_radio_item_volume()

  Hue.el("#radio_item_volume_icon", container).addEventListener("click", function () {
    Hue.change_radio_volume("down")
  })
  
  Hue.el("#radio_item_volume_text", container).addEventListener("click", function () {
    Hue.change_radio_volume("up")
  })

  Hue.el("#radio_controls").append(container)
}

// Increase or decrease radio volume
Hue.change_radio_volume = function (direction) {
  let new_volume = Hue.room_state.radio_volume

  if (direction === "up") {
    new_volume += 0.05  

    if (new_volume > 1) {
      new_volume = 1
    }
  } else if (direction === "down") {
    new_volume -= 0.05

    if (new_volume < 0) {
      new_volume = 0
    }
  }

  new_volume = Hue.utilz.round(new_volume, 2)
  
  if (new_volume !== Hue.room_state.radio_volume) {
    Hue.apply_radio_volume(new_volume)
  }
}

// Apply radio volume to all players
Hue.apply_radio_volume = function (volume) {
  for (let win of Hue.radio_windows) {
    let player = Hue.get_radio_player(win)
    player.volume = volume
  }

  if (volume === 0) {
    Hue.el("#radio_item_volume_icon use").href.baseVal = "#icon_volume-mute"
  } else if (volume <= 0.5) {
    Hue.el("#radio_item_volume_icon use").href.baseVal = "#icon_volume-low"
  } else {
    Hue.el("#radio_item_volume_icon use").href.baseVal = "#icon_volume-high"
  }
  
  let vstring = Math.round(volume * 100)
  Hue.el("#radio_item_volume_text").textContent = `Volume: ${vstring}%`
  
  Hue.room_state.radio_volume = volume
  Hue.save_room_state()
}

// Play a random radio station
Hue.play_random_radio = function () {
  Hue.play_radio(Hue.get_random_radio())
}

// Get random radio station
Hue.get_random_radio = function () {
  let win = Hue.radio_queue.pop()
  
  if (Hue.radio_queue.length === 0) {
    Hue.fill_radio_queue()
  }

  if (Hue.radio_queue.length > 1) {
    if (win.hue_playing) {
      return Hue.get_random_radio()
    }
  }

  return win
}

// Fill items for the random button
Hue.fill_radio_queue = function () {
  Hue.radio_queue = Hue.radio_windows.slice(0)
  Hue.utilz.shuffle_array(Hue.radio_queue)
}

// Get artist title string
Hue.get_radio_string = function (win) {
  let artist = Hue.el(".radio_metadata_artist", win.content).textContent
  let title = Hue.el(".radio_metadata_title", win.content).textContent
  return `${artist} ${title}`.trim()
}

// Clear slide timeouts
Hue.clear_radio_slide_timeouts = function () {
  clearTimeout(Hue.radio_slide_timeout)
  clearTimeout(Hue.radio_unslide_timeout)
}

// Start slide timeout
Hue.start_radio_slide_timeout = function () {
  Hue.clear_radio_slide_timeouts()
  Hue.radio_slide_timeout = setTimeout(function () {
    Hue.slide_radio()
  }, Hue.config.radio_slide_delay)
}

// Start unslide timeout
Hue.start_radio_unslide_timeout = function () {
  Hue.clear_radio_slide_timeouts()
  Hue.radio_unslide_timeout = setTimeout(function () {
    Hue.unslide_radio()
  }, Hue.config.radio_unslide_delay)
}

// Slide the radio to the side
Hue.slide_radio = function () {
  Hue.clear_radio_slide_timeouts()
  Hue.el("#radio_items").classList.add("radio_slide")
  Hue.scroll_to_radio_item()
}

// Reveal the radio fully 
Hue.unslide_radio = function () {
  Hue.clear_radio_slide_timeouts()
  Hue.el("#radio_items").classList.remove("radio_slide")
  Hue.scroll_to_radio_item()
}

// Play or stop the radio
// Select random item if none is playing
Hue.radio_playstop = function () {
  if (Hue.playing_radio) {
    Hue.check_radio_play(Hue.playing_radio)
  } else {
    Hue.play_random_radio()
  }  
}

// Send a message to others that you started a radio
Hue.announce_radio = function () {
  if (Hue.playing_radio) {
    Hue.socket_emit("announce_radio", {name: Hue.playing_radio.hue_radio_name})
  }
}

// Show when another user announces their radio
Hue.show_announce_radio = function (data) {
  if (Hue.userlist.length <= Hue.config.max_low_users) {
    Hue.show_action_notification(`${data.username} is listening to: ${data.name}`, "star", function () {
      Hue.play_radio_by_name(data.name)
    })
  }
}

// Play a radio by its name
Hue.play_radio_by_name = function (name) {
  for (let win of Hue.radio_windows) {
    if (win.hue_radio_name === name) {
      Hue.play_radio(win)
      return
    }
  }
}

// Toggle the radio auto dj
Hue.toggle_radio_dj = function (what) {
  if (what !== undefined) {
    Hue.radio_dj_on = what
  } else {
    Hue.radio_dj_on = !Hue.radio_dj_on
  }
  
  if (Hue.radio_dj_on) {
    Hue.el("#radio_button_dj").classList.add("underlined")
    
    if (!Hue.radio_is_playing()) {
      Hue.play_random_radio()
    }

    let m = Hue.utilz.get_minutes(Hue.config.radio_dj_delay)
    Hue.flash_info("Radio DJ", `Radio stations will change automatically after ${m} minutes`)
  } else {
    Hue.el("#radio_button_dj").classList.remove("underlined")
  }
}

// Start radio dj interval
Hue.start_radio_dj_loop = function () {
  setInterval(function () {
    if (Hue.radio_dj_on && Hue.radio_is_playing()) {
      Hue.crossfade_radio(Hue.get_random_radio())
    }
  }, Hue.config.radio_dj_delay)
}

// Crossfade two radio stations
Hue.crossfade_radio = function (win) {
  let player_1 = Hue.get_radio_player(Hue.playing_radio)
  let player_2 = Hue.get_radio_player(win)

  player_2.src = Hue.utilz.cache_bust_url(win.hue_radio_url)
  player_2.volume = 0
  player_2.play()

  setTimeout(function () {
    Hue.crossfade_interval = setInterval(function () {
      player_1.volume = Math.max(player_1.volume - 0.05, 0)
      player_2.volume = Math.min(player_2.volume + 0.05, 1)
  
      if (player_1.volume <= 0 && player_2.volume >= Hue.room_state.radio_volume) {
        clearInterval(Hue.crossfade_interval)
        player_2.volume = Hue.room_state.radio_volume
        Hue.play_radio(win, false)
      }
    }, 250)
  }, 250)
}