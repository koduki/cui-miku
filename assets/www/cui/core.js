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
            isTap = isTap && (x == e.touches[0].pageX) && (y == e.touches[0].pageY)
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

var Character = function(images, actions) {
    var INTERVAL = 1700;

    var self = this
    var obj = $("<img />").appendTo("#character");
    Event.initTap(obj)

    var defaultImage = images[1][images[0]['default']]
    obj.attr("src", defaultImage);

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
                if (part.left <= x && x <= part.width && top <= y && y <= (top + part.height)) {
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
                    if (part.left + part.width - buff <= x && x <= part.left + part.width) {
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
    // // regist actions.
    actions.map(function(action) {
        self.action(action.action, action.part, function() {
            self.motion(action.img, INTERVAL);
            self.dlg.show(action.msg, INTERVAL);
        })
    });
}
var Dialog = function(size) {
    var obj = $("<div />").appendTo("#character");
    obj.hide();
    obj.addClass("arrow_box");
    obj.css("width", size["width"] + 'px').css("height", size["height"] + 'px').css("bottom", size["bottom"] + 'px').css("left", size["left"] + 'px')
    var textarea = $("<p />").appendTo(obj)

    this.show = function(msg, interval) {
        if ( typeof interval === 'undefined') {
            interval = 1700;
        }
        textarea.text(msg)
        obj.show()

        setTimeout(function() {
            obj.fadeOut("fast")
        }, interval);
    }
}
var showArea = function(sprite, area) {
    var obj = $("<div />").appendTo("#sprite");
    obj.css("position", "absolute").css("width", area["width"] + "px").css("height", area["height"] + "px").css("left", area["left"] + "px").css("bottom", (sprite.height - area["top"] - area["height"]) + "px").css("z-index", 100).css("background-color", "red")
}
