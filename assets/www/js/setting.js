var isDBEnable = false;
var initValue = function(key, value) {
	if (value == true) {
		flag = 1
	} else {
		flag = 0
	}
	$(key)[0].options.selectedIndex = flag
	$(key).slider('refresh');
}
var init = function() {
	initValue("#externalapi_googlecalendar_enable",
			Config.load().externalApi.googleCalendar.enable)
	initValue("#etc_tts_enable ", Config.load().etc.tts.enable)
	if (typeof device === 'undefined') {
		console.log("unready device")
	} else {
		document.addEventListener("deviceready", function() {
			isDBEnable = true
		}, false);
	}
}
var bindEvent = function() {
	$("#externalapi_googlecalendar_enable").bind("change", function(event, ui) {
		var options = event.target.options
		option = options[options.selectedIndex].value

		var cal = new GoogleCalendar()
		if (option === "on") {
			cal.authorize(function() {
				var config = Config.load()
				config.externalApi.googleCalendar.enable = true
				Config.save(config)
				cal.getCalendarList();
			})
		} else {
			cal.unauthorize()
			var config = Config.load()
			config.externalApi.googleCalendar.enable = false
			Config.save(config)
		}
	});

	$("#etc_tts_enable").bind("change", function(event, ui) {
		var options = event.target.options
		option = options[options.selectedIndex].value

		if (option === "on") {
			console.log("#etc_tts_enable on")
			var config = Config.load()
			config.etc.tts.enable = true
			Config.save(config)
		} else {
			console.log("#etc_tts_enable off")
			var config = Config.load()
			config.etc.tts.enable = false
			Config.save(config)
		}
	});

	$("#alerm_time").bind("change", function(event, ui) {
		console.log("alerm_picker")
		var time = $(event.target).val();
		var config = Config.load()
		config.event.alerm.time = $(event.target).val();
		Config.save(config)

	});
}
$(function() {
	init()
	bindEvent()
})