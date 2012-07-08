(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Event = {
    initTap: function(obj) {
      var isTap, tapEvent, x, y;
      x = 0;
      y = 0;
      isTap = false;
      tapEvent = void 0;
      obj.bind("touchstart", function(e) {
        tapEvent = event;
        isTap = true;
        x = event.touches[0].pageX;
        return y = event.touches[0].pageY;
      });
      obj.bind("touchmove", function(e) {
        return isTap = isTap && (x === event.touches[0].pageX) && (y === event.touches[0].pageY);
      });
      obj.tap = function(callback) {
        return obj.bind("touchend", function(e) {
          if (isTap) {
            return callback(tapEvent);
          }
        });
      };
      return obj;
    }
  };

  window.Character = (function() {

    function Character(images, speechMessage) {
      this.images = images;
      this.speechMessage = speechMessage;
      this.motion = __bind(this.motion, this);

      this.INTERVAL = 1700;
      this.obj = $("<img />").appendTo("#character");
      Event.initTap(this.obj);
      this.hiddenMethods = [];
      this.defaultImage = this.images[1][this.images[0]["default"]];
      this.obj.attr("src", this.defaultImage);
      this.obj.tap(function(e) {
        var x, y;
        x = e.touches[0].pageX;
        return y = e.touches[0].pageY;
      });
    }

    Character.prototype.action = function(actionName, part, callback) {
      var buff, left, limit, right,
        _this = this;
      if (actionName === "tap") {
        return this.obj.tap(function(e) {
          var top, x, y;
          _this.hiddenAll();
          x = e.touches[0].pageX;
          y = e.touches[0].pageY;
          top = window.innerHeight - _this.obj.height() + part.top;
          if (part.left <= x && x <= part.width && top <= y && y <= (top + part.height)) {
            return callback();
          } else {
            return Speech.recognizeSpeech(_this.speechMessage);
          }
        });
      } else if (actionName === "nadenade") {
        left = 0;
        right = 0;
        buff = 40;
        limit = 3;
        this.obj.bind("touchstart", function(e) {
          _this.hiddenAll();
          return setTimeout((function() {
            left = 0;
            return right = 0;
          }), 2000);
        });
        return this.obj.bind("touchmove", function(e) {
          var top, x, y;
          x = event.touches[0].pageX;
          y = event.touches[0].pageY;
          top = window.innerHeight - _this.obj.height() + part.top;
          if (top <= y && y <= (top + part.height)) {
            if (part.left <= x && x <= part.left + buff) {
              left++;
            }
            if (part.left + part.width - buff <= x && x <= part.left + part.width) {
              right++;
            }
            if (left >= limit && right >= limit) {
              callback();
              left = 0;
              return right = 0;
            }
          }
        });
      }
    };

    Character.prototype.motion = function(imageName, interval) {
      var _this = this;
      if (interval == null) {
        interval = 1700;
      }
      this.obj.attr("src", this.images[1][imageName]);
      return setTimeout((function() {
        return _this.obj.attr("src", _this.defaultImage);
      }), interval);
    };

    Character.prototype.draw = function(callback) {
      var _this = this;
      return this.obj.bind("load", function() {
        return callback();
      });
    };

    Character.prototype.addHiddenMethod = function(callback) {
      return this.hiddenMethods.push(callback);
    };

    Character.prototype.hiddenAll = function() {
      var i, _results;
      i = 0;
      _results = [];
      while (i < this.hiddenMethods.length) {
        this.hiddenMethods[i]();
        _results.push(i++);
      }
      return _results;
    };

    Character.prototype.init = function(actions) {
      var _this = this;
      return actions.map(function(action) {
        return _this.action(action.action, action.part, function() {
          _this.motion(action.img, _this.INTERVAL);
          return _this.dlg.show(action.msg, _this.INTERVAL);
        });
      });
    };

    return Character;

  })();

  window.Dialog = (function() {

    function Dialog(size) {
      this.obj = $("<div />").appendTo("#character");
      this.obj.hide();
      this.obj.addClass("arrow_box");
      this.obj.css("width", size["width"] + "px").css("bottom", size["bottom"] + "px").css("left", size["left"] + "px");
      this.textarea = $("<p />").appendTo(this.obj);
    }

    Dialog.prototype.show = function(msg, arg1) {
      var callback, interval,
        _this = this;
      if (typeof arg1 === "undefined") {
        interval = 1700;
      } else if (jQuery.isFunction(arg1)) {
        interval = 1700;
        callback = arg1;
      } else {
        interval = arg1;
      }
      this.textarea.html(msg);
      this.obj.show();
      return setTimeout((function() {
        return _this.obj.fadeOut("fast", function() {
          if (jQuery.isFunction(callback)) {
            return callback();
          }
        });
      }), interval);
    };

    return Dialog;

  })();

  window.showArea = function(sprite, area) {
    var obj;
    obj = $("<div />").appendTo("#sprite");
    return obj.css("position", "absolute").css("width", area["width"] + "px").css("height", area["height"] + "px").css("left", area["left"] + "px").css("bottom", (sprite.height - area["top"] - area["height"]) + "px").css("z-index", 100).css("background-color", "red");
  };

  window.Speech = {
    chatbot: null,
    onDeviceReady: function() {
      console.log("onSpeechRecognizerReady");
      return window.plugins.speechrecognizer.init(Speech.speechInitOk, Speech.speechInitFail);
    },
    speechInitOk: function() {},
    speechInitFail: function(m) {},
    recognizeSpeech: function(message) {
      var maxMatches, promptString, requestCode;
      requestCode = 1234;
      maxMatches = 1;
      promptString = message;
      return window.plugins.speechrecognizer.startRecognize(Speech.speechOk, Speech.speechFail, requestCode, maxMatches, promptString, "ja_JP");
    },
    speechOk: function(result) {
      var match, requestCode, respObj, text;
      match = void 0;
      respObj = void 0;
      requestCode = void 0;
      console.log("result: " + result);
      if (result) {
        respObj = JSON.parse(result);
        if (respObj) {
          requestCode = respObj.speechMatches.requestCode;
          text = respObj.speechMatches.speechMatch[0];
          return Speech.chatbot.chat(text);
        }
      }
    },
    speechFail: function(m) {
      return console.log("speechFail: " + m.toString());
    }
  };

  window.Location = {
    onDeviceReady: function() {
      var options, watchID;
      console.log("onGeolocationReady");
      options = {
        frequency: 3000
      };
      return watchID = navigator.geolocation.watchPosition(Location.onSuccess, Location.onError, options);
    },
    onSuccess: function(position) {
      Location.latitude = position.coords.latitude;
      return Location.longitude = position.coords.longitude;
    },
    onError: function(error) {
      return alert('コード: ' + error.code + '\n' + 'メッセージ: ' + error.message);
    }
  };

  window.FlickWindow = (function() {

    function FlickWindow(height, width) {
      this.height = height;
      this.width = width;
      this.obj = $("<div id=\"firstitem\" class=\"flickSimple\" style=\"overflow: hidden; \"><ul /></div>");
      $("body").append(this.obj);
      $(".flickSimple").hide();
    }

    FlickWindow.prototype.add = function(title, url, body) {
      var article, item;
      article = $("<article><h1><a></a></h1><p></p>");
      article.find("h1 a").text(title);
      article.find("h1 a").attr("href", url);
      article.find("p").text(body);
      article.css("height", this.height + "px");
      item = $("<li>");
      item.css("width", this.width + "px");
      item.append(article);
      this.obj.find("ul").append(item);
      this.obj.find("ul").css("width", this.width * this.obj.find("li").size() + "px");
      return $(".flickSimple").css("width", this.width + "px");
    };

    FlickWindow.prototype.clear = function() {
      return $("#firstitem article").each(function($i, x) {
        return $(x).remove();
      });
    };

    FlickWindow.prototype.hide = function() {
      return $(".flickSimple").hide();
    };

    FlickWindow.prototype.show = function() {
      return $(".flickSimple").fadeIn();
    };

    return FlickWindow;

  })();

}).call(this);
