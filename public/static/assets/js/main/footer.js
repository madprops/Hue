// Setups more footer elements
App.setup_footer = () => {
  let media = [`image`, `tv`]

  for (let type of media) {
    DOM.ev(DOM.el(`#footer_${type}_icon`), `click`, (e) => {
      if (e.shiftKey | e.ctrlKey) {
        App[`show_upload_${type}`]()
      }
      else {
        App.show_media_picker(type)
      }
    })

    DOM.ev(DOM.el(`#footer_${type}_icon`), `auxclick`, (e) => {
      if (e.button === 1) {
        if (type === `image`) {
          App.show_modal_image()
        }
      }
    })

    DOM.ev(DOM.el(`#footer_${type}_toggle`), `click`, () => {
      App.set_media_enabled({type, what: !App.room_state[`${type}_enabled`]})
    })

    DOM.ev(DOM.el(`#footer_${type}_lock`), `click`, () => {
      App.set_media_locked({type, what: !App[`${type}_locked`]})
    })

    DOM.ev(DOM.el(`#footer_${type}_list`), `click`, () => {
      App[`msg_${type}_picker`].close()
      App[`show_${type}_list`]()
    })

    App.update_footer_toggle(type)
  }

  DOM.ev(DOM.el(`#footer_radio_container`), `click`, () => {
    App.show_radio()
  })

  DOM.ev(DOM.el(`#footer_radio_container`), `auxclick`, (e) => {
    if (e.button === 1) {
      App.radio_playstop()
    }
  })

  DOM.ev(DOM.el(`#footer_input_menu`), `auxclick`, (e) => {
    if (e.which === 2) {
      App.flop()
    }
  })
}

// Enabled footer expand
App.enable_footer_expand = () => {
  if (App.footer_expanded) {
    return
  }

  DOM.el(`#footer`).classList.add(`footer_expanded`)
  App.after_footer_expand_change()
}

// Disable footer expand
App.disable_footer_expand = () => {
  if (!App.footer_expanded) {
    return
  }

  DOM.el(`#footer`).classList.remove(`footer_expanded`)
  App.after_footer_expand_change()
}

// After footer expand change
App.after_footer_expand_change = () => {
  App.footer_expanded = !App.footer_expanded
  App.fix_frames()
}

// Check input expand
App.check_footer_expand = () => {
  if (!App.input_has_value()) {
    App.disable_footer_expand()
  }
}

// Update footer toggle
App.update_footer_toggle = (type) => {
  let val = App.room_state[`${type}_enabled`]

  if (val) {
    DOM.el(`#footer_${type}_toggle use`).href.baseVal = `#icon_toggle-on`
  }
  else {
    DOM.el(`#footer_${type}_toggle use`).href.baseVal = `#icon_toggle-off`
  }
}

// Highlight the footer
// Highlight input
App.highlight_footer = () => {
  clearTimeout(App.highlight_footer_timeout)
  DOM.el(`#footer`).classList.add(`flash_highlight`)

  App.highlight_footer_timeout = setTimeout(() => {
    DOM.el(`#footer`).classList.remove(`flash_highlight`)
  }, App.highlight_footer_delay)
}