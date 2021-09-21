module.exports = function (
  handler,
  vars,
  io,
  db_manager,
  config,
  sconfig,
  utilz,
  logger
) {
  // Receives sliced files uploads and requests more slices
  // Sends uploaded files to respective functions
  handler.public.slice_upload = async function (socket, data) {
    if (!data || !data.data || data.data.length > config.upload_slice_size) {
      return false
    }

    let key = `${socket.hue_user_id}_${data.date}`
    let file = vars.files[key]

    if (!file) {
      let spam_ans = await handler.add_spam(socket)

      if (!spam_ans) {
        return false
      }

      let ext = data.name.split(".").pop(-1).toLowerCase()

      if (data.action.includes("image")) {
        if (data.action === "profile_image_upload") {
          if (ext !== "png") {
            return false
          }
        } else {
          if (!utilz.image_extensions.includes(ext)) {
            return false
          }
        }
      } else if (data.action.includes("audio")) {
        if (data.action === "audio_clip_upload") {
          if (!utilz.audio_extensions.includes(ext)) {
            return false
          }
        }
      } else if (data.action.includes("video")) {
        if (data.action === "tv_video_upload") {
          if (!utilz.video_extensions.includes(ext) && !utilz.audio_extensions.includes(ext)) {
            return false
          }
        }
      }

      if (data.comment) {
        if (data.comment.length > config.safe_limit_4) {
          return false
        }
      }

      data.extension = ext
      vars.files[key] = Object.assign({}, vars.files_struct, data)
      file = vars.files[key]
      file.data = []
      file.spam_charge = 0
    }

    if (file.cancelled) {
      delete vars.files[key]
      return false
    }

    data.data = Buffer.from(new Uint8Array(data.data))
    file.data.push(data.data)
    file.slice++
    file.received += data.data.length
    file.spam_charge += data.data.length

    let fsize = file.received / 1024

    if (
      file.action === "image_upload" ||
      file.action === "background_image_upload"
    ) {
      if (fsize > config.max_image_size) {
        delete vars.files[key]
        return false
      }
    } else if (file.action === "audio_clip_upload") {
      if (fsize > config.max_audio_clip_size) {
        delete vars.files[key]
        return false
      }
    } else if (file.action === "tv_video_upload") {
      if (fsize > config.max_tv_video_size) {
        delete vars.files[key]
        return false
      }
    }

    if (file.spam_charge > config.upload_spam_charge) {
      file.spam_charge = 0
      let spam_ans = await handler.add_spam(socket)

      if (!spam_ans) {
        return false
      }
    }

    file.updated = Date.now()

    if (file.slice * config.upload_slice_size >= file.size) {
      handler.user_emit(socket, "upload_ended", { date: data.date })

      let full_file = Buffer.concat(file.data)

      if (data.action === "image_upload") {
        handler.upload_image(socket, {
          image_file: full_file,
          extension: file.extension,
          comment: file.comment,
        })
      } else if (data.action === "profile_image_upload") {
        handler.upload_profile_image(socket, {
          image_file: full_file,
        })
      } else if (data.action === "background_image_upload") {
        handler.upload_background_image(socket, {
          image_file: full_file,
          extension: file.extension,
        })
      } else if (data.action === "audio_clip_upload") {
        handler.upload_audio_clip(socket, {
          audio_file: full_file,
          extension: file.extension,
        })
      } else if (data.action === "tv_video_upload") {
        handler.upload_tv_video(socket, {
          video_file: full_file,
          extension: file.extension,
          comment: file.comment,
        })
      }

      delete vars.files[key]
    } else {
      handler.user_emit(socket, "request_slice_upload", {
        current_slice: file.slice,
        date: data.date,
      })
    }
  }

  // Flags a file as cancelled
  handler.public.cancel_upload = function (socket, data) {
    let key = `${socket.hue_user_id}_${data.date}`
    let file = vars.files[key]

    if (file) {
      file.cancelled = true
    }
  }
}
