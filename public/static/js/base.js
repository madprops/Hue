var ls_global_settings = "global_settings_v1"
var ls_room_settings = "room_settings_v1"
var ls_room_state = "room_state_v1"
var ls_input_history = "input_history_v16"
var ls_first_time = "first_time_v2"
var vtypes = ["voice1", "voice2", "voice3", "voice4"]
var roles = ["admin", "op"].concat(vtypes)
var socket
var global_settings
var room_settings
var room_state
var is_public
var room_name
var username
var image_source = ''
var image_setter = ''
var image_size = 0
var image_date = ''
var topic = ''
var topic_setter = ''
var topic_date = ''
var dropzone
var colorlib = ColorLib()
var played = []
var input_history = []
var input_history_index = 0
var chat_history = []
var userlist = []
var usernames = []
var role = ''
var chat_permission
var upload_permission
var radio_permission
var tv_permission
var can_chat = false
var can_images = false
var can_radio = false
var can_tv = false
var radio_type = ''
var radio_source = ''
var radio_title = ''
var radio_setter = ''
var radio_date = ''
var loaded_radio_source = ""
var loaded_radio_type = "radio"
var loaded_radio_metadata = ""
var tv_type = ''
var tv_source = ''
var tv_title = ''
var tv_metadata = ''
var tv_setter = ''
var tv_date = ''
var tab_info = {}
var crm = false
var orb = false
var rup = false
var tup = false
var iup = false
var gtr = false
var imp = false
var minpo = false
var modal_open = false
var started = false
var afk_timer
var afk = false
var alert_mode = 0
var commands = []
var commands_sorted = {}
var chat_scrollbar
var template_main_menu
var template_create_room
var template_userlist
var template_roomlist
var template_played
var template_open_room
var template_status
var template_help
var template_help2
var template_help3
var template_user_menu
var template_profile
var template_image_picker
var template_tv_picker
var template_radio_picker
var template_media_menu
var template_message
var template_highlights
var template_image_history
var template_tv_history
var template_radio_history
var template_input_history
var template_chat_search
var template_modal_image
var template_modal_image_number
var template_locked_menu
var template_settings
var template_global_settings
var template_room_settings
var template_credits
var msg_main_menu
var msg_user_menu
var msg_userlist
var msg_roomlist
var msg_played
var msg_modal_image
var msg_modal_image_number
var msg_profile
var msg_info
var msg_info2
var msg_message
var msg_image_picker
var msg_tv_picker
var msg_radio_picker
var msg_highlights
var msg_media_menu
var msg_image_history
var msg_tv_history
var msg_radio_history
var msg_input_history
var msg_chat_search
var msg_lockscreen
var msg_draw_image
var msg_credits
var played_filtered = false
var userlist_filtered = false
var image_history_filtered = false
var tv_history_filtered = false
var radio_history_filtered = false
var public_roomlist_filter_string = ""
var visited_roomlist_filter_string = ""
var yt_player
var yt_video_player
var youtube_player
var youtube_video_player
var twitch_video_player
var soundcloud_player
var soundcloud_video_player
var utilz = Utilz()
var log_messages
var profile_image
var change_image_when_focused = false
var change_tv_when_focused = false
var change_radio_when_focused = false
var room_images_mode = "enabled"
var room_tv_mode = "enabled"
var room_radio_mode = "enabled"
var room_voice_chat_mode = "enabled"
var radio_started = false
var theme
var text_color_mode
var text_color
var background_image
var background_mode
var background_tile_dimensions
var image_queue = ["first"]
var image_queue_timeout
var last_image_source = false
var last_tv_source = false
var last_tv_type = false
var last_radio_source = false
var last_radio_type = false
var files = {}
var input_changed = false
var hls
var youtube_video_play_on_queue = false
var old_input_val
var separator_title
var message_id = 0
var popup_message_id = 0
var mentions_regex
var highlight_words_regex
var ignored_words_regex
var writing_message = false
var double_tap_key_pressed = 0
var double_tap_key_2_pressed = 0
var double_tap_key_3_pressed = 0
var images_visible = true
var tv_visible = true
var radio_visible = true
var images_changed = []
var tv_changed = [] 
var radio_changed = []
var modal_image_open = false
var current_modal_image_index
var current_image_source = ""
var current_image_title = ""
var current_image_date_raw = 0
var date_joined
var user_email
var user_reg_date
var filter_delay = 350
var resize_delay = 350
var double_tap_delay = 250
var wheel_delay = 100
var check_scrollers_delay = 100
var requesting_roomlist = false
var num_keys_pressed = 0
var first_time
var emit_queue_timeout
var emit_queue = []
var app_focused = true
var message_uname = ""
var message_type = ""
var users_to_disconnect = []
var stop_radio_timeout
var stop_radio_delay = 0
var aura_timeouts = {}
var reaction_types = ["like", "love", "happy", "meh", "sad", "dislike"]
var show_reactions_timeout
var hide_reactions_timeout
var mouse_over_reactions = false
var reactions_hover_delay = 800
var user_functions = [1, 2, 3]
var screen_locked = false
var mouse_is_down = false
var draw_message_context
var draw_message_click_x
var draw_message_click_y
var draw_message_drag
var draw_message_just_entered = false
var draw_image_context
var draw_image_just_entered = false
var draw_image_snapshots
var draw_image_mode = "pencil"
var draw_image_scale = 2.4
var draw_image_num_strokes_save = 500
var draw_image_max_levels = 200
var draw_image_open = false
var voice_chat_joined = false
var voice_chat_userlist
var voice_aura_timeouts = {}
var voice_chat_received_chunks = {}
var microphone_stream
var microphone_context = false 
var microphone_input = false
var microphone_recorder = false
var microphone_recording_length = 0
var microphone_left_channel = []
var microphone_right_channel = []
var microphone_volume = 0
var microphone_averaging = 0.95
var highlight_same_posts_timeouts = {}
var highlight_same_posts_delay = 800
var loaded_chat_layout
var credits_audio
var radio_metadata_fail_timeout
var radio_get_metadata_ongoing = false
var radio_get_metadata = false
var init_data
var log_messages_processed = false

function init()
{
	activate_key_detection()
	setup_templates()
	get_global_settings()
	get_room_settings()
	get_room_state()
	set_loaded_settings_state()
	set_radio_volume()
	start_msg()
	start_settings_state("global_settings")
	start_settings_listeners("global_settings")
	start_settings_state("room_settings")
	start_settings_listeners("room_settings")
	setup_settings_windows()
	start_filters()
	start_image_events()
	start_dropzone()
	start_volume_scroll()
	generate_highlight_words_regex()
	generate_ignored_words_regex()
	activate_visibility_listener()
	copypaste_events()
	scroll_events()
	resize_events()
	register_commands()
	setup_chat()
	start_chat_click_events()
	start_chat_hover_events()
	start_played_click_events()
	start_userlist_click_events()
	start_roomlist_click_events()
	start_generic_uname_click_events()
	start_username_context_menu()
	start_played_context_menu()
	start_volume_context_menu()
	start_toggle_radio_context_menu()
	start_main_menu_context_menu()
	start_titles()
	setup_show_profile()
	setup_main_menu()
	start_twitch()
	start_soundcloud()
	check_image_queue()
	setup_input()
	font_check()
	setup_input_history()
	setup_modal_image()
	setup_footer()
	setup_reactions_box()
	prepare_media_settings()
	setup_message_area()
	setup_mouse_events()
	setup_draw_image()
	setup_voice_chat()
	setup_autocomplete()
	start_other_scrollbars()
	setup_user_function_titles()
	setup_modal_image_number()

	start_socket()
}

function make_main_container_visible()
{
	$("#loading").css("opacity", 0)
	$("#main_container").css("opacity", 1).css("pointer-events", "initial")

	setTimeout(function()
	{
		$("#loading").css("display", "none")
	}, 1600)
}

function get_local_storage(ls_name)
{
	if(localStorage[ls_name])
	{
		try
		{
			var obj = JSON.parse(localStorage.getItem(ls_name))
		}

		catch(err)
		{
			localStorage.removeItem(ls_name)
			var obj = null
		}
	}

	else
	{
		var obj = null
	}

	return obj
}

function save_local_storage(ls_name, obj)
{
	if(typeof obj !== "string")
	{
		obj = JSON.stringify(obj)
	}

	localStorage.setItem(ls_name, obj)
}

function remove_local_storage(ls_name)
{
	localStorage.removeItem(ls_name)
}

function setup_templates()
{
	template_main_menu = Handlebars.compile($('#template_main_menu').html())
	template_create_room = Handlebars.compile($('#template_create_room').html())
	template_open_room = Handlebars.compile($('#template_open_room').html())
	template_userlist = Handlebars.compile($('#template_userlist').html())
	template_roomlist = Handlebars.compile($('#template_roomlist').html())
	template_played = Handlebars.compile($('#template_played').html())
	template_status = Handlebars.compile($('#template_status').html())
	template_help = Handlebars.compile($('#template_help').html())
	template_help2 = Handlebars.compile($('#template_help2').html())
	template_help3 = Handlebars.compile($('#template_help3').html())
	template_user_menu = Handlebars.compile($('#template_user_menu').html())
	template_profile = Handlebars.compile($('#template_profile').html())
	template_image_picker = Handlebars.compile($('#template_image_picker').html())
	template_tv_picker = Handlebars.compile($('#template_tv_picker').html())
	template_radio_picker = Handlebars.compile($('#template_radio_picker').html())
	template_media_menu = Handlebars.compile($('#template_media_menu').html())
	template_message = Handlebars.compile($('#template_message').html())
	template_highlights = Handlebars.compile($('#template_highlights').html())
	template_image_history = Handlebars.compile($('#template_image_history').html())
	template_tv_history = Handlebars.compile($('#template_tv_history').html())
	template_radio_history = Handlebars.compile($('#template_radio_history').html())
	template_input_history = Handlebars.compile($('#template_input_history').html())
	template_chat_search = Handlebars.compile($('#template_chat_search').html())
	template_modal_image = Handlebars.compile($('#template_modal_image').html())
	template_modal_image_number = Handlebars.compile($('#template_modal_image_number').html())
	template_locked_menu = Handlebars.compile($('#template_locked_menu').html())
	template_settings = Handlebars.compile($('#template_settings').html())
	template_global_settings = Handlebars.compile($('#template_global_settings').html())
	template_room_settings = Handlebars.compile($('#template_room_settings').html())
	template_lockscreen = Handlebars.compile($('#template_lockscreen').html())
	template_draw_image = Handlebars.compile($('#template_draw_image').html())
	template_credits = Handlebars.compile($('#template_credits').html())
}

function help()
{
	msg_info2.show(["Basic Features", template_help()])
}

function help2()
{
	msg_info2.show(["Additional Features", template_help2()])
}

function help3()
{
	msg_info2.show(["Administration Features", template_help3()])
}

function show_public()
{
	if(is_public)
	{
		feedback('This room is public')
	}

	else
	{
		feedback('This room is private')
	}
}

function show_room()
{
	feedback(`Room: ${room_name}`)
}

function change_room_name(arg)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	arg = utilz.clean_string2(arg.substring(0, max_room_name_length))

	if(arg === room_name)
	{
		feedback("That's already the room name")
		return
	}

	if(arg.length > 0)
	{
		socket_emit("change_room_name", {name:arg})
	}
}

function room_name_edit()
{
	change_input(`/roomname ${room_name}`)
}

function get_proper_media_url(type)
{
	var source = window[`${type}_source`]

	if(source.startsWith("/"))
	{
		source = window.location.origin + source
	}

	return source
}

function show_media_source(what)
{
	var source = get_proper_media_url(what)
	var setter = window[`${what}_setter`]
	var date = window[`${what}_date`]

	if(what === "image")
	{
		var s = "Image"
	}

	else if(what === "tv")
	{
		var s = "TV"
	}

	else if(what === "radio")
	{
		var s = "Radio"
	}

	if(setter !== '')
	{
		feedback(`${s} Source: ${source}`, {title:`Setter: ${setter} | ${date}`})
	}

	else
	{
		feedback(`${s} Source: ${source}`)
	}
}

function get_unset_topic()
{
	if(is_admin_or_op())
	{
		return default_topic_admin
	}

	else
	{
		return default_topic
	}
}

function get_topic()
{
	if(topic)
	{
		return topic
	}

	else
	{
		return get_unset_topic()
	}
}

function show_topic()
{
	if(topic)
	{
		if(topic_setter !== "")
		{
			feedback(`Topic: ${topic}`, {title:`Setter: ${topic_setter} | ${topic_date}`})
		}

		else
		{
			feedback(`Topic: ${topic}`)
		}
	}

	else
	{
		feedback(`Topic: ${get_unset_topic()}`)
	}
}

function start_permissions(data)
{
	voice1_chat_permission = data.voice1_chat_permission
	voice1_images_permission = data.voice1_images_permission
	voice1_tv_permission = data.voice1_tv_permission
	voice1_radio_permission = data.voice1_radio_permission
	voice1_voice_chat_permission = data.voice1_voice_chat_permission
	
	voice2_chat_permission = data.voice2_chat_permission
	voice2_images_permission = data.voice2_images_permission
	voice2_tv_permission = data.voice2_tv_permission
	voice2_radio_permission = data.voice2_radio_permission
	voice2_voice_chat_permission = data.voice2_voice_chat_permission
	
	voice3_chat_permission = data.voice3_chat_permission
	voice3_images_permission = data.voice3_images_permission
	voice3_tv_permission = data.voice3_tv_permission
	voice3_radio_permission = data.voice3_radio_permission
	voice3_voice_chat_permission = data.voice3_voice_chat_permission
	
	voice4_chat_permission = data.voice4_chat_permission
	voice4_images_permission = data.voice4_images_permission
	voice4_tv_permission = data.voice4_tv_permission
	voice4_radio_permission = data.voice4_radio_permission
	voice4_voice_chat_permission = data.voice4_voice_chat_permission
}

function check_permissions()
{
	can_chat = check_permission(role, "chat")
	can_images = room_images_mode === "enabled" && check_permission(role, "images")
	can_tv = room_tv_mode === "enabled" && check_permission(role, "tv")
	can_radio = room_radio_mode === "enabled" && check_permission(role, "radio")
	can_voice_chat = room_voice_chat_mode === "enabled" && check_permission(role, "voice_chat")

	if(!can_voice_chat && voice_chat_joined)
	{
		leave_voice_chat()
	}

	setup_icons()
}

function check_permission(role=false, type=false)
{
	if(is_admin_or_op(role))
	{
		return true
	}

	if(role && type)
	{
		if(window[`${role}_${type}_permission`])
		{
			return true
		}
	}

	return false
}

function setup_icons()
{
	if(room_images_mode === "disabled")
	{
		$("#footer_images_controls").css("display", "none")
	}

	else
	{
		$("#footer_images_controls").css("display", "flex")
	}

	if(can_images)
	{
		$("#footer_images_icon").css("display", "flex")
	}

	else
	{
		$("#footer_images_icon").css("display", "none")
	}

	if(room_tv_mode === "disabled")
	{
		$("#footer_tv_controls").css("display", "none")
	}

	else
	{
		$("#footer_tv_controls").css("display", "flex")
	}

	if(can_tv)
	{
		$("#footer_tv_icon").css("display", "flex")
	}

	else
	{
		$("#footer_tv_icon").css("display", "none")
	}

	if(room_radio_mode === "disabled")
	{
		$("#footer_radio_controls").css("display", "none")
	}

	else
	{
		$("#footer_radio_controls").css("display", "flex")
	}

	if(can_radio)
	{
		$("#footer_radio_icon").css("display", "flex")
	}

	else
	{
		$("#footer_radio_icon").css("display", "none")
	}

	if(room_voice_chat_mode !== "disabled")
	{
		if(can_voice_chat)
		{
			$("#header_voice_chat_container").css("display", "flex")
		}

		else
		{
			$("#header_voice_chat_container").css("display", "none")
		}
	}

	else
	{
		$("#header_voice_chat_container").css("display", "none")
	}
}

function show_role(data)
{
	if(role === 'admin')
	{
		feedback('You are an admin')
	}

	else if(role === 'op')
	{
		feedback('You are an op')
	}

	else if(role.startsWith('voice'))
	{
		feedback(`You have ${role}`)
	}

	var ps = 0

	if(can_chat)
	{
		feedback("You have chat permission")

		ps += 1
	}

	if(can_images)
	{
		feedback("You have images permission")

		ps += 1
	}

	if(can_tv)
	{
		feedback("You have tv permission")

		ps += 1
	}

	if(can_radio)
	{
		feedback("You have radio permission")

		ps += 1
	}

	if(can_voice_chat)
	{
		feedback("You have voice chat permission")

		ps += 1
	}

	if(ps === 0)
	{
		feedback("You cannot interact")
	}
}

function show_username()
{
	feedback(`Username: ${username}`)
}

function socket_emit(destination, data)
{
	var obj =
	{
		destination: destination,
		data: data
	}

	emit_queue.push(obj)

	if(emit_queue_timeout === undefined)
	{
		check_emit_queue()
	}
}

function check_emit_queue()
{
	if(emit_queue.length > 0)
	{
		var obj = emit_queue[0]

		if(obj !== "first")
		{
			do_socket_emit(obj)
		}

		emit_queue.shift()

		emit_queue_timeout = setTimeout(function()
		{
			check_emit_queue()
		}, socket_emit_throttle)
	}

	else
	{
		clearTimeout(emit_queue_timeout)
		emit_queue_timeout = undefined
	}
}

function do_socket_emit(obj)
{
	console.info(`Emit: ${obj.destination}`)
	obj.data.server_method_name = obj.destination
	socket.emit("server_method", obj.data)
}

function start_socket()
{
	socket = io('/',
	{
		reconnection: false
	})

	socket.on('connect', () =>
	{
		socket_emit('join_room', {room_id:room_id, user_id:user_id, token:jwt_token})
	})

	socket.on('disconnect', (reason) =>
	{
		if(started)
		{
			setTimeout(function()
			{
				restart_client()
			}, 2000)
		}
	})

	socket.on('update', (data) =>
	{
		if(data.type === 'joined')
		{
			init_data = data

			if(data.room_locked)
			{
				start_locked_mode()
				return
			}

			room_name = data.room_name
			set_username(data.username)
			set_email(data.email)
			user_reg_date = data.reg_date
			setup_profile_image(data.profile_image)
			userlist = data.userlist
			update_userlist()
			voice_chat_userlist = data.voice_chat_userlist
			update_voice_chat_userlist()
			log_enabled = data.log
			log_messages = data.log_messages
			setup_theme_and_background(data)
			apply_background()
			apply_theme()
			setup_active_media(data)
			start_permissions(data)
			is_public = data.public
			set_role(data.role, false)
			set_topic_info(data)
			update_title()
			setup_user_menu()
			clear_chat()
			check_firstime()
			get_input_history()
			show_joined()

			setup_image(data)
			setup_tv(data)
			setup_radio(data)

			check_maxers()
			config_main_menu()
			start_metadata_loop()
			chat_scroll_bottom()
			make_main_container_visible()

			date_joined = Date.now()
			started = true

			at_startup()
		}

		else if(data.type === 'typing')
		{
			show_typing(data)
		}

		else if(data.type === 'chat_message')
		{
			update_chat(
			{
				username: data.username, 
				message: data.message, 
				prof_image: data.profile_image,
				date: data.date
			})

			hide_pencil()
			remove_aura(data.username, true)
		}

		else if(data.type === 'request_slice_upload')
		{
			request_slice_upload(data)
		}

		else if(data.type === 'upload_ended')
		{
			upload_ended(data)
		}

		else if(data.type === 'image_change')
		{
			queue_image(data)
			announce_image_change(data)
		}

		else if(data.type === 'profile_image_changed')
		{
			profile_image_changed(data)
		}

		else if(data.type === 'userjoin')
		{
			userjoin(data)
		}

		else if(data.type === 'roomlist')
		{
			update_roomlist(data.rtype, data.roomlist)

			if(data.rtype === "public_roomlist")
			{
				show_public_roomlist()
			}

			else if(data.rtype === "visited_roomlist")
			{
				show_visited_roomlist()
			}
		}

		else if(data.type === 'upload_error')
		{
			show_upload_error()
		}

		else if(data.type === 'topic_change')
		{
			announce_topic_change(data)
		}

		else if(data.type === 'room_name_changed')
		{
			announce_room_name_change(data)
		}

		else if(data.type === 'log_changed')
		{
			announce_log_change(data)
		}

		else if(data.type === 'log_cleared')
		{
			announce_log_cleared(data)
		}

		else if(data.type === 'announce_role_change')
		{
			announce_role_change(data)
		}

		else if(data.type === 'voices_resetted')
		{
			announce_voices_resetted(data)
		}

		else if(data.type === 'announce_removedops')
		{
			announce_removedops(data)
		}

		else if(data.type === 'announce_ban')
		{
			public_feedback(`${data.username1} banned ${data.username2}`,
			{
				username: data.username1,
				open_profile: true
			})
		}

		else if(data.type === 'announce_unban')
		{
			public_feedback(`${data.username1} unbanned ${data.username2}`,
			{
				username: data.username1,
				open_profile: true
			})
		}

		else if(data.type === 'announce_unban_all')
		{
			announce_unban_all(data)
		}

		else if(data.type === 'receive_banned_count')
		{
			receive_banned_count(data)
		}

		else if(data.type === 'nothingtounban')
		{
			feedback("There was nothing to unban")
		}

		else if(data.type === 'nothingtoclear')
		{
			feedback("There was nothing to clear")
		}

		else if(data.type === 'listbans')
		{
			show_listbans(data)
		}

		else if(data.type === 'forbiddenuser')
		{
			forbiddenuser()
		}

		else if(data.type === 'user_not_found')
		{
			feedback("User doesn't exist")
		}

		else if(data.type === 'user_not_in_room')
		{
			user_not_in_room()
		}

		else if(data.type === 'noopstoremove')
		{
			feedback("There were no ops to remove")
		}

		else if(data.type === 'novoicestoreset')
		{
			feedback("There were no voices to reset")
		}

		else if(data.type === 'isalready')
		{
			isalready(data.who, data.what)
		}

		else if(data.type === 'user_already_banned')
		{
			feedback("User is already banned")
		}

		else if(data.type === 'user_already_unbanned')
		{
			feedback("User is already unbanned")
		}

		else if(data.type === 'privacy_change')
		{
			announce_privacy_change(data)
		}

		else if(data.type === 'changed_radio_source')
		{
			announce_radio_change(data)
			setup_radio(data)
		}

		else if(data.type === 'restarted_radio_source')
		{
			announce_radio_change(data, false, "restart")
			setup_radio(data)
		}

		else if(data.type === 'changed_tv_source')
		{
			announce_tv_change(data)
			setup_tv(data)
		}

		else if(data.type === 'restarted_tv_source')
		{
			announce_tv_change(data, false, "restart")
			setup_tv(data)
		}

		else if(data.type === 'reserved')
		{
			reserved(data)
		}

		else if(data.type === 'unreserved')
		{
			unreserved(data)
		}

		else if(data.type === 'alreadyreserved')
		{
			feedback(`${username} is already reserved`)
		}

		else if(data.type === 'couldnotrecover')
		{
			feedback("You don't seem to own that username")
		}

		else if(data.type === 'imagenotfound')
		{
			feedback("The image couldn't be found")
		}

		else if(data.type === 'songnotfound')
		{
			feedback("The song couldn't be found")
		}

		else if(data.type === 'videonotfound')
		{
			feedback("The video couldn't be found")
		}

		else if(data.type === 'room_created')
		{
			on_room_created(data)
		}

		else if(data.type === 'redirect')
		{
			goto_url(data.location)
		}

		else if(data.type === 'username_already_exists')
		{
			feedback(`${data.username} already exists`)
		}

		else if(data.type === 'email_already_exists')
		{
			feedback(`${data.email} already exists`)
		}

		else if(data.type === 'new_username')
		{
			announce_new_username(data)
		}

		else if(data.type === 'password_changed')
		{
			password_changed(data)
		}

		else if(data.type === 'email_changed')
		{
			email_changed(data)
		}

		else if(data.type === 'show_details')
		{
			show_details(data)
		}

		else if(data.type === 'room_images_mode_change')
		{
			announce_room_images_mode_change(data)
		}

		else if(data.type === 'room_tv_mode_change')
		{
			announce_room_tv_mode_change(data)
		}

		else if(data.type === 'room_radio_mode_change')
		{
			announce_room_radio_mode_change(data)
		}

		else if(data.type === 'room_voice_chat_mode_change')
		{
			announce_room_voice_chat_mode_change(data)
		}

		else if(data.type === 'theme_change')
		{
			announce_theme_change(data)
		}

		else if(data.type === 'background_image_change')
		{
			announce_background_image_change(data)
		}

		else if(data.type === 'background_mode_changed')
		{
			announce_background_mode_change(data)
		}

		else if(data.type === 'background_tile_dimensions_changed')
		{
			announce_background_tile_dimensions_change(data)
		}

		else if(data.type === 'text_color_mode_changed')
		{
			announce_text_color_mode_change(data)
		}

		else if(data.type === 'text_color_changed')
		{
			announce_text_color_change(data)
		}

		else if(data.type === 'voice_permission_change')
		{
			announce_voice_permission_change(data)
		}

		else if(data.type === 'userdisconnect')
		{
			userdisconnect(data)
		}

		else if(data.type === 'othersdisconnected')
		{
			show_others_disconnected(data)
		}

		else if(data.type === 'whisper')
		{
			popup_message_received(data)
		}

		else if(data.type === 'whisper_ops')
		{
			popup_message_received(data, "ops")
		}

		else if(data.type === 'room_broadcast')
		{
			popup_message_received(data, "room")
		}

		else if(data.type === 'system_broadcast')
		{
			popup_message_received(data, "system")
		}

		else if(data.type === 'system_restart_signal')
		{
			restart_client()
		}

		else if(data.type === 'error_occurred')
		{
			error_occurred()
		}

		else if(data.type === 'email_change_code_sent')
		{
			feedback(`Verification code sent. Use the command sent to ${data.email}. Email might take a couple of minutes to arrive.`)
		}

		else if(data.type === 'email_change_code_not_sent')
		{
			feedback(`Verification code not sent yet. Use /changeemail [new_email] to get a verification code`)
		}

		else if(data.type === 'email_change_wait')
		{
			feedback(`You must wait a while before changing the email again`)
		}

		else if(data.type === 'email_change_wrong_code')
		{
			feedback(`Code supplied didn't match`)
		}

		else if(data.type === 'email_change_expired_code')
		{
			feedback(`Code supplied has expired`)
		}

		else if(data.type === 'create_room_wait')
		{
			msg_info.show("You must wait a while before creating another room")
		}

		else if(data.type === 'pong_received')
		{
			pong_received(data)
		}

		else if(data.type === 'reaction_received')
		{
			show_reaction(data)
		}
		
		else if(data.type === 'voice_chat_user_connected')
		{
			voice_chat_user_connected(data)
		}

		else if(data.type === 'voice_chat_user_disconnected')
		{
			voice_chat_user_disconnected(data)
		}		

		else if(data.type === 'voice_chat_blob_received')
		{
			voice_chat_blob_received(data)
		}

		else if(data.type === 'voice_chat_blob_received_feedback')
		{
			show_voice_aura(user_id)
		}

		else if(data.type === 'cannot_embed_iframe')
		{
			feedback("That website cannot be embedded")
		}
	})
}

function setup_radio(data)
{
	if(!data)
	{
		data = {}

		data.radio_source = ''
		data.radio_setter = ''
		data.radio_date = 0
	}

	if(data.radio_source === '')
	{
		radio_source = default_radio_source
		radio_title = default_radio_title
		radio_type = default_radio_type
	}

	else
	{
		radio_source = data.radio_source
		radio_title = data.radio_title
		radio_type = data.radio_type
	}

	radio_setter = data.radio_setter
	radio_date = nice_date(data.radio_date)

	change({type:"radio", force:true})
}

function setup_tv(data)
{
	if(!data)
	{
		data = {}

		data.tv_source = ''
		data.tv_setter = ''
		data.tv_date = 0
	}

	if(data.tv_source === '')
	{
		tv_source = default_tv_source
		tv_type = default_tv_type
	}

	else
	{
		tv_source = data.tv_source
		tv_type = data.tv_type
	}

	tv_title = data.tv_title
	tv_setter = data.tv_setter
	tv_date = nice_date(data.tv_date)

	change({type:"tv", force:true})
}

function load_radio(src, type)
{
	var radio_metadata = ""
	
	radio_get_metadata = false
	
	clearTimeout(radio_metadata_fail_timeout)

	if(type === "radio")
	{
		if(src.slice(-1) === '/')
		{
			radio_metadata = `${src.slice(0, -1).split('/').slice(0, -1).join('/')}/status-json.xsl`
		}

		else
		{
			radio_metadata = `${src.split('/').slice(0, -1).join('/')}/status-json.xsl`
		}

		radio_get_metadata = true

		$('#audio').attr('src', src)

		if(radio_started)
		{
			$('#audio')[0].play()
		}

		if(youtube_player !== undefined)
		{
			youtube_player.pauseVideo()
		}

		if(soundcloud_player !== undefined)
		{
			soundcloud_player.pause()
		}
	}

	else if(type === "youtube")
	{
		if(youtube_player !== undefined)
		{
			var id = utilz.get_youtube_id(src)

			if(id[0] === "video")
			{
				if(radio_started)
				{
					youtube_player.loadVideoById({videoId:id[1], startSeconds:utilz.get_youtube_time(src)})
				}

				else
				{
					youtube_player.cueVideoById({videoId:id[1], startSeconds:utilz.get_youtube_time(src)})
				}
			}

			else if(id[0] === "list")
			{
				youtube_player.loadPlaylist({list:id[1][0], index:id[1][1]})
			}

			else
			{
				return false
			}

			youtube_player.setVolume(get_nice_volume(room_state.radio_volume))
		}

		if(!room_state.radio_locked || !last_radio_source)
		{
			push_played(false, {s1:radio_title, s2:src})
		}

		if(soundcloud_player !== undefined)
		{
			soundcloud_player.pause()
		}

		$('#audio').attr('src', '')
	}

	else if(type === "soundcloud")
	{
		if(soundcloud_player !== undefined)
		{
			soundcloud_player.load(src,
			{
				auto_play: false,
				single_active: false,
				show_artwork: true,
				callback: function()
				{
					if(radio_started)
					{
						soundcloud_player.play()
					}

					soundcloud_player.setVolume(get_nice_volume(room_state.radio_volume))
				}
			})
		}

		if(!room_state.radio_locked || !last_radio_source)
		{
			push_played(false, {s1:radio_title, s2:src})
		}

		if(youtube_player !== undefined)
		{
			youtube_player.pauseVideo()
		}

		$('#audio').attr('src', '')
	}

	loaded_radio_source = src
	loaded_radio_type = type
	loaded_radio_metadata = radio_metadata

	if(loaded_radio_type === "radio")
	{
		get_radio_metadata()
	}
}

function stop_videos()
{
	if(youtube_video_player !== undefined)
	{
		youtube_video_player.pauseVideo()
	}

	if(twitch_video_player !== undefined)
	{
		twitch_video_player.pause()
	}

	if(soundcloud_video_player !== undefined)
	{
		soundcloud_video_player.pause()
	}

	$("#media_video")[0].pause()

	$("#media_iframe_video").attr("src", "")
}

function play_video()
{
	if(!tv_visible)
	{
		return false
	}

	if(tv_type === "youtube")
	{
		if(youtube_video_player !== undefined)
		{
			youtube_video_player.playVideo()
		}
	}

	else if(tv_type === "twitch")
	{
		if(twitch_video_player !== undefined)
		{
			twitch_video_player.play()
		}
	}

	else if(tv_type === "soundcloud")
	{
		if(soundcloud_video_player !== undefined)
		{
			soundcloud_video_player.play()
		}
	}

	else if(tv_type === "url")
	{
		$("#media_video")[0].play()
	}

	else if(tv_type === "iframe")
	{
		$("#media_iframe_video").attr("src", tv_source)
	}
}

function hide_videos(show)
{
	$(".media_video_container").each(function()
	{
		if($(this).attr("id") === show)
		{
			$(this).css("display", "flex")
		}

		else
		{
			$(this).css("display", "none")
		}
	})
}

function show_youtube_video(src, play=true)
{
	before_show_video()
	
	hide_videos("media_youtube_video_container")

	var id = utilz.get_youtube_id(src)

	youtube_video_play_on_queue = play

	if(id[0] === "video")
	{
		youtube_video_player.cueVideoById({videoId:id[1], startSeconds:utilz.get_youtube_time(src)})
	}

	else if(id[0] === "list")
	{
		youtube_video_player.cuePlaylist({list:id[1][0], index:id[1][1]})
	}

	else
	{
		return false
	}

	after_show_video()
}

function show_twitch_video(src, play=true)
{
	before_show_video()

	hide_videos("media_twitch_video_container")

	var id = utilz.get_twitch_id(src)

	if(id[0] === "video")
	{
		twitch_video_player.setVideoSource(src)
	}

	else if(id[0] === "channel")
	{
		twitch_video_player.setChannel(id[1])
	}

	else
	{
		return false
	}

	if(play)
	{
		twitch_video_player.play()
	}

	else
	{
		twitch_video_player.pause()
	}

	after_show_video()
}

function show_soundcloud_video(src, play=true)
{
	before_show_video()

	hide_videos("media_soundcloud_video_container")

	soundcloud_video_player.load(src,
	{
		auto_play: false,
		single_active: false,
		show_artwork: true,
		callback: function()
		{
			if(play)
			{
				soundcloud_video_player.play()
			}
		}
	})

	after_show_video()
}

function show_video(src, play=true)
{
	before_show_video()

	hide_videos("media_video_container")

	var split = src.split('.')

	if(split[split.length - 1] === "m3u8")
	{
		start_hls()
		hls.loadSource(src)
		hls.attachMedia($("#media_video")[0])
	}

	else
	{
		$("#media_video").prop("src", src)
	}

	if(play)
	{
		$("#media_video")[0].play()
	}

	after_show_video()
}

function show_iframe_video(src, play=true)
{
	before_show_video()

	hide_videos("media_iframe_video_container")

	$("#media_iframe_video").attr("src", src)

	after_show_video()
}

function before_show_video()
{
	stop_videos()
	hls = undefined
}

function after_show_video()
{
	fix_visible_video_frame()
	$("#input").focus()
}

function setup_theme_and_background(data)
{
	theme = data.theme

	if(data.background_image !== "")
	{
		background_image = data.background_image
	}

	else
	{
		background_image = default_background_image_url
	}

	background_mode = data.background_mode
	background_tile_dimensions = data.background_tile_dimensions
	text_color_mode = data.text_color_mode
	text_color = data.text_color
}

function set_background(bg)
{
	background_image = bg
	apply_background()
	config_admin_background_image()
}

function apply_background()
{
	if(background_mode === "mirror")
	{
		var bg_image = image_source
	}

	else
	{
		var bg_image = background_image
	}

	if(background_image_enabled())
	{
		$('.background_image').css('background-image', `url('${bg_image}')`)
	}

	else
	{
		$('.background_image').css('background-image', "none")
	}

	if(background_mode === "normal" || background_mode === "mirror")
	{
		$('.background_image').each(function()
		{
			$(this).removeClass("background_image_tiled")
		})
	}

	else if(background_mode === "tiled")
	{
		$('.background_image').each(function()
		{
			$(this).addClass("background_image_tiled")
		})
	}

	var css = `
	<style class='appended_background_style'>

	.background_image_tiled
	{
		background-size: ${background_tile_dimensions} !important;
		background-repeat: repeat !important;
	}

	</style>
	`

	$(".appended_background_style").each(function()
	{
		$(this).remove()
	})

	$("head").append(css)
}

function set_theme(color)
{
	theme = color
	apply_theme()
	config_admin_theme()
}

function apply_theme()
{
	var background_color = theme

	var background_color_2 = colorlib.get_lighter_or_darker(background_color, color_contrast_amount_1)

	if(text_color_mode === "custom")
	{
		var font_color = text_color
	}

	else
	{
		var font_color = colorlib.get_lighter_or_darker(background_color, color_contrast_amount_2)
	}

	var background_color_a = colorlib.rgb_to_rgba(background_color, opacity_amount_1)
	var background_color_a_2 = colorlib.rgb_to_rgba(background_color_2, opacity_amount_3)

	if(background_image_enabled())
	{
		$('.bg1').css('background-color', background_color_a)
	}

	else
	{
		$('.bg1').css('background-color', background_color)
	}

	$('.bg1').css('color', font_color)
	$('.bg2').css('background-color', background_color_2)
	$('.bg2').css('color', font_color)

	var color_3 = colorlib.get_lighter_or_darker(background_color, color_contrast_amount_3)

	var overlay_color = colorlib.rgb_to_rgba(color_3, opacity_amount_2)

	var css = `
	<style class='appended_theme_style'>

	.Msg-overlay
	{
		background-color: ${overlay_color} !important;
		color: ${background_color} !important;
	}

	.Msg-window, .overlay_same_color
	{
		background-color: ${background_color} !important;
		color: ${font_color} !important;
	}

	.Msg-window-inner-x:hover
	{
		background-color: ${background_color_2} !important;
	}

	.custom_titlebar
	{
		background-color: ${background_color_2} !important;
		color: ${font_color} !important;
	}

	.titlebar_inner_x
	{
		background-color: ${background_color_2} !important;
	}

	.titlebar_inner_x:hover
	{
		background-color: ${background_color} !important;
	}

	.custom_popup
	{
		border: 1px solid ${font_color} !important;
	}

	.nicescroll-cursors
	{
		background-color: ${font_color} !important;
	}

	.modal_select
	{
		color: ${background_color} !important;
		background-color: ${font_color} !important;
		border: 1px solid ${background_color_2} !important;
	}

	#reactions_box
	{
		background-color: ${background_color_2} !important;
		color: ${font_color} !important;
	}

	.highlighted
	{
		background-color: ${background_color_2} !important;
		color: ${font_color} !important;
	}

	.nstSlider
	{
		background-color: ${background_color_2} !important;
		color: ${font_color} !important;
	}

	.squaro
	{
		background-color: ${background_color_2} !important;
		color: ${font_color} !important;
	}

	.scroller 
	{
		background-color: ${background_color_a_2} !important;
		color: ${font_color} !important;
	}

	#topbox_container
	{
		color: ${font_color} !important;
	}

	#topbox
	{
		background-color: ${background_color_2} !important;
	}

	.draw_canvas
	{
		background-color: ${background_color_a_2} !important;
		color: ${font_color} !important;
	}

	.modal_icon_selected
	{
		background-color: ${background_color_a_2} !important;
		color: ${font_color} !important;
	}

	.settings_window_left
	{
		background-color: ${background_color_2} !important;
		color: ${font_color} !important;
	}

	.maxer 
	{
		color: ${font_color} !important;
	}

	</style>
	`

	$(".appended_theme_style").each(function()
	{
		$(this).remove()
	})

	$("head").append(css)
}

function userjoin(data)
{
	clear_from_users_to_disconnect(data)

	var added = addto_userlist(data.user_id, data.username, data.role, data.profile_image)

	if(added)
	{
		if(get_setting("show_joins") && check_permission(data.role, "chat"))
		{
			chat_announce(
			{
				brk: "<i class='icon2c fa fa-user-plus'></i>",
				message: `${data.username} has joined`,
				save: true,
				username: data.username,
				open_profile: true
			})

			if(data.username !== username)
			{
				alert_title()
				sound_notify("join")
			}
		}
	}
}

function update_usercount(usercount)
{
	var s = `${singular_or_plural(usercount, "Users")} Online`

	$('#usercount').html(s)

	msg_userlist.set_title(s)
}

