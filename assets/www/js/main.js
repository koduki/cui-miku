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

		function getBaseURL() {
			var str = location.pathname;
			var i = str.lastIndexOf('/');
			return str.substring(0, i + 1);
		}

		function onDeviceReady2() {
			console.log("onDeviceReady2")
			var url = getBaseURL() + "melt.mp3";
			console.log("media:" + url)
			var my_media = new Media(url,
			// success callback
			function() {
				console.log("playAudio():Audio Success");
			},
			// error callback
			function(err) {
				console.log("playAudio():Audio Error: " + err);
			});

			// Play audio
			// my_media.play();
			Speech.onDeviceReady()
			Location.onDeviceReady()
			TextToSpeech.onDeviceReady()
		}
	})

});