require([ "lib/google_calendar", "lib/fileutil", "cui/config" ], function(
		GoogleCalendar, FileUtil, Config) {
	console.log("Hello2")
	$(function() {
		if (typeof device === 'undefined') {
			console.log("un ready device")
			document.addEventListener("deviceready", onDeviceReady2);
		} else {
			onDeviceReady();
		}

		function onDeviceReady2() {
			console.log("onDeviceReady2")
			Speech.onDeviceReady()
			Location.onDeviceReady()
			TextToSpeech.onDeviceReady()
		}
	})

});