function addto_userlist(id, uname, rol, pi)
{
	for(var i=0; i<userlist.length; i++)
	{
		if(userlist[i].username === uname)
		{
			userlist[i].user_id = id
			userlist[i].username = uname
			userlist[i].role = rol
			userlist[i].profile_image = pi

			update_userlist()

			return false
		}
	}

	userlist.push({user_id: id, username:uname, role:rol, profile_image:pi})

	update_userlist()

	return true
}

function removefrom_userlist(uname)
{
	for(var i=0; i<userlist.length; i++)
	{
		if(userlist[i].username === uname)
		{
			userlist.splice(i, 1)
			update_userlist()
			break
		}
	}
}

function replace_uname_in_userlist(oldu, newu)
{
	for(var i=0; i<userlist.length; i++)
	{
		if(userlist[i].username === oldu)
		{
			userlist[i].username = newu
			break
		}
	}

	update_userlist()
	update_voice_chat_userlist()
}

function replace_role_in_userlist(uname, rol)
{
	for(var i=0; i<userlist.length; i++)
	{
		if(userlist[i].username === uname)
		{
			userlist[i].role = rol
			break
		}
	}

	update_userlist()
}

function get_role(uname)
{
	for(var i=0; i<userlist.length; i++)
	{
		if(userlist[i].username === uname)
		{
			return userlist[i].role
		}
	}
}

function remove_roles_in_userlist()
{
	for(var i=0; i<userlist.length; i++)
	{
		userlist[i].role = 'z'
	}

	update_userlist()
}

function reset_voices_userlist()
{
	for(var i=0; i<userlist.length; i++)
	{
		if(userlist[i].role.startsWith('voice') && userlist[i].role !== 'voice1')
		{
			userlist[i].role = 'voice1'
		}
	}

	update_userlist()
}

function remove_ops_userlist()
{
	for(var i=0; i<userlist.length; i++)
	{
		if(userlist[i].role === 'op')
		{
			userlist[i].role = 'z'
		}
	}

	update_userlist()
}

function role_tag(p)
{
	if(p === 'admin')
	{
		var s = '[A]'
	}

	else if(p === 'op')
	{
		var s = '[O]'
	}

	else if(p === 'voice1')
	{
		var s = '[V1]'
	}

	else if(p === 'voice2')
	{
		var s = '[V2]'
	}

	else if(p === 'voice3')
	{
		var s = '[V3]'
	}

	else if(p === 'voice4')
	{
		var s = '[V4]'
	}

	else
	{
		var s = ''
	}

	return s
}

function get_user_by_username(uname)
{
	for(var user of userlist)
	{
		if(user.username === uname)
		{
			return user
		}
	}

	return false
}

function get_user_by_id(id)
{
	for(var user of userlist)
	{
		if(user.user_id === id)
		{
			return user
		}
	}

	return false
}

function start_userlist_click_events()
{
	$("#userlist").on("click", ".ui_item_uname", function()
	{
		var uname = $(this).text()
		show_profile(uname)
	})
}

function update_userlist()
{
	var s = $()

	s = s.add()

	userlist.sort(compare_userlist)

	usernames = []

	for(var i=0; i<userlist.length; i++)
	{
		var item = userlist[i]

		usernames.push(item.username)

		var h = $("<div class='userlist_item'><span class='ui_item_role'></span><span class='ui_item_uname action'></span></div>")

		var p = role_tag(item.role)

		var pel = h.find('.ui_item_role').eq(0)

		pel.text(p)

		if(p === "")
		{
			pel.css("padding-right", 0)
		}

		h.find('.ui_item_uname').eq(0).text(item.username)

		s = s.add(h)
	}

	update_usercount(userlist.length)

	$('#userlist').html(s)

	if(userlist_filtered)
	{
		do_userlist_filter()
	}

	update_modal_scrollbar("userlist")
}

function compare_userlist(a, b)
{
	if(a.role === '')
	{
		a.role = 'z'
	}

	if(b.role === '')
	{
		b.role = 'z'
	}

	if(a.role.startsWith('voice') && b.role.startsWith('voice'))
	{
		if(a.role < b.role)
		{
			return 1
		}

		else if(a.role > b.role)
		{
			return -1
		}

		if(a.username > b.username)
		{
			return -1
		}

		else if(a.username < b.username)
		{
			return 1
		}

		else
		{
			return 0
		}
	}

	else
	{
		if(a.role > b.role)
		{
			return 1
		}

		else if(a.role < b.role)
		{
			return -1
		}

		if(a.username < b.username)
		{
			return -1
		}

		else if(a.username > b.username)
		{
			return 1
		}

		else
		{
			return 0
		}
	}
}

function start_username_context_menu()
{
	$.contextMenu(
	{
		selector: ".ui_item_uname, .chat_uname, #show_profile_uname, .generic_uname",
		animation: {duration: 250, hide: 'fadeOut'},
		zIndex: 9000000000,
		items:
		{
			cmvoice1:
			{
				name: "Voice 1", callback: function(key, opt)
				{
					var arg = $(this).text()
					change_role(arg, "voice1")
				},
				visible: function(key, opt)
				{
					if(!is_admin_or_op(role))
					{
						return false
					}

					else
					{
						return true
					}
				}
			},
			cmvoice2:
			{
				name: "Voice 2", callback: function(key, opt)
				{
					var arg = $(this).text()
					change_role(arg, "voice2")
				},
				visible: function(key, opt)
				{
					if(!is_admin_or_op(role))
					{
						return false
					}

					else
					{
						return true
					}
				}
			},
			cmvoice3:
			{
				name: "Voice 3", callback: function(key, opt)
				{
					var arg = $(this).text()
					change_role(arg, "voice3")
				},
				visible: function(key, opt)
				{
					if(!is_admin_or_op(role))
					{
						return false
					}

					else
					{
						return true
					}
				}
			},
			cmvoice4:
			{
				name: "Voice 4", callback: function(key, opt)
				{
					var arg = $(this).text()
					change_role(arg, "voice4")
				},
				visible: function(key, opt)
				{
					if(!is_admin_or_op(role))
					{
						return false
					}

					else
					{
						return true
					}
				}
			},
			cmop:
			{
				name: "Op",
				visible: function(key, opt)
				{
					if(role !== 'admin')
					{
						return false
					}

					else
					{
						return true
					}
				},
				items:
				{
					opsure:
					{
						name: "I'm Sure", callback: function(key, opt)
						{
							var arg = $(this).text()
							change_role(arg, "op")
						}
					}
				}
			},
			cmadmin:
			{
				name: "Admin",
				visible: function(key, opt)
				{
					if(role !== 'admin')
					{
						return false
					}

					else
					{
						return true
					}
				},
				items:
				{
					adminsure:
					{
						name: "I'm Sure", callback: function(key, opt)
						{
							var arg = $(this).text()
							change_role(arg, "admin")
						}
					}
				}
			},
			cmkick:
			{
				name: "Kick",
				visible: function(key, opt)
				{
					if(!is_admin_or_op(role))
					{
						return false
					}

					else
					{
						return true
					}
				},
				items:
				{
					kicksure:
					{
						name: "I'm Sure", callback: function(key, opt)
						{
							var arg = $(this).text()
							kick(arg)
						}
					}
				}
			},
			cmban:
			{
				name: "Ban",
				visible: function(key, opt)
				{
					if(!is_admin_or_op(role))
					{
						return false
					}

					else
					{
						return true
					}
				},
				items:
				{
					bansure:
					{
						name: "I'm Sure", callback: function(key, opt)
						{
							var arg = $(this).text()
							ban(arg)
						}
					}
				}
			}
		}
	})
}

function start_played_context_menu()
{
	$.contextMenu(
	{
		selector: ".played_item_inner, #header_now_playing_controls",
		animation: {duration: 250, hide: 'fadeOut'},
		zIndex: 9000000000,
		items:
		{
			cmenu1:
			{
				name: "Search on Google", callback: function(key, opt)
				{
					search_on('google', this.data('q'))
				}
			},
			cmenu2:
			{
				name: "Search on SoundCloud", callback: function(key, opt)
				{
					search_on('soundcloud', this.data('q'))
				}
			},
			cmenu3:
			{
				name: "Search on YouTube", callback: function(key, opt)
				{
					search_on('youtube', this.data('q'))
				}
			}
		}
	})
}

function start_volume_context_menu()
{
	$.contextMenu(
	{
		selector: "#header_radio_volume_controls",
		animation: {duration: 250, hide: 'fadeOut'},
		zIndex: 9000000000,
		className: 'volume_context',
		items:
		{
			vcm100:
			{
				name: "100%", callback: function(key, opt)
				{
					set_radio_volume(1)
				}
			},
			vcm90:
			{
				name: "90%", callback: function(key, opt)
				{
					set_radio_volume(0.9)
				}
			},
			vcm80:
			{
				name: "80%", callback: function(key, opt)
				{
					set_radio_volume(0.8)
				}
			},
			vcm70:
			{
				name: "70%", callback: function(key, opt)
				{
					set_radio_volume(0.7)
				}
			},
			vcm60:
			{
				name: "60%", callback: function(key, opt)
				{
					set_radio_volume(0.6)
				}
			},
			vcm50:
			{
				name: "50%", callback: function(key, opt)
				{
					set_radio_volume(0.5)
				}
			},
			vcm40:
			{
				name: "40%", callback: function(key, opt)
				{
					set_radio_volume(0.4)
				}
			},
			vcm30:
			{
				name: "30%", callback: function(key, opt)
				{
					set_radio_volume(0.3)
				}
			},
			vcm20:
			{
				name: "20%", callback: function(key, opt)
				{
					set_radio_volume(0.2)
				}
			},
			vcm10:
			{
				name: "10%", callback: function(key, opt)
				{
					set_radio_volume(0.1)
				}
			},
			vcm0:
			{
				name: "0%", callback: function(key, opt)
				{
					set_radio_volume(0)
				}
			}
		}
	})
}

function start_toggle_radio_context_menu()
{
	$.contextMenu(
	{
		selector: "#toggle_radio_state",
		animation: {duration: 250, hide: 'fadeOut'},
		zIndex: 9000000000,
		className: 'toggle_radio_context',
		items:
		{
			trs0:
			{
				name: "Don't Stop Automatically", callback: function(key, opt)
				{
					clear_automatic_stop_radio()
				},
				visible: function(key, opt)
				{
					return stop_radio_delay > 0
				}			
			},
			trs1:
			{
				name: "Stop in 1 Minute", callback: function(key, opt)
				{
					stop_radio_in(1)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay !== 1
				}
			},
			trs1b:
			{
				name: "Stop in 1 Minute (*)", callback: function(key, opt)
				{
					stop_radio_in(1)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay === 1
				}			
			},
			trs2:
			{
				name: "Stop in 5 Minutes", callback: function(key, opt)
				{
					stop_radio_in(5)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay !== 5
				}
			},
			trs2b:
			{
				name: "Stop in 5 Minutes (*)", callback: function(key, opt)
				{
					stop_radio_in(5)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay === 5
				}
			},
			trs3:
			{
				name: "Stop in 10 Minutes", callback: function(key, opt)
				{
					stop_radio_in(10)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay !== 10
				}
			},
			trs3b:
			{
				name: "Stop in 10 Minutes (*)", callback: function(key, opt)
				{
					stop_radio_in(10)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay === 10
				}
			},
			trs4:
			{
				name: "Stop in 30 Minutes", callback: function(key, opt)
				{
					stop_radio_in(30)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay !== 30
				}
			},
			trs4b:
			{
				name: "Stop in 30 Minutes (*)", callback: function(key, opt)
				{
					stop_radio_in(30)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay === 30
				}
			},
			trs5:
			{
				name: "Stop in 60 Minutes", callback: function(key, opt)
				{
					stop_radio_in(60)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay !== 60
				}
			},
			trs5b:
			{
				name: "Stop in 60 Minutes (*)", callback: function(key, opt)
				{
					stop_radio_in(60)
				},
				visible: function(key, opt)
				{
					return radio_started && stop_radio_delay === 60
				}
			},
			trrestart:
			{
				name: "Restart", callback: function(key, opt)
				{
					refresh_radio()
				},
				visible: function(key, opt)
				{
					return radio_started
				}
			},
		}
	})
}

function start_main_menu_context_menu()
{
	$.contextMenu(
	{
		selector: "#main_menu",
		animation: {duration: 250, hide: 'fadeOut'},
		zIndex: 9000000000,
		className: 'toggle_radio_context',
		items:
		{
			mm0:
			{
				name: "About", callback: function(key, opt)
				{
					show_credits()
				}			
			}
		}
	})
}

function singular_or_plural(n, s)
{
	if(n === 1)
	{
		var ss = `${n} ${s.substring(0, s.length - 1)}`
	}

	else
	{
		var ss = `${n} ${s}`
	}

	return ss
}

function request_roomlist(filter="", type="public_roomlist")
{
	if(requesting_roomlist)
	{
		return false
	}

	requesting_roomlist = true

	window[`${type}_filter_string`] = filter

	socket_emit("roomlist", {type:type})

	setTimeout(function()
	{
		requesting_roomlist = false
	}, 1000)
}

function start_roomlist_click_events()
{
	$("#public_roomlist_container").on("click", ".roomlist_item_inner", function()
	{
		show_open_room($(this).data("room_id"))
	})

	$("#visited_roomlist_container").on("click", ".roomlist_item_inner", function()
	{
		show_open_room($(this).data("room_id"))
	})
}

function update_roomlist(type, roomlist)
{
	$(`#${type}_filter`).val(window[`${type}_filter_string`])

	var s = $()

	s = s.add()

	for(var i=0; i<roomlist.length; i++)
	{
		var c =
		`<div class='roomlist_item_inner pointer inline action' data-room_id='${roomlist[i].id}'>
			<div class='roomlist_name'></div><div class='roomlist_topic'></div>
			<div class='roomlist_here'></div><div class='roomlist_count'></div>
		</div>`

		var h = $(`<div class='roomlist_item'>${c}</div>`)

		h.find('.roomlist_name').eq(0).text(roomlist[i].name)

		h.find('.roomlist_count').eq(0).text(singular_or_plural(roomlist[i].usercount, "users"))

		if(roomlist[i].id === room_id)
		{
			h.find('.roomlist_here').eq(0).text("You are here").css("display", "block")
		}

		if(roomlist[i].topic.length > 0)
		{
			var topic = roomlist[i].topic
		}

		else
		{
			var topic = 'No topic set'
		}

		h.find('.roomlist_topic').eq(0).text(topic)

		s = s.add(h)
	}

	$(`#${type}_container`).html(s)

	if(window[`${type}_filter_string`] !== "")
	{
		do_roomlist_filter(type)
	}

	update_modal_scrollbar(type)
}

function setup_main_menu()
{
	setup_togglers("main_menu")

	$(".admin_voice_permissions_checkbox").each(function()
	{
		$(this).change(function()
		{
			var what = $(this).prop("checked")

			change_voice_permission($(this).data("ptype"), what)
		})
	})

	$('#admin_enable_images').change(function()
	{
		var what = $('#admin_enable_images option:selected').val()

		change_room_images_mode(what)
	})

	$('#admin_enable_tv').change(function()
	{
		var what = $('#admin_enable_tv option:selected').val()

		change_room_tv_mode(what)
	})

	$('#admin_enable_radio').change(function()
	{
		var what = $('#admin_enable_radio option:selected').val()

		change_room_radio_mode(what)
	})

	$('#admin_enable_voice_chat').change(function()
	{
		var what = $('#admin_enable_voice_chat option:selected').val()

		change_room_voice_chat_mode(what)
	})

	$('#admin_privacy').change(function()
	{
		var what = JSON.parse($('#admin_privacy option:selected').val())

		change_privacy(what)
	})

	$('#admin_log').change(function()
	{
		var what = JSON.parse($('#admin_log option:selected').val())

		change_log(what)
	})

	$("#admin_theme").spectrum(
	{
		preferredFormat: "rgb",
		color: "#B5599A",
		appendTo: "#admin_menu",
		showInput: true
	})

	$("#admin_theme").on('hide.spectrum', function(e, t)
	{
		change_theme(t.toRgbString())
	})

	$('#admin_background_mode_select').change(function()
	{
		var what = $('#admin_background_mode_select option:selected').val()

		change_background_mode(what)
	})

	$("#admin_background_tile_dimensions").blur(function()
	{
		var what = utilz.clean_string2($(this).val())

		if(what === "")
		{
			$("#admin_background_tile_dimensions").val(background_tile_dimensions)
			return false
		}

		change_background_tile_dimensions(what)
	})

	$('#admin_text_color_mode_select').change(function()
	{
		var what = $('#admin_text_color_mode_select option:selected').val()

		change_text_color_mode(what)
	})

	$("#admin_text_color").spectrum(
	{
		preferredFormat: "rgb",
		color: "#B5599A",
		appendTo: "#admin_menu",
		showInput: true
	})

	$("#admin_text_color").on('hide.spectrum', function(e, t)
	{
		change_text_color(t.toRgbString())
	})

	$('#admin_room_name').blur(function()
	{
		var name = utilz.clean_string2($(this).val())

		if(name === "")
		{
			$("#admin_room_name").val(room_name)
			return false
		}

		if(name !== room_name)
		{
			change_room_name(name)
		}
	})

	$('#admin_topic').blur(function()
	{
		var t = utilz.clean_string2($(this).val())

		if(t === "")
		{
			$("#admin_topic").val(topic)
			return false
		}

		if(t !== topic)
		{
			change_topic(t)
		}
	})
}

function show_main_menu()
{
	msg_main_menu.show()
}

function config_admin_permission_checkboxes()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$(".admin_voice_permissions_checkbox").each(function()
	{
		$(this).prop("checked", window[$(this).data("ptype")])
	})
}

function config_admin_background_mode()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_background_mode_select').find('option').each(function()
	{
		if($(this).val() === background_mode)
		{
			$(this).prop('selected', true)
		}
	})

	if(background_mode === "normal")
	{
		$("#admin_background_tile_dimensions_container").css("display", "none")
		$("#admin_background_image_container").css("display", "block")
	}

	else if(background_mode === "tiled")
	{
		$("#admin_background_tile_dimensions_container").css("display", "block")
		$("#admin_background_image_container").css("display", "block")
	}

	else if(background_mode === "mirror")
	{
		$("#admin_background_tile_dimensions_container").css("display", "none")
		$("#admin_background_image_container").css("display", "none")
	}

	else if(background_mode === "solid")
	{
		$("#admin_background_tile_dimensions_container").css("display", "none")
		$("#admin_background_image_container").css("display", "none")
	}
}

function config_admin_background_tile_dimensions()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_background_tile_dimensions').val(background_tile_dimensions)
}

function config_admin_background_image()
{
	if(!is_admin_or_op())
	{
		return false
	}

	if(background_image !== $("#admin_background_image").attr('src'))
	{
		if(background_image !== "")
		{
			$("#admin_background_image").attr("src", background_image)
		}

		else
		{
			$("#admin_background_image").attr("src", default_background_image_url)
		}
	}
}

function config_admin_text_color_mode()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_text_color_mode_select').find('option').each(function()
	{
		if($(this).val() === text_color_mode)
		{
			$(this).prop('selected', true)
		}
	})

	if(text_color_mode === "custom")
	{
		$("#admin_text_color_container").css("display", "block")
	}

	else
	{
		$("#admin_text_color_container").css("display", "none")
	}
}

function config_admin_text_color()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$("#admin_text_color").spectrum("set", text_color)
}

function config_admin_privacy()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_privacy').find('option').each(function()
	{
		if(JSON.parse($(this).val()) === is_public)
		{
			$(this).prop('selected', true)
		}
	})
}

function config_admin_log_enabled()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_log').find('option').each(function()
	{
		if(JSON.parse($(this).val()) === log_enabled)
		{
			$(this).prop('selected', true)
		}
	})
}

function config_admin_room_images_mode()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_enable_images').find('option').each(function()
	{
		if($(this).val() === room_images_mode)
		{
			$(this).prop('selected', true)
		}
	})
}

function config_admin_room_tv_mode()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_enable_tv').find('option').each(function()
	{
		if($(this).val() === room_tv_mode)
		{
			$(this).prop('selected', true)
		}
	})
}

function config_admin_room_radio_mode()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_enable_radio').find('option').each(function()
	{
		if($(this).val() === room_radio_mode)
		{
			$(this).prop('selected', true)
		}
	})
}

function config_admin_room_voice_chat_mode()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$('#admin_enable_voice_chat').find('option').each(function()
	{
		if($(this).val() === room_voice_chat_mode)
		{
			$(this).prop('selected', true)
		}
	})
}

function config_admin_theme()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$("#admin_theme").spectrum("set", theme)
}

function config_admin_room_name()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$("#admin_room_name").val(room_name)
}

function config_admin_topic()
{
	if(!is_admin_or_op())
	{
		return false
	}

	$("#admin_topic").val(topic)
}

function config_main_menu()
{
	if(is_admin_or_op())
	{
		config_admin_permission_checkboxes()
		config_admin_room_images_mode()
		config_admin_room_tv_mode()
		config_admin_room_radio_mode()
		config_admin_room_voice_chat_mode()
		config_admin_privacy()
		config_admin_log_enabled()
		config_admin_theme()
		config_admin_background_mode()
		config_admin_background_tile_dimensions()
		config_admin_background_image()
		config_admin_text_color_mode()
		config_admin_text_color()
		config_admin_room_name()
		config_admin_topic()

		$("#admin_menu").css("display", "block")
	}

	else
	{
		$("#admin_menu").css("display", "none")
	}

	update_modal_scrollbar("main_menu")
}

function show_create_room()
{
	msg_info2.show(["Create Room", template_create_room()], function()
	{
		$("#create_room_name").focus()

		$('#create_room_done').on("click", function()
		{
			create_room_submit()
		})

		crm = true
	})
}

function create_room_submit()
{
	var data = {}

	data.name = utilz.clean_string2($('#create_room_name').val().substring(0, max_room_name_length))

	if(data.name === "")
	{
		return false
	}

	data.public = JSON.parse($('#create_room_public option:selected').val())

	create_room(data)
}

function show_open_room(id)
{
	if(id === main_room_id)
	{
		id = "/"
	}

	msg_info2.show(["Open Room", template_open_room({id:id})], function()
	{
		orb = true
	})
}

function show_userlist(filter=false)
{
	msg_userlist.show(function()
	{
		if(filter)
		{
			$("#userlist_filter").val(filter)
			do_userlist_filter()
		}

		$("#userlist_filter").focus()
	})
}

function reset_userlist_filter()
{
	$("#userlist_filter").val("")
	do_userlist_filter()
}

function show_public_roomlist()
{
	msg_public_roomlist.show(function()
	{
		$("#public_roomlist_filter").focus()
	})
}

function show_visited_roomlist()
{
	msg_visited_roomlist.show(function()
	{
		$("#visited_roomlist_filter").focus()
	})
}

function show_played(filter=false)
{
	msg_played.show(function()
	{
		if(filter)
		{
			$("#played_filter").val(filter)
			do_played_filter()
		}

		$("#played_filter").focus()
	})
}

function start_dropzone()
{
	dropzone = new Dropzone("body",
	{
		url: "/",
		maxFiles: 1,
		maxFilesize: max_image_size / 1024,
		autoProcessQueue: false,
		clickable: '#image_file_picker',
		acceptedFiles: "image/jpeg,image/png,image/gif"
	})

	dropzone.on("addedfile", function(file)
	{
		focus_input()

		if(!can_images)
		{
			feedback("You don't have permission to upload images")
			dropzone.files = []
			return false
		}

		if(dropzone.files.length > 1)
		{
			dropzone.files = []
			return false
		}

		var size = file.size / 1024

		if(size > max_image_size)
		{
			dropzone.files = []
			feedback("File is too big")
			return false
		}

		var name = file.name

		var ext = name.split('.').pop(-1).toLowerCase()

		if(ext !== 'jpg' && ext !== 'png' && ext !== 'jpeg' && ext !== 'gif')
		{
			dropzone.files = []
			return false
		}

		dropzone.files = []

		upload_file(file, "image_upload")
	})
}

function create_file_reader(file)
{
	var reader = new FileReader()

	reader.addEventListener("loadend", function(e)
	{
		socket_emit('slice_upload',
		{
			action: file.action,
			name: file.name,
			type: file.type,
			size: file.size,
			data: reader.result,
			date: file.date
		})
	})

	return reader
}

function upload_file(file, action)
{
	if(action === "background_image_upload")
	{
		for(var d in files)
		{
			var f = files[d]

			if(f.action === "background_image_upload")
			{
				cancel_file_upload(d, false)
			}
		}
	}

	var date = Date.now()

	file.date = date

	file.action = action

	if(file.name !== undefined)
	{
		file.name = utilz.clean_string5(file.name).replace(/.gifv/g, ".gif")
	}

	else
	{
		file.name = "no_name"
	}

	file.reader = create_file_reader(file)

	var slice = file.slice(0, upload_slice_size)

	files[date] = file

	file.next = get_file_next(file)

	if(file.next >= 100)
	{
		file.sending_last_slice = true
	}

	else
	{
		file.sending_last_slice = false
	}

	file.percentage = 0

	var obj =
	{
		brk: '*',
		message: `Uploading ${get_file_action_name(file.action)}: 0%`,
		id: `uploading_${date}`,
		title: `Size: ${get_size_string(file.size / 1024)} | ${nice_date()}`
	}

	if(!file.sending_last_slice)
	{
		obj.onclick = function()
		{
			cancel_file_upload(date)
		}
	}

	chat_announce(obj)

	file.reader.readAsArrayBuffer(slice)
}

function cancel_file_upload(date, check=true)
{
	var file = files[date]

	if(!file)
	{
		return false
	}

	if(file.sending_last_slice)
	{
		return false
	}

	change_upload_status(file, "Cancelled", true)

	if(check)
	{
		if(file.action === "background_image_upload")
		{
			config_admin_background_image()
		}
	}

	delete files[date]

	socket_emit("cancel_upload", {date:date})
}

function get_file_next(file)
{
	var next = Math.floor(((upload_slice_size * 1) / file.size) * 100)

	if(next > 100)
	{
		next = 100
	}

	return next
}

function change_upload_status(file, status, clear=false)
{
	$(`#uploading_${file.date}`)
	.find(".announcement_content")
	.eq(0).text(`Uploading ${get_file_action_name(file.action)}: ${status}`)

	if(clear)
	{
		$(`#uploading_${file.date}`)
		.find(".announcement_content_container").eq(0)
		.off("click")
		.removeClass("pointer")
		.removeClass("action")
	}
}

function get_file_action_name(action)
{
	var s = ""

	if(action === "image_upload")
	{
		s = "image"
	}

	else if(action === "profile_image_upload")
	{
		s = "profile image"
	}

	else if(action === "background_image_upload")
	{
		s = "background image"
	}

	return s
}

function is_textbox(element)
{
	var tag_name = element.tagName.toLowerCase()

	if(tag_name === 'textarea') return true
	if(tag_name !== 'input') return false

	var type = element.getAttribute('type').toLowerCase(),

	input_types =
	[
		'text',
		'password',
		'number',
		'email',
		'tel',
		'url',
		'search',
		'date',
		'datetime',
		'datetime-local',
		'time',
		'month',
		'week'
	]

	return input_types.includes(type)
}

function copypaste_events()
{
	$(document).bind('copy', function(e)
	{
		if(window.getSelection().toString() !== "")
		{
			setTimeout(function()
			{
				if(is_textbox(document.activeElement))
				{
					se = document.activeElement.selectionEnd
					document.activeElement.setSelectionRange(se, se)
				}

				else
				{
					window.getSelection().removeAllRanges()
					focus_input()
				}

			}, 200)
		}
	})
}

var double_tap_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			double_tap_key_pressed = 0
		}, double_tap_delay)
	}
})()

var double_tap_2_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			double_tap_key_2_pressed = 0
		}, double_tap_delay)
	}
})()

var double_tap_3_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			double_tap_key_3_pressed = 0
		}, double_tap_delay)
	}
})()

function reset_double_tap_keys_pressed()
{
	double_tap_key_pressed = 0
	double_tap_key_2_pressed = 0
	double_tap_key_3_pressed = 0
}

function activate_key_detection()
{
	document.addEventListener('keydown', (e) =>
	{
		if(!started)
		{
			return
		}

		if(e.key === "Tab")
		{
			e.preventDefault()
		}

		if(!e.repeat)
		{
			num_keys_pressed += 1

			if(num_keys_pressed === 1)
			{
				if(e.key === double_tap_key)
				{
					double_tap_key_pressed += 1

					if(double_tap_key_pressed === 2)
					{
						on_double_tap()
					}

					else
					{
						double_tap_timer()
					}
				}

				else if(e.key === double_tap_key_2)
				{
					double_tap_key_2_pressed += 1

					if(double_tap_key_2_pressed === 2)
					{
						on_double_tap_2()
					}

					else
					{
						double_tap_2_timer()
					}
				}

				else if(e.key === double_tap_key_3)
				{
					double_tap_key_3_pressed += 1

					if(double_tap_key_3_pressed === 2)
					{
						on_double_tap_3()
					}

					else
					{
						double_tap_3_timer()
					}
				}

				else
				{
					reset_double_tap_keys_pressed()
				}
			}

			else
			{
				reset_double_tap_keys_pressed()
			}
		}

		else
		{
			reset_double_tap_keys_pressed()
		}

		if(modal_open)
		{
			if(e.key === "Escape")
			{
				if(e.shiftKey)
				{
					close_all_modals()
					e.preventDefault()
					return
				}
			}

			if(iup)
			{
				if(msg_image_picker.is_highest())
				{
					if(e.key === "Enter")
					{
						var val = $("#image_source_picker_input").val().trim()

						if(val !== "")
						{
							link_image(val)
							msg_image_picker.close()
						}

						e.preventDefault()
					}

					return
				}
			}

			if(tup)
			{
				if(msg_tv_picker.is_highest())
				{
					if(e.key === "Enter")
					{
						var val = $("#tv_source_picker_input").val().trim()

						if(val !== "")
						{
							change_tv_source(val)
							msg_tv_picker.close()
						}

						e.preventDefault()
					}

					return
				}
			}

			if(rup)
			{
				if(msg_radio_picker.is_highest())
				{
					if(e.key === "Enter")
					{
						var val = $("#radio_source_picker_input").val().trim()

						if(val !== "")
						{
							change_radio_source(val)
							msg_radio_picker.close()
						}

						e.preventDefault()
					}

					return
				}
			}

			if(orb)
			{
				if(msg_info2.is_highest())
				{
					if(e.key === "Enter")
					{
						if(e.shiftKey)
						{
							$("#open_room_here").trigger("click")
						}

						else
						{
							$("#open_room_new_tab").trigger("click")
						}

						e.preventDefault()
					}

					return
				}
			}

			if(crm)
			{
				if(msg_info2.is_highest())
				{
					if(e.key === "Enter")
					{
						create_room_submit()
						e.preventDefault()
					}

					return
				}
			}

			if(imp)
			{
				if(msg_info2.is_highest())
				{
					if(e.key === "Enter")
					{
						process_imported_settings()
						e.preventDefault()
					}

					return
				}
			}

			if(gtr)
			{
				if(msg_info2.is_highest())
				{
					if(e.key === "Enter")
					{
						goto_room_action()
						e.preventDefault()
					}

					return
				}
			}

			if(writing_message)
			{
				if(msg_message.is_highest())
				{
					if(e.key === "Enter")
					{
						send_popup_message()
						e.preventDefault()
					}

					return
				}
			}

			if(modal_image_open)
			{
				if(msg_modal_image.is_highest())
				{
					if(e.key === "ArrowLeft")
					{
						modal_image_prev_click()
						e.preventDefault()
					}

					else if(e.key === "ArrowRight")
					{
						modal_image_next_click()
						e.preventDefault()
					}

					else if(e.key === "ArrowUp")
					{
						modal_image_next_click()
						e.preventDefault()
					}

					else if(e.key === "ArrowDown")
					{
						modal_image_prev_click()
						e.preventDefault()
					}

					if(e.key === "Enter")
					{
						show_image_history()
						e.preventDefault()
					}

					if(e.key === " ")
					{
						show_modal_image_number()
						e.preventDefault()
					}

					return
				}
			}

			if(draw_image_open)
			{
				if(e.key === " ")
				{
					draw_image_change_mode()
				}

				if(e.key === "z")
				{
					if(e.ctrlKey)
					{
						draw_image_undo()
					}
				}

				if(e.key === "y")
				{
					if(e.ctrlKey)
					{
						draw_image_redo()
					}
				}
			}

			if(minpo)
			{
				if(e.key === "Enter")
				{
					modal_image_number_go()
				}
			}

			return
		}

		if(e.ctrlKey)
		{
			if(window.getSelection().toString() !== "")
			{
				return
			}
		}

		focus_input()

		if(e.key === "Enter")
		{
			if($("#input").val().length === 0)
			{
				goto_bottom(true)
			}

			else
			{
				process_message($('#input').val())
			}

			e.preventDefault()
			return
		}

		else if(e.key === "ArrowUp")
		{
			if(e.shiftKey)
			{
				scroll_up(small_keyboard_scroll)
			}

			else if(e.ctrlKey)
			{
				activity_above()
			}

			else
			{
				input_history_change("up")
			}

			e.preventDefault()
			return
		}

		else if(e.key === "ArrowDown")
		{
			if(e.shiftKey)
			{
				scroll_down(small_keyboard_scroll)
			}

			else if(e.ctrlKey)
			{
				activity_below()
			}

			else
			{
				input_history_change("down")
			}

			e.preventDefault()
			return
		}

		else if(e.key === "PageUp")
		{
			if(e.shiftKey)
			{
				goto_top()
			}

			else
			{
				scroll_up(big_keyboard_scroll)
			}

			e.preventDefault()
			return
		}

		else if(e.key === "PageDown")
		{
			if(e.shiftKey)
			{
				goto_bottom(true)
			}

			else
			{
				scroll_down(big_keyboard_scroll)
			}

			e.preventDefault()
			return
		}

		else if(e.key === "Escape")
		{
			if(!e.shiftKey)
			{
				clear_input()
				reset_input_history_index()
				e.preventDefault()
				hide_reactions()
				return
			}
		}
	})

	document.addEventListener('keyup', (e) =>
	{
		if(!started)
		{
			return
		}

		if(!e.repeat)
		{
			num_keys_pressed -= 1

			if(num_keys_pressed < 0)
			{
				num_keys_pressed = 0
			}
		}
	})
}

function scroll_up(n)
{
	scroll_chat_to($('#chat_area').scrollTop() - n, false)
}

function scroll_down(n)
{
	var $ch = $('#chat_area')
	var max = $ch.prop('scrollHeight') - $ch.innerHeight()

	if(max - $ch.scrollTop < n)
	{
		scroll_chat_to(max + 10)
	}

	else
	{
		scroll_chat_to($ch.scrollTop() + n, false)
	}
}

function change_input(s, to_end=true, focus=true)
{
	$("#input").val(s)

	if(to_end)
	{
		input_to_end()
	}

	if(focus)
	{
		focus_input()
	}
}

function focus_input()
{
	$("#input").focus()
}

function blur_input()
{
	$("#input").blur()
}

function input_to_end()
{
	$('#input')[0].scrollLeft = $('#input')[0].scrollWidth
}

function add_to_input_history(message, change_index=true)
{
	for(var i=0; i<input_history.length; i++)
	{
		if(input_history[i][0] === message)
		{
			input_history.splice(i, 1)
			break
		}
	}

	var item = [message, nice_date()]

	input_history.push(item)

	push_to_input_history_window(item)

	if(input_history.length > input_history_crop_limit)
	{
		input_history = input_history.slice(input_history.length - input_history_crop_limit)
		$(".input_history_item").last().remove()
	}

	if(change_index)
	{
		reset_input_history_index()
	}

	save_input_history()
}

function save_input_history()
{
	save_local_storage(ls_input_history, input_history)
}

function push_to_input_history_window(item, update_scrollbar=true)
{
	var c = `<div class='input_history_item' title='${item[1]}'>${item[0]}</div>`

	$("#input_history_container").prepend(c)

	if(update_scrollbar)
	{
		update_modal_scrollbar("input_history")
	}
}

function get_input_history()
{
	input_history = get_local_storage(ls_input_history)

	if(input_history === null)
	{
		input_history = []
	}

	reset_input_history_index()

	for(var item of input_history)
	{
		push_to_input_history_window(item, false)
	}

	update_modal_scrollbar("input_history")
}

function reset_input_history_index()
{
	input_history_index = input_history.length
}

function input_history_change(direction)
{
	if(input_history.length === 0)
	{
		return false
	}

	if(input_changed)
	{
		input_changed = false

		var input_val = $("#input").val().trim()

		if(input_val !== "")
		{
			add_to_input_history(input_val, false)

			if(direction === "up")
			{
				input_history_index = input_history.length - 1
			}

			else
			{
				input_history_index = input_history.length
			}
		}
	}

	if(direction === "up")
	{
		input_history_index -= 1

		if(input_history_index === -2)
		{
			input_history_index = input_history.length - 1
		}

		else if(input_history_index === -1)
		{
			$("#input").val("")
			return
		}

		var v = input_history[input_history_index][0]
	}

	else
	{
		if(input_history_index < 0)
		{
			$("#input").val("")
			return
		}

		input_history_index += 1

		if(input_history_index > input_history.length - 1)
		{
			$("#input").val("")
			reset_input_history_index()
			return false
		}

		if(input_history_index >= input_history.length)
		{
			$("#input").val("")
			reset_input_history_index()
			return
		}

		var v = input_history[input_history_index][0]
	}

	change_input(v)
}

function setup_input_history()
{
	$("#input_history_container").on("click", ".input_history_item", function()
	{
		if($(this).find('a').length === 0)
		{
			change_input($(this).text())
			msg_input_history.close()
		}
	})
}

function clear_tabbed(element)
{
	if(!element.id)
	{
		return false
	}

	tab_info[element.id] =
	{
		tabbed_list: [],
		tabbed_word: "",
		tabbed_start: 0,
		tabbed_end: 0
	}
}

function replaceBetween(str, start, end, what)
{
	return str.substring(0, start) + what + str.substring(end)
}

function oiEquals(str, what)
{
	return str === commands_sorted[what]
}

function oiStartsWith(str, what)
{
	return str.startsWith(`${commands_sorted[what]} `)
}

function get_closest_autocomplete(element, w)
{
	var info = tab_info[element.id]

	var l = commands.concat(usernames).concat(["@everyone"])
	var wl = w.toLowerCase()
	var has = false

	for(var i=0; i<l.length; i++)
	{
		var pw = l[i]

		if(pw.startsWith(w))
		{
			has = true

			if(!info.tabbed_list.includes(pw))
			{
				info.tabbed_list.push(pw)
				return l[i]
			}
		}
	}

	for(var i=0; i<l.length; i++)
	{
		var pw = l[i]
		var pwl = pw.toLowerCase()
		
		if(pwl.startsWith(wl))
		{
			has = true

			if(!info.tabbed_list.includes(pw))
			{
				info.tabbed_list.push(pw)
				return l[i]
			}
		}
	}

	if(has)
	{
		info.tabbed_list = []
		return get_closest_autocomplete(element, w)
	}

	return ""
}

function tabbed(element)
{
	if(!element.id)
	{
		return false
	}

	var info = tab_info[element.id]

	if(info === undefined)
	{
		clear_tabbed(element)
		var info = tab_info[element.id]
	}

	if(info.tabbed_word !== "")
	{
		replace_tabbed(element, info.tabbed_word)
		return
	}

	var split = element.selectionStart
	var value = element.value.replace(/\n/g, ' ')

	var a = value.substring(0, split).match(/[^ ]*$/)[0]
	var b = value.substring(split).match(/^[^ ]*/)[0]

	var word = a + b

	info.tabbed_start = split - a.length
	info.tabbed_end = split + b.length

	if(word !== "")
	{
		info.tabbed_word = word
		replace_tabbed(element, word)
	}
}

