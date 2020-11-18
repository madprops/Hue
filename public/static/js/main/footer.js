// Setups more footer elements
Hue.setup_footer = function () {
  let media = ["image", "tv"]

  for (let type of media) {
    $(`#footer_${type}_label`).click(function () {
      Hue[`show_${type}_picker`]()
    })

    $(`#footer_${type}_toggler`).click(function () {
      Hue.toggle_media({type:type, feedback:true})
    })

    $(`#footer_${type}_lock`).click(function () {
      Hue.change_media_lock({type:type, feedback:true})
    })
  }

  $("#footer_user_menu").click(function () {
    Hue.show_user_menu()
  })

  $("#footer_media_menu").click(function () {
    Hue.show_media_menu()
  })

  $("#footer_search").click(function () {
    Hue.show_chat_search()
  })

  $("#footer_enter").click(function () {
    Hue.input_submit()
  })

  $("#footer_clear").click(function () {
    Hue.clear_input()
    Hue.disable_footer_expand()
  })

  Hue.horizontal_separator_no_margin.separate("footer_media_items")
}

// Enables or disables footer expand
Hue.toggle_footer_expand = function () {
  if (Hue.footer_expanded) {
    Hue.disable_footer_expand()
  } else {
    Hue.enable_footer_expand()
  }
}

// Enabled footer expand
Hue.enable_footer_expand = function () {
  if (Hue.footer_expanded) {
    return
  }

  $("#footer").addClass("footer_expanded")
  $(`#footer_expand`).find("use").eq(0).attr("href", "#icon_down")
  Hue.after_footer_expand_change()
}

// Disable footer expand
Hue.disable_footer_expand = function () {
  if (!Hue.footer_expanded) {
    return
  }

  $("#footer").removeClass("footer_expanded")
  $(`#footer_expand`).find("use").eq(0).attr("href", "#icon_up")
  Hue.after_footer_expand_change()
}

// After footer expand change
Hue.after_footer_expand_change = function () {
  Hue.footer_expanded = !Hue.footer_expanded
  Hue.goto_bottom()
  Hue.fix_frames()

  if (!$("#input").val().trim()) {
    Hue.clear_input()
  }
}

// Checks how to handle the rotate icon
Hue.check_footer_media_rotate = function () {
  if (Hue.num_media_elements_visible() < 2) {
    $("#footer_media_rotate").addClass("faded")
  } else {
    $("#footer_media_rotate").removeClass("faded")
  }
}