var INTERVAL = 1700;

//
// define image.
//
var images = [ {
	'default' : '通常'
}, {
	'通常' : 'cui/chara/miku/images/001_s.png',
	'怒り' : 'cui/chara/miku/images/003_s.png',
	'喜び' : 'cui/chara/miku/images/002_s.png',
} ]
//
// define part.
//
var 頭 = {
	"left" : 20,
	"top" : 40,
	"width" : 100,
	"height" : 80
};
var 胸 = {
	"left" : 20,
	"top" : 220,
	"width" : 120,
	"height" : 60
};

//
// define actions.
//
// var actions = [ {
// "part" : 胸,
// "action" : [ "touch" ],
// "img" : 怒り,
// "msg" : "Hなのはいけないと思います！"
// }, {
// "part" : 頭,
// "action" : [ "nadenade", {
// "count" : 5
// } ],
// "img" : 喜び,
// "msg" : "♪〜"
// } ];
var showArea = function(sprite, area) {
	var obj = $("<div />").appendTo("#sprite");
	obj.css("position", "absolute").css("width", area["width"] + "px").css(
			"height", area["height"] + "px").css("left", area["left"] + "px")
			.css("bottom",
					(sprite.height - area["top"] - area["height"]) + "px").css(
					"z-index", 100).css("background-color", "red")
}

$(function() {
	var Event = {
		initTap : function(obj) {
			var x = 0;
			var y = 0;
			var isTap = false;
			var tapEvent;
			obj.bind("touchstart", function(e) {
				tapEvent = e;
				isTap = true;
				x = e.touches[0].pageX;
				y = e.touches[0].pageY;

			})

			obj.bind("touchmove", function(e) {
				isTap = isTap && (x == e.touches[0].pageX)
						&& (y == e.touches[0].pageY)
			})

			obj.off("tap")
			obj.tap = function(callback) {
				obj.bind("touchend", function(e) {
					if (isTap) {
						callback(tapEvent);
					}
				})
			}
			return obj;
		}
	}
	var Sprite = function(images) {
		var self = this
		var obj = $("<img />").appendTo("#sprite");
		Event.initTap(obj)

		var defaultImage = images[1][images[0]['default']]
		obj.attr("src", defaultImage);

		self.image = function(path) {
			obj.attr("src", path);
			return this;
		}

		obj.tap(function(e) {
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;

		})

		self.action = function(actionName, part, callback) {
			if (actionName === "tap") {
				obj.tap(function(e) {
					var x = e.touches[0].pageX;
					var y = e.touches[0].pageY;
					var top = window.innerHeight - obj.height() + part.top
					if (part.left <= x && x <= part.width && top <= y
							&& y <= (top + part.height)) {
						callback()
					}
				})
			} else if (actionName === "nadenade") {
				var left = 0;
				var right = 0;
				var buff = 40;
				var limit = 3;
				obj.bind("touchstart", function(e) {
					setTimeout(function() {
						left = 0;
						right = 0;
					}, 2000);
				})
				obj.bind("touchmove", function(e) {
					var x = e.touches[0].pageX
					var y = e.touches[0].pageY

					var top = window.innerHeight - obj.height() + part.top
					if (top <= y && y <= (top + part.height)) {
						if (part.left <= x && x <= part.left + buff) {
							left++;
						}
						if (part.left + part.width - buff <= x
								&& x <= part.left + part.width) {
							right++;
						}

						if (left >= limit && right >= limit) {
							callback()
							left = 0;
							right = 0;
						}
					}
				})
			}

		}

		self.motion = function(imageName, interval) {
			obj.attr("src", images[1][imageName]);
			setTimeout(function() {
				obj.attr("src", defaultImage);
			}, interval);
		}

		self.draw = function(callback) {
			obj.bind("load", function() {
				self.height = obj.height()
				self.width = obj.width()
				callback()
			})
		}
	}

	var Dialog = function(size) {
		var obj = $("<div />").appendTo("#sprite");
		obj.hide();
		obj.addClass("arrow_box");
		obj.css("width", size["width"]).css("height", size["height"]).css(
				"bottom", size["bottom"]).css("left", size["left"])
		var textarea = $("<p />").appendTo(obj)

		this.show = function(msg, interval) {
			textarea.text(msg)
			obj.show()

			setTimeout(function() {
				obj.fadeOut("fast")
			}, interval);
		}

	}

	// initialize
	var sprite = new Sprite(images);
	sprite.dlg = new Dialog({
		"width" : "160px",
		"height" : "90px",
		"bottom" : "270px",
		"left" : "155px"
	});
	sprite.draw(function() {
		// showArea(sprite, 胸)
		// showArea(sprite, 頭)
	});

	sprite.dlg.show("おはようございますー♪", INTERVAL);

	sprite.action("tap", 胸, function() {
		sprite.motion('怒り', INTERVAL)
		sprite.dlg.show("Hなのはイケナイと思います！", INTERVAL);
	})

	sprite.action("nadenade", 頭, function() {
		sprite.motion('喜び', INTERVAL)
		sprite.dlg.show("♪", INTERVAL);
	})
	//
	// // regist actions.
	// actions.map(function(action){
	// sprite[action.action[0]](action.part, action.action[1], function(e){
	// sprite.motion(action.img, INTERVAL);
	// sprite.dlg.show(action.msg, INTERVAL);
	// });
	// });

});