function replace_tabbed(element, word)
{
	var info = tab_info[element.id]

	var result = get_closest_autocomplete(element, word)

	if(result)
	{
		if(element.value[info.tabbed_end] === ' ')
		{
			element.value = replaceBetween(element.value, info.tabbed_start, info.tabbed_end, result)
		}

		else
		{
			element.value = replaceBetween(element.value, info.tabbed_start, info.tabbed_end, `${result} `)
		}

		var pos = info.tabbed_start + result.length

		element.setSelectionRange(pos + 1, pos + 1)

		info.tabbed_start = pos - result.length
		info.tabbed_end = pos
	}
}

function scroll_events()
{
	$('#chat_area')[0].addEventListener("wheel", function(e)
	{
		$("#chat_area").stop()
	})

	$('#chat_area').scroll(function()
	{
		scroll_timer()
	})
}

var scroll_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			check_scrollers()
		}, check_scrollers_delay)
	}
})()

function check_scrollers()
{
	if($("#chat_area").is(":animated"))
	{
		return false
	}

	var $ch = $("#chat_area")
	var max = $ch.prop('scrollHeight') - $ch.innerHeight()

	var scrolltop = $ch.scrollTop()

	if(max - scrolltop > 10)
	{
		if(scrolltop > 0)
		{
			show_top_scroller()
		}

		else
		{
			hide_top_scroller()
		}

		show_bottom_scroller()
	}

	else
	{
		hide_top_scroller()
		hide_bottom_scroller()
	}
}

function resize_events()
{
	$(window).resize(function()
	{
		resize_timer()
	})
}

var resize_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			on_resize()
		}, resize_delay)
	}
})()

function on_resize()
{
	fix_visible_video_frame()
	update_chat_scrollbar()
	goto_bottom(false, false)
	check_scrollers()
}

function setup_scrollbars()
{
	remove_chat_scrollbar()
	remove_modal_scrollbars()
	remove_other_scrollbars()

	if(get_setting("custom_scrollbars"))
	{
		start_chat_scrollbar()
		start_modal_scrollbars()
		start_other_scrollbars()
	}

	chat_scroll_bottom(false, false)
}

function start_chat_scrollbar()
{
	chat_scrollbar = new PerfectScrollbar("#chat_area",
	{
		minScrollbarLength: 50,
		suppressScrollX: true,
		scrollingThreshold: 3000,
		wheelSpeed: 0.8,
		handlers: ['drag-thumb', 'wheel', 'touch']
	})
}

function remove_chat_scrollbar()
{
	if(chat_scrollbar !== undefined)
	{
		if(chat_scrollbar.element !== null)
		{
			chat_scrollbar.destroy()
		}
	}
}

function update_chat_scrollbar()
{
	if(chat_scrollbar !== undefined)
	{
		if(chat_scrollbar.element !== null)
		{
			chat_scrollbar.update()
		}
	}
}

function start_modal_scrollbars()
{
	for(var instance of get_modal_instances())
	{
		if(instance.options.preset !== "popup")
		{
			start_modal_scrollbar(instance.options.id)
		}
	}
}

function start_other_scrollbars()
{
	$(".settings_category").each(function()
	{
		start_scrollbar(this)
	})

	$(".settings_window_left_content").each(function()
	{
		start_scrollbar(this)
	})
}

function remove_other_scrollbars()
{
	$(".settings_category").each(function()
	{
		$(this).getNiceScroll().remove()
	})

	$(".settings_window_left_content").each(function()
	{
		$(this).getNiceScroll().remove()
	})
}

function remove_modal_scrollbars()
{
	for(var instance of get_modal_instances())
	{
		if(instance.options.preset !== "popup")
		{
			remove_modal_scrollbar(instance.options.id)
		}
	}
}

function start_modal_scrollbar(s)
{
	var ignore = ["global_settings", "room_settings"]
	
	if(ignore.includes(s))
	{
		return false
	}

	start_scrollbar($(`#Msg-content-container-${s}`))
}

function start_scrollbar(element, visible=true)
{
	if(visible)
	{
		var cursorwidth = "7px"
	}

	else
	{
		var cursorwidth = "0px"
	}

	$(element).niceScroll
	({
		zindex: 9999999,
		autohidemode: false,
		cursorcolor: "#AFAFAF",
		cursorborder: "0px solid white",
		cursorwidth: cursorwidth,
		horizrailenabled: false
	})
}

function remove_modal_scrollbar(s)
{
	$(`#Msg-content-container-${s}`).getNiceScroll().remove()
}

function update_modal_scrollbar(s)
{
	if(s === "global_settings" || s === "room_settings")
	{
		update_scrollbar($(`#settings_window_${s} .settings_window_category_container_selected`).eq(0))
		update_scrollbar($(`#settings_window_left_content_${s}`))
	}

	else
	{
		update_scrollbar($(`#Msg-content-container-${s}`))
	}
}

function update_scrollbar(element)
{
	$(element).getNiceScroll().resize()
}

function nice_date(date=Date.now())
{
	return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT")
}

function escape_special_characters(s)
{
	return s.replace(/[^A-Za-z0-9]/g, '\\$&');
}

function start_chat_click_events()
{
	$("#chat_area").on("click", ".chat_uname", function()
	{
		show_profile($(this).text(), $(this).data("prof_image"))
	})

	$("#chat_area").on("click", ".chat_profile_image", function()
	{
		show_profile($(this).closest(".chat_message").find(".chat_uname").eq(0).text(), $(this).attr("src"))
	})
}
function start_chat_hover_events()
{
	$("#chat_area").on("mouseenter", ".chat_uname, .chat_profile_image, .brk", function()
	{
		var uname = $(this).closest(".message").data("uname")

		if(!uname)
		{
			return false
		}
		
		clearTimeout(highlight_same_posts_timeouts[uname])
		
		highlight_same_posts_timeouts[uname] = setTimeout(function()
		{
			highlight_same_posts(uname, true)
		}, highlight_same_posts_delay)
	})

	$("#chat_area").on("mouseleave", ".chat_uname, .chat_profile_image, .brk", function()
	{
		var uname = $(this).closest(".message").data("uname")

		if(!uname)
		{
			return false
		}

		clearTimeout(highlight_same_posts_timeouts[uname])

		if($(this).closest(".message").hasClass("highlighted"))
		{
			highlight_same_posts(uname, false)
		}
	})
}

function highlight_same_posts(uname, add=true)
{
	$(".message").each(function()
	{
		if($(this).data("uname") === uname)
		{
			if(add)
			{
				$(this).addClass("highlighted")
			}

			else
			{
				$(this).removeClass("highlighted")
			}
		}
	})
}

function update_chat(args={})
{
	var def_args =
	{
		username: "",
		message: "",
		prof_image: "",
		date: false,
		third_person: false,
		brk: false
	}

	fill_defaults(args, def_args)

	if(check_ignored_words(args.message, args.username))
	{
		return false
	}

	if(args.username)
	{
		if(user_is_ignored(args.username))
		{
			return false
		}
	}

	if(args.message.startsWith('//'))
	{
		args.message = args.message.slice(1)
	}

	var contclasses = "chat_content"

	var highlighted = false

	if(args.username !== username)
	{
		if(check_highlights(args.message))
		{
			contclasses += " highlighted"
			highlighted = true
		}
	}

	if(args.date)
	{
		d = args.date
	}

	else
	{
		d = Date.now()
	}

	var nd = nice_date(d)

	if(args.prof_image === "" || args.prof_image === undefined)
	{
		var pi = default_profile_image_url
	}

	else
	{
		var pi = args.prof_image
	}

	var starts_me = args.message.startsWith('/me ') || args.message.startsWith('/em ')

	if(get_setting("chat_layout") === "normal")
	{
		var messagecls = "normal_layout"
	}

	else if(get_setting("chat_layout") === "compact")
	{
		var messagecls = "compact_layout"
	}
	
	if(starts_me || args.third_person)
	{
		if(starts_me)
		{
			var tpt = args.message.substr(4)
		}

		else
		{
			tpt = args.message
		}

		if(!args.brk)
		{
			args.brk = "<i class='icon2c fa fa-user-circle'></i>"
		}

		var s = `
		<div class='message chat_message thirdperson ${messagecls}'>
			<div class='chat_third_container'>
				<div class='brk chat_third_brk'>${args.brk}</div>
				<div class='chat_third_content'>
					<span class='chat_uname action'></span>&nbsp;<span class='${contclasses}' title='${nd}' data-date='${d}'></span>
				</div>
			</div>
		</div>`

		var fmessage = $(s)

		fmessage.find('.chat_content').eq(0).text(tpt).urlize()
	}

	else
	{
		if(get_setting("chat_layout") === "normal")
		{
			var s = `
			<div class='message chat_message umessage_${args.username} normal_layout'>
				<div class='chat_left_side'>
					<div class='chat_profile_image_container unselectable action4'>
						<img class='chat_profile_image' src='${pi}'>
					</div>
				</div>
				<div class='chat_right_side'>
					<div class='chat_uname_container'>
						<div class='chat_uname action'></div>
					</div>
					<div class='chat_content_container'>
						<div class='${contclasses}' title='${nd}' data-date='${d}'></div>
					</div>
				</div>
			</div>`
		}

		else if(get_setting("chat_layout") === "compact")
		{
			var s = `
			<div class='message chat_message umessage_${args.username} compact_layout'>
				<div class='chat_uname_container'>
					<div class='chat_uname action'></div><div>:</div>
				</div>
				<div class='chat_content_container'>
					<div class='${contclasses}' title='${nd}' data-date='${d}'></div>
				</div>
			</div>`
		}

		var fmessage = $(s)

		fmessage.find('.chat_content').eq(0).text(args.message).urlize()
	}

	var huname = fmessage.find('.chat_uname').eq(0)
	
	huname.text(args.username)

	huname.data("prof_image", pi)

	fmessage.find('.chat_profile_image').eq(0).on("error", function()
	{
		if($(this).attr("src") !== default_profile_image_url)
		{
			$(this).attr("src", default_profile_image_url)
		}
	})

	fmessage.data("highlighted", highlighted)
	fmessage.data("uname", args.username)
	fmessage.data("mode", "chat")

	add_to_chat(fmessage, true)

	if(args.username !== username)
	{
		if(highlighted)
		{
			alert_title2()
			sound_notify("highlight")
		}

		else
		{
			alert_title()
			sound_notify("message")
		}
	}
}

function add_to_chat(message, save=false, notify=true)
{
	if(started && !app_focused)
	{
		add_separator(false)
	}

	var chat_area = $('#chat_area')
	var last_message = $(".message").last()
	var appended = false
	var mode = message.data("mode")

	if(mode === "chat")
	{
		var content = message.find(".chat_content").eq(0)
	}

	if((message.hasClass("chat_message") && !message.hasClass("thirdperson")) && (last_message.hasClass("chat_message") && !last_message.hasClass("thirdperson")))
	{
		if(message.find(".chat_uname").eq(0).text() === last_message.find(".chat_uname").eq(0).text())
		{
			if(last_message.find(".chat_content").length < max_same_post_messages)
			{
				var date_diff = message.find('.chat_content').last().data("date") - last_message.find('.chat_content').last().data("date")

				if(date_diff < max_same_post_diff)
				{
					if(started && app_focused)
					{
						content.addClass("fader")
					}

					last_message.find(".chat_content_container").eq(0).append(content)

					replace_in_chat_history(last_message)

					if(!last_message.data("highlighted"))
					{
						last_message.data("highlighted", message.data("highlighted"))
					}

					appended = true
				}
			}
		}
	}

	if(!appended)
	{
		if(started && app_focused)
		{
			message.addClass("fader")
		}

		chat_area.append(message)

		if($(".message").length > chat_crop_limit)
		{
			$("#chat_area > .message").eq(0).remove()
		}

		if(save)
		{
			message_id += 1
			message.data("message_id", message_id)
			push_to_chat_history(message)
		}
	}

	if(started)
	{
		update_chat_scrollbar()
		goto_bottom()
	}

	scroll_timer()

	if(notify && started && message.data("highlighted"))
	{
		electron_signal("highlighted")
	}
}

function push_to_chat_history(message)
{
	chat_history.push(message.clone(true, true))

	if(chat_history.length > chat_history_crop_limit)
	{
		chat_history = chat_history.slice(chat_history.length - chat_history_crop_limit)
	}
}

function replace_in_chat_history(message)
{
	for(var i=0; i<chat_history.length; i++)
	{
		var message2 = chat_history[i]

		if(message.data("message_id") === message2.data("message_id"))
		{
			chat_history[i] = message
			return
		}
	}
}

function change(args={})
{
	var def_args =
	{
		type: "",
		force: false,
		play: true,
		notify: true,
		current_source: false
	}

	fill_defaults(args, def_args)

	if(args.type === "image")
	{
		if(!args.force && last_image_source === image_source)
		{
			return false
		}
	}

	else if(args.type === "tv")
	{
		if(!args.force && last_tv_source === tv_source)
		{
			return false
		}
	}

	else if(args.type === "radio")
	{
		if(!args.force && last_radio_source === radio_source)
		{
			return false
		}
	}

	else
	{
		return false
	}

	if(afk)
	{
		if(args.type === "image")
		{
			if(get_setting("afk_disable_image_change"))
			{
				change_image_when_focused = true
				return false
			}
		}

		else if(args.type === "tv")
		{
			if(get_setting("afk_disable_tv_change"))
			{
				change_tv_when_focused = true
				return false
			}
		}

		else if(args.type === "radio")
		{
			if(get_setting("afk_disable_radio_change"))
			{
				change_radio_when_focused = true
				return false
			}
		}
	}

	if(args.type === "tv")
	{
		if(!last_tv_source)
		{
			args.play = false
		}
	}

	var setter = ""

	if(args.type === "image")
	{
		if(!room_state.images_enabled || (room_state.images_locked && last_image_source && !args.current_source))
		{
			return false
		}

		if(room_images_mode === "disabled")
		{
			return false
		}

		if(background_mode === "mirror")
		{
			apply_background()
		}

		if(args.current_source && last_image_source)
		{
			var src = last_image_source
			var source_changed = false
		}

		else
		{
			var src = image_source
			var source_changed = true
		}		

		show_image(src, args.force)

		if(source_changed)
		{
			last_image_source = image_source
		}

		setter = image_setter
	}

	else if(args.type === "tv")
	{
		if(!room_state.tv_enabled || (room_state.tv_locked && last_tv_source && !args.current_source))
		{
			return false
		}

		if(room_tv_mode === "disabled")
		{
			return false
		}

		if(args.current_source && last_tv_source)
		{
			var src = last_tv_source
			var source_changed = false
		}

		else
		{
			var src = tv_source
			var source_changed = true
		}

		if(tv_type === "youtube")
		{
			if(youtube_video_player === undefined)
			{
				return false
			}

			show_youtube_video(src, args.play)
		}

		else if(tv_type === "twitch")
		{
			if(twitch_video_player === undefined)
			{
				return false
			}

			show_twitch_video(src, args.play)
		}

		else if(tv_type === "soundcloud")
		{
			if(soundcloud_video_player === undefined)
			{
				return false
			}

			show_soundcloud_video(src, args.play)
		}

		else if(tv_type === "url")
		{
			show_video(src, args.play)
		}

		else if(tv_type === "iframe")
		{
			show_iframe_video(src, args.play)
		}

		else
		{
			return false
		}

		if(source_changed)
		{
			last_tv_source = tv_source
			last_tv_type = tv_type
		}

		setter = tv_setter
	}

	else if(args.type === "radio")
	{
		if(!room_state.radio_enabled || (room_state.radio_locked && last_radio_source && !args.current_source))
		{
			return false
		}

		if(room_radio_mode === "disabled")
		{
			return false
		}

		if(radio_type === "youtube")
		{
			if(youtube_player === undefined)
			{
				return false
			}
		}

		if(args.current_source && last_radio_source)
		{
			var src = last_radio_source
			var type = last_radio_type
			var source_changed = false
		}

		else
		{
			var src = radio_source
			var type = radio_type
			var source_changed = true
		}		

		load_radio(src, type)

		if(source_changed)
		{
			last_radio_source = radio_source
			last_radio_type = radio_type
		}

		setter = radio_setter
	}

	else
	{
		return false
	}

	if(args.notify && setter !== username)
	{
		alert_title()
		sound_notify("media_change")
	}
}

function show_image(src, force=false)
{
	$("#media_image_error").css("display", "none")

	$("#media_image").css("display", "initial")

	if(force || $("#media_image").attr("src") !== src)
	{
		$("#media_image").attr("src", src)
	}

	else
	{
		after_image_load()
	}
}

function show_current_image_modal(current=true)
{
	if(current)
	{
		show_modal_image(current_image_source, current_image_title, current_image_date_raw)
	}

	else
	{
		if(images_changed.length > 0)
		{
			var data = images_changed[images_changed.length - 1]
			show_modal_image(data.url, data.title, data.date_raw)
		}
	}
}

function start_image_events()
{
	$('#media_image')[0].addEventListener('load', function(e)
	{
		after_image_load()
	})

	$('#media_image').on("error", function()
	{
		$("#media_image").css("display", "none")
		$("#media_image_error").css("display", "initial")
	})

	$("#admin_background_image")[0].addEventListener('load', function()
	{
		update_modal_scrollbar("main_menu")
	})
}

function after_image_load()
{
	current_image_source = image_source
	current_image_title = image_title
	current_image_date_raw = image_date_raw
}

function get_size_string(size)
{
	return `${parseFloat(size / 1024).toFixed(2)} MB`
}

function setup_image(data)
{
	if(data.image_source === '' || data.image_source === undefined)
	{
		image_source = default_image_source

		if(data.image_setter)
		{
			image_title = `Setter: ${data.image_setter} | ${nice_date(data.image_date)}`
		}

		else
		{
			image_title = "Default Image"
		}
	}

	else
	{
		image_source = data.image_source

		if(data.image_type === "link")
		{
			image_title = `Setter: ${data.image_setter} | ${nice_date(data.image_date)}`
		}

		else
		{
			image_title = `Setter: ${data.image_setter} | Size: ${get_size_string(data.image_size)} | ${nice_date(data.image_date)}`
		}
	}

	image_setter = data.image_setter
	image_size = data.image_size
	image_date = nice_date(data.image_date)
	image_date_raw = data.image_date
	image_type = data.image_type

	change({type:"image"})
}

function fill_defaults(args, def_args)
{
	for(var key in def_args)
	{
		var d = def_args[key]

		if(args[key] === undefined)
		{
			args[key] = d
		}
	}
}

function chat_announce(args={})
{
	var def_args =
	{
		brk: "",
		message: "",
		highlight: false,
		title: false,
		onclick: false,
		save: false,
		id: false,
		date: false,
		type: "normal",
		info1: "",
		info2: "",
		username: false,
		open_profile: false
	}

	fill_defaults(args, def_args)

	var ignore = false

	if(check_ignored_words(args.message, args.username))
	{
		ignore = true
	}

	if(args.username)
	{
		if(user_is_ignored(args.username))
		{
			ignore = true
		}
	}

	var containerclasses = "announcement_content_container"
	var contclasses = "announcement_content"

	if(args.onclick || (args.username && args.open_profile))
	{
		containerclasses += " pointer"
		containerclasses += " action"
	}

	var containerid = " "

	if(args.id)
	{
		containerid = ` id='${args.id}' `
	}

	if(args.highlight === true)
	{
		contclasses += " highlighted"
	}

	if(args.title)
	{
		var t = `${args.title}`
	}

	else
	{
		if(args.date)
		{
			d = args.date
		}

		else
		{
			d = Date.now()
		}

		var t = nice_date(d)
	}

	if(get_setting("chat_layout") === "normal")
	{
		var messagecls = "normal_layout"
	}

	else if(get_setting("chat_layout") === "compact")
	{
		var messagecls = "compact_layout"
	}

	var s = `
	<div${containerid}class='message announcement ${messagecls}'>
		<div class='${containerclasses}'>
			<div class='brk announcement_brk'>${args.brk}</div>
			<div class='${contclasses}' title='${t}'></div>
		</div>
	</div>`

	var fmessage = $(s)

	var content = fmessage.find('.announcement_content').eq(0)

	content.text(args.message).urlize()

	if(args.onclick)
	{
		content.parent().on("click", args.onclick)
	}

	else if(args.username && args.open_profile)
	{
		var pif = function()
		{
			show_profile(args.username)
		}

		content.parent().on("click", pif)
	}

	fmessage.data("highlighted", args.highlight)
	fmessage.data("type", args.type)
	fmessage.data("info1", args.info1)
	fmessage.data("info2", args.info2)
	fmessage.data("uname", args.username)
	fmessage.data("mode", "announcement")

	if(!ignore)
	{
		add_to_chat(fmessage, args.save)
		
		if(args.highlight)
		{
			alert_title2()
			sound_notify("highlight")
		}
	}

	if(args.type !== "normal")
	{
		handle_chat_announce_types(fmessage, args.type)
	}

}

function handle_chat_announce_types(message, type)
{
	var media_history_types = ["image_change", "tv_change", "radio_change"]

	if(media_history_types.includes(type))
	{
		var item = $("<div class='media_history_item'><div class='media_history_item_inner pointer inline'></div></div>")

		item.find(".media_history_item_inner").eq(0).html(message.find(".announcement_content_container").eq(0).clone(true, true))

		if(type === "image_change")
		{
			$("#image_history_container").prepend(item)
			var els = $("#image_history_container").children()
			var t = "image"
		}

		else if(type === "tv_change")
		{
			$("#tv_history_container").prepend(item)
			var els = $("#tv_history_container").children()
			var t = "tv"
		}

		else if(type === "radio_change")
		{
			$("#radio_history_container").prepend(item)
			var els = $("#radio_history_container").children()
			var t = "radio"
		}

		else
		{
			return false
		}

		if(els.length > media_history_max_items)
		{
			els.last().remove()
		}

		if(type === "image")
		{
			if(image_history_filtered)
			{
				do_image_history_filter()
			}
		}

		else if(type === "tv")
		{
			if(tv_history_filtered)
			{
				do_tv_history_filter()
			}
		}

		else if(type === "radio")
		{
			if(radio_history_filtered)
			{
				do_radio_history_filter()
			}
		}

		update_modal_scrollbar(`${t}_change`)
	}
}

jQuery.fn.urlize = function(force=false)
{
	if(this.length > 0)
	{
		this.each(function(n, obj)
		{
			var x = $(obj).html()

			if(force)
			{
				x = `<a class='generic action' target='_blank' href='${x}'>${x}</a>`
			}

			else
			{
				var list = x.match(/\bhttps?:\/\/\S+/g)

				if(list)
				{
					var listed = []

					for(var i=0; i<list.length; i++)
					{
						if(listed.includes(list[i]))
						{
							continue
						}

						var rep = new RegExp(escape_special_characters(list[i]), "g")

						x = x.replace(rep, `<a class='generic action' target='_blank' href='${list[i]}'>${list[i]}</a>`)

						listed.push(list[i])
					}
				}
			}

			$(obj).html(x)
		})
	}
}

function register_commands()
{
	commands.push('/me')
	commands.push('/clear')
	commands.push('/unclear')
	commands.push('/users')
	commands.push('/room')
	commands.push('/publicrooms')
	commands.push('/visitedrooms')
	commands.push('/roomname')
	commands.push('/roomnameedit')
	commands.push('/played')
	commands.push('/search')
	commands.push('/role')
	commands.push('/voice1')
	commands.push('/voice2')
	commands.push('/voice3')
	commands.push('/voice4')
	commands.push('/op')
	commands.push('/admin')
	commands.push('/resetvoices')
	commands.push('/removeops')
	commands.push('/ban')
	commands.push('/unban')
	commands.push('/unbanall')
	commands.push('/bannedcount')
	commands.push('/kick')
	commands.push('/public')
	commands.push('/private')
	commands.push('/log')
	commands.push('/enablelog')
	commands.push('/disablelog')
	commands.push('/clearlog')
	commands.push('/radio')
	commands.push('/tv')
	commands.push('/image')
	commands.push('/images')
	commands.push('/privacy')
	commands.push('/status')
	commands.push('/topic')
	commands.push('/topicadd')
	commands.push('/topictrim')
	commands.push('/topicaddstart')
	commands.push('/topictrimstart')
	commands.push('/topicedit')
	commands.push('/help3')
	commands.push('/help2')
	commands.push('/help')
	commands.push('/stopradio')
	commands.push('/startradio')
	commands.push('/radiovolume')
	commands.push('/tvvolume')
	commands.push('/volume')
	commands.push('/history')
	commands.push('/logout')
	commands.push('/details')
	commands.push('/changeusername')
	commands.push('/changepassword')
	commands.push('/changeemail')
	commands.push('/verifyemail')
	commands.push('/fill')
	commands.push('/shrug')
	commands.push('/afk')
	commands.push('/disconnectothers')
	commands.push('/whisper')
	commands.push('/whisperops')
	commands.push('/annex')
	commands.push('/highlights')
	commands.push('/lock')
	commands.push('/unlock')
	commands.push('/stopandlock')
	commands.push('/stop')
	commands.push('/default')
	commands.push('/menu')
	commands.push('/media')
	commands.push('/user')
	commands.push('/imagehistory')
	commands.push('/tvhistory')
	commands.push('/radiohistory')
	commands.push('/lockimages')
	commands.push('/locktv')
	commands.push('/lockradio')
	commands.push('/unlockimages')
	commands.push('/unlocktv')
	commands.push('/unlockradio')
	commands.push('/togglelockimages')
	commands.push('/togglelocktv')
	commands.push('/togglelockradio')
	commands.push('/showimages')
	commands.push('/showtv')
	commands.push('/showradio')
	commands.push('/hideimages')
	commands.push('/hidetv')
	commands.push('/hideradio')
	commands.push('/toggleimages')
	commands.push('/toggletv')
	commands.push('/toggleradio')
	commands.push('/test')
	commands.push('/maximizeimages')
	commands.push('/maximizetv')
	commands.push('/starttv')
	commands.push('/stoptv')
	commands.push('/openimage')
	commands.push('/openlastimage')
	commands.push('/date')
	commands.push('/js')
	commands.push('/js2')
	commands.push('/changeimage')
	commands.push('/changetv')
	commands.push('/chenlastimage')
	commands.push('/date')
	commands.push('/js')
	commands.push('/js2')
	commands.push('/changeimage')
	commands.push('/changetv')
	commands.push('/changeradio')
	commands.push('/closeall')
	commands.push('/closeallmodals')
	commands.push('/closeallpopups')
	commands.push('/activityabove')
	commands.push('/activitybelow')
	commands.push('/globalsettings')
	commands.push('/roomsettings')
	commands.push('/goto')
	commands.push('/broadcast')
	commands.push('/systembroadcast')
	commands.push('/systemrestart')
	commands.push('/changeinput')
	commands.push('/toggleplayradio')
	commands.push('/refreshimage')
	commands.push('/refreshtv')
	commands.push('/refreshradio')
	commands.push('/stopradioin')
	commands.push('/ping')
	commands.push('/reactlike')
	commands.push('/reactlove')
	commands.push('/reacthappy')
	commands.push('/reactmeh')
	commands.push('/reactsad')
	commands.push('/reactdislike')
	commands.push('/f1')
	commands.push('/f2')
	commands.push('/f3')
	commands.push('/lockscreen')
	commands.push('/unlockscreen')
	commands.push('/togglelockscreen')
	commands.push('/drawimage')
	commands.push('/joinvoicechat')
	commands.push('/leavevoicechat')

	commands.sort()

	for(var command of commands)
	{
		commands_sorted[command] = command.split('').sort().join('')
	}

	for(var key in commands_sorted)
	{
		var scmd1 = commands_sorted[key]

		for(var key2 in commands_sorted)
		{
			var scmd2 = commands_sorted[key2]

			if(key !== key2)
			{
				if(scmd1 === scmd2)
				{
					console.error(`Command anagrams detected. ${key} and ${key2}`)
				}
			}
		}
	}
}

function is_command(message)
{
	if(message[0] === '/' && !message.startsWith('/me ') && !message.startsWith('/em ') && !message.startsWith('//'))
	{
		return true
	}

	return false
}

function process_message(message, to_history=true, clr_input=true)
{
	if(is_command(message))
	{
		message = utilz.clean_string2(message)

		var ans = execute_command(message, {to_history:to_history, clr_input:clr_input})

		to_history = ans.to_history
		clr_input = ans.clr_input
	}

	else
	{
		if(can_chat)
		{
			message = utilz.clean_string10(message)

			if(message.length === 0)
			{
				clear_input()
				return false
			}

			if(message.split("\n").length > max_num_newlines)
			{
				return false
			}

			if(message.length > max_input_length)
			{
				message = message.substring(0, max_input_length)
			}

			socket_emit('sendchat', {message:message})
		}

		else
		{
			cant_chat()
		}
	}

	if(to_history)
	{
		add_to_input_history(message)
	}

	if(clr_input)
	{
		clear_input()
	}
}

function execute_command(message, ans)
{
	var a = message.toLowerCase().split(' ')

	var lmessage = a[0].split('').sort().join('')

	if(a.length > 1)
	{
		lmessage += ' '

		var arg = message.substring(lmessage.length)
	}

	if(oiEquals(lmessage, '/clear'))
	{
		clear_chat()
	}

	else if(oiEquals(lmessage, '/unclear'))
	{
		unclear_chat()
	}

	else if(oiEquals(lmessage, '/users'))
	{
		show_userlist()
	}

	else if(oiStartsWith(lmessage, '/users'))
	{
		show_userlist(arg)
	}

	else if(oiEquals(lmessage, '/publicrooms'))
	{
		request_roomlist("", "public_roomlist")
	}

	else if(oiStartsWith(lmessage, '/publicrooms'))
	{
		request_roomlist(arg, "public_roomlist")
	}

	else if(oiEquals(lmessage, '/visitedrooms'))
	{
		request_roomlist("", "visited_roomlist")
	}

	else if(oiStartsWith(lmessage, '/visitedrooms'))
	{
		request_roomlist(arg, "visited_roomlist")
	}

	else if(oiEquals(lmessage, '/roomname'))
	{
		show_room()
	}

	else if(oiStartsWith(lmessage, '/roomname'))
	{
		change_room_name(arg)
	}

	else if(oiEquals(lmessage, '/roomnameedit'))
	{
		room_name_edit()
		ans.to_history = false
		ans.clr_input = false
	}

	else if(oiEquals(lmessage, '/played'))
	{
		show_played()
	}

	else if(oiStartsWith(lmessage, '/played'))
	{
		show_played(arg)
	}

	else if(oiEquals(lmessage, '/search'))
	{
		show_chat_search()
	}

	else if(oiStartsWith(lmessage, '/search'))
	{
		show_chat_search(arg)
	}

	else if(oiEquals(lmessage, '/role'))
	{
		show_role()
	}

	else if(oiStartsWith(lmessage, '/voice1'))
	{
		change_role(arg, "voice1")
	}

	else if(oiStartsWith(lmessage, '/voice2'))
	{
		change_role(arg, "voice2")
	}

	else if(oiStartsWith(lmessage, '/voice3'))
	{
		change_role(arg, "voice3")
	}

	else if(oiStartsWith(lmessage, '/voice4'))
	{
		change_role(arg, "voice4")
	}

	else if(oiStartsWith(lmessage, '/op'))
	{
		change_role(arg, "op")
	}

	else if(oiStartsWith(lmessage, '/admin'))
	{
		change_role(arg, "admin")
	}

	else if(oiEquals(lmessage, '/resetvoices'))
	{
		reset_voices()
	}

	else if(oiEquals(lmessage, '/removeops'))
	{
		remove_ops()
	}

	else if(oiStartsWith(lmessage, '/ban'))
	{
		ban(arg)
	}

	else if(oiStartsWith(lmessage, '/unban'))
	{
		unban(arg)
	}

	else if(oiEquals(lmessage, '/unbanall'))
	{
		unban_all()
	}

	else if(oiEquals(lmessage, '/bannedcount'))
	{
		get_banned_count()
	}

	else if(oiStartsWith(lmessage, '/kick'))
	{
		kick(arg)
	}

	else if(oiEquals(lmessage, '/public'))
	{
		change_privacy(true)
	}

	else if(oiEquals(lmessage, '/private'))
	{
		change_privacy(false)
	}

	else if(oiEquals(lmessage, '/log'))
	{
		show_log()
	}

	else if(oiEquals(lmessage, '/enablelog'))
	{
		change_log(true)
	}

	else if(oiEquals(lmessage, '/disablelog'))
	{
		change_log(false)
	}

	else if(oiEquals(lmessage, '/clearlog'))
	{
		clear_log()
	}

	else if(oiStartsWith(lmessage, '/radio'))
	{
		change_radio_source(arg)
	}

	else if(oiEquals(lmessage, '/radio'))
	{
		show_media_source("radio")
	}

	else if(oiStartsWith(lmessage, '/tv'))
	{
		change_tv_source(arg)
	}

	else if(oiEquals(lmessage, '/tv'))
	{
		show_media_source("tv")
	}

	else if(oiStartsWith(lmessage, '/image') || oiStartsWith(lmessage, '/images'))
	{
		link_image(arg)
	}

	else if(oiEquals(lmessage, '/image'))
	{
		show_media_source("image")
	}

	else if(oiEquals(lmessage, '/status'))
	{
		show_status()
	}

	else if(oiStartsWith(lmessage, '/topic'))
	{
		change_topic(arg)
	}

	else if(oiStartsWith(lmessage, '/topicadd'))
	{
		topicadd(arg)
	}

	else if(oiStartsWith(lmessage, '/topictrim'))
	{
		topictrim(arg)
	}

	else if(oiEquals(lmessage, '/topictrim'))
	{
		topictrim(1)
	}

	else if(oiStartsWith(lmessage, '/topicaddstart'))
	{
		topicstart(arg)
	}

	else if(oiStartsWith(lmessage, '/topictrimstart'))
	{
		topictrimstart(arg)
	}

	else if(oiEquals(lmessage, '/topictrimstart'))
	{
		topictrimstart(1)
	}

	else if(oiEquals(lmessage, '/topicedit'))
	{
		topicedit()
		ans.to_history = false
		ans.clr_input = false
	}

	else if(oiEquals(lmessage, '/topic'))
	{
		show_topic()
	}

	else if(oiEquals(lmessage, '/room'))
	{
		show_room()
	}

	else if(oiEquals(lmessage, '/help3'))
	{
		help3()
	}

	else if(oiEquals(lmessage, '/help2'))
	{
		help2()
	}

	else if(oiEquals(lmessage, '/help') || oiEquals(lmessage, '/help1'))
	{
		help()
	}

	else if(oiEquals(lmessage, '/stopradio'))
	{
		stop_radio()
	}

	else if(oiEquals(lmessage, '/startradio'))
	{
		start_radio()
	}

	else if(oiStartsWith(lmessage, '/radiovolume'))
	{
		change_volume_command(arg)
	}

	else if(oiStartsWith(lmessage, '/tvvolume'))
	{
		change_volume_command(arg, "tv")
	}

	else if(oiStartsWith(lmessage, '/volume'))
	{
		change_volume_command(arg)
		change_volume_command(arg, "tv")
	}

	else if(oiEquals(lmessage, '/history'))
	{
		show_input_history()
		ans.to_history = false
	}

	else if(oiStartsWith(lmessage, '/history'))
	{
		show_input_history(arg)
	}

	else if(oiStartsWith(lmessage, '/changeusername'))
	{
		change_username(arg)
	}

	else if(oiStartsWith(lmessage, '/changepassword'))
	{
		change_password(arg)
	}

	else if(oiStartsWith(lmessage, '/changeemail'))
	{
		change_email(arg)
	}

	else if(oiStartsWith(lmessage, '/verifyemail'))
	{
		verify_email(arg)
	}

	else if(oiEquals(lmessage, '/details'))
	{
		show_details()
	}

	else if(oiEquals(lmessage, '/logout'))
	{
		logout()
	}

	else if(oiEquals(lmessage, '/fill'))
	{
		fill()
	}

	else if(oiEquals(lmessage, '/shrug'))
	{
		shrug()
	}

	else if(oiEquals(lmessage, '/afk'))
	{
		show_afk()
	}

	else if(oiEquals(lmessage, '/disconnectothers'))
	{
		disconnect_others()
	}

	else if(oiStartsWith(lmessage, '/whisper'))
	{
		write_popup_message(arg)
	}

	else if(oiEquals(lmessage, '/whisperops'))
	{
		write_popup_message(false, "ops")
	}

	else if(oiEquals(lmessage, '/broadcast'))
	{
		write_popup_message(false, "room")
	}

	else if(oiEquals(lmessage, '/systembroadcast'))
	{
		write_popup_message(false, "system")
		ans.to_history = false
	}

	else if(oiEquals(lmessage, '/systemrestart'))
	{
		send_system_restart_signal()
		ans.to_history = false
	}

	else if(oiEquals(lmessage, '/annex'))
	{
		annex()
		ans.to_history = false
	}

	else if(oiStartsWith(lmessage, '/annex'))
	{
		annex(arg)
	}

	else if(oiEquals(lmessage, '/highlights'))
	{
		show_highlights()
	}

	else if(oiStartsWith(lmessage, '/highlights'))
	{
		show_highlights(arg)
	}

	else if(oiEquals(lmessage, '/lock'))
	{
		stop_and_lock(false)
	}

	else if(oiEquals(lmessage, '/unlock'))
	{
		default_media_state(false)
	}

	else if(oiEquals(lmessage, '/stopandlock'))
	{
		stop_and_lock()
	}

	else if(oiEquals(lmessage, '/stop'))
	{
		stop_media()
	}

	else if(oiEquals(lmessage, '/default'))
	{
		default_media_state()
	}

	else if(oiEquals(lmessage, '/menu'))
	{
		show_main_menu()
	}

	else if(oiEquals(lmessage, '/media'))
	{
		show_media_menu()
	}

	else if(oiEquals(lmessage, '/user'))
	{
		show_user_menu()
	}

	else if(oiEquals(lmessage, '/imagehistory'))
	{
		show_image_history()
	}

	else if(oiStartsWith(lmessage, '/imagehistory'))
	{
		show_image_history(arg)
	}

	else if(oiEquals(lmessage, '/tvhistory'))
	{
		show_tv_history()
	}

	else if(oiStartsWith(lmessage, '/tvhistory'))
	{
		show_tv_history(arg)
	}

	else if(oiEquals(lmessage, '/radiohistory'))
	{
		show_radio_history()
	}

	else if(oiStartsWith(lmessage, '/radiohistory'))
	{
		show_radio_history(arg)
	}

	else if(oiEquals(lmessage, '/lockimages'))
	{
		toggle_lock_images(true)
	}

	else if(oiEquals(lmessage, '/locktv'))
	{
		toggle_lock_tv(true)
	}

	else if(oiEquals(lmessage, '/lockradio'))
	{
		toggle_lock_radio(true)
	}

	else if(oiEquals(lmessage, '/unlockimages'))
	{
		toggle_lock_images(false)
	}

	else if(oiEquals(lmessage, '/unlocktv'))
	{
		toggle_lock_tv(false)
	}

	else if(oiEquals(lmessage, '/unlockradio'))
	{
		toggle_lock_radio(false)
	}

	else if(oiEquals(lmessage, '/togglelockimages'))
	{
		toggle_lock_images()
	}

	else if(oiEquals(lmessage, '/togglelocktv'))
	{
		toggle_lock_tv()
	}

	else if(oiEquals(lmessage, '/togglelockradio'))
	{
		toggle_lock_radio()
	}

	else if(oiEquals(lmessage, '/showimages'))
	{
		toggle_images(true)
	}

	else if(oiEquals(lmessage, '/showtv'))
	{
		toggle_tv(true)
	}

	else if(oiEquals(lmessage, '/showradio'))
	{
		toggle_radio(true)
	}

	else if(oiEquals(lmessage, '/hideimages'))
	{
		toggle_images(false)
	}

	else if(oiEquals(lmessage, '/hidetv'))
	{
		toggle_tv(false)
	}

	else if(oiEquals(lmessage, '/hideradio'))
	{
		toggle_radio(false)
	}

	else if(oiEquals(lmessage, '/toggleimages'))
	{
		toggle_images()
	}

	else if(oiEquals(lmessage, '/toggletv'))
	{
		toggle_tv()
	}

	else if(oiEquals(lmessage, '/toggleradio'))
	{
		toggle_radio()
	}

	else if(oiEquals(lmessage, '/test'))
	{
		do_test()
	}

	else if(oiEquals(lmessage, '/maximizeimages'))
	{
		maximize_images()
	}

	else if(oiEquals(lmessage, '/maximizetv'))
	{
		maximize_tv()
	}

	else if(oiEquals(lmessage, '/starttv'))
	{
		play_video()
	}

	else if(oiEquals(lmessage, '/stoptv'))
	{
		stop_videos()
	}

	else if(oiEquals(lmessage, '/openimage'))
	{
		show_current_image_modal()
	}

	else if(oiEquals(lmessage, '/openlastimage'))
	{
		show_current_image_modal(false)
	}

	else if(oiEquals(lmessage, '/date'))
	{
		show_current_date()
	}

	else if(oiStartsWith(lmessage, '/js'))
	{
		execute_javascript(arg)
	}

	else if(oiStartsWith(lmessage, '/js2'))
	{
		execute_javascript(arg, false)
	}

	else if(oiEquals(lmessage, '/changeimage'))
	{
		show_image_picker()
	}

	else if(oiEquals(lmessage, '/changetv'))
	{
		show_tv_picker()
	}

	else if(oiEquals(lmessage, '/changeradio'))
	{
		show_radio_picker()
	}

	else if(oiEquals(lmessage, '/closeall'))
	{
		close_all_message()
	}

	else if(oiEquals(lmessage, '/closeallmodals'))
	{
		close_all_modals()
	}

	else if(oiEquals(lmessage, '/closeallpopups'))
	{
		close_all_popups()
	}

	else if(oiEquals(lmessage, '/activityabove'))
	{
		activity_above()
	}

	else if(oiEquals(lmessage, '/activitybelow'))
	{
		activity_below()
	}

	else if(oiEquals(lmessage, '/globalsettings'))
	{
		show_global_settings()
	}

	else if(oiStartsWith(lmessage, '/globalsettings'))
	{
		show_global_settings(arg)
	}

	else if(oiEquals(lmessage, '/roomsettings'))
	{
		show_room_settings()
	}

	else if(oiStartsWith(lmessage, '/roomsettings'))
	{
		show_room_settings(arg)
	}

	else if(oiStartsWith(lmessage, '/goto'))
	{
		goto_url(arg, "tab")
	}

	else if(oiStartsWith(lmessage, '/changeinput'))
	{
		change_input(arg)
		ans.to_history = false
		ans.clr_input = false
	}

	else if(oiEquals(lmessage, '/toggleplayradio'))
	{
		toggle_play_radio()
	}

	else if(oiEquals(lmessage, '/refreshimage'))
	{
		refresh_image()
	}

	else if(oiEquals(lmessage, '/refreshtv'))
	{
		refresh_tv()
	}

	else if(oiEquals(lmessage, '/refreshradio'))
	{
		refresh_radio()
	}

	else if(oiStartsWith(lmessage, '/stopradioin'))
	{
		stop_radio_in(arg)
	}

	else if(oiEquals(lmessage, '/ping'))
	{
		ping_server()
	}

	else if(oiEquals(lmessage, '/reactlike'))
	{
		send_reaction("like")
	}

	else if(oiEquals(lmessage, '/reactlove'))
	{
		send_reaction("love")
	}

	else if(oiEquals(lmessage, '/reacthappy'))
	{
		send_reaction("happy")
	}

	else if(oiEquals(lmessage, '/reactmeh'))
	{
		send_reaction("meh")
	}

	else if(oiEquals(lmessage, '/reactsad'))
	{
		send_reaction("sad")
	}

	else if(oiEquals(lmessage, '/reactdislike'))
	{
		send_reaction("dislike")
	}

	else if(oiEquals(lmessage, '/f1'))
	{
		run_user_function(1)
		ans.to_history = false
	}

	else if(oiEquals(lmessage, '/f2'))
	{
		run_user_function(2)
		ans.to_history = false
	}

	else if(oiEquals(lmessage, '/f3'))
	{
		run_user_function(3)
		ans.to_history = false
	}

	else if(oiEquals(lmessage, '/lockscreen'))
	{
		lock_screen()
	}

	else if(oiEquals(lmessage, '/unlockscreen'))
	{
		unlock_screen()
	}

	else if(oiEquals(lmessage, '/togglelockscreen'))
	{
		if(screen_locked)
		{
			unlock_screen()
		}

		else
		{
			lock_screen()
		}
	}

	else if(oiEquals(lmessage, '/drawimage'))
	{
		open_draw_image()
	}

	else if(oiEquals(lmessage, '/joinvoicechat'))
	{
		join_voice_chat()
	}

	else if(oiEquals(lmessage, '/leavevoicechat'))
	{
		leave_voice_chat()
	}

	else
	{
		feedback("Invalid command. Use // to start a message with /")
	}

	return ans
}

