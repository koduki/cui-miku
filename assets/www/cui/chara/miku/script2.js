var INTERVAL = 1700;

//
// define image.
//
var 通常 = 'cui/chara/miku/images/001_s.png';
var 怒り = 'cui/chara/miku/images/002_s.png';
var 喜び = 'cui/chara/miku/images/003_s.png';

//
// define part.
//
var 頭 = {
	"left" : 180,
	"top" : 40,
	"width" : 100,
	"height" : 80
};
var 胸 = {
	"left" : 20,
	"top" : 280,
	"width" : 120,
	"height" : 60
};

//
// define actions.
//
var actions = [ {
	"part" : 胸,
	"action" : [ "touch" ],
	"img" : 怒り,
	"msg" : "Hなのはいけないと思います！"
}, {
	"part" : 頭,
	"action" : [ "nadenade", {
		"count" : 5
	} ],
	"img" : 喜び,
	"msg" : "♪〜"
} ];
var showArea = function(sprite, area) {
	var obj = $("<div />").appendTo("#sprite");
	obj.css("position", "absolute").css("width", area["width"] + "px").css(
			"height", area["height"] + "px").css("left", area["left"] + "px")
			.css("bottom", (sprite.height - area["top"])  + "px").css("z-index", -1).css(
					"background-color", "red")
}

$(function() {
	var Event = {
		initTap:function(obj){
		var x=0;
		var y=0;
		var isTap = false;
		var tapEvent;
		obj.bind("touchstart", function(e){
			// alert("start tap");
			tapEvent = e;
			isTap = true;
           x = e.touches[0].pageX;
            y = e.touches[0].pageY;
            
		})
		
		obj.bind("touchmove", function(e){
			isTap = isTap && (x == e.touches[0].pageX) && (y == e.touches[0].pageY)
		})

		obj.off("tap")
		obj.tap = function(callback){
			obj.bind("touchend", function(e){
				if(isTap){
					callback(tapEvent);
				}
			})
		}
		return obj;
		}
	}
	var Sprite = function() {
		var self = this
		var obj = $("<img />").appendTo("#sprite");
		Event.initTap(obj)
		
		/**
		 * change sprite image.
		 * 
		 * @params<string> image file path.
		 */
		self.image = function(path) {
			obj.attr("src", path);
			return this;
		}

		obj.tap(function(e){
			alert("fire tap");
	          x = e.touches[0].pageX;
	          y = e.touches[0].pageY;
				  alert("x:" + x + ", y:" + y);
		})
		
		self.draw = function(callback){obj.bind("load",function(){
			self.height = obj.height()
			self.width = obj.width()
			callback()
		})}
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
	var sprite = new Sprite();
	sprite.dlg = new Dialog({
		"width" : "160px",
		"height" : "90px",
		"bottom" : "270px",
		"left" : "155px"
	});
	sprite.draw(function(){showArea(sprite, 胸)});
	sprite.image(通常);

	sprite.dlg.show("おはようございますー♪", INTERVAL);

	//
	// // regist actions.
	// actions.map(function(action){
	// sprite[action.action[0]](action.part, action.action[1], function(e){
	// sprite.motion(action.img, INTERVAL);
	// sprite.dlg.show(action.msg, INTERVAL);
	// });
	// });

});
