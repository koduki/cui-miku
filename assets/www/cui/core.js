var Event = {
    initTap : function(obj) {
        var x = 0;
        var y = 0;
        var isTap = false;
        var tapEvent;
        obj.bind("touchstart", function(e) {
            tapEvent = event;
            isTap = true;
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;

        })

        obj.bind("touchmove", function(e) {
            isTap = isTap && (x == event.touches[0].pageX) && (y == event.touches[0].pageY)
        })
        // obj.off("tap")
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

var Character = function(images, speachMessage, actions) {
    var INTERVAL = 1700;

    var self = this
    var obj = $("<img />").appendTo("#character");
    Event.initTap(obj)

    var hiddenMethods = []

    var defaultImage = images[1][images[0]['default']]
    obj.attr("src", defaultImage);

    obj.tap(function(e) {
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;

    })

    self.action = function(actionName, part, callback) {
        if (actionName === "tap") {
            obj.tap(function(e) {
                self.hiddenAll()
                var x = e.touches[0].pageX;
                var y = e.touches[0].pageY;
                var top = window.innerHeight - obj.height() + part.top
                if (part.left <= x && x <= part.width && top <= y && y <= (top + part.height)) {
                    callback()
                } else {
                    Speech.recognizeSpeech(speachMessage)
                }
            })
        } else if (actionName === "nadenade") {
            var left = 0;
            var right = 0;
            var buff = 40;
            var limit = 3;
            obj.bind("touchstart", function(e) {
                self.hiddenAll()
                setTimeout(function() {
                    left = 0;
                    right = 0;
                }, 2000);
            })
            obj.bind("touchmove", function(e) {
                var x = event.touches[0].pageX
                var y = event.touches[0].pageY

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

    self.addHiddenMethod = function(callback) {
        hiddenMethods.push(callback)
    }

    self.hiddenAll = function() {
        for (var i = 0; i < hiddenMethods.length; i++) {
            hiddenMethods[i]()
        }
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
    var self = this;
    var obj = $("<div />").appendTo("#character");

    obj.hide();
    obj.addClass("arrow_box");
    obj.css("width", size["width"] + 'px').css("bottom", size["bottom"] + 'px').css("left", size["left"] + 'px')
    var textarea = $("<p />").appendTo(obj)

    self.show = function(msg, arg1) {
        if ( typeof arg1 === 'undefined') {
            var interval = 1700;
        } else if (jQuery.isFunction(arg1)) {
            var interval = 1700;
            var callback = arg1
        } else {
            var interval = arg1;
        }
        textarea.html(msg)
        obj.show()
        setTimeout(function() {
            obj.fadeOut("fast", function() {
                if (jQuery.isFunction(callback)) {
                    callback();
                }
            })
        }, interval);
    }
}
var showArea = function(sprite, area) {
    var obj = $("<div />").appendTo("#sprite");
    obj.css("position", "absolute").css("width", area["width"] + "px").css("height", area["height"] + "px").css("left", area["left"] + "px").css("bottom", (sprite.height - area["top"] - area["height"]) + "px").css("z-index", 100).css("background-color", "red")
}
var Speech = {
    chatbot : null,
    onDeviceReady : function() {
        console.log("onDeviceReady");
        window.plugins.speechrecognizer.init(Speech.speechInitOk, Speech.speechInitFail);
    },

    speechInitOk : function() {
        // we're good
    },

    speechInitFail : function(m) {
        // recognizer not present?
    },

    recognizeSpeech : function(message) {
        var requestCode = 1234;
        var maxMatches = 1;
        var promptString = message;
        window.plugins.speechrecognizer.startRecognize(Speech.speechOk, Speech.speechFail, requestCode, maxMatches, promptString, "ja_JP");
    },

    speechOk : function(result) {
        var match, respObj, requestCode;
        console.log("result: " + result);
        if (result) {
            respObj = JSON.parse(result);
            if (respObj) {
                // This is the code that was sent with the original request
                requestCode = respObj.speechMatches.requestCode;
                // 最初にマッチした検索語を取得
                var text = respObj.speechMatches.speechMatch[0];
                Speech.chatbot.chat(text)
            }
        }
    },

    speechFail : function(m) {
        console.log("speechFail: " + m.toString());
    }
}
var FlickWindow = function(height, width) {
    var obj = $('<div id="firstitem" class="flickSimple" style="overflow: hidden; "><ul /></div>');
    $("body").append(obj);
    $('.flickSimple').hide()

    this.add = function(title, url, body) {
        var article = $("<article><h1><a></a></h1><p></p>");
        article.find("h1 a").text(title)
        article.find("h1 a").attr("href", url)
        article.find("p").text(body)
        article.css("height", height + "px");

        var item = $("<li>")
        item.css("width", width + "px");
        item.append(article)
        obj.find("ul").append(item)
        obj.find("ul").css("width", width * obj.find("li").size() + "px")

        $(".flickSimple").css("width", width + "px")
    }

    this.clear = function() {
        $("#firstitem article").each(function($i, x) {
            $(x).remove()
        })
    }
    this.hide = function() {
        $('.flickSimple').hide()
    }
    this.show = function() {
        $('.flickSimple').fadeIn()
    }
}