function change_topic(dtopic)
{
	if(is_admin_or_op())
	{
		dtopic = utilz.clean_string2(dtopic.substring(0, max_topic_length))

		if(dtopic.length > 0)
		{
			if(topic !== dtopic)
			{
				socket_emit('change_topic', {topic:dtopic})
			}

			else
			{
				feedback("Topic is already set to that")
			}
		}
	}

	else
	{
		not_an_op()
	}
}

function topicadd(arg)
{
	if(is_admin_or_op())
	{
		arg = utilz.clean_string2(arg)

		if(arg.length === 0)
		{
			return
		}

		var ntopic = topic + topic_separator + arg

		if(ntopic.length > max_topic_length)
		{
			feedback("There is no more room to add that to the topic")
			return
		}

		change_topic(ntopic)
	}

	else
	{
		not_an_op()
	}
}

function topictrim(n)
{
	if(is_admin_or_op())
	{
		var split = topic.split(topic_separator)

		if(split.length > 1)
		{
			if(!isNaN(n))
			{
				if(n < 1)
				{
					return false
				}

				if(n > split.length - 1)
				{
					n = split.length - 1
				}
			}

			else
			{
				feedback("Argument must be a number")
				return false
			}

			if(split.length > 1)
			{
				var t = split.slice(0, -n).join(topic_separator)

				if(t.length > 0)
				{
					change_topic(t)
				}
			}
		}

		else
		{
			feedback("Nothing to trim")
		}
	}

	else
	{
		not_an_op()
	}
}

function topicstart(arg)
{
	if(is_admin_or_op())
	{
		arg = utilz.clean_string2(arg)

		if(arg.length === 0)
		{
			return
		}

		var ntopic = arg + topic_separator + topic

		if(ntopic.length > max_topic_length)
		{
			feedback("There is no more room to add that to the topic")
			return
		}

		change_topic(ntopic)
	}

	else
	{
		not_an_op()
	}
}

function topictrimstart(n)
{
	if(is_admin_or_op())
	{
		var split = topic.split(topic_separator)

		if(split.length > 1)
		{
			if(!isNaN(n))
			{
				if(n < 1)
				{
					return false
				}

				if(n > split.length - 1)
				{
					n = split.length - 1
				}
			}

			else
			{
				feedback("Argument must be a number")
				return false
			}

			if(split.length > 1)
			{
				var t = split.slice(n, split.length).join(topic_separator)

				if(t.length > 0)
				{
					change_topic(t)
				}
			}
		}

		else
		{
			feedback("Nothing to trim")
		}
	}

	else
	{
		not_an_op()
	}
}

function topicedit()
{
	change_input(`/topic ${topic}`)
}

function announce_topic_change(data)
{
	if(data.topic !== topic)
	{
		var highlight = false

		if(data.topic_setter !== username)
		{
			if(check_highlights(data.topic))
			{
				highlight = true
			}
		}

		public_feedback(`${data.topic_setter} changed the topic to: "${data.topic}"`, 
		{
			highlight: highlight,
			username: data.topic_setter,
			open_profile: true
		})

		set_topic_info(data)
		update_title()
	}
}

function announce_room_name_change(data)
{
	if(data.name !== room_name)
	{
		public_feedback(`${data.username} changed the room name to: "${data.name}"`,
		{
			username: data.username,
			open_profile: true
		})

		set_room_name(data.name)
		update_title()
	}
}

function announce_new_username(data)
{
	replace_uname_in_userlist(data.old_username, data.username)

	var show = check_permission(get_role(data.username), "chat")

	if(username === data.old_username)
	{
		set_username(data.username)

		if(show)
		{
			public_feedback(`${data.old_username} is now known as ${username}`,
			{
				username: data.username,
				open_profile: true
			})
		}

		else
		{
			feedback(`You are now known as ${username}`,
			{
				username: data.username,
				open_profile: true
			})
		}
	}

	else
	{
		if(show)
		{
			public_feedback(`${data.old_username} is now known as ${data.username}`,
			{
				username: data.username,
				open_profile: true
			})
		}
	}
}

function goto_top()
{
	scroll_chat_to(0)
	hide_top_scroller()
}

function goto_bottom(force=false, animate=true)
{
	var $ch = $("#chat_area")

	var max = $ch.prop('scrollHeight') - $ch.innerHeight()

	if(force)
	{
		scroll_chat_to(max + 10, animate)
		hide_top_scroller()
		hide_bottom_scroller()
	}

	else
	{
		if($('#bottom_scroller_container').css('visibility') === 'hidden')
		{
			scroll_chat_to(max + 10, animate)
		}
	}
}

function emit_change_image_source(url)
{
	if(!can_images)
	{
		feedback("You don't have permission to link images")
		return false
	}

	socket_emit('change_image_source', {src:url})
}

function get_radio_metadata_enabled()
{
	return loaded_radio_type === "radio" &&
	radio_get_metadata &&
	loaded_radio_metadata &&
	room_radio_mode !== "disabled" &&
	room_state.radio_enabled
}

function get_radio_metadata()
{
	if(!get_radio_metadata_enabled())
	{
		return false
	}

	if(radio_get_metadata_ongoing)
	{
		return false
	}

	try
	{
		radio_get_metadata_ongoing = true

		$.get(loaded_radio_metadata, {},

		function(data)
		{
			radio_get_metadata_ongoing = false

			if(!get_radio_metadata_enabled())
			{
				return false
			}

			try
			{
				var source = false

				if(Array.isArray(data.icestats.source))
				{
					for(var i=0; i<data.icestats.source.length; i++)
					{
						var source = data.icestats.source[i]

						if(source.listenurl.includes(loaded_radio_source.split('/').pop()))
						{
							if(source.artist !== undefined && source.title !== undefined)
							{
								break
							}
						}
					}
				}

				else if(data.icestats.source.listenurl.includes(loaded_radio_source.split('/').pop()))
				{
					var source = data.icestats.source
				}

				else
				{
					on_radio_get_metadata_error()
					return false
				}

				if(!source || source.artist === undefined || source.title === undefined)
				{
					on_radio_get_metadata_error()
					return false
				}

				push_played({title:source.title, artist:source.artist})
			}

			catch(err)
			{
				on_radio_get_metadata_error()
				return false
			}

		}).fail(function(err, status)
		{
			radio_get_metadata_ongoing = false

			if(err.status === 404)
			{
				on_radio_get_metadata_error(true, false)
			}

			else
			{
				on_radio_get_metadata_error()
			}
		})
	}

	catch(err)
	{
		radio_get_metadata_ongoing = false
		on_radio_get_metadata_error()
	}
}

function on_radio_get_metadata_error(show_file=true, retry=true)
{
	radio_get_metadata = false

	if(retry)
	{
		clearTimeout(radio_metadata_fail_timeout)

		radio_metadata_fail_timeout = setTimeout(function()
		{
			radio_get_metadata = true
		}, radio_retry_metadata_delay)
	}

	if(show_file)
	{
		var s = loaded_radio_source.split('/')

		if(s.length > 1)
		{
			push_played(false, {s1: s.pop(), s2:loaded_radio_source})
		}

		else
		{
			hide_now_playing()
		}
	}
}

function start_played_click_events()
{
	$("#played").on("click", ".played_item_inner", function()
	{
		if($(this).data('q2') !== '')
		{
			goto_url($(this).data('q2'), "tab")
		}

		else
		{
			search_on('google', $(this).data('q'))
		}
	})
}

function push_played(info, info2=false)
{
	if(info)
	{
		var s = `${info.title} - ${info.artist}`
		var q = `"${info.title}" by "${info.artist}"`
		var q2 = ""
	}

	else
	{
		var s = info2.s1
		var q = info2.s1
		var q2 = info2.s2
	}

	if($("#now_playing").text() === s)
	{
		return
	}

	$('#now_playing').text(s)

	$('#header_now_playing_controls').data('q', q)

	if(played[played.length - 1] !== s)
	{
		var title = nice_date()

		var pi = `
		<div class='played_item_inner pointer inline action' title='${title}'>
			<div class='pititle'></div><div class='piartist'></div>
		</div>`

		h = $(`<div class='played_item'>${pi}</div>`)

		if(info)
		{
			h.find('.pititle').eq(0).text(info.title)
			h.find('.piartist').eq(0).text(`by ${info.artist}`)
		}

		else
		{
			h.find('.pititle').eq(0).text(info2.s1)
			h.find('.piartist').eq(0).text(`${info2.s2}`)
		}

		var inner = h.find(".played_item_inner").eq(0)

		inner.data('q', q)
		inner.data('q2', q2)

		$('#played').prepend(h)

		played.push(s)

		if(played.length > played_crop_limit)
		{
			var els = $('#played').children()
			els.slice(els.length - 1, els.length).remove()
			played.splice(0, 1)
		}

		if(played_filtered)
		{
			do_played_filter()
		}

		update_modal_scrollbar("played")
	}

	show_now_playing()
}

function hide_now_playing()
{
	$('#header_now_playing_area').css('display', 'none')
}

function show_now_playing()
{
	$('#header_now_playing_area').css('display', 'flex')
}

function start_radio()
{
	if(loaded_radio_type === "radio")
	{
		$('#audio').attr("src", loaded_radio_source)
		$('#audio')[0].play()
	}

	else if(loaded_radio_type === "youtube")
	{
		if(youtube_player !== undefined)
		{
			youtube_player.playVideo()
		}
	}

	else if(loaded_radio_type === "soundcloud")
	{
		if(soundcloud_player !== undefined)
		{
			soundcloud_player.play()
		}
	}

	$('#header_radio_playing_icon').css('display', 'flex')
	$('#header_radio_volume_area').css('display', 'flex')
	$('#toggle_now_playing_text').html('Stop Radio')

	radio_started = true

	if(stop_radio_timeout)
	{
		clear_automatic_stop_radio()
	}
}

function stop_radio()
{
	$('#audio').attr("src", "")

	if(youtube_player !== undefined)
	{
		youtube_player.pauseVideo()
	}

	if(soundcloud_player !== undefined)
	{
		soundcloud_player.pause()
	}

	$('#header_radio_playing_icon').css('display', 'none')
	$('#header_radio_volume_area').css('display', 'none')
	$('#toggle_now_playing_text').html('Start Radio')

	radio_started = false

	if(stop_radio_timeout)
	{
		clear_automatic_stop_radio()
	}
}

function toggle_play_radio()
{
	if(radio_started)
	{
		stop_radio()
	}

	else
	{
		start_radio()
	}
}

function toggle_radio_state()
{
	if(radio_started)
	{
		stop_radio()
	}

	else
	{
		start_radio()
	}
}

function start_metadata_loop()
{
	setInterval(function()
	{
		if(get_radio_metadata_enabled())
		{
			get_radio_metadata()
		}
	}, radio_metadata_interval_duration)
}

function start_volume_scroll()
{
	$('#header')[0].addEventListener("wheel", function(e)
	{
		if(!radio_started)
		{
			return false
		}

		var direction = e.deltaY > 0 ? 'down' : 'up'

		if(direction === 'up')
		{
			volume_increase()
		}

		else if(direction === 'down')
		{
			volume_decrease()
		}
	})
}

function set_radio_volume(nv=false, changed=true)
{
	if(typeof nv !== "number")
	{
		nv = room_state.radio_volume
	}

	nv = utilz.round(nv, 1)

	if(nv > 1)
	{
		nv = 1
	}

	else if(nv < 0)
	{
		nv = 0
	}

	room_state.radio_volume = nv

	var vt = parseInt(Math.round((nv * 100)))

	$('#audio')[0].volume = room_state.radio_volume

	if(youtube_player !== undefined)
	{
		youtube_player.setVolume(vt)
		youtube_player.unMute()
	}

	if(soundcloud_player !== undefined)
	{
		soundcloud_player.setVolume(vt)
	}

	if(changed)
	{
		$('#volume').text(`${vt} %`)
		save_room_state()
	}
}

function set_tv_volume(nv=false)
{
	nv = utilz.round(nv, 1)

	if(nv > 1)
	{
		nv = 1
	}

	else if(nv < 0)
	{
		nv = 0
	}

	var vt = parseInt(Math.round((nv * 100)))

	$('#media_video')[0].volume = nv

	if(youtube_video_player !== undefined)
	{
		youtube_video_player.setVolume(vt)
	}

	if(twitch_video_player !== undefined)
	{
		twitch_video_player.setVolume(nv)
	}
}

function volume_increase()
{
	if(room_state.radio_volume === 1)
	{
		return false
	}

	var nv = room_state.radio_volume + 0.1

	set_radio_volume(nv)
}

function volume_decrease()
{
	if(room_state.radio_volume === 0)
	{
		return false
	}

	var nv = room_state.radio_volume - 0.1

	set_radio_volume(nv)
}

function change_volume_command(arg, type="radio")
{
	if(isNaN(arg))
	{
		feedback("Argument must be a number")
		return false
	}

	else
	{
		var nv = arg / 100

		if(type === "radio")
		{
			set_radio_volume(nv)
		}

		else if(type === "tv")
		{
			set_tv_volume(nv)
		}
	}
}

function sound_notify(type)
{
	if(!started)
	{
		return false
	}

	if(type === "voice_chat_join")
	{
		if(get_setting("beep_on_voice_chat_joins"))
		{
			var sound = "voice_chat_join"
		}

		else
		{
			return false
		}
	}

	else if(type === "voice_chat_left")
	{
		if(get_setting("beep_on_voice_chat_parts"))
		{
			var sound = "voice_chat_left"
		}

		else
		{
			return false
		}
	}

	else if(!app_focused)
	{
		if(type === "message")
		{
			if(!get_setting("beep_on_messages"))
			{
				return false
			}

			if(afk)
			{
				if(get_setting("afk_disable_messages_beep"))
				{
					return false
				}
			}

			var sound = "pup"
		}

		else if(type === "media_change")
		{
			if(!get_setting("beep_on_media_change"))
			{
				return false
			}

			if(afk)
			{
				if(get_setting("afk_disable_media_change_beep"))
				{
					return false
				}
			}

			var sound = "pup"
		}

		else if(type === "highlight")
		{
			if(!get_setting("beep_on_highlights"))
			{
				return false
			}

			if(afk)
			{
				if(get_setting("afk_disable_highlights_beep"))
				{
					return false
				}
			}

			var sound = "highlight"
		}

		else if(type === "join")
		{
			if(!get_setting("beep_on_user_joins"))
			{
				return false
			}

			if(afk)
			{
				if(get_setting("afk_disable_joins_beep"))
				{
					return false
				}
			}

			var sound = "join"
		}

		else
		{
			return false
		}
	}

	else
	{
		return false
	}

	play_audio(sound)
}

function alert_title()
{
	if(!started)
	{
		return false
	}

	if(!app_focused)
	{
		if(alert_mode === 0)
		{
			alert_mode = 1
			update_title()
		}
	}
}

function alert_title2()
{
	if(!started)
	{
		return false
	}

	if(!app_focused)
	{
		if(alert_mode !== 2)
		{
			alert_mode = 2
			update_title()
		}
	}
}

function remove_alert_title()
{
	if(alert_mode > 0)
	{
		alert_mode = 0
		update_title()
	}
}

function set_title(s)
{
	document.title = s.substring(0, max_title_length)
}

function update_title()
{
	var t = ""

	if(alert_mode === 1)
	{
		t += "(*) "
	}

	else if(alert_mode === 2)
	{
		t += "(!) "
	}

	t += room_name

	if(topic !== '')
	{
		t += ` ${title_separator} ${topic}`
	}

	set_title(t)
}

function activate_visibility_listener()
{
	document.addEventListener("visibilitychange", function()
	{
		process_visibility()

	}, false)

	window.onblur = function()
	{
		num_keys_pressed = 0
	}
}

function process_visibility()
{
	if(screen_locked && get_setting("afk_on_lockscreen"))
	{
		return false
	}

	app_focused = !document.hidden

	if(app_focused)
	{
		on_app_focused()
	}

	else
	{
		on_app_unfocused()
	}	
}

function on_app_focused()
{
	if(afk_timer !== undefined)
	{
		clearTimeout(afk_timer)
	}

	afk = false

	remove_alert_title()

	if(change_image_when_focused)
	{
		change({type:"image"})
		change_image_when_focused = false
	}

	if(change_tv_when_focused)
	{
		change({type:"tv"})
		change_tv_when_focused = false
	}

	if(change_radio_when_focused)
	{
		change({type:"radio"})
		change_radio_when_focused = false
	}
}

function on_app_unfocused()
{
	if(get_setting("afk_delay") !== "never")
	{
		afk_timer = setTimeout(function()
		{
			afk = true
		}, get_setting("afk_delay"))
	}

	remove_separator(false)
	update_chat_scrollbar()
	check_scrollers()
}

function copy_room_url()
{
	if(room_id === main_room_id)
	{
		var r = ''
	}

	else
	{
		var r = '/' + room_id
	}

	var url = window.location.origin + r

	copy_string(url)

	play_audio("pup2")
}

function copy_string(s)
{
	var textareaEl = document.createElement('textarea')

	document.body.appendChild(textareaEl)

	textareaEl.value = s
	textareaEl.select()

	document.execCommand('copy')
	document.body.removeChild(textareaEl)
}

function play_audio(what)
{
	$(`#audio_${what}`)[0].play()
}

function word_generator(pattern)
{
	var possibleC = "BCDFGHJKLMNPQRSTVWXZ"
	var possibleV = "AEIOUY"

	var pIndex = pattern.length
	var res = new Array(pIndex)

	while (pIndex--)
	{
		res[pIndex] = pattern[pIndex]
		.replace(/v/,randomCharacter(possibleV))
		.replace(/c/,randomCharacter(possibleC))
	}

	function randomCharacter(bucket)
	{
		var res = bucket.charAt(Math.floor(Math.random() * bucket.length))
		return res
	}

	return res.join("").toLowerCase()
}

function goto_url(u, mode="same", encode=false)
{
	if(encode)
	{
		u = encodeURIComponent(u)
	}

	if(mode === "tab")
	{
		window.open(u, "_blank")
	}

	else
	{
		window.location = u
	}
}

function create_room(data)
{
	msg_info2.close(function()
	{
		socket_emit('create_room', data)
	})
}

function restart_client()
{
	window.location = window.location
}

function get_nice_volume(volume)
{
	return parseInt(Math.round((volume * 100)))
}

var chat_search_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			chat_search($("#chat_search_filter").val())
		}, filter_delay)
	}
})()

function show_chat_search(filter=false)
{
	msg_chat_search.show(function()
	{
		if(filter)
		{
			chat_search(filter)
		}

		$("#chat_search_filter").focus()
	})
}

function reset_chat_search_filter()
{
	$("#chat_search_filter").val("")
	chat_search()
}

function chat_search(filter=false)
{
	if(filter)
	{
		sfilter = filter
	}

	else
	{
		sfilter = ''
	}

	$("#chat_search_filter").val(sfilter)

	if(!filter)
	{
		$("#chat_search_container").html("Search for chat messages")
		update_modal_scrollbar("chat_search")
		return
	}

	filter = filter.trim().toLowerCase()

	var c = $("<div></div>")

	if(chat_history.length > 0)
	{
		for(var message of chat_history.slice(0).reverse())
		{
			var show = false

			var huname = message.find('.chat_uname').eq(0)
			var hcontent_container = message.find('.chat_content_container').eq(0)
			var hcontent = message.find('.chat_content')

			if(huname.length !== 0 && hcontent.length !== 0)
			{
				var uname = huname.text()

				var content = ""

				hcontent.each(function()
				{
					content += `${message.text()} `
				})

				if(uname.toLowerCase().includes(filter))
				{
					show = true
				}

				else if(content.toLowerCase().includes(filter))
				{
					show = true
				}

				if(show)
				{
					var cn = $("<div class='chat_search_result_item'><div class='chat_search_result_uname generic_uname inline action'></div><div class='chat_search_result_content'></div>")
					cn.find(".chat_search_result_uname").eq(0).text(huname.text())
					cn.find(".chat_search_result_content").eq(0).html(hcontent.clone(true, true))
					c.append(cn)
				}
			}

			else
			{
				var hcontent = message.find(".announcement_content").eq(0)

				if(hcontent.length === 0)
				{
					continue
				}

				var content = hcontent.text()

				if(!content.toLowerCase().includes(filter))
				{
					continue
				}

				var cn = $("<div class='chat_search_result_item'><div class='chat_search_result_content'></div>")

				cn.find(".chat_search_result_content").eq(0).html(hcontent.parent().clone(true, true))

				c.append(cn)
			}
		}
	}

	if(c.find(".chat_search_result_item").length === 0)
	{
		c = "No results"
	}

	else
	{
		c = c[0]
	}

	$("#chat_search_container").html(c)

	update_modal_scrollbar("chat_search")

	$('#Msg-content-container-search').scrollTop(0)
}

function fix_chat_scroll()
{
	$("#chat_area").find(".ps__rail-x").eq(0).prependTo("#chat_area")
	$("#chat_area").find(".ps__rail-y").eq(0).prependTo("#chat_area")
}

function chat_scroll_bottom(force=true, animate=true)
{
	update_chat_scrollbar()
	fix_chat_scroll()
	goto_bottom(force, animate)
}

function clear_chat()
{
	$('#chat_area').html('<div><br><br><br><br></div>')

	show_log_messages()
	goto_bottom(true)
	focus_input()
}

function unclear_chat()
{
	clear_chat()

	if(chat_history.length === 0)
	{
		return false
	}

	for(var el of chat_history)
	{
		add_to_chat(el.clone(true, true), false, false)
	}

	chat_scroll_bottom()
}

function clear_input()
{
	$('#input').val("")
	old_input_val = ""
}

function add_to_input(what)
{
	$('#input').val(`${$('#input').val() + what} `).focus()
}

function set_topic_info(data)
{
	if(!data)
	{
		data = {}

		data.topic = ""
		data.topic_setter = ""
		data.topic_date = ""
	}

	topic = data.topic
	topic_setter = data.topic_setter
	topic_date = nice_date(data.topic_date)

	if(topic)
	{
		$("#header_topic_text").text(topic)
	}

	else
	{
		var t = get_unset_topic()

		$("#header_topic_text").text(t)
	}

	config_admin_topic()
}

function check_firstime()
{
	if(get_local_storage(ls_first_time) === null)
	{
		first_time = true

		show_intro()
		save_local_storage(ls_first_time, false)
	}

	else
	{
		first_time = false
	}
}

function big_letter(s)
{
	return s.toUpperCase()[0]
}

function change_role(uname, rol)
{
	if(is_admin_or_op())
	{
		if(uname.length > 0 && uname.length <= max_max_username_length)
		{
			if(uname === username)
			{
				feedback("You can't assign a role to yourself")
				return false
			}

			if((rol === 'admin' || rol === 'op') && role !== 'admin')
			{
				forbiddenuser()
				return false
			}

			if(!roles.includes(rol))
			{
				feedback("Invalid role")
				return false
			}

			socket_emit('change_role', {username:uname, role:rol})
		}
	}

	else
	{
		not_an_op()
	}
}

function show_upload_error()
{
	feedback("The image could not be uploaded")
}

function announce_image_change(data, date=false, show=true)
{
	if(!data.image_setter)
	{
		show = false
	}

	if(date)
	{
		var d = date
	}

	else
	{
		if(data.image_date !== undefined)
		{
			var d = data.image_date
		}

		else
		{
			var d = Date.now()
		}
	}

	var nd = nice_date(d)

	if(data.image_source === '')
	{
		var name = 'default'
		var src = default_image_source
	}

	else
	{
		var name = data.image_source
		var src = data.image_source
	}

	if(data.image_source === "")
	{
		var title = `Setter: ${data.image_setter} | ${nd}`
		var message = `${data.image_setter} changed the image to default`
	}

	else if(data.image_type === "link")
	{
		var title = `Setter: ${data.image_setter} | ${nd}`
		var message = `${data.image_setter} changed the image`
	}

	else if(data.image_type === "upload")
	{
		var title = `Setter: ${data.image_setter} | Size: ${get_size_string(data.image_size)} | ${nd}`
		var message = `${data.image_setter} changed the image`
	}

	var onclick = function()
	{
		show_modal_image(src, title, d)
	}

	if(show)
	{
		chat_announce(
		{
			brk: "<i class='icon2c fa fa-camera'></i>",
			save: true,
			date: d,
			type: "image_change",
			username: data.image_setter,
			title: title,
			message: message,
			onclick: onclick
		})
	}

	var ic_data = {}

	ic_data.url = data.image_source
	ic_data.title = title
	ic_data.date_raw = d
	ic_data.setter = data.image_setter

	push_images_changed(ic_data)

	set_modal_image_number()
}

function push_images_changed(data)
{
	if(!data.url)
	{
		data.url = default_image_source
	}

	if(!data.setter)
	{
		data.title = "Default Image"
	}

	for(var i=0; i<images_changed.length; i++)
	{
		var img = images_changed[i]

		if(img.url === data.url)
		{
			images_changed.splice(i, 1)
		}
	}

	images_changed.push(data)

	if(images_changed.length > media_changed_crop_limit)
	{
		images_changed = images_changed.slice(images_changed.length - media_changed_crop_limit)
	}
}

function announce_role_change(data)
{
	if(username === data.username2)
	{
		set_role(data.role)
	}

	public_feedback(`${data.username1} gave ${data.role} to ${data.username2}`,
	{
		username: data.username1,
		open_profile: true
	})

	replace_role_in_userlist(data.username2, data.role)
}

function set_role(rol, config=true)
{
	role = rol

	check_permissions()

	if(config)
	{
		config_main_menu()
	}
}

function change_privacy(what)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(is_public === what)
	{
		if(what)
		{
			feedback("Room is already public")
		}

		else
		{
			feedback("Room is already private")
		}
	}

	socket_emit('change_privacy', {what:what})
}

function announce_privacy_change(data)
{
	set_privacy(data.what)

	if(is_public)
	{
		var s = `${data.username} made the room public`
		s += ". The room will appear in the public room list"
	}

	else
	{
		var s = `${data.username} made the room private`
		s += ". The room won't appear in the public room list"
	}

	public_feedback(s,
	{
		username: data.username,
		open_profile: true
	})
}

function change_radio_source(src)
{
	if(can_radio)
	{
		if(src.startsWith("/"))
		{
			return false
		}

		if(src === "default")
		{
			socket_emit('change_radio_source', {src:"default"})
			return
		}

		else if(src === "prev" || src === "previous")
		{
			if(radio_changed.length > 1)
			{
				src = radio_changed[radio_changed.length - 2].url
			}

			else
			{
				feedback("No radio source before current one")
				return false
			}
		}

		if(src.length === 0)
		{
			return false
		}

		if(src.length > max_tv_source_length)
		{
			return false
		}

		if(src.startsWith("http://") || src.startsWith("https://"))
		{
			if(src.includes("youtube.com") || src.includes("youtu.be"))
			{
				if(!youtube_enabled)
				{
					feedback("YouTube support is not enabled")
					return
				}
			}

			else if(src.includes("soundcloud.com"))
			{
				if(!soundcloud_enabled)
				{
					feedback("Soundcloud support is not enabled")
					return
				}
			}

			else
			{
				var extension = utilz.get_extension(src).toLowerCase()

				if(extension)
				{
					if(!utilz.audio_extensions.includes(extension))
					{
						feedback("That doesn't seem to be an audio")
						return false
					}
				}
			}
		}

		else if(src !== "restart" && src !== "reset")
		{
			if(!youtube_enabled)
			{
				feedback("Invalid radio source")
				return
			}
		}

		socket_emit('change_radio_source', {src:src})
	}

	else
	{
		feedback("You don't have permission to change the radio")
	}
}

function announce_radio_change(data, date=false, action="change", show=true)
{
	if(!data.radio_setter)
	{
		show = false
	}

	if(data.radio_title)
	{
		var name = conditional_quotes(data.radio_title)
	}

	else if(!data.radio_source)
	{
		var name = 'default'
	}

	else
	{
		var name = data.radio_source
	}

	var time = utilz.get_youtube_time(data.radio_source)

	if(time !== 0)
	{
		name += ` (At ${utilz.humanize_seconds(time)})`
	}

	if(data.radio_source === '')
	{
		var src = default_radio_source
	}

	else
	{
		var src = data.radio_source
	}

	if(date)
	{
		var d = date
	}

	else
	{
		if(data.radio_date !== undefined && action !== "restart")
		{
			var d = data.radio_date
		}

		else
		{
			var d = Date.now()
		}
	}

	var nd = nice_date(d)

	if(action === "restart")
	{
		var title = undefined
	}

	else
	{
		var title = `Setter: ${data.radio_setter} | ${nd}`
	}

	var onclick = function()
	{
		goto_url(src, "tab")
	}

	if(action === "restart")
	{
		var message = `${data.username} restarted the radio`
	}

	else
	{
		var message = `${data.radio_setter} changed the radio to: ${name}`
	}

	if(show)
	{
		chat_announce(
		{
			brk: "<i class='icon2c fa fa-volume-up'></i>",
			message: message,
			title: title,
			onclick: onclick,
			save: true,
			date: d,
			type: "radio_change",
			username: data.radio_setter
		})
	}

	var ic_data = {}

	ic_data.url = data.radio_source
	ic_data.date_raw = d
	ic_data.setter = data.radio_setter

	push_radio_changed(ic_data)
}
function push_radio_changed(data)
{
	if(!data.url)
	{
		data.url = default_radio_source
	}

	for(var i=0; i<radio_changed.length; i++)
	{
		var radio = radio_changed[i]

		if(radio.url === data.url)
		{
			radio_changed.splice(i, 1)
		}
	}

	radio_changed.push(data)

	if(radio_changed.length > media_changed_crop_limit)
	{
		radio_changed = radio_changed.slice(radio_changed.length - media_changed_crop_limit)
	}
}

function change_tv_source(src)
{
	if(can_tv)
	{
		if(src.startsWith("/"))
		{
			return false
		}

		if(src === "default")
		{
			socket_emit('change_tv_source', {src:"default"})
			return
		}

		else if(src === "prev" || src === "previous")
		{
			if(tv_changed.length > 1)
			{
				src = tv_changed[tv_changed.length - 2].url
			}

			else
			{
				feedback("No tv source before current one")
				return false
			}
		}

		if(src.length === 0)
		{
			return false
		}

		if(src.length > max_tv_source_length)
		{
			return false
		}

		if(src.startsWith("http://") || src.startsWith("https://"))
		{
			if(src.includes("youtube.com") || src.includes("youtu.be"))
			{
				if(utilz.get_youtube_id(src) && !youtube_enabled)
				{
					feedback("YouTube support is not enabled")
					return
				}
			}

			else if(src.includes("twitch.tv"))
			{
				if(utilz.get_twitch_id(src) && !twitch_enabled)
				{
					feedback("Twitch support is not enabled")
					return
				}
			}

			else if(src.includes("soundcloud.com"))
			{
				if(!soundcloud_enabled)
				{
					feedback("Soundcloud support is not enabled")
					return
				}
			}

			else
			{
				var extension = utilz.get_extension(src).toLowerCase()

				if(extension)
				{
					if(utilz.image_extensions.includes(extension))
					{
						feedback("That doesn't seem to be a video")
						return false
					}
				}
			}
		}

		else if(src !== "restart" && src !== "reset")
		{
			if(!youtube_enabled)
			{
				feedback("YouTube support is not enabled")
				return
			}
		}

		socket_emit('change_tv_source', {src:src})
	}

	else
	{
		feedback("You don't have permission to change the tv")
	}
}

function announce_tv_change(data, date=false, action="change", show=true)
{
	if(!data.tv_setter)
	{
		show = false
	}

	if(data.tv_title)
	{
		var name = conditional_quotes(data.tv_title)
	}

	else if(!data.tv_source)
	{
		var name = 'default'
	}

	else
	{
		var name = data.tv_source
	}

	var time = utilz.get_youtube_time(data.tv_source)

	if(time !== 0)
	{
		name += ` (At ${utilz.humanize_seconds(time)})`
	}

	if(data.tv_source === '')
	{
		var src = default_tv_source
	}

	else
	{
		var src = data.tv_source
	}

	if(date)
	{
		var d = date
	}

	else
	{
		if(data.tv_date !== undefined && action !== "restart")
		{
			var d = data.tv_date
		}

		else
		{
			var d = Date.now()
		}
	}

	var nd = nice_date(d)

	if(action === "restart")
	{
		var title = undefined
	}

	else
	{
		var title = `Setter: ${data.tv_setter} | ${nd}`
	}

	var onclick = function()
	{
		goto_url(src, "tab")
	}

	if(action === "restart")
	{
		var message = `${data.username} restarted the tv`
	}

	else
	{
		var message = `${data.tv_setter} changed the tv to: ${name}`
	}

	if(show)
	{
		chat_announce(
		{
			brk: "<i class='icon2c fa fa-television'></i>",
			message: message,
			title: title,
			onclick: onclick,
			save: true,
			date: d,
			type: "tv_change",
			username: data.tv_setter
		})
	}
	
	var ic_data = {}

	ic_data.url = data.tv_source
	ic_data.date_raw = d
	ic_data.setter = data.tv_setter

	push_tv_changed(ic_data)
}

function push_tv_changed(data)
{
	if(!data.url)
	{
		data.url = default_tv_source
	}

	for(var i=0; i<tv_changed.length; i++)
	{
		var tv = tv_changed[i]

		if(tv.url === data.url)
		{
			tv_changed.splice(i, 1)
		}
	}

	tv_changed.push(data)

	if(tv_changed.length > media_changed_crop_limit)
	{
		tv_changed = tv_changed.slice(tv_changed.length - media_changed_crop_limit)
	}
}

function ban(uname)
{
	if(is_admin_or_op())
	{
		if(uname.length > 0 && uname.length <= max_max_username_length)
		{
			if(uname === username)
			{
				feedback("You can't ban yourself")
				return false
			}

			socket_emit('ban', {username:uname})
		}
	}

	else
	{
		not_an_op()
	}
}

function unban(uname)
{
	if(is_admin_or_op())
	{
		if(uname.length > 0 && uname.length <= max_max_username_length)
		{
			if(uname === username)
			{
				feedback("You can't unban yourself")
				return false
			}

			socket_emit('unban', {username:uname})
		}
	}

	else
	{
		not_an_op()
	}
}

