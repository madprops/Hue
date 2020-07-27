// Determines if the input is scrolled or not
Hue.input_is_scrolled = function () {
  let el = $("#input")[0]
  return el.clientHeight < el.scrollHeight
}

// On input change
Hue.on_input_change = function () {
  let value = $("#input").val()

  value = Hue.utilz.clean_string9(value)

  if (value.length > Hue.config.max_input_length) {
    value = value.substring(0, Hue.config.max_input_length)
    Hue.change_input(value)
  }

  if (Hue.old_input_val !== value) {
    Hue.input_changed = true
    Hue.check_typing()
    Hue.old_input_val = value
  }
}

// Setups events for the main input
Hue.setup_input = function () {
  $("#input").on("input", function () {
    Hue.on_input_change()
  })

  $("#input").on("click", function () {
    if (Hue.editing_message) {
      Hue.stop_edit_message()
    }
  })

  $("#input").on("focus", function () {
    if (Hue.context_menu_open) {
      $(".context-menu-list").trigger("contextmenu:hide")
    }
  })

  $("#input").on("paste", function (e) {
    let items = (e.clipboardData || e.originalEvent.clipboardData).items

    for (let index in items) {
      let item = items[index]

      if (item.kind === "file") {
        Hue.dropzone.addFile(item.getAsFile())
        return
      }
    }
  })

  Hue.old_input_val = $("#input").val()
  Hue.input_tag_scroll_height = $("#input")[0].scrollHeight

  // Resizes the input automatically based on content
  computedVariables(
    "--expand",
    (value, event, tag) => {
      if (Hue.input_tag_scroll_height !== tag.scrollHeight) {
        $("#footer").css("height", $("#footer").height())
        tag.style.height = "auto"
        Hue.input_tag_scroll_height = tag.scrollHeight
        tag.style.height = ""
        $("#footer").css("height", "auto")
      }

      return Hue.input_tag_scroll_height + "px"
    },
    "#input",
    ["input", "paste", "blur", "reprocess"],
    {
      afterChange: function (height) {
        if (Hue.last_input_height && Hue.last_input_height !== height) {
          Hue.resize_timer()
        }

        Hue.last_input_height = height
      },
    }
  )

  Hue.reprocess_input()
}

Hue.reprocess_input = function () {
  $("#input")[0].dispatchEvent(new Event("reprocess"))
}

// Updates the input's placeholder
Hue.update_input_placeholder = function () {
  let s = ""
  
  if (Hue.get_setting("show_input_placeholder")) {
    s = `Hi ${Hue.username}, write something to ${Hue.room_name}`
  }
  
  $("#input").attr("placeholder", s)
}

// Checks if the input is active and overflowed
Hue.input_oversized_active = function () {
  let input = $("#input")[0]
  return (
    document.activeElement === input && input.clientHeight < input.scrollHeight
  )
}

// Clears the input
Hue.clear_input = function () {
  Hue.change_input("")
  Hue.old_input_val = ""
}

// Appends to the input
Hue.add_to_input = function (what) {
  Hue.change_input(`${$("#input").val() + what}`)
}

// Inserts text on current caret position
Hue.insert_to_input = function (what) {
  let el = $("#input")[0]
  let [start, end] = [el.selectionStart, el.selectionEnd]
  let part1 = el.value.substring(0, start)
  let part2 = el.value.substring(end, el.value.length)
  Hue.change_input(`${part1}${what}${part2}`)
}

// Changes the input
Hue.change_input = function (s, to_end = true, focus = true) {
  $("#input").val(s)

  if (to_end) {
    Hue.input_to_end()
  }

  if (focus) {
    Hue.focus_input()
  }

  Hue.reprocess_input()
}

// Focuses the input
Hue.focus_input = function () {
  if (Hue.modal_open) {
    return false
  }

  $("#input").focus()
}

// Removes focus on the input
Hue.blur_input = function () {
  $("#input").blur()
}

// Moves the input's caret to the end
Hue.input_to_end = function () {
  $("#input")[0].scrollLeft = $("#input")[0].scrollWidth
}

// Appends a linebreak to the input
Hue.add_linebreak_to_input = function () {
  Hue.insert_to_input("\n")
  Hue.scroll_input_to_bottom()
}

// Scrolls input to bottom when it's overflowed
Hue.scroll_input_to_bottom = function () {
  let input = $("#input")[0]
  input.scrollTop = input.scrollHeight
}

// Handles the /input command
Hue.input_command = function (arg) {
  arg = arg.replace(/\s\/endinput/gi, "")
  Hue.change_input(arg)
}