function unban_all()
{
	if(is_admin_or_op())
	{
		socket_emit('unban_all', {})
	}

	else
	{
		not_an_op()
	}
}

function get_banned_count()
{
	if(is_admin_or_op())
	{
		socket_emit('get_banned_count', {})
	}
}

function receive_banned_count(data)
{
	if(data.count === 1)
	{
		var s = `There is ${data.count} user banned`
	}

	else
	{
		var s = `There are ${data.count} users banned`
	}

	msg_info.show(s)
}

function kick(uname)
{
	if(is_admin_or_op())
	{
		if(uname.length > 0 && uname.length <= max_max_username_length)
		{
			if(uname === username)
			{
				feedback("You can't kick yourself")
				return false
			}

			if(!usernames.includes(uname))
			{
				user_not_in_room()
				return false
			}

			var rol = get_role(uname)

			if((rol === 'admin' || rol === 'op') && role !== 'admin')
			{
				forbiddenuser()
				return false
			}

			socket_emit('kick', {username:uname})
		}
	}

	else
	{
		not_an_op()
	}
}

function announce_unban_all(data)
{
	public_feedback(`${data.username} unbanned all banned users`,
	{
		username: data.username,
		open_profile: true
	})
}

function isalready(who, what)
{
	if(what === 'voice1')
	{
		feedback(`${who} already has voice 1`)
	}

	else if(what === 'voice2')
	{
		feedback(`${who} already has voice 2`)
	}

	else if(what === 'voice3')
	{
		feedback(`${who} already has voice 3`)
	}

	else if(what === 'voice4')
	{
		feedback(`${who} already has voice 4`)
	}

	else if(what === 'op')
	{
		feedback(`${who} is already an op`)
	}

	else if(what === 'admin')
	{
		feedback(`${who} is already an admin`)
	}
}

function forbiddenuser()
{
	feedback("That operation is forbidden on that user")
}

function search_on(site, q)
{
	q = encodeURIComponent(q)

	if(site === 'google')
	{
		goto_url(`https://www.google.com/search?q=${q}`, "tab")
	}

	else if(site === 'soundcloud')
	{
		goto_url(`https://soundcloud.com/search?q=${q}`, "tab")
	}

	else if(site === 'youtube')
	{
		goto_url(`https://www.youtube.com/results?search_query=${q}`, "tab")
	}
}

function reset_voices()
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	socket_emit('reset_voices', {})
}

function remove_ops()
{
	if(role !== 'admin')
	{
		feedback("You are not a room admin")
		return false
	}

	socket_emit('remove_ops', {})
}

function announce_voices_resetted(data)
{
	public_feedback(`${data.username} resetted the voices`,
	{
		username: data.username,
		open_profile: true
	})

	if(role.startsWith('voice') && role !== "voice1")
	{
		set_role("voice1")
	}

	reset_voices_userlist()
}

function announce_removedops(data)
{
	public_feedback(`${data.username} removed all ops`,
	{
		username: data.username,
		open_profile: true
	})

	if(role === 'op')
	{
		set_role("voice1")
	}

	remove_ops_userlist()
}

function userdisconnect(data)
{
	var type = data.disconnection_type

	if(type === "disconnection")
	{
		start_user_disconnect_timeout(data)
	}

	else
	{
		do_userdisconnect(data)
	}
}

function clear_from_users_to_disconnect(data)
{
	for(var i=0; i<users_to_disconnect.length; i++)
	{
		var u = users_to_disconnect[i]

		if(u.username === data.username)
		{
			clearTimeout(u.timeout)
			users_to_disconnect.splice(i, 1)
			break
		}
	}
}

function start_user_disconnect_timeout(data)
{
	clear_from_users_to_disconnect(data)

	data.timeout = setTimeout(function()
	{
		do_userdisconnect(data)
	}, disconnect_timeout_delay)

	users_to_disconnect.push(data)
}

function do_userdisconnect(data)
{
	clear_from_users_to_disconnect(data)

	if(get_setting("show_parts") && check_permission(data.role, "chat"))
	{
		var type = data.disconnection_type

		if(type === "disconnection")
		{
			var s = `${data.username} has left`
		}

		else if(type === "pinged")
		{
			var s = `${data.username} has left (Ping Timeout)`
		}

		else if(type === "kicked")
		{
			var s = `${data.username} was kicked by ${data.info1}`
		}

		else if(type === "banned")
		{
			var s = `${data.username} was banned by ${data.info1}`
		}

		chat_announce(
		{
			brk: "<i class='icon2c fa fa-sign-out'></i>",
			message: s,
			save: true,
			username: data.username
		})
	}

	removefrom_userlist(data.username)
}

function start_msg()
{
	var common =
	{
		show_effect_duration: [200, 200],
		close_effect_duration: [200, 200],
		clear_editables: true
	}

	if(get_setting("modal_effects"))
	{
		common.show_effect = "fade"
		common.close_effect = "fade"
	}

	else
	{
		common.show_effect = "none"
		common.close_effect = "none"
	}

	var titlebar =
	{
		enable_titlebar: true,
		center_titlebar: true,
		titlebar_class: "!custom_titlebar !unselectable",
		window_inner_x_class: "!titlebar_inner_x"
	}

	msg_main_menu = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "main_menu",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				close_togglers("main_menu")
			}
		})
	)

	msg_user_menu = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "user_menu",
			clear_editables: false,
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				close_togglers("user_menu")
			}
		})
	)

	msg_userlist = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "userlist",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_userlist_filter()
			}
		})
	)

	msg_public_roomlist = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "public_roomlist",
			window_width: "26em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
			}
		})
	)

	msg_visited_roomlist = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "visited_roomlist",
			window_width: "26em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
			}
		})
	)

	msg_played = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "played",
			window_width: "26em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_played_filter()
			}
		})
	)

	msg_modal_image = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "modal_image",
			preset: "window",
			overlay_class: "!overlay_same_color",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
				modal_image_open = true
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				clear_modal_image_info()
				msg_modal_image_number.close()
				modal_image_open = false
			}
		})
	)

	msg_modal_image_number = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "modal_image_number",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
				minpo = true
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				minpo = false
			}
		})
	)

	msg_lockscreen = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "lockscreen",
			preset: "window",
			overlay_class: "!overlay_same_color",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
			}
		})
	)

	msg_profile = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "profile",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)

				$("#show_profile_uname").text("Loading")
				$("#show_profile_image").attr("src", profile_image_loading_url)
			}
		})
	)

	msg_info = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "info",
			window_height: "auto",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			before_show: function(instance)
			{
				info_vars_to_false()
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				instance.content.innerHTML = ""
				info_vars_to_false()
			}
		})
	)

	msg_info2 = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "info2",
			window_height: "auto",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			before_show: function(instance)
			{
				info2_vars_to_false()
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				instance.content.innerHTML = ""
				instance.titlebar.innerHTML = ""
				info2_vars_to_false()
			}
		})
	)

	msg_image_picker = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "image_picker",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
				iup = true
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				$("#image_source_picker_input").val("")
				iup = false
			}
		})
	)

	msg_tv_picker = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "tv_picker",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
				tup = true
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				$("#tv_source_picker_input").val("")
				tup = false
			}
		})
	)

	msg_radio_picker = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "radio_picker",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
				rup = true
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				$("#radio_source_picker_input").val("")
				rup = false
			}
		})
	)

	msg_media_menu = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "media_menu",
			window_width: "20em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
			}
		})
	)

	msg_message = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "message",
			close_on_overlay_click: false,
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
				writing_message = true
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				$("#write_message_area").val("")
				$("#write_message_feedback").text("")
				$("#write_message_feedback").css("display", "none")
				after_modal_close(instance)
				writing_message = false
				clear_draw_message_state()
			}
		})
	)

	msg_highlights = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "highlights",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				$("#highlights_filter").val("")
			}
		})
	)

	msg_image_history = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "image_history",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_image_history_filter()
			}
		})
	)

	msg_tv_history = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "tv_history",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_tv_history_filter()
			}
		})
	)

	msg_radio_history = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "radio_history",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_radio_history_filter()
			}
		})
	)

	msg_input_history = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "input_history",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_input_history_filter()
			}
		})
	)

	msg_chat_search = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "chat_search",
			window_width: "22em",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_chat_search_filter()
			}
		})
	)

	msg_locked = Msg.factory
	(
		Object.assign({}, common,
		{
			id: "locked",
			closeable: false,
			window_x: "none",
			show_effect: "none",
			close_effect: "none",
			enable_overlay: true,
			window_class: "!no_effects",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_chat_search_filter()
			}
		})
	)

	msg_global_settings = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "global_settings",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_radio_history_filter()
				close_togglers("global_settings")
			}
		})
	)

	msg_room_settings = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "room_settings",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				reset_radio_history_filter()
				close_togglers("room_settings")
			}
		})
	)

	msg_draw_image = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "draw_image",
			close_on_overlay_click: false,
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
				draw_image_open = true
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				draw_image_open = false
			}
		})
	)

	msg_credits = Msg.factory
	(
		Object.assign({}, common, titlebar,
		{
			id: "credits",
			after_create: function(instance)
			{
				after_modal_create(instance)
			},
			after_show: function(instance)
			{
				after_modal_show(instance)
				after_modal_set_or_show(instance)
			},
			after_set: function(instance)
			{
				after_modal_set_or_show(instance)
			},
			after_close: function(instance)
			{
				after_modal_close(instance)
				if(credits_audio)
				{
					credits_audio.pause()
				}
			}
		})
	)

	msg_main_menu.set(template_main_menu())
	msg_user_menu.set(template_user_menu())
	msg_userlist.set(template_userlist())
	msg_public_roomlist.set(template_roomlist({type:"public_roomlist"}))
	msg_visited_roomlist.set(template_roomlist({type:"visited_roomlist"}))
	msg_played.set(template_played())
	msg_profile.set(template_profile({profile_image: profile_image_loading_url}))
	msg_image_picker.set(template_image_picker())
	msg_tv_picker.set(template_tv_picker())
	msg_radio_picker.set(template_radio_picker())
	msg_media_menu.set(template_media_menu())
	msg_message.set(template_message())
	msg_highlights.set(template_highlights())
	msg_image_history.set(template_image_history())
	msg_tv_history.set(template_tv_history())
	msg_radio_history.set(template_radio_history())
	msg_input_history.set(template_input_history())
	msg_chat_search.set(template_chat_search())
	msg_modal_image.set(template_modal_image())
	msg_modal_image_number.set(template_modal_image_number())
	msg_lockscreen.set(template_lockscreen())
	msg_locked.set(template_locked_menu())
	msg_global_settings.set(template_global_settings({settings:template_settings({type:"global_settings"})}))
	msg_room_settings.set(template_room_settings({settings:template_settings({type:"room_settings"})}))
	msg_draw_image.set(template_draw_image())
	msg_credits.set(template_credits({background_url:credits_background_url}))

	msg_info.create()
	msg_info2.create()

	msg_input_history.set_title("Input History")
	msg_highlights.set_title("Highlights")
	msg_chat_search.set_title("Search")
	msg_image_history.set_title("<span id='image_history_window_title' class='pointer'>Image History</span>")
	msg_tv_history.set_title("<span id='tv_history_window_title' class='pointer'>TV History</span>")
	msg_radio_history.set_title("<span id='radio_history_window_title' class='pointer'>Radio History</span>")
	msg_global_settings.set_title("<span id='global_settings_window_title' class='pointer'>Global Settings</span>")
	msg_room_settings.set_title("<span id='room_settings_window_title' class='pointer'>Room Settings</span>")
	msg_public_roomlist.set_title("<span id='public_rooms_window_title' class='pointer'>Public Rooms</span>")
	msg_visited_roomlist.set_title("<span id='visited_rooms_window_title' class='pointer'>Visited Rooms</span>")
	msg_played.set_title("Recently Played")
	msg_main_menu.set_title("<span id='main_menu_window_title' class='pointer'>Main Menu</span>")
	msg_user_menu.set_title("<span id='user_menu_window_title' class='pointer'>User Menu</span>")
	msg_media_menu.set_title("Media Menu")
	msg_draw_image.set_title("Draw an Image")
	msg_credits.set_title(credits_title)

	$("#global_settings_window_title").click(function()
	{
		toggle_settings_windows("room_settings")
	})

	$("#room_settings_window_title").click(function()
	{
		toggle_settings_windows("global_settings")
	})

	$("#public_rooms_window_title").click(function()
	{
		toggle_rooms_windows("visited_roomlist")
	})

	$("#visited_rooms_window_title").click(function()
	{
		toggle_rooms_windows("public_roomlist")
	})

	$("#image_history_window_title").click(function()
	{
		toggle_media_history_windows("tv_history")
	})

	$("#tv_history_window_title").click(function()
	{
		toggle_media_history_windows("radio_history")
	})

	$("#radio_history_window_title").click(function()
	{
		toggle_media_history_windows("image_history")
	})

	$("#main_menu_window_title").click(function()
	{
		toggle_menu_windows("user_menu")
	})

	$("#user_menu_window_title").click(function()
	{
		toggle_menu_windows("main_menu")
	})
}

function info_vars_to_false()
{

}

function info2_vars_to_false()
{
	crm = false
	imp = false
	gtr = false
	orb = false
}

function after_modal_create(instance)
{
	if(get_setting("custom_scrollbars"))
	{
		start_modal_scrollbar(instance.options.id)
	}
}

function after_modal_show(instance)
{
	modal_open = true
	blur_input()
}

function after_modal_set_or_show(instance)
{
	update_modal_scrollbar(instance.options.id)

	setTimeout(function()
	{
		if(instance.options.id === "global_settings" || instance.options.id === "room_settings")
		{
			$(`#settings_window_${instance.options.id} .settings_window_category_container_selected`).get(0).scrollTop = 0
			$(`#settings_window_left_content_${instance.options.id}`).get(0).scrollTop = 0
		}

		else
		{
			instance.content_container.scrollTop = 0
		}
	}, 100)
}

function after_modal_close(instance)
{
	if(!any_modal_open())
	{
		modal_open = false
		focus_input()
	}
}

function get_modal_instances()
{
	return msg_main_menu.higher_instances()
}

function get_popup_instances()
{
	return msg_main_menu.lower_instances()
}

function get_all_msg_instances()
{
	return msg_main_menu.instances()
}

function any_msg_open()
{
	return msg_main_menu.any_open()
}

function any_modal_open()
{
	return msg_main_menu.any_higher_open()
}

function any_popup_open()
{
	return msg_main_menu.any_lower_open()
}

function close_all_msg()
{
	msg_main_menu.close_all()
}

function close_all_modals()
{
	msg_main_menu.close_all_higher()
}

function close_all_popups()
{
	msg_main_menu.close_all_lower()
}

function empty_global_settings()
{
	global_settings = {}
	save_global_settings()
}

function get_global_settings()
{
	global_settings = get_local_storage(ls_global_settings)

	if(global_settings === null)
	{
		global_settings = {}
	}

	var settings =
	[
		"background_image",
		"custom_scrollbars",
		"beep_on_messages",
		"beep_on_highlights",
		"beep_on_media_change",
		"beep_on_user_joins",
		"beep_on_voice_chat_joins",
		"beep_on_voice_chat_parts",
		"modal_effects",
		"highlight_current_username",
		"case_insensitive_username_highlights",
		"case_insensitive_words_highlights",
		"case_insensitive_ignored_words",
		"other_words_to_highlight",
		"double_tap",
		"double_tap_2",
		"double_tap_3",
		"afk_delay",
		"at_startup",
		"ignored_usernames",
		"ignored_words",
		"ignored_words_exclude_same_user",
		"show_joins",
		"show_parts",
		"animate_scroll",
		"new_messages_separator",
		"afk_disable_messages_beep",
		"afk_disable_highlights_beep",
		"afk_disable_media_change_beep",
		"afk_disable_joins_beep",
		"afk_disable_image_change",
		"afk_disable_tv_change",
		"afk_disable_radio_change",
		"open_popup_messages",
		"user_function_1",
		"user_function_2",
		"user_function_3",
		"user_function_1_name",
		"user_function_2_name",
		"user_function_3_name",
		"on_lockscreen",
		"on_unlockscreen",
		"afk_on_lockscreen",
		"microphone_threshold",
		"chat_layout",
		"media_display_percentage",
		"tv_display_percentage",
		"tv_display_position"
	]

	var changed = false

	for(var setting of settings)
	{
		if(global_settings[setting] === undefined)
		{
			global_settings[setting] = window[`global_settings_default_${setting}`]
			changed = true
		}
	}

	if(changed)
	{
		save_global_settings()
	}
}

function save_global_settings()
{
	save_local_storage(ls_global_settings, global_settings)
}

function start_settings_state(type)
{
	$(`.${type}_settings_item_control`).each(function()
	{
		var parent = $(this).closest(".settings_item")
		var setting_name = parent.data("setting")
		var setting_type = parent.data("type")

		if(setting_type === "checkbox")
		{
			$(this).prop("checked", window[type][setting_name])
		}

		else if(setting_type === "textarea" || setting_type === "text")
		{
			$(this).val(window[type][setting_name])
		}

		else if(setting_type === "select")
		{
			$(this).find('option').each(function()
			{
				if($(this).val() == window[type][setting_name])
				{
					$(this).prop('selected', true)
				}
			})
		}
	})

	arrange_media_setting_display_positions(type)
}

function start_settings_listeners(type)
{
	$(`.${type}_settings_item_control`).each(function()
	{
		var parent = $(this).closest(".settings_item")
		var setting_name = parent.data("setting")
		var setting_type = parent.data("type")

		if(setting_type === "checkbox" || setting_type === "select")
		{
			$(this).change(() => {window[`setting_${setting_name}_action`](type)})
		}

		else if(setting_type === "textarea" || setting_type === "text")
		{
			$(this).blur(() => {window[`setting_${setting_name}_action`](type)})
		}
	})

	$(`#${type}_tv_display_percentage`).nstSlider(
	{
		"left_grip_selector": ".leftGrip",
		"value_changed_callback": function(cause, val) 
		{
			if(cause === "init")
			{
				return false
			}

			if(window[type].tv_display_percentage !== val)
			{
				window[type].tv_display_percentage = val
				window[`save_${type}`]()
				apply_media_percentages()
			}
		}
	})

	$(`#${type}_media_display_percentage`).nstSlider(
	{
		"left_grip_selector": ".leftGrip",
		"value_changed_callback": function(cause, val) 
		{
			if(cause === "init")
			{
				return false
			}

			if(window[type].media_display_percentage !== val)
			{
				window[type].media_display_percentage = val
				window[`save_${type}`]()	
				apply_media_percentages()
			}
		}
	})

	set_media_sliders(type)
}

function call_setting_actions(type, save=true)
{
	for(var setting in global_settings)
	{
		var action = window[`setting_${setting}_action`]

		if(action !== undefined)
		{
			action(type, save)
		}
	}
}

function setting_background_image_action(type, save=true)
{
	window[type].background_image = $(`#${type}_background_image`).prop("checked")

	if(active_settings("background_image") === type)
	{
		apply_background()
		apply_theme()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_custom_scrollbars_action(type, save=true)
{
	window[type].custom_scrollbars = $(`#${type}_custom_scrollbars`).prop("checked")

	if(active_settings("custom_scrollbars") === type)
	{
		setup_scrollbars()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_beep_on_messages_action(type, save=true)
{
	window[type].beep_on_messages = $(`#${type}_beep_on_messages`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_beep_on_highlights_action(type, save=true)
{
	window[type].beep_on_highlights = $(`#${type}_beep_on_highlights`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_beep_on_media_change_action(type, save=true)
{
	window[type].beep_on_media_change = $(`#${type}_beep_on_media_change`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_beep_on_user_joins_action(type, save=true)
{
	window[type].beep_on_user_joins = $(`#${type}_beep_on_user_joins`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_beep_on_voice_chat_joins_action(type, save=true)
{
	window[type].beep_on_voice_chat_joins = $(`#${type}_beep_on_voice_chat_joins`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_beep_on_voice_chat_parts_action(type, save=true)
{
	window[type].beep_on_voice_chat_parts = $(`#${type}_beep_on_voice_chat_parts`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_modal_effects_action(type, save=true)
{
	window[type].modal_effects = $(`#${type}_modal_effects`).prop("checked")

	if(active_settings("modal_effects") === type)
	{
		for(var instance of get_all_msg_instances())
		{
			if($(instance.window).hasClass("no_effects"))
			{
				continue
			}

			if(window[type].modal_effects)
			{
				instance.options.show_effect = "fade"
				instance.options.close_effect = "fade"
			}

			else
			{
				instance.options.show_effect = "none"
				instance.options.close_effect = "none"
			}
		}
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_highlight_current_username_action(type, save=true)
{
	window[type].highlight_current_username = $(`#${type}_highlight_current_username`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_case_insensitive_username_highlights_action(type, save=true)
{
	window[type].case_insensitive_username_highlights = $(`#${type}_case_insensitive_username_highlights`).prop("checked")

	if(active_settings("case_insensitive_username_highlights") === type)
	{
		generate_mentions_regex()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_case_insensitive_words_highlights_action(type, save=true)
{
	window[type].case_insensitive_words_highlights = $(`#${type}_case_insensitive_words_highlights`).prop("checked")

	if(active_settings("case_insensitive_words_highlights") === type)
	{
		generate_highlight_words_regex()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_case_insensitive_ignored_words_action(type, save=true)
{
	window[type].case_insensitive_ignored_words = $(`#${type}_case_insensitive_ignored_words`).prop("checked")

	if(active_settings("case_insensitive_ignored_words") === type)
	{
		generate_ignored_words_regex()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_other_words_to_highlight_action(type, save=true)
{
	var words = make_unique_lines(utilz.clean_string7($(`#${type}_other_words_to_highlight`).val()))

	$(`#${type}_other_words_to_highlight`).val(words)

	window[type].other_words_to_highlight = words

	if(active_settings("other_words_to_highlight") === type)
	{
		generate_highlight_words_regex()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_double_tap_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_double_tap`).val())

	$(`#${type}_double_tap`).val(cmds)

	window[type].double_tap = cmds

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_double_tap_2_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_double_tap_2`).val())

	$(`#${type}_double_tap_2`).val(cmds)

	window[type].double_tap_2 = cmds

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_double_tap_3_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_double_tap_3`).val())

	$(`#${type}_double_tap_3`).val(cmds)

	window[type].double_tap_3 = cmds

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_delay_action(type, save=true)
{
	var delay = $(`#${type}_afk_delay option:selected`).val()

	if(delay !== "never")
	{
		delay = parseInt(delay)
	}

	window[type].afk_delay = delay

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_at_startup_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_at_startup`).val())

	$(`#${type}_at_startup`).val(cmds)

	window[type].at_startup = cmds

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_ignored_usernames_action(type, save=true)
{
	var unames = make_unique_lines(utilz.clean_string7($(`#${type}_ignored_usernames`).val()))

	$(`#${type}_ignored_usernames`).val(unames)

	window[type].ignored_usernames = unames

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_ignored_words_action(type, save=true)
{
	var unames = make_unique_lines(utilz.clean_string7($(`#${type}_ignored_words`).val()))

	$(`#${type}_ignored_words`).val(unames)

	window[type].ignored_words = unames

	if(active_settings("ignored_words") === type)
	{
		generate_ignored_words_regex()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_ignored_words_exclude_same_user_action(type, save=true)
{
	window[type].ignored_words_exclude_same_user = $(`#${type}_ignored_words_exclude_same_user`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_show_joins_action(type, save=true)
{
	window[type].show_joins = $(`#${type}_show_joins`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_show_parts_action(type, save=true)
{
	window[type].show_parts = $(`#${type}_show_parts`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_animate_scroll_action(type, save=true)
{
	window[type].animate_scroll = $(`#${type}_animate_scroll`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_new_messages_separator_action(type, save=true)
{
	window[type].new_messages_separator = $(`#${type}_new_messages_separator`).prop("checked")

	if(active_settings("new_messages_separator") === type)
	{
		if(!window[type].new_messages_separator)
		{
			remove_separator()
		}
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_disable_messages_beep_action(type, save=true)
{
	window[type].afk_disable_messages_beep = $(`#${type}_afk_disable_messages_beep`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_disable_highlights_beep_action(type, save=true)
{
	window[type].afk_disable_highlights_beep = $(`#${type}_afk_disable_highlights_beep`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_disable_media_change_beep_action(type, save=true)
{
	window[type].afk_disable_media_change_beep = $(`#${type}_afk_disable_media_change_beep`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_disable_joins_beep_action(type, save=true)
{
	window[type].afk_disable_joins_beep = $(`#${type}_afk_disable_joins_beep`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_disable_image_change_action(type, save=true)
{
	window[type].afk_disable_image_change = $(`#${type}_afk_disable_image_change`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_disable_tv_change_action(type, save=true)
{
	window[type].afk_disable_tv_change = $(`#${type}_afk_disable_tv_change`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_disable_radio_change_action(type, save=true)
{
	window[type].afk_disable_radio_change = $(`#${type}_afk_disable_radio_change`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_open_popup_messages_action(type, save=true)
{
	window[type].open_popup_messages = $(`#${type}_open_popup_messages`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_user_function_1_name_action(type, save=true)
{
	var val = utilz.clean_string2($(`#${type}_user_function_1_name`).val())

	if(!val)
	{
		val = global_settings_default_user_function_1_name
	}

	$(`#${type}_user_function_1_name`).val(val)

	window[type].user_function_1_name = val

	if(active_settings("user_function_1_name") === type)
	{
		setup_user_function_titles()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_user_function_1_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_user_function_1`).val())

	$(`#${type}_user_function_1`).val(cmds)

	window[type].user_function_1 = cmds

	if(active_settings("user_function_1") === type)
	{
		setup_user_function_titles()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_user_function_2_name_action(type, save=true)
{
	var val = utilz.clean_string2($(`#${type}_user_function_2_name`).val())

	if(!val)
	{
		val = global_settings_default_user_function_2_name
	}

	$(`#${type}_user_function_2_name`).val(val)

	window[type].user_function_2_name = val

	if(active_settings("user_function_2_name") === type)
	{
		setup_user_function_titles()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_user_function_2_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_user_function_2`).val())

	$(`#${type}_user_function_2`).val(cmds)

	window[type].user_function_2 = cmds

	if(active_settings("user_function_2") === type)
	{
		setup_user_function_titles()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_user_function_3_name_action(type, save=true)
{
	var val = utilz.clean_string2($(`#${type}_user_function_3_name`).val())

	if(!val)
	{
		val = global_settings_default_user_function_3_name
	}

	$(`#${type}_user_function_3_name`).val(val)

	window[type].user_function_3_name = val

	if(active_settings("user_function_3_name") === type)
	{
		setup_user_function_titles()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_user_function_3_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_user_function_3`).val())

	$(`#${type}_user_function_3`).val(cmds)

	window[type].user_function_3 = cmds

	if(active_settings("user_function_3") === type)
	{
		setup_user_function_titles()
	}

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_on_lockscreen_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_on_lockscreen`).val())

	$(`#${type}_on_lockscreen`).val(cmds)

	window[type].on_lockscreen = cmds

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_on_unlockscreen_action(type, save=true)
{
	var cmds = utilz.clean_string7($(`#${type}_on_unlockscreen`).val())

	$(`#${type}_on_unlockscreen`).val(cmds)

	window[type].on_unlockscreen = cmds

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_afk_on_lockscreen_action(type, save=true)
{
	window[type].afk_on_lockscreen = $(`#${type}_afk_on_lockscreen`).prop("checked")

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_microphone_threshold_action(type, save=true)
{
	var val = utilz.round($(`#${type}_microphone_threshold`).val(), 2)

	$(`#${type}_other_words_to_highlight`).val(val)

	window[type].microphone_threshold = val

	if(save)
	{
		window[`save_${type}`]()
	}
}

function setting_chat_layout_action(type, save=true)
{
	var mode = $(`#${type}_chat_layout option:selected`).val()

	window[type].chat_layout = mode

	if(save)
	{
		window[`save_${type}`]()
	}

	if(get_setting("chat_layout") !== loaded_chat_layout)
	{
		if(active_settings("chat_layout") === type)
		{
			var r = confirm("To apply this setting a restart is required. Do you want to restart now?")

			if(r)
			{
				restart_client()
			}
		}
	}
}

function empty_room_settings()
{
	room_settings = {}
	save_room_settings()
}

function get_room_settings()
{
	var room_settings_all = get_local_storage(ls_room_settings)

	if(room_settings_all === null)
	{
		room_settings_all = {}
	}

	room_settings = room_settings_all[room_id]

	if(room_settings === undefined)
	{
		room_settings = {}
	}

	var changed = false

	for(var key in global_settings)
	{
		if(room_settings[key] === undefined)
		{
			room_settings[key] = global_settings[key]
			changed = true
		}

		if(room_settings[`${key}_override`] === undefined)
		{
			room_settings[`${key}_override`] = false
			changed = true
		}
	}

	if(changed)
	{
		save_room_settings()
	}
}

function save_room_settings()
{
	var room_settings_all = get_local_storage(ls_room_settings)

	if(room_settings_all === null)
	{
		room_settings_all = {}
	}

	room_settings_all[room_id] = room_settings

	save_local_storage(ls_room_settings, room_settings_all)
}

function get_room_state()
{
	var room_state_all = get_local_storage(ls_room_state)

	if(room_state_all === null)
	{
		room_state_all = {}
	}

	room_state = room_state_all[room_id]

	if(room_state === undefined)
	{
		room_state = {}
	}

	var changed = false

	if(room_state.images_enabled === undefined)
	{
		room_state.images_enabled = room_state_default_images_enabled
		changed = true
	}

	if(room_state.tv_enabled === undefined)
	{
		room_state.tv_enabled = room_state_default_tv_enabled
		changed = true
	}

	if(room_state.radio_enabled === undefined)
	{
		room_state.radio_enabled = room_state_default_radio_enabled
		changed = true
	}

	if(room_state.images_locked === undefined)
	{
		room_state.images_locked = room_state_default_images_locked
		changed = true
	}

	if(room_state.tv_locked === undefined)
	{
		room_state.tv_locked = room_state_default_tv_locked
		changed = true
	}

	if(room_state.radio_locked === undefined)
	{
		room_state.radio_locked = room_state_default_radio_locked
		changed = true
	}

	if(room_state.radio_volume === undefined)
	{
		room_state.radio_volume = room_state_default_radio_volume
		changed = true
	}
}

function save_room_state()
{
	var room_state_all = get_local_storage(ls_room_state)

	if(room_state_all === null)
	{
		room_state_all = {}
	}

	room_state_all[room_id] = room_state

	save_local_storage(ls_room_state, room_state_all)
}

var played_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_played_filter()
		}, filter_delay)
	}
})()

var userlist_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_userlist_filter()
		}, filter_delay)
	}
})()

var public_roomlist_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_roomlist_filter("public_roomlist")
		}, filter_delay)
	}
})()

var visited_roomlist_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_roomlist_filter("visited_roomlist")
		}, filter_delay)
	}
})()

function start_filters()
{
	$("#played_filter").on("input", function()
	{
		played_filter_timer()
	})

	$("#userlist_filter").on("input", function()
	{
		userlist_filter_timer()
	})

	$("#public_roomlist_filter").on("input", function()
	{
		public_roomlist_filter_timer()
	})

	$("#visited_roomlist_filter").on("input", function()
	{
		visited_roomlist_filter_timer()
	})

	$("#highlights_filter").on("input", function()
	{
		highlights_filter_timer()
	})

	$("#image_history_filter").on("input", function()
	{
		image_history_filter_timer()
	})

	$("#tv_history_filter").on("input", function()
	{
		tv_history_filter_timer()
	})

	$("#radio_history_filter").on("input", function()
	{
		radio_history_filter_timer()
	})

	$("#input_history_filter").on("input", function()
	{
		input_history_filter_timer()
	})

	$("#chat_search_filter").on("input", function()
	{
		chat_search_timer()
	})

	$("#chat_search_filter").on("input", function()
	{
		chat_search_timer()
	})
}

function do_played_filter()
{
	var filter = $("#played_filter").val().trim().toLowerCase()

	if(filter !== "")
	{
		played_filtered = true

		$(".played_item").each(function()
		{
			$(this).css("display", "block")

			var title = $(this).find(".pititle").eq(0).text()
			var artist = $(this).find(".piartist").eq(0).text()

			var include = false

			if(title.toLowerCase().includes(filter))
			{
				include = true
			}

			else if(artist.toLowerCase().includes(filter))
			{
				include = true
			}

			if(!include)
			{
				$(this).css("display", "none")
			}
		})
	}

	else
	{
		played_filtered = false

		$(".played_item").each(function()
		{
			$(this).css("display", "block")
		})
	}

	update_modal_scrollbar("played")

	$('#Msg-content-container-played').scrollTop(0)
}

function reset_played_filter()
{
	$("#played_filter").val("")
	do_played_filter()
}

function do_userlist_filter()
{
	var filter = $("#userlist_filter").val().trim().toLowerCase()

	if(filter !== "")
	{
		userlist_filtered = true

		$(".userlist_item").each(function()
		{
			$(this).css("display", "block")

			var uname = $(this).find(".ui_item_uname").eq(0).text()

			var include = false

			if(uname.toLowerCase().includes(filter))
			{
				include = true
			}

			if(!include)
			{
				$(this).css("display", "none")
			}
		})
	}

	else
	{
		userlist_filtered = false

		$(".userlist_item").each(function()
		{
			$(this).css("display", "block")
		})
	}

	update_modal_scrollbar("userlist")

	$('#Msg-content-container-userlist').scrollTop(0)
}

function do_roomlist_filter(type)
{
	var filter = $(`#${type}_filter`).val().trim().toLowerCase()
	var container = $(`#${type}_container`)

	if(filter !== "")
	{
		$(`#${type}_container`).find(".roomlist_item").each(function()
		{
			$(this).css("display", "block")

			var name = $(this).find(".roomlist_name").eq(0).text()
			var topic = $(this).find(".roomlist_topic").eq(0).text()

			var include = false

			if(name.toLowerCase().includes(filter))
			{
				include = true
			}

			else if(topic.toLowerCase().includes(filter))
			{
				include = true
			}

			if(!include)
			{
				$(this).css("display", "none")
			}
		})
	}

	else
	{
		$(".roomlist_item").each(function()
		{
			$(this).css("display", "block")
		})
	}

	update_modal_scrollbar(type)

	$(`#Msg-content-container-${type}`).scrollTop(0)
}

function show_input_history(filter=false)
{
	msg_input_history.show(function()
	{
		if(filter)
		{
			$("#input_history_filter").val(filter)
			do_input_history_filter()
		}

		$("#input_history_filter").focus()
	})
}

function do_input_history_filter()
{
	var filter = $("#input_history_filter").val().trim().toLowerCase()

	if(filter !== "")
	{
		$(".input_history_item").each(function()
		{
			$(this).css("display", "block")

			var text = $(this).text()

			var include = false

			if(text.toLowerCase().includes(filter.toLowerCase()))
			{
				include = true
			}

			if(!include)
			{
				$(this).css("display", "none")
			}
		})
	}

	else
	{
		$(".input_history_item").each(function()
		{
			$(this).css("display", "block")
		})
	}

	update_modal_scrollbar("input_history")

	$('#Msg-content-container-input_history').scrollTop(0)
}

function reset_input_history_filter()
{
	$("#input_history_filter").val("")
	do_input_history_filter()
}

var input_history_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_input_history_filter()
		}, filter_delay)
	}
})()

function onYouTubeIframeAPIReady()
{
	yt_player = new YT.Player('youtube_player',
	{
		events:
		{
			onReady: onYouTubePlayerReady
		},
		playerVars:
		{
			iv_load_policy: 3,
			rel: 0,
			width: 640,
			height: 360
		}
	})

	yt_video_player = new YT.Player('media_youtube_video',
	{
		events:
		{
			onReady: onYouTubePlayerReady2
		},
		playerVars:
		{
			iv_load_policy: 3,
			rel: 0,
			width: 640,
			height: 360,
			autoplay: 0
		}
	})
}

function onYouTubePlayerReady()
{
	youtube_player = yt_player

	if((last_radio_type && last_radio_type === "youtube") || radio_type === "youtube")
	{
		change({type:"radio", notify:false})
	}

	set_radio_volume(false, false)
}

function onYouTubePlayerReady2()
{
	youtube_video_player = yt_video_player

	youtube_video_player.addEventListener("onStateChange", function(e)
	{
		if(e.data === 5)
		{
			if(youtube_video_play_on_queue)
			{
				youtube_video_player.playVideo()
			}
		}
	})

	if((last_tv_type && last_tv_type === "youtube") || tv_type === "youtube")
	{
		change({type:"tv", notify:false})
	}
}

function start_twitch()
{
	try
	{
		var twch_video_player = new Twitch.Player("media_twitch_video_container",
		{
			width: 640,
			height: 360,
			autoplay: false
		})

		twch_video_player.addEventListener(Twitch.Player.READY, () =>
		{
			twitch_video_player = twch_video_player

			$("#media_twitch_video_container").find("iframe").eq(0).attr("id", "media_twitch_video").addClass("video_frame")

			if(tv_type === "twitch")
			{
				change({type:"tv", notify:false})
			}
		})
	}

	catch(err)
	{
		console.error("Twitch failed to load")
	}
}

function setup_user_menu()
{
	$("#user_menu_profile_image").attr("src", profile_image)
	setup_togglers("user_menu")
}

function show_user_menu()
{
	clearTimeout(show_reactions_timeout)
	hide_reactions()
	msg_user_menu.show()
}

function show_status()
{
	msg_info2.show(["Room Status", template_status({info:get_status_html()})])
}

function get_status_html()
{
	var h = $("<div></div>")

	var info = ""

	info += "<div class='info_item'><div class='info_title'>Room Name</div><div class='info_item_content' id='status_room_name'></div></div>"

	if(topic_setter)
	{
		info += `<div class='info_item' title='Setter: ${topic_setter} | ${topic_date}'><div class='info_title'>Topic</div><div class='info_item_content' id='status_topic'></div></div>`
	}

	else
	{
		info += `<div class='info_item'><div class='info_title'>Topic</div><div class='info_item_content' id='status_topic'></div></div>`
	}

	info += "<div class='info_item'><div class='info_title'>Privacy</div>"

	if(is_public)
	{
		info += "<div class='info_item_content'>Public</div></div>"
	}

	else
	{
		info += "<div class='info_item_content'>Private</div></div>"
	}

	info += "<div class='info_item'><div class='info_title'>Log</div>"

	if(log_enabled)
	{
		info += "<div class='info_item_content'>Enabled</div></div>"
	}

	else
	{
		info += "<div class='info_item_content'>Disabled</div></div>"
	}

	if(image_setter)
	{
		info += "<div class='info_item'><div class='info_title'>Image Setter</div>"
		info += `<div class='info_item_content' id='status_image_setter'></div></div>`
	}

	if(image_source)
	{
		info += "<div class='info_item'><div class='info_title'>Image Source</div>"
		info += `<div class='info_item_content' id='status_image_source'></div></div>`
	}

	if(image_date)
	{
		info += "<div class='info_item'><div class='info_title'>Image Date</div>"
		info += `<div class='info_item_content' id='status_image_date'></div></div>`
	}

	if(tv_setter)
	{
		info += "<div class='info_item'><div class='info_title'>TV Setter</div>"
		info += `<div class='info_item_content' id='status_tv_setter'></div></div>`
	}

	if(tv_title)
	{
		info += "<div class='info_item'><div class='info_title'>TV Title</div>"
		info += `<div class='info_item_content' id='status_tv_title'></div></div>`
	}

	if(tv_source)
	{
		info += "<div class='info_item'><div class='info_title'>TV Source</div>"
		info += `<div class='info_item_content' id='status_tv_source'></div></div>`
	}

	if(tv_date)
	{
		info += "<div class='info_item'><div class='info_title'>TV Date</div>"
		info += `<div class='info_item_content' id='status_tv_date'></div></div>`
	}

	if(radio_setter)
	{
		info += "<div class='info_item'><div class='info_title'>Radio Setter</div>"
		info += `<div class='info_item_content' id='status_radio_setter'></div></div>`
	}

	if(radio_title)
	{
		info += "<div class='info_item'><div class='info_title'>Radio Title</div>"
		info += `<div class='info_item_content' id='status_radio_title'></div></div>`
	}

	if(radio_source)
	{
		info += "<div class='info_item'><div class='info_title'>Radio Source</div>"
		info += `<div class='info_item_content' id='status_radio_source'></div></div>`
	}

	if(radio_date)
	{
		info += "<div class='info_item'><div class='info_title'>Radio Date</div>"
		info += `<div class='info_item_content' id='status_radio_date'></div></div>`
	}

	h.append(info)

	h.find("#status_room_name").eq(0).text(room_name).urlize()

	var t = h.find("#status_topic").eq(0)
	t.text(get_topic()).urlize()

	if(image_setter)
	{
		var t = h.find("#status_image_setter").eq(0)
		t.text(image_setter)
	}

	if(image_source)
	{
		var t = h.find("#status_image_source").eq(0)
		t.text(get_proper_media_url("image")).urlize()
	}

	if(image_date)
	{
		var t = h.find("#status_image_date").eq(0)
		t.text(image_date)
	}

	if(tv_setter)
	{
		var t = h.find("#status_tv_setter").eq(0)
		t.text(tv_setter)
	}

	if(tv_title)
	{
		var t = h.find("#status_tv_title").eq(0)
		t.text(tv_title).urlize()
	}

	if(tv_source)
	{
		var t = h.find("#status_tv_source").eq(0)
		t.text(get_proper_media_url("tv")).urlize()
	}

	if(tv_date)
	{
		var t = h.find("#status_tv_date").eq(0)
		t.text(tv_date)
	}

	if(radio_setter)
	{
		var t = h.find("#status_radio_setter").eq(0)
		t.text(radio_setter)
	}

	if(radio_title)
	{
		var t = h.find("#status_radio_title").eq(0)
		t.text(radio_title).urlize()
	}

	if(radio_source)
	{
		var t = h.find("#status_radio_source").eq(0)
		t.text(get_proper_media_url("radio")).urlize()
	}

	if(radio_date)
	{
		var t = h.find("#status_radio_date").eq(0)
		t.text(radio_date)
	}

	return h.html()
}

function fill()
{
	var s = `abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§
	$%& /() =?* '<> #|; ²³~ @ ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC
	DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|; ²³~ @ ©«» ¤¼× {} abc
	def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /()
	=?* '<> #|; ²³~ @ ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI
	JKL MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|; ²³~ @\`\´ ©«» ¤¼× {} abc def
	ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /() =?*
	'<> #|; ²³~ @\`´ ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL
	MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|; ²³~ @\`´ ©«» ¤¼× {} abc def ghi jkl
	mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|; ²³~
	@\`´ ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV
	WXYZ !"§ $%& /() =?* '<> #|; ²³~ @\`´ ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv
	wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|; ²³~ @\`´ ©«» ¤¼×
	{} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /()
	=?* '<> #|; ²³~ @\`´ ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL
	MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|; ²³~ @\`´ ©«» ¤¼× {} abc def ghi jkl mno
	pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|; ²³~ @\`´
	©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§
	$%& /() =?* '<> #|; ²³~ @\`´ ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF
	GHI JKL MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|; ²³~ @\`´ ©«» ¤¼× {}abc def ghi
	jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /() =?* '<> #|;`

	update_chat({username:username, message:s, prof_image:profile_image})
}

function logout()
{
	goto_url('/logout')
}

function change_username(uname)
{
	if(utilz.clean_string4(uname) !== uname)
	{
		feedback("Username contains invalid characters")
		return
	}

	if(uname.length === 0)
	{
		feedback("Username can't be empty")
		return
	}

	if(uname.length > max_username_length)
	{
		feedback("Username is too long")
		return
	}

	if(uname === username)
	{
		feedback("That's already your username")
		return
	}

	socket_emit("change_username", {username:uname})
}

function change_password(passwd)
{
	if(passwd.length < min_password_length)
	{
		feedback(`Password is too short. It must be at least ${min_password_length} characters long`)
		return
	}

	if(passwd.length > max_password_length)
	{
		feedback("Password is too long")
		return
	}

	socket_emit("change_password", {password:passwd})
}

function password_changed(data)
{
	feedback(`Password succesfully changed to ${data.password}. To force other clients connected to your account to disconnect you can use /disconnectothers`)
}

function change_email(email)
{
	if(utilz.clean_string5(email) !== email)
	{
		feedback("Invalid email address")
		return
	}

	if(email.length === 0)
	{
		feedback("Username can't be empty")
		return
	}

	if(!email.includes('@'))
	{
		feedback("Invalid email address")
		return
	}

	if(email.length > max_email_length)
	{
		feedback("Email is too long")
		return
	}

	socket_emit("change_email", {email:email})
}

function email_changed(data)
{
	set_email(data.email)
	feedback(`Email succesfully changed to ${data.email}`)
}

function show_details(data)
{
	var h = $("<div></div>")

	var info = ""

	info += "<div class='info_item'><div class='info_title'>Username</div><div class='info_item_content' id='details_username'></div></div>"
	info += "<div class='info_item'><div class='info_title'>Email</div><div class='info_item_content' id='details_email'></div></div>"
	info += "<div class='info_item'><div class='info_title'>Account Created On</div><div class='info_item_content' id='details_reg_date'></div></div>"
	info += "<div class='info_item'><div class='info_title'>Joined Room On</div><div class='info_item_content' id='details_joined_room'></div></div>"

	h.append(info)

	h.find("#details_username").eq(0).text(username)
	h.find("#details_email").eq(0).text(user_email)
	h.find("#details_reg_date").eq(0).text(nice_date(user_reg_date))
	h.find("#details_joined_room").eq(0).text(nice_date(date_joined))

	msg_info2.show(["User Details", h.html()])
}

function show_log_messages()
{
	if(log_messages_processed)
	{
		return false
	}

	var num_images = 0
	var num_tv = 0
	var num_radio = 0

	if(log_messages && log_messages.length > 0)
	{
		for(var message of log_messages)
		{
			var type = message.type

			if(type === "image")
			{
				num_images += 1
			}

			else if(type === "tv")
			{
				num_tv += 1
			}

			else if(type === "radio")
			{
				num_radio += 1
			}
		}
	}

	if(num_images === 0)
	{
		announce_image_change(init_data)
	}

	if(num_tv === 0)
	{
		announce_tv_change(init_data)
	}

	if(num_radio === 0)
	{
		announce_radio_change(init_data)
	}

	if(log_messages && log_messages.length > 0)
	{
		for(var message of log_messages)
		{
			var type = message.type
			var data = message.data
			var date = message.date

			if(data)
			{
				if(type === "chat")
				{
					update_chat(
					{
						username: data.username,
						message: data.content,
						prof_image: data.profile_image,
						date: date,
						scroll: false
					})
				}

				else if(type === "image")
				{
					announce_image_change(data, date)
				}

				else if(type === "tv")
				{
					announce_tv_change(data, date)
				}

				else if(type === "radio")
				{
					announce_radio_change(data, date)
				}

				else if(type === "reaction")
				{
					show_reaction(data, date)
				}
			}
		}
	}

	log_messages_processed = true
}

function change_log(log)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(log === log_enabled)
	{
		if(log)
		{
			feedback("Log is already enabled")
		}

		else
		{
			feedback("Log is already disabled")
		}
	}

	socket_emit("change_log", {log:log})
}

function clear_log()
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	socket_emit("clear_log", {})
}

function announce_log_change(data)
{
	if(data.log)
	{
		var s = `${data.username} enabled the log`
	}

	else
	{
		var s = `${data.username} cleared and disabled the log`
	}

	public_feedback(s,
	{
		username: data.username,
		open_profile: true
	})

	set_log_enabled(data.log)
}

function announce_log_cleared(data)
{
	var s = ""

	if(username === data.username)
	{
		var uname = "You"
	}

	else
	{
		var uname = data.username
	}

	s += `${uname} cleared the log`

	public_feedback(s,
	{
		username: uname,
		open_profile: true
	})
}

function show_log()
{
	if(log_enabled)
	{
		feedback("Log is enabled")
	}

	else
	{
		feedback("Log is disabled")
	}
}

function show_modal_image(url, title, date)
{
	if(!url)
	{
		if(images_changed.length > 0)
		{
			show_current_image_modal(false)
			return
		}

		else
		{
			msg_info.show("No image loaded yet")
			return
		}
	}

	if(title)
	{
		var t = title
	}

	else
	{
		var t = ""
	}

	var img = $("#modal_image")

	img.css("display", "none")

	$("#modal_image_spinner").css("display", "block")
	$("#modal_image_error").css("display", "none")

	img.attr("src", url)
	img.data("image_title", t)
	img.data("image_date", date)

	$("#modal_image_header_info").text(t)

	update_modal_scrollbar("image")

	msg_modal_image.show(function()
	{
		msg_image_history.close()
		set_modal_image_number()
	})
}

function set_modal_image_number()
{
	if(!modal_image_open)
	{
		return false
	}

	var url = $("#modal_image").attr("src")

	var number = 0

	for(var i=0; i<images_changed.length; i++)
	{
		var ic = images_changed[i]

		if(ic.url === url)
		{
			number = i + 1
			break
		}
	}

	var footer_text = `${number} of ${images_changed.length}`
	$("#modal_image_footer_info").text(footer_text)
	
	if(number > 0)
	{
		$("#modal_image_number_input").val(number)
		current_modal_image_index = number - 1
	}

	else
	{
		$("#modal_image_number_input").val(1)
		current_modal_image_index = 0
	}
}

function setup_modal_image_number()
{
	$("#modal_image_number_button").click(function()
	{
		modal_image_number_go()
	})

	$("#modal_image_number_input").on("input", function()
	{
		var val = parseInt($("#modal_image_number_input").val())

		if(val < 1)
		{
			$("#modal_image_number_input").val(images_changed.length)
		}

		else if(val === images_changed.length + 1)
		{
			$("#modal_image_number_input").val(1)
		}

		else if(val > images_changed.length)
		{
			$("#modal_image_number_input").val(images_changed.length)
		}
	})
}

function show_modal_image_number()
{
	msg_modal_image_number.show(function()
	{
		$("#modal_image_number_input").focus()
		$("#modal_image_number_input").select()
	})
}

function modal_image_number_go()
{
	var val = parseInt($("#modal_image_number_input").val())
	
	var ic = images_changed[val - 1]

	if(ic)
	{
		show_modal_image(ic.url, ic.title, ic.date_raw)
		msg_modal_image_number.close()
	}
}

function clear_modal_image_info()
{
	$("#modal_image_header_info").text("")
	$("#modal_image_footer_info").text("")
}

function not_an_op()
{
	feedback("You are not a room operator")
}

function show_image_picker()
{
	if(!can_images)
	{
		feedback("You don't have images permission")
		return false
	}

	msg_image_picker.show(function()
	{
		$("#image_source_picker_input").focus()
	})
}

function show_tv_picker()
{
	if(!can_tv)
	{
		feedback("You don't have tv permission")
		return false
	}

	msg_tv_picker.show(function()
	{
		$("#tv_source_picker_input").focus()
	})
}

function show_radio_picker()
{
	if(!can_radio)
	{
		feedback("You don't have radio permission")
		return false
	}

	msg_radio_picker.show(function()
	{
		$("#radio_source_picker_input").focus()
	})
}

function start_titles()
{
	$(".nicetitle").each(function()
	{
		tippy(this,
		{
			delay: [1000, 100],
			animation: 'scale',
			hideOnClick: true,
			duration: 100,
			arrow: true,
			performance: true,
			size: 'regular',
			arrowSize: 'small',
			zIndex: 99999999999
		})
	})
}

function start_hls()
{
	hls = new Hls(
	{
		maxBufferSize: 5*1000*1000,
		maxBufferLength: 10
	})
}

function num_media_elements_visible()
{
	var num = 0

	$("#media_split").children().each(function()
	{
		if($(this).css("display") !== "none")
		{
			num += 1
		}
	})

	return num
}

function fix_media_margin()
{
	if(num_media_elements_visible() === 2)
	{
		var p = get_setting("tv_display_position")

		if(p === "top")
		{
			var m1 = "margin-bottom"
			var m2 = "margin-top"
		}

		else if(p === "bottom")
		{
			var m1 = "margin-top"
			var m2 = "margin-bottom"
		}

		$("#media_tv").css(m1, "-1rem")
		$("#media_tv").css(m2, "0")
		$("#media_image_container").css(m2, "-1rem")
		$("#media_image_container").css(m1, "0")
	}

	else
	{
		$("#media_image_container").css("margin-bottom", "0")
		$("#media_tv").css("margin-top", "0")
	}
}

function toggle_images(what=undefined, save=true)
{
	if(what !== undefined)
	{
		room_state.images_enabled = what
	}

	else
	{
		room_state.images_enabled = !room_state.images_enabled
	}

	change_images_visibility()

	if(save)
	{
		save_room_state()
	}
}

function change_images_visibility()
{
	if(room_images_mode !== "disabled" && room_state.images_enabled)
	{
		$("#media").css("display", "flex")

		$("#media_image_container").css("display", "flex")

		fix_media_margin()

		$("#footer_toggle_images_icon").removeClass("fa-toggle-off")
		$("#footer_toggle_images_icon").addClass("fa-toggle-on")

		var num_visible = num_media_elements_visible()	

		change({type:"image"})

		images_visible = true
	}

	else
	{
		$("#media_image_container").css("display", "none")

		fix_media_margin()

		var num_visible = num_media_elements_visible()

		if(num_visible === 0)
		{
			hide_media()
		}	

		$("#footer_toggle_images_icon").removeClass("fa-toggle-on")
		$("#footer_toggle_images_icon").addClass("fa-toggle-off")

		images_visible = false
	}

	apply_theme()
	fix_visible_video_frame()
	update_chat_scrollbar()
	goto_bottom(false, false)
}

function toggle_tv(what=undefined, save=true)
{
	if(what !== undefined)
	{
		room_state.tv_enabled = what
	}

	else
	{
		room_state.tv_enabled = !room_state.tv_enabled
	}

	change_tv_visibility()

	if(save)
	{
		save_room_state()
	}
}

function change_tv_visibility(play=true)
{
	if(room_tv_mode !== "disabled" && room_state.tv_enabled)
	{
		$("#media").css("display", "flex")

		$("#media_tv").css("display", "flex")/

		fix_media_margin()
		fix_visible_video_frame()

		$("#footer_toggle_tv_icon").removeClass("fa-toggle-off")
		$("#footer_toggle_tv_icon").addClass("fa-toggle-on")

		var num_visible = num_media_elements_visible()

		change({type:"tv", force:false, play:false})

		tv_visible = true
		
		if(play)
		{
			play_video()
		}
	}

	else
	{
		$("#media_tv").css("display", "none")

		fix_media_margin()

		var num_visible = num_media_elements_visible()

		if(num_visible === 0)
		{
			hide_media()
		}

		else if(num_visible === 1)
		{
			stop_videos()
		}

		$("#footer_toggle_tv_icon").removeClass("fa-toggle-on")
		$("#footer_toggle_tv_icon").addClass("fa-toggle-off")

		tv_visible = false
	}

	update_chat_scrollbar()
	goto_bottom(false, false)
}

function toggle_radio(what=undefined, save=true)
{
	if(what !== undefined)
	{
		room_state.radio_enabled = what
	}

	else
	{
		room_state.radio_enabled = !room_state.radio_enabled
	}

	change_radio_visibility()

	if(save)
	{
		save_room_state()
	}
}

function change_radio_visibility()
{
	if(room_radio_mode !== "disabled" && room_state.radio_enabled)
	{
		$("#header_radio").css("display", "flex")

		$("#footer_toggle_radio_icon").removeClass("fa-toggle-off")
		$("#footer_toggle_radio_icon").addClass("fa-toggle-on")

		$("#header_topic").css("display", "none")

		radio_visible = true

		var original_radio_source = loaded_radio_source

		change({type:"radio", force:false, play:false})

		if(loaded_radio_type === "radio")
		{
			if(original_radio_source === loaded_radio_source)
			{
				get_radio_metadata()
			}
		}
	}

	else
	{
		stop_radio()

		$("#header_radio").css("display", "none")

		$("#footer_toggle_radio_icon").removeClass("fa-toggle-on")
		$("#footer_toggle_radio_icon").addClass("fa-toggle-off")

		$("#header_topic").css("display", "flex")

		radio_visible = false
	}
}

function open_profile_image_picker()
{
	$("#profile_image_picker").click()
}

function profile_image_selected(input)
{
	if(input.files && input.files[0])
	{
		var reader = new FileReader()

		reader.onload = function(e)
		{
			var s = "<img id='profile_image_canvas_image'><div id='profile_image_canvas_button' class='unselectable'>Crop and Upload</div>"

			msg_info.show(s, function()
			{
				$('#profile_image_canvas_image').attr('src', e.target.result)

				$("#profile_image_picker").closest('form').get(0).reset()

				var image = $('#profile_image_canvas_image')[0]

				var button = $('#profile_image_canvas_button')[0]

				var croppable = false

				var cropper = new Cropper(image,
				{
					aspectRatio: 1,
					viewMode: 2,
					ready: function ()
					{
						var container_data = cropper.getContainerData()

						cropper.setCropBoxData({width:container_data.width, height:container_data.height})

						var cropbox_data = cropper.getCropBoxData()

						var left = (container_data.width - cropbox_data.width) / 2
						var top = (container_data.height - cropbox_data.height) / 2

						cropper.setCropBoxData({left:left, right:top})

						croppable = true

						update_modal_scrollbar("info")
					}
				})


				button.onclick = function ()
				{
					var cropped_canvas
					var rounded_canvas
					var roundedImage

					if(!croppable)
					{
						return
					}

					cropped_canvas = cropper.getCroppedCanvas()
					
					rounded_canvas = get_rounded_canvas(cropped_canvas)

					rounded_canvas.toBlob(function(blob)
					{
						$("#user_menu_profile_image").attr("src", profile_image_loading_url)
						blob.name = "profile.png"
						upload_file(blob, "profile_image_upload")
						msg_info.close()
					}, 'image/png', 0.95)
				}
			})
		}

		reader.readAsDataURL(input.files[0])
	}
}

function get_rounded_canvas(sourceCanvas)
{
	var canvas = document.createElement('canvas')
	var context = canvas.getContext('2d')
	var width = profile_image_diameter
	var height = profile_image_diameter
	canvas.width = width
	canvas.height = height
	context.imageSmoothingEnabled = true
	context.drawImage(sourceCanvas, 0, 0, width, height)
	context.globalCompositeOperation = 'destination-in'
	context.beginPath()
	context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
	context.fill()
	return canvas
}

function setup_profile_image(pi)
{
	if(pi === "")
	{
		profile_image = default_profile_image_url
	}

	else
	{
		profile_image = pi
	}
}

function setup_show_profile()
{
	$('#show_profile_image').get(0).addEventListener('load', function()
	{
		update_modal_scrollbar("profile")
	})
}

function show_profile(uname, prof_image)
{
	if(prof_image === "" || prof_image === undefined || prof_image === "undefined")
	{
		var user = get_user_by_username(uname)

		if(user)
		{
			var pi = user.profile_image
		}

		else
		{
			var pi = default_profile_image_url
		}

	}

	else
	{
		var pi = prof_image
	}

	$("#show_profile_uname").text(uname)
	$("#show_profile_image").attr("src", pi)

	if(!can_chat || uname === username || !usernames.includes(uname))
	{
		$("#show_profile_whisper").css("display", "none")
	}

	else
	{
		$("#show_profile_whisper").css("display", "initial")
	}

	if($('.show_profile_button').filter(function() {return $(this).css('display') !== 'none'}).length)
	{
		$("#show_profile_buttons").css("display", "initial")
	}

	else
	{
		$("#show_profile_buttons").css("display", "none")
	}

	msg_profile.show(function()
	{
		update_modal_scrollbar("profile")
	})
}

function profile_image_changed(data)
{
	if(data.username === username)
	{
		profile_image = data.profile_image
		$("#user_menu_profile_image").attr("src", profile_image)
	}

	update_user_profile_image(data.username, data.profile_image)

	if(!user_is_ignored(data.username))
	{
		public_feedback(`${data.username} changed the profile image`,
		{
			username: data.username,
			open_profile: true
		})
	}
}

function update_user_profile_image(uname, pi)
{
	for(var i=0; i<userlist.length; i++)
	{
		var user = userlist[i]

		if(user.username === uname)
		{
			userlist[i].profile_image = pi
			return
		}
	}

	update_voice_chat_userlist()
}

function get_frame_ratio(frame_id)
{
	var id = `#${frame_id}`

	$(id).data('ratio', $(id).height() / $(id).width()).removeAttr('height').removeAttr('width')

	return $(id).data('ratio')
}

function fix_visible_video_frame()
{
	$(".video_frame").each(function()
	{
		if($(this).parent().css("display") !== "none")
		{
			fix_video_frame(this.id)
		}
	})
}

function fix_video_frame(frame_id)
{
	var id = `#${frame_id}`

	var frame = $(id)

	var pratio = frame.data("ratio")

	if(pratio === undefined)
	{
		pratio = get_frame_ratio(frame_id)
	}

	var ratio = 0.5625

	var parent = frame.parent()

	var parent_width = parent.width()
	var parent_height = parent.height()

	var frame_width = frame.width()
	var frame_height = frame.height()

	frame_height = frame_width * ratio

	if(frame_width === parent_width && frame_height === parent_height)
	{
		return
	}

	var n = 0

	var max = 200000

	if(frame_height < parent_height && frame_width < parent_width)
	{
		while(n < max)
		{
			if(frame_height < parent_height && frame_width < parent_width)
			{
				frame_width = frame_width + 1
				frame_height = frame_width * ratio
			}

			else
			{
				frame.width(frame_width)
				frame.height(frame_height)
				return
			}

			max += 1
		}

		frame.width(frame_width)
		frame.height(frame_height)
	}

	else
	{
		while(n < max)
		{
			if(frame_height > parent_height || frame_width > parent_width)
			{
				frame_width = frame_width - 1
				frame_height = frame_width * ratio
			}

			else
			{
				frame.width(frame_width)
				frame.height(frame_height)
				return
			}

			max += 1
		}

		frame.width(frame_width)
		frame.height(frame_height)
	}
}

function change_room_images_mode(what)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(what === room_images_mode)
	{
		feedback(`Images mode is already set to that`)
		return false
	}

	socket_emit("change_images_mode", {what:what})
}

function change_room_tv_mode(what)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(what === room_tv_mode)
	{
		feedback(`TV mode is already set to that`)
		return false
	}

	socket_emit("change_tv_mode", {what:what})
}

function change_room_radio_mode(what)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(what === room_radio_mode)
	{
		feedback(`Radio mode is already set to that`)
		return false
	}

	socket_emit("change_radio_mode", {what:what})
}

function change_room_voice_chat_mode(what)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(what === room_voice_chat_mode)
	{
		feedback(`Voice Chat mode is already set to that`)
		return false
	}

	socket_emit("change_voice_chat_mode", {what:what})
}

function announce_room_images_mode_change(data)
{
	public_feedback(`${data.username} changed the images mode to ${data.what}`,
	{
		username: data.username,
		open_profile: true
	})

	set_room_images_mode(data.what)
	change_images_visibility()
	check_permissions()
	check_maxers()
}

function announce_room_tv_mode_change(data)
{
	public_feedback(`${data.username} changed the tv mode to ${data.what}`,
	{
		username: data.username,
		open_profile: true
	})

	set_room_tv_mode(data.what)
	change_tv_visibility(false)
	check_permissions()
	check_maxers()
}

function announce_room_radio_mode_change(data)
{
	public_feedback(`${data.username} changed the radio mode to ${data.what}`,
	{
		username: data.username,
		open_profile: true
	})

	set_room_radio_mode(data.what)
	change_radio_visibility()
	check_permissions()
}

function announce_room_voice_chat_mode_change(data)
{
	public_feedback(`${data.username} changed the voice chat mode to ${data.what}`,
	{
		username: data.username,
		open_profile: true
	})

	if(data.what === "disabled")
	{
		voice_chat_userlist = []
		left_voice_chat()
	}

	update_voice_chat_userlist()
	set_room_voice_chat_mode(data.what)
	check_permissions()
}

function hide_media()
{
	stop_videos()

	$("#media").css("display", "none")
}

function setup_active_media(data)
{
	room_images_mode = data.room_images_mode
	room_tv_mode = data.room_tv_mode
	room_radio_mode = data.room_radio_mode
	room_voice_chat_mode = data.room_voice_chat_mode

	media_visibility_and_locks()
}

function media_visibility_and_locks()
{
	change_images_visibility()
	change_tv_visibility(false)
	change_radio_visibility()

	change_lock_images()
	change_lock_tv()
	change_lock_radio()
}

function change_theme(color)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	color = utilz.clean_string2(color)

	if(color.startsWith("rgba("))
	{
		color = colorlib.rgba_to_rgb(color)
	}

	if(!color.startsWith("rgb("))
	{
		return false
	}

	if(color === undefined)
	{
		return false
	}

	if(color === theme)
	{
		return false
	}

	socket_emit("change_theme", {color:color})
}

function announce_theme_change(data)
{
	public_feedback(`${data.username} changed the theme to ${data.color}`,
	{
		username: data.username,
		open_profile: true
	})

	set_theme(data.color)
}

function queue_image(data)
{
	image_queue.push(data)

	if(image_queue_timeout === undefined)
	{
		check_image_queue()
	}
}

function check_image_queue()
{
	if(image_queue.length > 0)
	{
		var data = image_queue[0]

		if(data !== "first")
		{
			setup_image(image_queue[0])
		}

		image_queue.shift()

		image_queue_timeout = setTimeout(function()
		{
			check_image_queue()
		}, image_queue_interval)
	}

	else
	{
		clearTimeout(image_queue_timeout)
		image_queue_timeout = undefined
	}
}

function open_background_image_picker()
{
	$("#background_image_input").click()
}

function background_image_selected(input)
{
	var file = input.files[0]

	var size = file.size / 1024

	$("#background_image_input").closest('form').get(0).reset()

	if(size > max_image_size)
	{
		msg_info.show("File is too big")
		return false
	}

	$("#admin_background_image").attr("src", background_image_loading_url)

	upload_file(file, "background_image_upload")
}

function announce_background_image_change(data)
{
	public_feedback(`${data.username} changed the background image`,
	{
		username: data.username,
		open_profile: true
	})

	set_background(data.background_image)
}

function change_background_mode(mode)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(mode !== "normal" && mode !== "tiled" && mode !== "mirror" && mode !== "solid")
	{
		feedback("Invalid background mode")
		return false
	}

	if(mode === background_mode)
	{
		feedback(`Background mode is already ${background_mode}`)
		return false
	}

	socket_emit("change_background_mode", {mode:mode})
}

function announce_background_mode_change(data)
{
	public_feedback(`${data.username} changed the background mode to ${data.mode}`,
	{
		username: data.username,
		open_profile: true
	})

	set_background_mode(data.mode)
}

function change_background_tile_dimensions(dimensions)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(dimensions.length > safe_limit_1)
	{
		return false
	}

	dimensions = utilz.clean_string2(dimensions)

	if(dimensions.length === 0)
	{
		return false
	}

	if(dimensions === background_tile_dimensions)
	{
		return false
	}

	socket_emit("change_background_tile_dimensions", {dimensions:dimensions})
}

function announce_background_tile_dimensions_change(data)
{
	public_feedback(`${data.username} changed the background tile dimensions to ${data.dimensions}`,
	{
		username: data.username,
		open_profile: true
	})

	set_background_tile_dimensions(data.dimensions)
	apply_background()
}

function link_image(src)
{
	if(!can_images)
	{
		feedback("You don't have permission to link images")
		return false
	}

	if(src.startsWith("/"))
	{
		return false
	}

	if(src === "default")
	{
		emit_change_image_source("default")
		return
	}

	else if(src === "prev" || src === "previous")
	{
		if(images_changed.length > 1)
		{
			src = images_changed[images_changed.length - 2].url
		}

		else
		{
			feedback("No image source before current one")
			return false
		}
	}

	if(src.length === 0)
	{
		return false
	}

	if(src.length > max_tv_source_length)
	{
		return false
	}

	else if(src.startsWith("http://") || src.startsWith("https://"))
	{
		src = src.replace(/\.gifv/g, '.gif')

		var extension = utilz.get_extension(src).toLowerCase()

		if(!extension || !utilz.image_extensions.includes(extension))
		{
			feedback("That doesn't seem to be an image")
			return false
		}
	}

	else
	{
		if(!imgur_enabled)
		{
			feedback("Imgur support is not enabled")
			return false
		}

	}

	emit_change_image_source(src)
}

function change_voice_permission(ptype, what)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(window[ptype] === undefined)
	{
		return false
	}

	if(window[ptype] === what)
	{
		feedback(`That permission is already set to that`)
		return false
	}

	socket_emit("change_voice_permission", {ptype:ptype, what:what})
}

function announce_voice_permission_change(data)
{
	if(data.what)
	{
		public_feedback(`${data.username} set ${data.ptype} to true`,
		{
			username: data.username,
			open_profile: true
		})
	}

	else
	{
		public_feedback(`${data.username} set ${data.ptype} to false`,
		{
			username: data.username,
			open_profile: true
		})
	}

	window[data.ptype] = data.what

	check_permissions()
	config_admin_permission_checkboxes()
}

function setup_input()
{
	$("#input").on("input", function()
	{
		var value = $("#input").val()

		value = utilz.clean_string9(value)

		if(value.length > max_input_length)
		{
			value = value.substring(0, max_input_length)
			$("#input").val(value)
		}

		if(old_input_val !== value)
		{
			input_changed = true
			check_typing()
			old_input_val = value
		}
	})

	old_input_val = $("#input").val()
}

function check_typing()
{
	var val = $("#input").val()

	if(val.length < old_input_val.length)
	{
		return false
	}

	var tval = val.trim()

	if(can_chat && tval !== "")
	{
		if(tval[0] === "/")
		{
			if(tval[1] !== "/" && !tval.startsWith('/me '))
			{
				return false
			}
		}

		typing_timer()
	}
}

var typing_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			socket_emit("typing", {})
		}, 100)
	}
})()

var typing_remove_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			hide_pencil()
		}, max_typing_inactivity)
	}
})()

function show_typing(data)
{
	if(user_is_ignored(data.username))
	{
		return false
	}

	show_pencil()
	typing_remove_timer()

	show_aura(data.username)
}

function show_pencil()
{
	$("#footer_user_menu").addClass("fa-pencil")
	$("#footer_user_menu").removeClass("fa-user-circle")
}

function hide_pencil()
{
	$("#footer_user_menu").removeClass("fa-pencil")
	$("#footer_user_menu").addClass("fa-user-circle")
}

function add_aura(uname)
{
	var mode = get_setting("chat_layout")

	if(mode === "normal")
	{
		$(`.umessage_${uname}`).last().find(".chat_profile_image_container").eq(0).addClass("aura")
	}

	else if(mode === "compact")
	{
		$(`.umessage_${uname}`).last().find(".chat_uname").eq(0).addClass("aura3")
	}
}

function show_aura(uname)
{
	if(aura_timeouts[uname] === undefined)
	{
		add_aura(uname)
	}

	else
	{
		var mode = get_setting("chat_layout")

		if(mode === "normal")
		{
			var c = !$(`.umessage_${uname}`).last().find(".chat_profile_image_container").eq(0).hasClass("aura")
		}

		else if(mode === "compact")
		{
			var c = !$(`.umessage_${uname}`).last().find(".chat_uname").eq(0).hasClass("aura3")
		}

		if(c)
		{
			remove_aura(uname)
			add_aura(uname)
		}

		clearTimeout(aura_timeouts[uname])
	}

	aura_timeouts[uname] = setTimeout(function()
	{
		remove_aura(uname)
	}, max_typing_inactivity)
}

function remove_aura(uname, clr=false)
{
	if(clr)
	{
		clearTimeout(aura_timeouts[uname])
	}

	var mode = get_setting("chat_layout")

	if(mode === "normal")
	{
		$(`.chat_profile_image_container.aura`).each(function()
		{
			var umessage = $(this).closest(`.umessage_${uname}`)

			if(umessage.length > 0)
			{
				$(this).removeClass("aura")
			}
		})
	}

	else if(mode === "compact")
	{
		$(`.chat_uname.aura3`).each(function()
		{
			var umessage = $(this).closest(`.umessage_${uname}`)

			if(umessage.length > 0)
			{
				$(this).removeClass("aura3")
			}
		})
	}

	aura_timeouts[uname] = undefined
}

function shrug()
{
	process_message("¯\\_(ツ)_/¯", false)
}

function show_afk()
{
	process_message("/me is now AFK", false)
}

function toggle_lock_images(what=undefined, save=true)
{
	if(what !== undefined)
	{
		room_state.images_locked = what
	}

	else
	{
		room_state.images_locked = !room_state.images_locked
	}

	change_lock_images()

	if(save)
	{
		save_room_state()
	}
}

function change_lock_images()
{
	if(room_state.images_locked)
	{
		$("#footer_lock_images_icon").removeClass("fa-unlock-alt")
		$("#footer_lock_images_icon").addClass("fa-lock")
		$("#footer_lock_images_icon").addClass("border_bottom")
	}

	else
	{
		$("#footer_lock_images_icon").removeClass("fa-lock")
		$("#footer_lock_images_icon").addClass("fa-unlock-alt")
		$("#footer_lock_images_icon").removeClass("border_bottom")

		change({type:"image"})
	}
}

function toggle_lock_tv(what=undefined, save=true)
{
	if(what !== undefined)
	{
		room_state.tv_locked = what
	}

	else
	{
		room_state.tv_locked = !room_state.tv_locked
	}

	change_lock_tv()

	if(save)
	{
		save_room_state()
	}
}

function change_lock_tv()
{
	if(room_state.tv_locked)
	{
		$("#footer_lock_tv_icon").removeClass("fa-unlock-alt")
		$("#footer_lock_tv_icon").addClass("fa-lock")
		$("#footer_lock_tv_icon").addClass("border_bottom")
	}

	else
	{
		$("#footer_lock_tv_icon").removeClass("fa-lock")
		$("#footer_lock_tv_icon").addClass("fa-unlock-alt")
		$("#footer_lock_tv_icon").removeClass("border_bottom")

		change({type:"tv"})
	}
}

function toggle_lock_radio(what=undefined, save=true)
{
	if(what !== undefined)
	{
		room_state.radio_locked = what
	}

	else
	{
		room_state.radio_locked = !room_state.radio_locked
	}

	change_lock_radio()

	if(save)
	{
		save_room_state()
	}
}

function change_lock_radio()
{
	if(room_state.radio_locked)
	{
		$("#footer_lock_radio_icon").removeClass("fa-unlock-alt")
		$("#footer_lock_radio_icon").addClass("fa-lock")
		$("#footer_lock_radio_icon").addClass("border_bottom")
	}

	else
	{
		$("#footer_lock_radio_icon").removeClass("fa-lock")
		$("#footer_lock_radio_icon").addClass("fa-unlock-alt")
		$("#footer_lock_radio_icon").removeClass("border_bottom")

		change({type:"radio"})
	}
}

function show_joined()
{
	feedback(`You joined ${room_name}`, {save:true})
	show_topic()
}

function show_media_menu()
{
	msg_media_menu.show()
}

function hide_media_menu()
{
	msg_media_menu.close()
}

function stop_media()
{
	stop_videos()
	stop_radio()
}

function stop_and_lock(stop=true)
{
	if(stop)
	{
		stop_media()
	}

	toggle_lock_images(true, false)
	toggle_lock_tv(true, false)
	toggle_lock_radio(true, false)

	save_room_state()
}

function refresh_image()
{
	change({type:"image", force:true, play:true, current_source:true})
}

function refresh_tv()
{
	change({type:"tv", force:true, play:true, current_source:true})
}

function refresh_radio()
{
	change({type:"radio", force:true, play:true, current_source:true})
}

function default_media_state(change_visibility=true)
{
	if(room_state.images_locked !== room_state_default_images_locked)
	{
		toggle_lock_images(room_state_default_images_locked, false)
	}

	if(room_state.tv_locked !== room_state_default_tv_locked)
	{
		toggle_lock_tv(room_state_default_tv_locked, false)
	}

	if(room_state.radio_locked !== room_state_default_radio_locked)
	{
		toggle_lock_radio(room_state_default_radio_locked, false)
	}

	if(change_visibility)
	{
		if(room_state.images_enabled !== room_state_default_images_enabled)
		{
			toggle_images(room_state_default_images_enabled, false)
		}

		if(room_state.tv_enabled !== room_state_default_tv_enabled)
		{
			toggle_tv(room_state_default_tv_enabled, false)
		}

		if(room_state.radio_enabled !== room_state_default_radio_enabled)
		{
			toggle_radio(room_state_default_radio_enabled, false)
		}
	}

	save_room_state()
}

function disconnect_others()
{
	socket_emit("disconnect_others", {})
}

function show_others_disconnected(data)
{
	if(data.amount === 1)
	{
		var s = `${data.amount} client was disconnected`
	}

	else
	{
		var s = `${data.amount} clients were disconnected`
	}

	feedback(s)
}

function set_username(uname)
{
	username = uname
	generate_mentions_regex()
	$("#user_menu_username").text(username)
}

function set_email(email)
{
	user_email = email
}

function generate_mentions_regex()
{
	var regexp = `(?:^|\\s+)(?:\\@)?(?:${escape_special_characters(username)})(?:\\'s)?(?:$|\\s+|\\!|\\?|\\,|\\.|\\:)`

	if(get_setting("case_insensitive_username_highlights"))
	{
		mentions_regex = new RegExp(regexp, "i")
	}

	else
	{
		mentions_regex = new RegExp(regexp)
	}
}

function generate_highlight_words_regex()
{
	var words = ""

	var lines = get_setting("other_words_to_highlight").split('\n')

	for(var i=0; i<lines.length; i++)
	{
		var line = lines[i]

		words += escape_special_characters(line)

		if(i < lines.length - 1)
		{
			words += "|"
		}
	}

	if(words.length > 0)
	{
		var regexp = `(?:^|\\s+)(?:\\@)?(?:${words})(?:\\'s)?(?:$|\\s+|\\!|\\?|\\,|\\.|\\:)`

		if(get_setting("case_insensitive_words_highlights"))
		{
			highlight_words_regex = new RegExp(regexp, "i")
		}

		else
		{
			highlight_words_regex = new RegExp(regexp)
		}
	}

	else
	{
		highlight_words_regex = false
	}
}

function check_highlights(message)
{
	if(get_setting("highlight_current_username"))
	{
		if(message.search(mentions_regex) !== -1)
		{
			return true
		}
	}

	if(highlight_words_regex)
	{
		if(message.search(highlight_words_regex) !== -1)
		{
			return true
		}
	}

	return false
}

function generate_ignored_words_regex()
{
	var words = ""

	var lines = get_setting("ignored_words").split('\n')

	for(var i=0; i<lines.length; i++)
	{
		var line = lines[i]

		words += escape_special_characters(line)

		if(i < lines.length - 1)
		{
			words += "|"
		}
	}

	if(words.length > 0)
	{
		var regexp = `(?:^|\\s+)(?:\\@)?(?:${words})(?:\\'s)?(?:$|\\s+|\\!|\\?|\\,|\\.|\\:)`

		if(get_setting("case_insensitive_ignored_words"))
		{
			ignored_words_regex = new RegExp(regexp, "i")
		}

		else
		{
			ignored_words_regex = new RegExp(regexp)
		}
	}

	else
	{
		ignored_words_regex = false
	}
}

function check_ignored_words(message="", uname="")
{
	if(ignored_words_regex)
	{
		if(message.search(ignored_words_regex) !== -1)
		{
			if(uname && uname === username && get_setting("ignored_words_exclude_same_user"))
			{
				return false
			}

			else
			{
				return true
			}
		}
	}

	return false
}

function create_popup(position, id=false, after_close=false)
{
	var common =
	{
		show_effect_duration: [0, 400],
		close_effect_duration: [400, 0],
		clear_editables: true,
	}

	if(id)
	{
		common.id = id
	}

	if(after_close)
	{
		common.after_close = after_close
	}

	if(get_setting("modal_effects"))
	{
		common.show_effect = "fade"
		common.close_effect = "fade"
	}

	else
	{
		common.show_effect = "none"
		common.close_effect = "none"
	}

	var edges_height = $("#footer").height()

	var pop = Msg.factory
	(
		Object.assign({}, common,
		{
			preset: "popup",
			edge_padding_y: edges_height + 20,
			position: position,
			window_class: "!custom_popup",
			enable_titlebar: true,
			center_titlebar: true,
			titlebar_class: "!custom_titlebar !unselectable",
			window_inner_x_class: "!titlebar_inner_x"
		})
	)

	return pop
}

function show_intro()
{
	var s = `
	You can chat in this area. The icon on the left opens the user menu where you can change your profile image and other settings.
	When someone is typing a message the user menu icon turns into a pencil. Hovering this icon shows additional actions.`

	create_popup("bottomleft").show(["Chat and User Menu", s])

	var s = `
	This area has media controls. You can use these to change the room's media or control what is displayed to you.`

	create_popup("bottomright").show(["Media Controls", s])

	var s = `
	This area contains the main menu, user list, voice chat, and radio controls.`

	create_popup("top").show(["Top Panel", s])

	var s = `
	You can lock the screen in this corner.`

	create_popup("topright").show(["Lock Screen", s])

	var s = `
	Close this to close all the popups.`
	
	var f = () => 
	{
		close_all_popups()
	}

	create_popup("topleft", false, f).show(["Close Popups", s])

	var s = `
	Please read all the popups.`

	create_popup("center").show(["Welcome", s])
}

function cant_chat()
{
	feedback("You don't have permission to chat")
}

function write_popup_message(arg, type="user")
{
	if(type === "user")
	{
		var split = arg.split(">")

		var uname = split[0].trim()

		if(!can_chat)
		{
			cant_chat()
			return false
		}

		if(uname === username)
		{
			feedback("You can't whisper to yourself")
			return false
		}

		if(!usernames.includes(uname))
		{
			user_not_in_room()
			return false
		}

		if(split.length > 1)
		{
			var message = utilz.clean_string2(split.slice(1).join(">"))

			socket_emit('whisper', 
			{
				username: uname, 
				message: message, 
				draw_coords: false
			})

			return false
		}

		var f = function()
		{
			show_profile(uname)
		}

		var title = {text:`Whisper To ${uname}`, onclick:f}
	}

	else if(type === "ops")
	{
		if(!is_admin_or_op(role))
		{
			not_an_op()
			return false
		}

		var title = {text:"* Whisper To Operators *"}
	}

	else if(type === "room")
	{
		if(!is_admin_or_op(role))
		{
			not_an_op()
			return false
		}

		var title = {text:"* Message To Room *"}
	}

	else if(type === "system")
	{
		var title = {text:"* Message To System *"}
	}

	message_uname = uname

	message_type = type

	msg_message.set_title(make_safe(title))

	msg_message.show(function()
	{
		$("#write_message_area").focus()
	})
}

function send_popup_message()
{
	var message = utilz.clean_string2($("#write_message_area").val())

	var diff = max_input_length - message.length

	if(draw_message_click_x.length > 0)
	{
		var draw_coords = [draw_message_click_x, draw_message_click_y, draw_message_drag]
	}

	else
	{
		var draw_coords = false
	}

	if(diff === max_input_length)
	{
		if(!draw_coords)
		{
			return false
		}
	}

	else if(diff < 0)
	{
		$("#write_message_feedback").text(`Character limit exceeded by ${Math.abs(diff)}`)
		$("#write_message_feedback").css("display", "block")
		return false
	}

	if(message_type === "user")
	{
		var ans = send_whisper_user(message, draw_coords)
	}

	else if(message_type === "ops")
	{
		var ans = send_whisper_ops(message, draw_coords)
	}

	else if(message_type === "room")
	{
		var ans = send_room_broadcast(message, draw_coords)
	}

	else if(message_type === "system")
	{
		var ans = send_system_broadcast(message, draw_coords)
	}

	if(ans)
	{
		msg_message.close()
	}
}

function sent_popup_message_function(mode, message, draw_coords, data1=false)
{
	var cf = function(){}

	var ff = function(){}

	if(mode === "whisper")
	{
		var s1 = utilz.nonbreak("Send Another Whisper")
		var s2 = `Whisper sent to ${data1}`

		cf = function()
		{
			write_popup_message(data1)
		}
		
		ff = function()
		{
			show_profile(data1)
		}
	}

	else
	{
		return false
	}

	var sp = "<div class='spacer3'></div>"

	var h = `<div class='small_button action' id='modal_popup_feedback_send'>${s1}</div>`

	if(draw_coords)
	{
		var ch = "<canvas id='modal_popup_feedback_draw' class='draw_canvas' width='400px' height='300px' tabindex=1></canvas>"
	}

	else
	{
		var ch = ""
	}

	if(ch)
	{
		var h = ch + sp + h
	}

	var s = make_safe(
	{
		text: message,
		html: h,
		remove_text_if_empty: true
	})

	var f = function()
	{
		msg_info2.show([make_safe({text:s2, onclick:ff}), s], function()
		{
			$("#modal_popup_feedback_send").click(cf)

			if(draw_coords)
			{
				var context = $("#modal_popup_feedback_draw")[0].getContext("2d")
				
				canvas_redraw
				({
					context: context, 
					click_x: draw_coords[0], 
					click_y: draw_coords[1], 
					drag: draw_coords[2]
				})
			}
		})
	}

	return f
}

function send_whisper_user(message, draw_coords)
{
	var uname = message_uname

	if(!uname)
	{
		return false
	}

	if(!can_chat)
	{
		$("#write_message_feedback").text("You don't have chat permission")
		$("#write_message_feedback").css("display", "block")
		return false
	}

	if(uname === username)
	{
		$("#write_message_feedback").text("You can't whisper to yourself")
		$("#write_message_feedback").css("display", "block")
		return false
	}

	if(!usernames.includes(uname))
	{
		$("#write_message_feedback").text("(User is not in the room)")
		$("#write_message_feedback").css("display", "block")
		return false
	}

	socket_emit('whisper', 
	{
		username: uname, 
		message: message, 
		draw_coords: draw_coords
	})

	var f = sent_popup_message_function("whisper", message, draw_coords, uname)

	feedback(`Whisper sent to ${uname}`, {onclick:f, save:true})

	return true
}

function send_whisper_ops(message, draw_coords)
{
	socket_emit('whisper_ops', {message:message, draw_coords:draw_coords})

	return true
}

function send_room_broadcast(message, draw_coords)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	socket_emit("room_broadcast", {message:message, draw_coords:draw_coords})

	return true
}

function send_system_broadcast(message, draw_coords)
{
	socket_emit("system_broadcast", {message:message, draw_coords:draw_coords})

	return true
}

function popup_message_received(data, type="user", announce=true)
{
	if(!data.id)
	{
		popup_message_id += 1
		data.id = popup_message_id
	}

	if(!data.date)
	{
		data.date = Date.now()
	}

	if(data.username)
	{
		if(user_is_ignored(data.username))
		{
			return false
		}

		var f = function()
		{
			show_profile(data.username)
		}
	}

	if(data.draw_coords)
	{
		var ch = `<canvas id='draw_popup_area_${data.id}' class='draw_canvas' width='400px' height='300px' tabindex=1></canvas>`
	}

	else
	{
		var ch = false
	}

	if(type === "user")
	{
		var t = `Whisper from ${data.username}`
		var title = {text:t, onclick:f}
		var h = `<div class='small_button action inline show_message_reply'>${utilz.nonbreak("Send Whisper")}</div>`
	}

	else if(type === "ops")
	{
		var t = `Whisper (To Operators) from ${data.username}`

		var title = {text:t, onclick:f}

		if(data.username !== username)
		{
			var h0 = `<div class='small_button action inline show_message_reply'>${utilz.nonbreak("Send Whisper")}</div><div class='spacer2'></div>`
		}

		else
		{
			var h0 = ""
		}

		var h = h0 + `<div class='small_button action inline show_message_reply_ops'>${utilz.nonbreak("Send Whisper To Operators")}</div>`
	}

	else if(type === "room")
	{
		var t = `Room Message from ${data.username}`
		var title = {text:t, onclick:f}
		var h = false
	}

	else if(type === "system")
	{
		var t = "System Message"
		var title = {text:t}
		var h = false
	}

	var sp = "<div class='spacer3'></div>"

	if(ch)
	{
		if(h)
		{
			var h = ch + sp + h
		}
		
		else
		{
			var h = ch
		}
	}

	data.content = make_safe(
	{
		text: data.message,
		html: h,
		title: nice_date(data.date),
		remove_text_if_empty: true
	})

	data.title = make_safe(title)

	if(!announce || get_setting("open_popup_messages"))
	{
		var closing_popups = false

		for(var p of get_popup_instances())
		{
			if(p.window.id === `Msg-window-popup_message_${data.id}`)
			{
				p.close(function()
				{
					show_popup_message(data)
				})

				closing_popups = true

				break
			}
		}

		if(!closing_popups)
		{
			show_popup_message(data)
		}
	}

	if(announce)
	{
		var af = function()
		{
			popup_message_received(data, type, false)
		}

		chat_announce(
		{
			brk: "<i class='icon2c fa fa-envelope'></i>",
			message: `${t} received`,
			save: true,
			onclick: af
		})
	}

	alert_title2()
	sound_notify("highlight")
}

function show_popup_message(data)
{
	var pop = create_popup("top", `popup_message_${data.id}`)

	pop.show([data.title, data.content], function()
	{
		$(pop.content).find(".show_message_reply").eq(0).click(function()
		{
			write_popup_message(data.username)
		})

		$(pop.content).find(".show_message_reply_ops").eq(0).click(function()
		{
			write_popup_message(false, "ops")
		})

		if(data.draw_coords)
		{
			var context = $(`#draw_popup_area_${data.id}`)[0].getContext("2d")

			canvas_redraw
			({
				context: context, 
				click_x: data.draw_coords[0], 
				click_y: data.draw_coords[1], 
				drag: data.draw_coords[2]
			})
		}
	})
}

function add_to_ignored_usernames(uname)
{
	var r = confirm("Are you sure?")

	if(r)
	{
		var active = active_settings("ignored_usernames")

		$(`#${active}_ignored_usernames`).val($(`#${active}_ignored_usernames`).val() + `\n${uname}`)

		setting_ignored_usernames_action(active)

		return true
	}

	return false
}

function user_not_in_room()
{
	feedback("User is not in the room")
}

function annex(rol="admin")
{
	if(!roles.includes(rol))
	{
		feedback("Invalid role")
		return false
	}

	socket_emit('change_role', {username:username, role:rol})
}

function show_highlights(filter=false)
{
	msg_highlights.show(function()
	{
		$("#highlights_filter").focus()

		$("#highlights_container").html("")

		for(var message of chat_history.slice(0).reverse())
		{
			if(message.data("highlighted"))
			{
				if(message.hasClass("chat_message"))
				{
					var huname = message.find('.chat_uname').eq(0)
					var hcontent = message.find('.chat_content')
					var cn = $("<div class='highlights_item'><div class='highlights_uname generic_uname inline action'></div><div class='highlights_content'></div>")
					cn.find(".highlights_uname").eq(0).text(huname.text())
					cn.find(".highlights_content").eq(0).html(hcontent.clone(true, true))
				}

				else if(message.hasClass("announcement"))
				{
					var cn = $("<div class='highlights_item'><div class='highlights_content'></div>")
					var content = cn.find(".highlights_content").eq(0)
					var announcement_content = message.find(".announcement_content").eq(0)
					content.append(announcement_content.parent().clone(true, true))
				}

				$("#highlights_container").append(cn)
			}
		}

		if(filter)
		{
			$("#highlights_filter").val(filter)
			do_highlights_filter()
		}

		update_modal_scrollbar("highlights")
	})
}

var highlights_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_highlights_filter()
		}, filter_delay)
	}
})()

function do_highlights_filter()
{
	var filter = $("#highlights_filter").val().trim().toLowerCase()

	if(filter !== "")
	{
		$(".highlights_item").each(function()
		{
			$(this).css("display", "block")

			var uname = $(this).find(".highlights_uname").eq(0).text()
			var hcontent = $(this).find(".highlights_content").eq(0)

			var content = ""

			hcontent.each(function()
			{
				content += `${$(this).text()} `
			})

			var include = false

			if(uname.toLowerCase().includes(filter))
			{
				include = true
			}

			else if(content.toLowerCase().includes(filter))
			{
				include = true
			}

			if(!include)
			{
				$(this).css("display", "none")
			}
		})
	}

	else
	{
		$(".highlights_item").each(function()
		{
			$(this).css("display", "block")
		})
	}

	update_modal_scrollbar("highlights")

	$('#Msg-content-container-highlights').scrollTop(0)
}

function execute_commands(setting)
{
	if(get_setting(setting))
	{
		var cmds = get_setting(setting).split('\n')

		for(var cmd of cmds)
		{
			process_message(cmd, false, false)
		}
	}
}

function on_double_tap()
{
	execute_commands("double_tap")
}

function on_double_tap_2()
{
	execute_commands("double_tap_2")
}

function on_double_tap_3()
{
	execute_commands("double_tap_3")
}

function at_startup()
{
	if(first_time)
	{
		return false
	}

	execute_commands("at_startup")
}

function show_image_history(filter=false)
{
	msg_image_history.show(function()
	{
		if(filter)
		{
			$("#image_history_filter").val(filter)
			do_image_history_filter()
		}

		$("#image_history_filter").focus()
	})
}

function show_tv_history(filter=false)
{
	msg_tv_history.show(function()
	{
		if(filter)
		{
			$("#tv_history_filter").val(filter)
			do_tv_history_filter()
		}

		$("#tv_history_filter").focus()
	})
}

function show_radio_history(filter=false)
{
	msg_radio_history.show(function()
	{
		if(filter)
		{
			$("#radio_history_filter").val(filter)
			do_radio_history_filter()
		}

		$("#radio_history_filter").focus()
	})
}

function do_media_history_filter(type)
{
	var filter = $(`#${type}_filter`).val().trim().toLowerCase()
	var container = $(`#${type}_container`)

	if(filter !== "")
	{
		if(type === "image_history")
		{
			image_history_filtered = true
		}

		else if(type === "tv_history")
		{
			tv_history_filtered = true
		}

		else if(type === "radio_history")
		{
			radio_history_filtered = true
		}

		container.children().each(function()
		{
			$(this).css("display", "block")

			var content = $(this).find(".announcement_content").eq(0).text()

			var include = false

			if(content.toLowerCase().includes(filter))
			{
				include = true
			}

			if(!include)
			{
				$(this).css("display", "none")
			}
		})
	}

	else
	{
		if(type === "image_history")
		{
			image_history_filtered = false
		}

		else if(type === "tv_history")
		{
			tv_history_filtered = false
		}

		else if(type === "radio_history")
		{
			radio_history_filtered = false
		}

		container.children().each(function()
		{
			$(this).css("display", "block")
		})
	}

	update_modal_scrollbar(type)

	$(`#Msg-content-container-${type}`).scrollTop(0)
}

var image_history_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_image_history_filter()
		}, filter_delay)
	}
})()

var tv_history_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_tv_history_filter()
		}, filter_delay)
	}
})()

var radio_history_filter_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			do_radio_history_filter()
		}, filter_delay)
	}
})()

function reset_image_history_filter()
{
	$("#image_history_filter").val("")
	do_image_history_filter()
}

function reset_tv_history_filter()
{
	$("#tv_history_filter").val("")
	do_tv_history_filter()
}

function reset_radio_history_filter()
{
	$("#radio_history_filter").val("")
	do_radio_history_filter()
}

function do_image_history_filter()
{
	do_media_history_filter("image_history")
}

function do_tv_history_filter()
{
	do_media_history_filter("tv_history")
}

function do_radio_history_filter()
{
	do_media_history_filter("radio_history")
}

function do_test()
{
	process_message("Test: 3")
}

function maximize_images()
{
	if(images_visible)
	{
		if(tv_visible)
		{
			toggle_tv(false, false)
		}

		else
		{
			toggle_tv(true, false)
		}
	}

	else
	{
		toggle_images(true, false)

		if(tv_visible)
		{
			toggle_tv(false, false)
		}
	}

	save_room_state()
}

function maximize_tv()
{
	if(tv_visible)
	{
		if(images_visible)
		{
			toggle_images(false, false)
		}

		else
		{
			toggle_images(true, false)
		}
	}

	else
	{
		toggle_tv(true, false)

		if(images_visible)
		{
			toggle_images(false, false)
		}
	}

	save_room_state()
}

function font_check()
{
	document.fonts.ready.then(function ()
	{
		update_chat_scrollbar()
		goto_bottom(true, false)
	})
}

function start_generic_uname_click_events()
{
	$("body").on("click", ".generic_uname", function()
	{
		var uname = $(this).text()
		show_profile(uname)
	})
}

function electron_signal(func, data={})
{
	if(window["electron_api"] === undefined)
	{
		return false
	}

	if(window["electron_api"][func] !== undefined)
	{
		window["electron_api"][func](data)
	}
}

function modal_image_prev_click()
{
	var index = current_modal_image_index - 1

	if(index < 0)
	{
		index = images_changed.length - 1
	}

	var url = $("#modal_image").attr("src")

	var prev = images_changed[index]

	if(prev.url !== url)
	{
		show_modal_image(prev.url, prev.title, prev.date_raw)
	}
}

function modal_image_next_click(e)
{
	var index = current_modal_image_index + 1

	if(index > images_changed.length - 1)
	{
		index = 0
	}

	var url = $("#modal_image").attr("src")

	var next = images_changed[index]

	if(next.url !== url)
	{
		show_modal_image(next.url, next.title, next.date_raw)
	}
}

function setup_modal_image()
{
	var img = $("#modal_image")

	img[0].addEventListener('load', function()
	{
		$("#modal_image_spinner").css("display", "none")
		$("#modal_image").css("display", "block")
		update_modal_scrollbar("image")
	})

	img.on("error", function()
	{
		$("#modal_image_spinner").css("display", "none")
		$("#modal_image").css("display", "none")
		$("#modal_image_error").css("display", "block")
		update_modal_scrollbar("image")
	})

	var f = function(e)
	{
		if(e.ctrlKey || e.shiftKey)
		{
			return false
		}

		var direction = e.deltaY > 0 ? 'down' : 'up'

		if(direction === 'up')
		{
			modal_image_next_wheel_timer()
		}

		else if(direction === 'down')
		{
			modal_image_prev_wheel_timer()
		}
	}

	$("#Msg-window-modal_image")[0].addEventListener("wheel", f)

	$("#modal_image_container").click(function()
	{
		msg_modal_image.close()
	})

	$("#modal_image_header_info").click(function()
	{
		show_image_history()
	})

	$("#modal_image_footer_info").click(function()
	{
		show_modal_image_number()
	})

	$("#modal_image_footer_prev").click(function(e)
	{
		modal_image_prev_click()
	})

	$("#modal_image_footer_next").click(function(e)
	{
		modal_image_next_click()
	})
}

var modal_image_prev_wheel_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			modal_image_prev_click()
		}, wheel_delay)
	}
})()

var modal_image_next_wheel_timer = (function()
{
	var timer

	return function()
	{
		clearTimeout(timer)

		timer = setTimeout(function()
		{
			modal_image_next_click()
		}, wheel_delay)
	}
})()

function show_current_date()
{
	feedback(nice_date())
}

function request_slice_upload(data)
{
	var file = files[data.date]

	if(!file)
	{
		return false
	}

	var place = data.current_slice * upload_slice_size

	var slice = file.slice(place, place + Math.min(upload_slice_size, file.size - place))

	file.next = get_file_next(file)

	if(file.next >= 100)
	{
		file.sending_last_slice = true
	}

	file.percentage = Math.floor(((upload_slice_size * data.current_slice) / file.size) * 100)

	file.reader.readAsArrayBuffer(slice)

	change_upload_status(file, `${file.percentage}%`)
}

function upload_ended(data)
{
	var file = files[data.date]

	if(file)
	{
		change_upload_status(file, "100%", true)
		delete files[data.date]
	}
}

function error_occurred()
{
	feedback("An error occurred")
}

function verify_email(code)
{
	if(utilz.clean_string5(code) !== code)
	{
		feedback("Invalid code")
		return
	}

	if(code.length === 0)
	{
		feedback("Empty code")
		return
	}

	if(code.length > email_change_code_max_length)
	{
		feedback("Invalid code")
		return
	}

	socket_emit("verify_email", {code:code})
}

function start_locked_mode()
{
	$("#header").css("display", "none")
	$("#footer").css("display", "none")

	show_locked_menu()
	make_main_container_visible()
}

function show_locked_menu()
{
	msg_locked.show()
}

function show_goto_room()
{
	var s = `
	<input id='goto_room_input' type='text' placeholder='Room ID or URL'>
	<div class='spacer3'></div>
	<div class='menu_item action inline' id='goto_room_button'>Go There</div>`

	msg_info2.show(["Go To Room", s], function()
	{
		$("#goto_room_input").focus()

		$("#goto_room_button").click(function()
		{
			goto_room_action()
		})

		gtr = true
	})
}

function goto_room_action()
{
	var id = $("#goto_room_input").val().trim()

	if(id.length === 0)
	{
		return false
	}

	show_open_room(id)
}

function confirm_reset_settings(type)
{
	if(type === "global_settings")
	{
		var s = "Global Settings"
	}

	else
	{
		var s = "Room Settings"
	}

	var r = confirm(`Are you sure you want to reset the ${s} to their initial state?`)

	if(r)
	{
		reset_settings(type)
	}
}

function reset_settings(type)
{
	window[`empty_${type}`]()
	window[`get_${type}`]()
	start_settings_state(type)
	call_setting_actions("global_settings", false)
	call_setting_actions("room_settings", false)
	set_media_sliders(type)
	prepare_media_settings()

	if(type === "room_settings")
	{
		set_room_settings_overriders()
		check_room_settings_override()
	}
}

function setup_chat()
{
	if(get_setting("custom_scrollbars"))
	{
		start_chat_scrollbar()
	}
}

function execute_javascript(arg, show_result=true)
{
	try
	{
		var r = eval(arg)

		if(typeof r === "number")
		{
			try
			{
				r = utilz.round(r, 2)
			}

			catch(err){}
		}

		try
		{
			r = JSON.stringify(r)
		}

		catch(err)
		{
			r = "Done"
		}
	}

	catch(err)
	{
		var r = "Error"
	}

	if(show_result)
	{
		var s = make_safe({text:arg})

		var f = function()
		{
			msg_info2.show(["Executed Javascript", s])
		}

		feedback(`js: ${r}`, {onclick:f, save:true})
	}
}

function make_safe(args={})
{
	var def_args =
	{
		text: "",
		html: false,
		urlize: true,
		onclick: false,
		html_unselectable: true,
		title: false,
		remove_text_if_empty: false
	}

	fill_defaults(args, def_args)

	var c = $("<div></div>")

	if(args.text || !args.remove_text_if_empty)
	{
		var c_text_classes = "message_info_text inline"

		if(args.onclick)
		{
			c_text_classes += " pointer action"
		}

		c.append(`<div class='${c_text_classes}'></div>`)

		var c_text = c.find(".message_info_text").eq(0)

		if(args.urlize)
		{
			c_text.text(args.text).urlize()
		}

		else
		{
			c_text.text(args.text)
		}

		if(args.onclick)
		{
			c_text.on("click", args.onclick)
		}

		if(args.title)
		{
			c_text.attr("title", args.title)
		}
	}

	if(args.html)
	{
		if(args.text || !args.remove_text_if_empty)
		{
			var sp = "<div class='spacer3'></div>"
		}

		else
		{
			var sp = ""
		}

		c.append(`${sp}<div class='message_info_html'>${args.html}</div>`)

		if(args.html_unselectable)
		{
			c.find(".message_info_html").eq(0).addClass("unselectable")
		}
	}

	return c[0]
}

function activity_above()
{
	var step = false
	var up_scroller_height = $("#up_scroller").outerHeight()
	var scrolltop = $("#chat_area").scrollTop()

	$($(".message").get().reverse()).each(function()
	{
		var same_uname = false

		var uname = $(this).data("uname")

		if(uname && uname === username)
		{
			same_uname = true
		}

		if(same_uname || $(this).data("highlighted"))
		{
			var p = $(this).position()

			if(p.top < up_scroller_height)
			{
				var diff = scrolltop + p.top - up_scroller_height
				scroll_chat_to(diff)
				step = true
				return false
			}
		}
	})

	if(!step)
	{
		goto_top()
	}
}

function activity_below()
{
	var step = false
	var up_scroller_height = $("#up_scroller").outerHeight()
	var down_scroller_height = $("#down_scroller").outerHeight()
	var chat_area_height = $("#chat_area").innerHeight()
	var scrolltop = $("#chat_area").scrollTop()

	$(".message").each(function()
	{
		var same_uname = false

		var uname = $(this).data("uname")

		if(uname && uname === username)
		{
			same_uname = true
		}

		if(same_uname || $(this).data("highlighted"))
		{
			var p = $(this).position()
			var h = $(this).outerHeight()

			if(p.top + h + down_scroller_height > chat_area_height)
			{
				var diff = scrolltop + p.top - up_scroller_height
				scroll_chat_to(diff)
				step = true
				return false
			}
		}
	})

	if(!step)
	{
		goto_bottom(true)
	}
}

function user_is_ignored(uname)
{
	if(uname === username)
	{
		return false
	}

	if(get_setting("ignored_usernames").includes(uname))
	{
		return true
	}

	return false
}

function show_global_settings(filter=false)
{
	msg_global_settings.show()
}

function show_room_settings(filter=false)
{
	msg_room_settings.show()
}

function setup_settings_windows()
{
	setup_setting_elements("global_settings")
	setup_setting_elements("room_settings")
	create_room_settings_overriders()
	set_room_settings_overriders()
	start_room_settings_overriders()
	check_room_settings_override()
	setup_settings_window()
}

function create_room_settings_overriders()
{
	var s = `
	<div class='room_settings_overrider_container'>
		<input type='checkbox' class='room_settings_overrider'>
		Override
	</div>`

	$("#room_settings_container").find(".settings_item").each(function()
	{
		$(this).prepend(s)
	})
}

function set_room_settings_overriders()
{
	$(".room_settings_overrider").each(function()
	{
		var item = $(this).closest(".settings_item")
		var setting = item.data("setting")
		var override = room_settings[`${setting}_override`]

		if(override === undefined)
		{
			override = false
		}

		$(this).prop("checked", override)

		room_item_fade(override, item)
	})
}

function start_room_settings_overriders()
{
	$(".room_settings_overrider").change(function()
	{
		var item = $(this).closest(".settings_item")
		var setting = item.data("setting")
		var override = $(this).prop("checked")

		if(override === undefined)
		{
			override = false
		}

		room_item_fade(override, item)

		room_settings[`${setting}_override`] = override

		if(window[`setting_${setting}_action`] !== undefined)
		{
			if(override)
			{
				window[`setting_${setting}_action`]("room_settings", false)
			}

			else
			{
				window[`setting_${setting}_action`]("global_settings", false)
			}
		}

		if(setting === "media_display_percentage" 
		|| setting === "tv_display_percentage"
		|| setting === "tv_display_position")
		{
			prepare_media_settings()
		}

		check_room_settings_override()
		save_room_settings()

		var togglers = item.find(".toggler")

		if(togglers.length > 0)
		{
			var toggler = togglers.eq(0)

			if(override)
			{
				set_toggler("room_settings", toggler, "open")
			}

			else
			{
				set_toggler("room_settings", toggler, "close")
			}
		}
	})
}

function room_item_fade(override, item)
{
	if(override)
	{
		item.removeClass("faded")
	}

	else
	{
		item.addClass("faded")
	}

	$("#settings_window_right_global_settings .settings_item").each(function()
	{
		if(item.data("setting") === $(this).data("setting"))
		{
			if(override)
			{
				$(this).addClass("faded")
			}

			else
			{
				$(this).removeClass("faded")
			}

			return false
		}
	})
}

function setup_setting_elements(type)
{
	$(`#${type}_double_tap_key`).text(double_tap_key)
	$(`#${type}_double_tap_2_key`).text(double_tap_key_2)
	$(`#${type}_double_tap_3_key`).text(double_tap_key_3)

	setup_togglers(type)
}

function check_room_settings_override()
{
	var override = false

	$("#settings_window_left_room_settings .settings_window_category").each(function()
	{
		$(this).find(".settings_window_category_status").eq(0).html("")
	})

	for(var key in global_settings)
	{
		if(room_settings[`${key}_override`])
		{
			override = true

			var el = $(`#room_settings_${key}`)

			if(el.length > 0)
			{
				var container = el.closest(".settings_category")

				if(container.length > 0)
				{
					var category = container.data("category")

					$("#settings_window_left_room_settings .settings_window_category").each(function()
					{
						if($(this).data("category") === category)
						{
							$(this).find(".settings_window_category_status").eq(0).html("&nbsp;(*)")
							return false
						}
					})
				}
			}
		}
	}

	if(override)
	{
		$("#user_menu_room_settings_status").html("&nbsp;(*)")
	}

	else
	{
		$("#user_menu_room_settings_status").html("")
	}
}

function get_setting(name)
{
	try
	{
		if(room_settings[`${name}_override`])
		{
			return room_settings[name]
		}

		else
		{
			return global_settings[name]
		}
	}

	catch(err)
	{
		return undefined
	}
}

function active_settings(name)
{
	if(room_settings[`${name}_override`])
	{
		return "room_settings"
	}

	else
	{
		return "global_settings"
	}
}

function set_toggler(type, el, action=false, update=true)
{
	var container = $(el).next(`.${type}_toggle_container`)
	
	var display = container.css('display')

	if(display === "none")
	{
		if(action && action !== "open")
		{
			return false
		}

		close_togglers(type)

		container.css("display", "block")
		
		$(el).html(`- ${$(el).html().substring(2)}`)

		container.closest(".toggler_main_container")[0].scrollIntoView({block:"center"})
	}

	else
	{
		if(action && action !== "close")
		{
			return false
		}

		container.css("display", "none")
		
		$(el).html(`+ ${$(el).html().substring(2)}`)
	}

	if(update)
	{
		update_modal_scrollbar(type)
	}
}

function setup_togglers(type)
{
	$(`.${type}_toggle`).each(function()
	{
		$(this).click(function()
		{
			set_toggler(type, this)
		})
	})
}

function open_togglers(type)
{
	$(`.${type}_toggle`).each(function()
	{
		set_toggler(type, this, "open", false)
	})

	update_modal_scrollbar(type)
}

function close_togglers(type)
{
	$(`.${type}_toggle`).each(function()
	{
		set_toggler(type, this, "close", false)
	})

	update_modal_scrollbar(type)
}

function show_top_scroller()
{
	$('#top_scroller_container').css('visibility', 'visible')
}

function hide_top_scroller()
{
	$('#top_scroller_container').css('visibility', 'hidden')
}

function show_bottom_scroller()
{
	$('#bottom_scroller_container').css('visibility', 'visible')
}

function hide_bottom_scroller()
{
	$('#bottom_scroller_container').css('visibility', 'hidden')
}

function scroll_chat_to(y, animate=true, d=500)
{
	$("#chat_area").stop()

	if(started && app_focused && animate && get_setting("animate_scroll"))
	{
		$("#chat_area").animate({scrollTop:y}, d, function()
		{
			check_scrollers()
		})
	}

	else
	{
		$("#chat_area").scrollTop(y)
	}
}

function set_room_name(name)
{
	room_name = name
	config_admin_room_name()
}

function set_room_images_mode(what)
{
	room_images_mode = what
	config_admin_room_images_mode()
}

function set_room_tv_mode(what)
{
	room_tv_mode = what
	config_admin_room_tv_mode()
}

function set_room_radio_mode(what)
{
	room_radio_mode = what
	config_admin_room_radio_mode()
}

function set_room_voice_chat_mode(what)
{
	room_voice_chat_mode = what
	config_admin_room_voice_chat_mode()
}

function set_background_mode(what)
{
	background_mode = what
	config_admin_background_mode()
	apply_background()
	apply_theme()
}

function set_background_tile_dimensions(dimensions)
{
	background_tile_dimensions = dimensions
	config_admin_background_tile_dimensions()
}

function set_privacy(what)
{
	is_public = what
	config_admin_privacy()
}

function set_log_enabled(what)
{
	log_enabled = what
	config_admin_log_enabled()
}

function needs_confirm(func, s=false)
{
	if(!s)
	{
		s = "Are you sure?"
	}

	var r = confirm(s)

	if(r)
	{
		window[func]()
	}
}

function is_admin_or_op(rol=false)
{
	if(rol)
	{
		var r = rol
	}

	else
	{
		var r = role
	}

	if(r === "admin" || r === "op")
	{
		return true
	}

	else
	{
		return false
	}
}

function show_import_settings()
{
	var s = `
	<div class='container_22'>
		Paste code generated by Export Settings
		<div class='spacer3'></div>
		<textarea id='import_settings_textarea' rows=5 class='setting_textarea'></textarea>
		<div class='spacer3'></div>
		<div class='menu_item inline action pointer' id='import_settings_apply'>Apply</div>
	</div>
	`

	msg_info2.show(["Import Settings", s], function()
	{
		$("#import_settings_textarea").focus()
		$("#import_settings_apply").click(function()
		{
			process_imported_settings()
		})

		imp = true
	})
}

function process_imported_settings()
{
	var code = $("#import_settings_textarea").val().trim()

	if(code === "")
	{
		return false
	}

	try
	{
		eval(code)
	}

	catch(err)
	{
		alert("Code provided is invalid")
	}
}

function show_export_settings()
{
	var gsettings = localStorage.getItem(ls_global_settings)
	var rsettings = localStorage.getItem(ls_room_settings)

	var code = `var gsettings = ${gsettings}; save_local_storage(ls_global_settings, gsettings); var rsettings = ${rsettings}; save_local_storage(ls_room_settings, rsettings); restart_client()`
	var code2 = `var gsettings = ${gsettings}; save_local_storage(ls_global_settings, gsettings); restart_client()`
	var code3 = `var rsettings = ${rsettings}; save_local_storage(ls_room_settings, rsettings); restart_client()`

	var s = `
	<div class='container_22'>
		In case you want to export your settings from one browser to another.
		<div class='spacer3'></div>
		You can import either Global Settings, Room Settings, or both.
		<div class='spacer3'></div>
		Room Settings copies every room's settings, not just the current one.
		<div class='spacer3'></div>
		To do this, copy one of the codes below, and paste it in Import Settings in the other browser.
		<div class='spacer3'></div>
		<div class='spacer3'></div>
		(a) Use this code if you want to import <span class='bold'>Global</span> and <span class='bold'>Room</span> Settings
		<div class='spacer3'></div>
		<textarea rows=5 class='setting_textarea'>${code}</textarea>
		<div class='spacer3'></div>
		<div class='spacer3'></div>
		(b) Use this code if you only want to import <span class='bold'>Global</span> Settings
		<div class='spacer3'></div>
		<textarea rows=5 class='setting_textarea'>${code2}</textarea>
		<div class='spacer3'></div>
		<div class='spacer3'></div>
		(c) Use this code if you only want to import <span class='bold'>Room</span> Settings
		<div class='spacer3'></div>
		<textarea rows=5 class='setting_textarea'>${code3}</textarea>
	</div>
	`

	msg_info2.show(["Export Settings", s])
}

function feedback(message, data=false)
{
	var obj =
	{
		brk: '*',
		message: message
	}

	if(data)
	{
		Object.assign(obj, data)
	}

	if(!obj.brk.startsWith("<") && !obj.brk.endsWith(">"))
	{
		obj.brk = `<div class='inline'>${obj.brk}</div>`
	}

	chat_announce(obj)
}

function public_feedback(message, data=false)
{
	var obj =
	{
		brk: '~',
		save: true,
		message: message
	}

	if(data)
	{
		Object.assign(obj, data)
	}

	if(!obj.brk.startsWith("<") && !obj.brk.endsWith(">"))
	{
		obj.brk = `<div class='inline'>${obj.brk}</div>`
	}

	chat_announce(obj)
}

function make_unique_lines(s)
{
	var split = s.split('\n')
	split = split.filter((v,i) => split.indexOf(v) === i)
	s = split.join('\n')
	return s
}

function add_separator(update_scroll=true)
{
	if(!get_setting("new_messages_separator"))
	{
		return false
	}

	if($(".separator_container").length > 0)
	{
		return false
	}

	if(get_setting("chat_layout") === "normal")
	{
		var messagecls = "normal_layout"
	}

	else if(get_setting("chat_layout") === "compact")
	{
		var messagecls = "compact_layout"
	}

	var s = `
	<div class='message separator_container ${messagecls}'>
		<div class='separator_line'></div>
		<div class='separator_text'>New Messages</div>
		<div class='separator_line'></div>
	<div>`

	var sep = $(s)

	$("#chat_area").append(sep)

	if(update_scroll)
	{
		update_chat_scrollbar()
		goto_bottom()
	}
}

function remove_separator(update_scroll=true)
{
	$(".separator_container").each(function()
	{
		$(this).remove()
	})

	if(update_scroll)
	{
		update_chat_scrollbar()
		goto_bottom()
	}
}

function start_soundcloud()
{
	try
	{
		soundcloud_player = SC.Widget("soundcloud_player")
		soundcloud_video_player = SC.Widget("media_soundcloud_video")
	}

	catch(err)
	{
		console.error("Soundcloud failed to load")
	}
}

function change_text_color_mode(mode)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	if(mode !== "automatic" && mode !== "custom")
	{
		feedback("Invalid text color mode")
		return false
	}

	if(mode === text_color_mode)
	{
		feedback(`Text color mode is already ${text_color_mode}`)
		return false
	}

	socket_emit("change_text_color_mode", {mode:mode})
}

function announce_text_color_mode_change(data)
{
	public_feedback(`${data.username} changed the text color mode to ${data.mode}`,
	{
		username: data.username,
		open_profile: true
	})

	set_text_color_mode(data.mode)
	apply_theme()
}

function set_text_color_mode(mode)
{
	text_color_mode = mode
	config_admin_text_color_mode()
}

function change_text_color(color)
{
	if(!is_admin_or_op(role))
	{
		not_an_op()
		return false
	}

	color = utilz.clean_string2(color)

	if(color.startsWith("rgba("))
	{
		color = colorlib.rgba_to_rgb(color)
	}

	if(!color.startsWith("rgb("))
	{
		return false
	}

	if(color.length === 0)
	{
		return false
	}

	if(color === text_color)
	{
		return false
	}

	socket_emit("change_text_color", {color:color})
}

function announce_text_color_change(data)
{
	public_feedback(`${data.username} changed the text color to ${data.color}`,
	{
		username: data.username,
		open_profile: true
	})

	set_text_color(data.color)
	apply_theme()
}

function set_text_color(color)
{
	text_color = color
	config_admin_text_color()
}

function conditional_quotes(s)
{
	if(!s.includes(" ") && (s.startsWith("https://") || s.startsWith("http://")))
	{
		return s
	}

	else
	{
		return `"${s}"`
	}
}

function restart_tv()
{
	change_tv_source("restart")
	msg_tv_picker.close()
}

function restart_radio()
{
	change_radio_source("restart")
	msg_radio_picker.close()
}

function background_image_enabled()
{
	if(background_mode === "solid")
	{
		return false
	}

	if(background_mode === "mirror")
	{
		if(room_images_mode === "disabled")
		{
			return false
		}
	}

	if(!get_setting("background_image"))
	{
		return false
	}

	return true
}

function setup_footer()
{
	$("#footer_images_icon").on("auxclick", function(e)
	{
		if(e.which === 2)
		{
			$("#image_file_picker").click()
		}
	})
}

function stop_radio_in(minutes)
{
	if(!radio_started)
	{
		feedback("Radio is not started")
		return false
	}

	clear_automatic_stop_radio(false)

	var d = 1000 * 60 * minutes

	stop_radio_delay = minutes

	stop_radio_timeout = setTimeout(function()
	{
		if(radio_started)
		{
			stop_radio()
		}
	}, d)

	if(minutes === 1)
	{
		var s = "1 minute"
	}

	else
	{
		var s = `${minutes} minutes`
	}

	feedback(`Radio will stop automatically in ${s}`)
}

function clear_automatic_stop_radio(announce=true)
{
	clearTimeout(stop_radio_timeout)
	
	stop_radio_timeout = undefined

	stop_radio_delay = 0

	if(announce)
	{
		feedback("Radio won't stop automatically anymore")
	}
}

function ping_server()
{
	socket_emit("ping_server", {date:Date.now()})
}

function pong_received(data)
{
	var d = (Date.now() - data.date)

	if(d === 1)
	{
		var ds = `${d} ms`
	}

	else
	{
		var ds = `${d} ms`
	}

	feedback(`Pong: ${ds}`)
}

function send_reaction(reaction_type)
{
	if(!can_chat)
	{
		feedback("You don't have permission to chat")
		return false
	}

	if(!reaction_types.includes(reaction_type))
	{
		return false
	}

	socket_emit("send_reaction", {reaction_type:reaction_type})

	hide_reactions()
}

function show_reaction(data, date=false)
{
	if(date)
	{
		var d = date
	}

	else
	{
		var d = Date.now()
	}

	if(data.reaction_type === "like")
	{
		var icon = "<i class='icon2c fa fa-thumbs-o-up'></i>"
		var message = `likes this`
	}

	else if(data.reaction_type === "love")
	{
		var icon = "<i class='icon2c fa fa-heart-o'></i>"
		var message = `loves this`
	}

	else if(data.reaction_type === "happy")
	{
		var icon = "<i class='icon2c fa fa-smile-o'></i>"
		var message = `is feeling happy`
	}

	else if(data.reaction_type === "meh")
	{	
		var icon = "<i class='icon2c fa fa-meh-o'></i>"
		var message = `is feeling meh`
	}

	else if(data.reaction_type === "sad")
	{
		var icon = "<i class='icon2c fa fa-frown-o'></i>"
		var message = `is feeling sad`
	}

	else if(data.reaction_type === "dislike")
	{
		var icon = "<i class='icon2c fa fa-thumbs-o-down'></i>"
		var message = `dislikes this`
	}

	else
	{
		return false
	}

	var f = function()
	{
		show_profile(data.username, data.profile_image)
	}
	
	update_chat(
	{
		brk: icon,
		message: message,
		username: data.username,
		prof_image: data.profile_image,
		third_person: true,
		date: d
	})
}

function setup_reactions_box()
{
	$("#footer_user_menu_container").hover(

	function()
	{
		clearTimeout(hide_reactions_timeout)
	
		show_reactions_timeout = setTimeout(function()
		{
			show_reactions()
		}, reactions_hover_delay)
	},
	
	function()
	{
		start_hide_reactions()
	})

	$("#reactions_box_container").hover(
	
	function()
	{
		mouse_over_reactions = true
		clearTimeout(hide_reactions_timeout)
	},
	
	function()
	{
		mouse_over_reactions = false
		start_hide_reactions()
	})
}

function start_hide_reactions()
{
	clearTimeout(show_reactions_timeout)

	hide_reactions_timeout = setTimeout(function()
	{
		if(mouse_over_reactions)
		{
			return false
		}

		hide_reactions()
	}, reactions_hover_delay)
}

function show_reactions()
{
	$("#reactions_box_container").css("display", "flex")
}

function hide_reactions()
{
	$("#reactions_box_container").css("display", "none")
}

function run_user_function(n)
{
	if(!user_functions.includes(n))
	{
		return false
	}

	if(get_setting(`user_function_${n}`))
	{
		execute_commands(`user_function_${n}`)
	}

	else
	{
		feedback(`User Function ${n} doesn't do anything yet. You can set what it does in the User Settings`)
	}
	
	hide_reactions()
}

function set_tv_display_percentage(v, type)
{
	if(!v)
	{
		return false
	}

	if(v === "default")
	{
		v = global_settings_default_tv_display_percentage
	}

	v = parseInt(v)

	if(!Number.isInteger(v))
	{
		return false
	}

	$(`#${type}_tv_display_percentage`).nstSlider('set_position', v)
}

function set_media_display_percentage(v, type)
{
	if(!v)
	{
		return false
	}

	if(v === "default")
	{
		v = global_settings_default_media_display_percentage
	}

	v = parseInt(v)

	if(!Number.isInteger(v))
	{
		return false
	}

	$(`#${type}_media_display_percentage`).nstSlider('set_position', v)
}

function apply_media_percentages()
{
	var p1 = get_setting("tv_display_percentage")
	var p2 = (100 - p1)

	$("#media_tv").css("height", `${p1}%`)
	$("#media_image_container").css("height", `${p2}%`)

	var c1 = get_setting("media_display_percentage")
	var c2 = (100 - c1)

	$("#media").css("width", `${c1}%`)
	$("#chat_main").css("width", `${c2}%`)

	on_resize()
}

function apply_media_positions()
{
	var p = get_setting("tv_display_position")

	if(p === "top")
	{
		var tvp = 1
		var ip = 2
	}

	else if(p === "bottom")
	{
		var tvp = 2
		var ip = 1
	}

	$("#media_image_container").css("order", ip)
	$("#media_tv").css("order", tvp)

	fix_media_margin()
}

function swap_display_positions(type)
{	
	var p = window[type].tv_display_position

	if(p === "top")
	{
		var np = "bottom"
	}

	else if(p === "bottom")
	{
		var np = "top"
	}

	window[type].tv_display_position = np
	window[`save_${type}`]()
	
	arrange_media_setting_display_positions(type)
	apply_media_positions()
}

function arrange_media_setting_display_positions(type)
{
	var p = window[type].tv_display_position

	if(p === "top")
	{
		var tvo = 1
		var imo = 2
	}

	else if(p === "bottom")
	{
		var tvo = 2
		var imo = 1
	}

	$(`#${type}_display_position_image`).css("order", imo)
	$(`#${type}_display_position_tv`).css("order", tvo)	
}

function lock_screen()
{
	msg_lockscreen.show()

	screen_locked = true

	if(get_setting("afk_on_lockscreen"))
	{
		afk = true
		app_focused = false
	}

	execute_commands("on_lockscreen")
}

function unlock_screen()
{
	msg_lockscreen.close()

	screen_locked = false

	if(get_setting("afk_on_lockscreen"))
	{
		afk = false 
		app_focused = true
		on_app_focused()
	}

	execute_commands("on_unlockscreen")
}

function setup_message_area()
{
	draw_message_context = $("#draw_message_area")[0].getContext("2d")
	
	clear_draw_message_state()

	$('#draw_message_area').mousedown(function(e)
	{
		draw_message_just_entered = false
		draw_message_add_click(e.offsetX, e.offsetY, false)
		redraw_draw_message()
	})

	$('#draw_message_area').mousemove(function(e)
	{
		if(mouse_is_down)
		{
			draw_message_add_click(e.offsetX, e.offsetY, !draw_message_just_entered)
			redraw_draw_message()
		}

		draw_message_just_entered = false
	})

	$('#draw_message_area').mouseenter(function(e)
	{
		draw_message_just_entered = true
	})
}

function redraw_draw_message()
{
	canvas_redraw
	({
		context: draw_message_context, 
		click_x: draw_message_click_x, 
		click_y: draw_message_click_y, 
		drag: draw_message_drag
	})
}

function clear_draw_message_state()
{
	draw_message_click_x = []
	draw_message_click_y = []
	draw_message_drag = []

	draw_message_context.clearRect(0, 0, draw_message_context.canvas.width, draw_message_context.canvas.height)
}

function draw_message_add_click(x, y, dragging)
{
	draw_message_click_x.push(x)
	draw_message_click_y.push(y)
	draw_message_drag.push(dragging)

	if(draw_message_click_x.length > draw_coords_max_array_length)
	{
		draw_message_click_x.shift()
		draw_message_click_y.shift()
		draw_message_drag.shift()
	}
}

function canvas_redraw(args={})
{
	var def_args =
	{
		context: false,
		click_x: false,
		click_y: false,
		drag: false,
		bg_color: false,
		colors: false,
		sizes: false,
		sector_index: false,
		type: false
	}

	fill_defaults(args, def_args)

	if(args.sector_index === false)
	{
		args.sector_index = args.click_x.length
	}

	args.context.clearRect(0, 0, args.context.canvas.width, args.context.canvas.height)
	
	args.context.lineJoin = "round"

	var draw_bg = true

	if(args.type === "draw_image")
	{
		draw_image_context.putImageData(draw_image_current_snapshot.data, 0, 0)
	}

	if(args.bg_color && draw_bg)
	{
		args.context.fillStyle = args.bg_color;
		
		args.context.fillRect(0, 0, args.context.canvas.width, args.context.canvas.height)
	}

	for(var i=0; i<args.sector_index; i++) 
	{
		args.context.beginPath()

		if(args.drag[i] && i)
		{
			args.context.moveTo(args.click_x[i - 1], args.click_y[i - 1])
		}

		else
		{
			args.context.moveTo(args.click_x[i] -1, args.click_y[i])
		}

		args.context.lineTo(args.click_x[i], args.click_y[i])
		
		args.context.closePath()

		if(args.colors)
		{
			args.context.strokeStyle = args.colors[i]
		}

		else
		{
			args.context.strokeStyle = $("#draw_message_area").css("color")
		}

		if(args.sizes)
		{
			args.context.lineWidth = args.sizes[i]
		}

		else
		{
			args.context.lineWidth = 2
		}

		args.context.stroke()
	}
}

function open_draw_image()
{
	if(!can_images)
	{
		feedback("You don't have permission to draw images")
		return false
	}

	msg_draw_image.show()
}

function draw_image_scale_fix(n)
{
	return parseInt(Math.round(n* draw_image_scale))
}

function draw_image_add_sector()
{
	draw_image_current_snapshot.sectors.push(draw_image_current_snapshot.click_x.length)
}

function setup_draw_image()
{
	draw_image_context = $("#draw_image_area")[0].getContext("2d")

	draw_image_context.scale(draw_image_scale, draw_image_scale)
	
	clear_draw_image_state()

	$('#draw_image_area').mousedown(function(e)
	{
		if(draw_image_mode === "bucket")
		{
			return false
		}

		draw_image_just_entered = false

		draw_image_check_increase_snapshot()
		draw_image_add_sector()
		draw_image_add_click(e.offsetX, e.offsetY, false)
		redraw_draw_image()
	})

	$('#draw_image_area').mousemove(function(e)
	{
		if(mouse_is_down)
		{
			draw_image_add_click(e.offsetX, e.offsetY, !draw_image_just_entered)
			redraw_draw_image()
		}

		draw_image_just_entered = false
	})

	$('#draw_image_area').mouseenter(function(e)
	{
		draw_image_just_entered = true
	})

	$("#draw_image_area").click(function(e)
	{
		if(draw_image_mode === "bucket")
		{
			var result = draw_image_bucket_fill(draw_image_scale_fix(e.offsetX), draw_image_scale_fix(e.offsetY))

			if(result)
			{
				draw_image_check_redo()
				increase_draw_image_snapshot(result)
			}
		}
	})

	draw_image_prepare_settings()
}

function draw_image_prepare_settings()
{
	draw_image_pencil_color = "rgb(51, 51, 51)"
	draw_image_bucket_color = "rgb(72, 152, 183)"
	draw_image_pencil_size = 4

	set_draw_image_mode_input("pencil")

	$("#draw_image_pencil_color").spectrum(
	{
		preferredFormat: "rgb",
		color: draw_image_pencil_color,
		appendTo: "#draw_image_main",
		showInput: true,
		showPalette: true,
		palette: 
		[
			["rgba(0, 0, 0, 0)"]
		],
		showSelectionPalette: true,
		maxSelectionSize: 15,
		show: function()
		{
			set_draw_image_mode_input("pencil")
		}
	})
	
	$("#draw_image_pencil_color").on('hide.spectrum', function(e, t)
	{
		draw_image_pencil_color = t.toRgbString()
	})

	$("#draw_image_bucket_color").spectrum(
	{
		preferredFormat: "rgb",
		color: draw_image_bucket_color,
		appendTo: "#draw_image_main",
		showInput: true,
		showPalette: true,
		palette: 
		[
			["rgba(0, 0, 0, 0)"]
		],
		showSelectionPalette: true,
		maxSelectionSize: 15,
		show: function()
		{
			set_draw_image_mode_input("bucket")
		}
	})
	
	$("#draw_image_bucket_color").on('hide.spectrum', function(e, t)
	{
		draw_image_bucket_color = t.toRgbString()
	})

	$("#draw_image_pencil_size").find('option').each(function()
	{
		if($(this).val() == draw_image_pencil_size)
		{
			$(this).prop('selected', true)
		}
	})

	$("#draw_image_pencil_size").change(function()
	{
		draw_image_pencil_size = $(this).val()
	})
}

function set_draw_image_mode_input(m)
{
	if(m === "pencil")
	{
		$("#draw_image_mode_select_pencil").addClass("modal_icon_selected")
		$("#draw_image_mode_select_bucket").removeClass("modal_icon_selected")
	}

	else if(m === "bucket")
	{
		$("#draw_image_mode_select_bucket").addClass("modal_icon_selected")
		$("#draw_image_mode_select_pencil").removeClass("modal_icon_selected")
	}

	draw_image_mode = m
}

function increase_draw_image_snapshot(data)
{
	var level = draw_image_current_snapshot.level + 1

	draw_image_snapshots[`level_${level}`] = 
	{
		level: level,
		data: data,
		click_x: [],
		click_y: [],
		drag: [],
		color_array: [],
		size_array: [],
		sectors: [],
		sector_index: 0
	}

	draw_image_current_snapshot = draw_image_snapshots[`level_${level}`]

	var keys = Object.keys(draw_image_snapshots)

	if(keys.length > draw_image_max_levels)
	{
		var lowest_key = keys.length

		for(var key in draw_image_snapshots)
		{
			var snapshot = draw_image_snapshots[key]

			if(snapshot.level < lowest_key)
			{
				lowest_key = snapshot.level
			}
		}

		delete draw_image_snapshots[`level_${lowest_key}`]
	}
}

function clear_draw_image_state()
{
	var context = draw_image_context

	context.fillStyle = "rgb(255, 255, 255)";
	 		
	context.fillRect(0, 0, context.canvas.width, context.canvas.height)

	draw_image_snapshots =
	{
		level_0:
		{
			level: 0,
			data: draw_image_get_image_data(),
			click_x: [],
			click_y: [],
			drag: [],
			color_array: [],
			size_array: [],
			sectors: [],
			sector_index: 0
		}
	} 

	draw_image_current_snapshot = draw_image_snapshots["level_0"]
}

function redraw_draw_image()
{
	canvas_redraw
	({
		context: draw_image_context, 
		click_x: draw_image_current_snapshot.click_x, 
		click_y: draw_image_current_snapshot.click_y, 
		drag: draw_image_current_snapshot.drag, 
		colors: draw_image_current_snapshot.color_array,
		sizes: draw_image_current_snapshot.size_array,
		sector_index: draw_image_current_snapshot.sector_index,
		type: "draw_image"
	})
}

function draw_image_clean_redo(i)
{
	draw_image_current_snapshot.click_x = draw_image_current_snapshot.click_x.slice(0, i)
	draw_image_current_snapshot.click_y = draw_image_current_snapshot.click_y.slice(0, i)
	draw_image_current_snapshot.color_array = draw_image_current_snapshot.color_array.slice(0, i)
	draw_image_current_snapshot.size_array = draw_image_current_snapshot.size_array.slice(0, i)
	draw_image_current_snapshot.drag = draw_image_current_snapshot.drag.slice(0, i)

	var new_sectors = []

	for(var sector of draw_image_current_snapshot.sectors)
	{
		if(sector <= i)
		{
			new_sectors.push(sector)
		}
	}

	draw_image_current_snapshot.sectors = new_sectors

	for(var level in draw_image_snapshots)
	{
		if(draw_image_snapshots[level].level > draw_image_current_snapshot.level)
		{
			delete draw_image_snapshots[level]
		}
	}
}

function draw_image_has_levels_above()
{
	var level = draw_image_current_snapshot.level

	for(var key in draw_image_snapshots)
	{
		if(draw_image_snapshots[key].level > level)
		{
			return true
		}
	}

	return false
}

function draw_image_check_redo()
{
	if(draw_image_current_snapshot.click_x.length !== draw_image_current_snapshot.sector_index || draw_image_has_levels_above())
	{
		draw_image_clean_redo(draw_image_current_snapshot.sector_index)
	}
}

function draw_image_get_image_data()
{
	var context = draw_image_context
	var w = context.canvas.width
	var h = context.canvas.height
	var data = draw_image_context.getImageData(0, 0, w, h)

	return data
}

function draw_image_check_increase_snapshot()
{
	if(draw_image_current_snapshot.click_x.length === draw_image_current_snapshot.sector_index && !draw_image_has_levels_above())
	{
		if(draw_image_current_snapshot.click_x.length >= draw_image_num_strokes_save)
		{
			var sector = draw_image_current_snapshot.sectors[draw_image_current_snapshot.sectors.length - 1]
			draw_image_clean_redo(sector)
			increase_draw_image_snapshot(draw_image_get_image_data())
		}
	}
}

function draw_image_add_click(x, y, dragging)
{
	draw_image_check_redo()

	draw_image_current_snapshot.click_x.push(x)
	draw_image_current_snapshot.click_y.push(y)
	draw_image_current_snapshot.color_array.push(draw_image_pencil_color)
	draw_image_current_snapshot.size_array.push(draw_image_pencil_size)
	draw_image_current_snapshot.drag.push(dragging)

	draw_image_current_snapshot.sector_index = draw_image_current_snapshot.click_x.length
}

function upload_draw_image()
{
	if(!can_images)
	{
		feedback("You don't have permission to upload images")
		return false
	}

	if(draw_image_current_snapshot.level === 0 && draw_image_current_snapshot.click_x.length === 0)
	{
		return false
	}

	$("#draw_image_area")[0].toBlob(function(blob)
	{
		blob.name = "draw_image.png"
		upload_file(blob, "image_upload")
		msg_draw_image.close()
	}, 'image/png', 0.95)
}

function clear_draw_image_func()
{
	clear_draw_image_state()
}

function draw_image_undo()
{
	if(draw_image_current_snapshot.sector_index > 0)
	{
		for(var sector of draw_image_current_snapshot.sectors.slice(0).reverse())
		{
			if(sector < draw_image_current_snapshot.sector_index)
			{
				draw_image_current_snapshot.sector_index = sector
				redraw_draw_image()
				break
			}
		}
	}

	else
	{
		var level = draw_image_current_snapshot.level - 1

		if(draw_image_snapshots[`level_${level}`] !== undefined)
		{	
			draw_image_current_snapshot.sector_index = 0
			draw_image_current_snapshot = draw_image_snapshots[`level_${level}`]
			draw_image_current_snapshot.sector_index = draw_image_current_snapshot.click_x.length

			redraw_draw_image()
		}
	}
}

function draw_image_redo()
{
	if(draw_image_current_snapshot.sector_index < draw_image_current_snapshot.click_x.length)
	{
		var found = false
		
		var old_index = draw_image_current_snapshot.sector_index

		for(var sector of draw_image_current_snapshot.sectors)
		{
			if(sector > draw_image_current_snapshot.sector_index)
			{
				draw_image_current_snapshot.sector_index = sector
				redraw_draw_image()
				found = true
				break
			}
		}

		if(!found)
		{
			if(draw_image_current_snapshot.sector_index !== draw_image_current_snapshot.click_x.length)
			{
				draw_image_current_snapshot.sector_index = draw_image_current_snapshot.click_x.length
				redraw_draw_image()
			}
		}
	}

	else
	{
		var level = draw_image_current_snapshot.level + 1

		if(draw_image_snapshots[`level_${level}`] !== undefined)
		{
			draw_image_current_snapshot.sector_index = draw_image_current_snapshot.click_x.length
			draw_image_current_snapshot = draw_image_snapshots[`level_${level}`]
			draw_image_current_snapshot.sector_index = 0
			
			redraw_draw_image()
		}
	}
}

function clone_image_data_object(image_data)
{
	var copy = new ImageData
	(
		new Uint8ClampedArray(image_data.data),
		image_data.width,
		image_data.height
	)

	return copy	
}

function draw_image_bucket_fill(x, y)
{
	var context = draw_image_context
	
	var w = context.canvas.width 
	
	var h = context.canvas.height 

	var image_data = draw_image_get_image_data()

	var data = image_data.data

	var node = [y, x]

	var target_color = get_canvas_node_color(data, node, w)

	var replacement_color = colorlib.rgb_to_array(draw_image_bucket_color)

	replacement_color.push(255)

	if(canvas_node_color_is_equal(target_color, replacement_color))
	{
		return false
	}

	var q = []

	data = set_canvas_node_color(data, node, replacement_color, w)

	q.push(node)

	while(q.length)
	{
		var n = q.shift()

		if(n[1] > 0)
		{
			var nn = [n[0], n[1] - 1]

			var nn_color = get_canvas_node_color(data, nn, w)

			if(canvas_node_color_is_equal(nn_color, target_color))
			{
				data = set_canvas_node_color(data, nn, replacement_color, w)
				q.push(nn)
			}
		}

		if(n[1] < w - 1)
		{
			var nn = [n[0], n[1] + 1]
			
			var nn_color = get_canvas_node_color(data, nn, w)

			if(canvas_node_color_is_equal(nn_color, target_color))
			{
				data = set_canvas_node_color(data, nn, replacement_color, w)
				q.push(nn)
			}
		}

		if(n[0] > 0)
		{
			var nn = [n[0] - 1, n[1]]
			
			var nn_color = get_canvas_node_color(data, nn, w)

			if(canvas_node_color_is_equal(nn_color, target_color))
			{
				data = set_canvas_node_color(data, nn, replacement_color, w)
				q.push(nn)
			}
		}

		if(n[0] < h - 1)
		{
			var nn = [n[0] + 1, n[1]]
			
			var nn_color = get_canvas_node_color(data, nn, w)

			if(canvas_node_color_is_equal(nn_color, target_color))
			{
				data = set_canvas_node_color(data, nn, replacement_color, w)
				q.push(nn)
			}
		}
	}

	image_data.data = data

	context.putImageData(image_data, 0, 0)

	return image_data
}

function get_canvas_node_index(data, node, w)
{
	return ((node[0] * w) + node[1]) * 4
}

function get_canvas_node_color(data, node, w)
{
	var index = get_canvas_node_index(data, node, w)

	return [data[index], data[index + 1], data[index + 2], data[index + 3]]
}

function set_canvas_node_color(data, node, values, w)
{
	var index = get_canvas_node_index(data, node, w)

	data[index] = values[0]
	data[index + 1] = values[1]
	data[index + 2] = values[2]
	data[index + 3] = values[3]

	return data
}

function canvas_node_color_is_equal(a1, a2)
{
	var diff = 10

	var c1 = Math.abs(a1[0] - a2[0]) <= diff
	var c2 = Math.abs(a1[1] - a2[1]) <= diff
	var c3 = Math.abs(a1[2] - a2[2]) <= diff

	var alpha = Math.abs(a1[3] - a2[3]) <= diff

	return (c1 && c2 && c3 && alpha)
}

function setup_mouse_events()
{
	$("body").mousedown(function()
	{
		mouse_is_down = true
	})

	$("body").mouseup(function()
	{
		mouse_is_down = false
	})

	$("body").mouseleave(function()
	{
		mouse_is_down = false
	})
}

function draw_image_change_mode()
{
	if(draw_image_mode === "pencil")
	{
		set_draw_image_mode_input("bucket")
	}

	else if(draw_image_mode === "bucket")
	{
		set_draw_image_mode_input("pencil")
	}
}

function update_voice_chat_userlist()
{
	$("#voice_chat_num_users").text(voice_chat_userlist.length)

	if(voice_chat_joined)
	{
		var s = ""

		for(var id of voice_chat_userlist)
		{
			var u = get_user_by_id(id)

			s += `
			<div class='voice_chat_item' data-user_id='${u.user_id}'>
				<div class='voice_chat_profile_image_container' id='voice_chat_profile_image_container_${u.user_id}'>
					<img class='voice_chat_profile_image' src='${u.profile_image}' title='${u.username}'>
				</div>
			</div>`
		}

		$("#voice_chat").html(s)
	}
}

function toggle_join_voice_chat()
{
	if(voice_chat_joined)
	{
		leave_voice_chat()
	}

	else
	{
		join_voice_chat()
	}
}

function join_voice_chat()
{
	if(can_voice_chat)
	{
		start_microphone()
	}
}

function leave_voice_chat()
{
	socket_emit("leave_voice_chat", {})
}

function joined_voice_chat()
{
	if(!voice_chat_joined)
	{
		voice_chat_joined = true

		$("#voice_chat_container").css("height", "80px")
		$("#voice_chat_container").css("min-height", "80px")

		after_join_or_leave_voice_chat()
	}
}

function left_voice_chat()
{
	if(voice_chat_joined)
	{
		voice_chat_joined = false

		stop_microphone_stream()

		$("#voice_chat_container").css("height", 0)
		$("#voice_chat_container").css("min-height", 0)

		after_join_or_leave_voice_chat()
	}
}

function after_join_or_leave_voice_chat()
{
	fix_visible_video_frame()
	goto_bottom(false, false)
}

function voice_chat_user_connected(data)
{
	if(!voice_chat_userlist.includes(data.user_id))
	{
		voice_chat_userlist.push(data.user_id)

		if(data.user_id === user_id)
		{
			joined_voice_chat()
		}

		if(voice_chat_joined)
		{
			sound_notify("voice_chat_join")
		}
		
		update_voice_chat_userlist()
	}
}

function voice_chat_user_disconnected(data)
{
	if(voice_chat_userlist.includes(data.user_id))
	{
		for(var i=0; i<voice_chat_userlist.length; i++)
		{
			var id = voice_chat_userlist[i]

			if(id === data.user_id)
			{
				voice_chat_userlist.splice(i, 1)
				break
			}
		}

		if(voice_chat_joined)
		{
			sound_notify("voice_chat_left")
		}

		if(data.user_id === user_id)
		{
			left_voice_chat()
		}

		update_voice_chat_userlist()
	}
}

function start_microphone()
{
	navigator.mediaDevices.getUserMedia({audio:true, video:false})

	.then(function(stream)
	{
		var AudioContext = window.AudioContext

		microphone_stream = stream
		microphone_context = new AudioContext()
		microphone_input = microphone_context.createMediaStreamSource(microphone_stream)
		microphone_recorder = microphone_context.createScriptProcessor(microphone_buffer_size, 2, 2)
		
		microphone_left_channel = []
		microphone_right_channel = []
		microphone_volume = 0
		microphone_averaging = 0.95

		microphone_recorder.onaudioprocess = function(e)
		{
			process_microphone(e)
		}

		microphone_input.connect(microphone_recorder)

		microphone_recorder.connect(microphone_context.destination)

		socket_emit("join_voice_chat", {})
	})

	.catch(function(err)
	{ 
		msg_info.show("No microphone detected")
	})
}

function process_microphone(e)
{
	var acceptable = check_process_microphone(e)

	if(acceptable)
	{
		microphone_left_channel.push(new Float32Array(e.inputBuffer.getChannelData(0)))
		microphone_right_channel.push(new Float32Array(e.inputBuffer.getChannelData(1)))
		
		microphone_recording_length += microphone_buffer_size
		
		if(microphone_recording_length > microphone_buffer_size * microphone_buffer_multiplier)
		{	
			var blob = microphone_data_to_blob()

			microphone_recording_length = 0
			microphone_left_channel = []
			microphone_right_channel = []

			socket_emit("voice_chat_blob", {array_buffer:blob})
		}
	}

	else
	{
		microphone_recording_length = 0
		microphone_left_channel = []
		microphone_right_channel = []
	}
}

function check_process_microphone(e)
{
	var buf = e.inputBuffer.getChannelData(0)
	var buf_length = buf.length
	var sum = 0
	var x

	// Do a root-mean-square on the samples: sum up the squares...
	for (var i=0; i<buf_length; i++)
	{
		x = buf[i]
		sum += x * x
	}

	// ... then take the square root of the sum.
	var rms =  Math.sqrt(sum / buf_length)

	// Now smooth this out with the averaging factor applied
	// to the previous sample - take the max here because we
	// want "fast attack, slow release."
	microphone_volume = Math.max(rms, microphone_volume * microphone_averaging)

	if(microphone_volume >= get_setting("microphone_threshold"))
	{
		return true
	}

	else
	{
		return false
	}
}

function microphone_data_to_blob()
{
	// we flat the left and right channels down
	// Float32Array[] => Float32Array
	var left_bugger = flatten_array(microphone_left_channel, microphone_recording_length)
	var right_buffer = flatten_array(microphone_right_channel, microphone_recording_length)
	
	// we interleave both channels together
	// [left[0],right[0],left[1],right[1],...]
	var interleaved = interleave(left_bugger, right_buffer)
	
	// we create our wav file
	var buffer = new ArrayBuffer(44 + interleaved.length * 2)
	var view = new DataView(buffer)
	
	// RIFF chunk descriptor
	writeUTFBytes(view, 0, 'RIFF')
	view.setUint32(4, 44 + interleaved.length * 2, true)
	writeUTFBytes(view, 8, 'WAVE')
	
	// FMT sub-chunk
	writeUTFBytes(view, 12, 'fmt ')
	view.setUint32(16, 16, true) // chunkSize
	view.setUint16(20, 1, true) // wFormatTag
	view.setUint16(22, 2, true) // wChannels: stereo (2 channels)
	view.setUint32(24, microphone_sample_rate, true) // dwSamplesPerSec
	view.setUint32(28, microphone_sample_rate * 4, true) // dwAvgBytesPerSec
	view.setUint16(32, 4, true) // wBlockAlign
	view.setUint16(34, 16, true) // wBitsPerSample
	
	// data sub-chunk
	writeUTFBytes(view, 36, 'data')
	view.setUint32(40, interleaved.length * 2, true)
	
	// write the PCM samples
	var index = 44
	var volume = 1

	for(var i=0; i<interleaved.length; i++) 
	{
		view.setInt16(index, interleaved[i] * (0x7FFF * volume), true)
		index += 2
	}

	// our final blob
	return new Blob([view], {type:'audio/wav'})
}

function flatten_array(channel_buffer, recording_length) 
{
    var result = new Float32Array(recording_length)

    var offset = 0

    for(var i=0; i<channel_buffer.length; i++) 
    {
        var buffer = channel_buffer[i]
        result.set(buffer, offset)
        offset += buffer.length
    }

    return result
}

function interleave(left_channel, right_channel) 
{
	var length = left_channel.length + right_channel.length
	var result = new Float32Array(length)
	var input_index = 0

	for(var index=0; index<length;) 
	{
		result[index++] = left_channel[input_index]
		result[index++] = right_channel[input_index]
		input_index++
	}

	return result
}

function writeUTFBytes(view, offset, string) 
{
	for(var i=0; i<string.length; i++) 
	{
		view.setUint8(offset + i, string.charCodeAt(i))
	}
}

function stop_microphone_stream()
{
	if(microphone_recorder)
	{
		microphone_recorder.disconnect(microphone_context.destination)
		microphone_input.disconnect(microphone_recorder)
		microphone_stream.getAudioTracks()[0].stop()
	}
}

function voice_chat_blob_received(data)
{
	if(voice_chat_joined)
	{
		var blob = new Blob([data.array_buffer], {type:'audio/wav'})
		
		if(voice_chat_received_chunks[data.user_id] === undefined)
		{
			voice_chat_received_chunks[data.user_id] = [blob]
			
			setTimeout(function()
			{
				voice_chat_play_chunk(data.user_id)
			}, 500)
		}

		else
		{
			voice_chat_received_chunks[data.user_id].push(blob)
		}
	}
}

function voice_chat_play_chunk(id)
{
	var chunk = voice_chat_received_chunks[id].shift()

	if(chunk === undefined)
	{
		voice_chat_received_chunks[id] = undefined
		return false
	}

	var audioblob = new Audio(window.URL.createObjectURL(chunk))

	var duration = chunk.size / microphone_sample_rate / microphone_buffer_multiplier / 2

	setTimeout(function()
	{
		voice_chat_play_chunk(id)
	}, duration * 1000 * 0.9)

	audioblob.play()
	
	show_voice_aura(id)
}

function show_voice_aura(id)
{
	if(voice_aura_timeouts[id] === undefined)
	{
		add_voice_aura(id)
	}

	else
	{
		clearTimeout(voice_aura_timeouts[id])
	}

	voice_aura_timeouts[id] = setTimeout(function()
	{
		remove_voice_aura(id)
	}, max_voice_chat_inactivity)
}

function add_voice_aura(id)
{
	$(`#voice_chat_profile_image_container_${id}`).addClass("aura")
}

function remove_voice_aura(id, clr=false)
{
	if(clr)
	{
		clearTimeout(voice_aura_timeouts[id])
	}

	$(`#voice_chat_profile_image_container_${id}`).removeClass("aura")

	voice_aura_timeouts[id] = undefined
}

function setup_voice_chat()
{
	$("#voice_chat").on("click", ".voice_chat_item", function()
	{
		var u = get_user_by_id($(this).data("user_id"))
		show_profile(u.username)
	})
}

function setup_autocomplete()
{
	$("body").on("keydown", "textarea, input[type='text']", function(e)
	{
		if(e.key === "Tab")
		{
			var value = $(this).val()

			if(value.length > 0)
			{
				tabbed(this)
				return
			}
		}

		clear_tabbed(this)
	})

	$("body").on("click", "textarea, input[type='text']", function(e)
	{
		clear_tabbed(this)
	})
}

function setup_settings_window()
{
	$(".settings_main_window").on("click", ".settings_window_category", function(e)
	{
		change_settings_window_category(this)
	})
}

function change_settings_window_category(element)
{
	var main = $(element).closest(".settings_main_window")

	main.find(".settings_window_category").each(function()
	{
		$(this).removeClass("border_bottom")
		$(this).data("selected_category", false)
	})

	$(element).addClass("border_bottom")
	$(element).data("selected_category", true)

	main.find(".settings_window_category_container_selected").each(function()
	{
		$(this).removeClass("settings_window_category_container_selected")
		$(this).addClass("settings_window_category_container")
	})

	var container = $(`#${$(element).data("category_container")}`)

	container.removeClass("settings_window_category_container")
	container.addClass("settings_window_category_container_selected")
}

function set_loaded_settings_state()
{
	loaded_chat_layout = get_setting("chat_layout")
}

function check_maxers()
{
	if(room_tv_mode !== "disabled" && room_images_mode !== "disabled")
	{
		$(".maxer_container").css("display", "block")
	}

	else
	{
		$(".maxer_container").css("display", "none")
	}
}

function show_credits()
{
	msg_credits.show(function()
	{
		if(!credits_audio)
		{
			credits_audio = new Audio()
			credits_audio.src = credits_audio_url
			credits_audio.setAttribute("loop", true)
			credits_audio.play()
		}

		else
		{
			credits_audio.currentTime = 0
			credits_audio.play()
		}
	})
}

function prepare_media_settings()
{
	apply_media_percentages()
	apply_media_positions()
}

function set_media_sliders(type)
{
	set_tv_display_percentage(window[type].tv_display_percentage, type)
	set_media_display_percentage(window[type].media_display_percentage, type)
}

function image_prev()
{
	link_image("prev")
	msg_image_picker.close()
}

function tv_prev()
{
	change_tv_source("prev")
	msg_tv_picker.close()
}

function radio_prev()
{
	change_radio_source("prev")
	msg_radio_picker.close()
}

function setup_user_function_titles()
{	
	var n = $(".user_function_button").length

	if(n === 0)
	{
		return false
	}

	for(var i=1; i<n+1; i++)
	{
		var t = utilz.clean_string2(get_setting(`user_function_${i}`)).substring(0, 100)
		
		if(!t)
		{
			t = "Empty User Function. Set what it does in the User Settings"
		}

		var name = get_setting(`user_function_${i}_name`)
		
		$(`#user_function_button_${i}`).text(name)
		$(`#user_function_button_${i}`).attr("title", t)
	}
}

function on_room_created(data)
{
	var onclick = function()
	{
		show_open_room(data.id)
	}

	chat_announce(
	{
		brk: "<i class='icon2c fa fa-key'></i>",
		message: "Room Created",
		onclick: onclick,
		save: true
	})

	show_open_room(data.id)
}

function toggle_settings_windows(type)
{
	if(type === "global_settings")
	{
		var type2 = "room_settings"
	}

	else if(type === "room_settings")
	{
		var type2 = "global_settings"
	}

	else
	{
		return false
	}

	window[`msg_${type2}`].close(function()
	{
		$(`#settings_window_left_${type2} .settings_window_category`).each(function()
		{
			var el = this

			if($(el).data("selected_category"))
			{
				$(`#settings_window_left_${type} .settings_window_category`).each(function()
				{
					if($(el).data("category") === $(this).data("category"))
					{
						if(!$(this).data("selected_category"))
						{
							$(this).click()
							
							return false
						}
					}
				})

				return false
			}
		})

		window[`show_${type}`]()
	})
}

function toggle_rooms_windows(type)
{
	if(type === "public_roomlist")
	{
		var type2 = "visited_roomlist"
	}

	else if(type === "visited_roomlist")
	{
		var type2 = "public_roomlist"
	}

	else
	{
		return false
	}

	window[`msg_${type2}`].close(function()
	{
		request_roomlist('', type)
	})
}

function toggle_media_history_windows(type)
{
	if(type === "image_history")
	{
		var type2 = "radio_history"
	}

	else if(type === "tv_history")
	{
		var type2 = "image_history"
	}

	else if(type === "radio_history")
	{
		var type2 = "tv_history"
	}

	else
	{
		return false
	}

	window[`msg_${type2}`].close(function()
	{
		window[`show_${type}`]()
	})
}

function toggle_menu_windows(type)
{
	if(type === "main_menu")
	{
		var type2 = "user_menu"
	}

	else if(type === "user_menu")
	{
		var type2 = "main_menu"
	}

	else
	{
		return false
	}

	window[`msg_${type2}`].close(function()
	{
		window[`show_${type}`]()
	})
}

function send_system_restart_signal()
{
	socket_emit("system_restart_signal", {})
}