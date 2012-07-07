(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.SimpleBot = (function() {

    function SimpleBot(character) {
      var _this = this;
      this.character = character;
      this.onUnknown = __bind(this.onUnknown, this);

      this.parse = __bind(this.parse, this);

      this.chat = __bind(this.chat, this);

      this.commands = {
        'ニュース表示': function() {
          return window.onNews();
        },
        '挨拶:朝': function() {
          return _this.character.dlg.show("おはようございます♪");
        },
        '挨拶:昼': function() {
          return _this.character.dlg.show("こんにちはー。");
        },
        '挨拶:夜': function() {
          _this.character.motion("喜び");
          return _this.character.dlg.show("はい。良い夢を♪");
        },
        '得意なこと': function() {
          return _this.character.dlg.show("歌をうたうのが得意です！");
        },
        '喜び': function() {
          _this.character.motion("喜び");
          return _this.character.dlg.show("ありがとうございます♪");
        },
        'その他': function(text) {
          return _this.onUnknown(text);
        }
      };
    }

    SimpleBot.prototype.chat = function(text) {
      var response;
      console.log("get text: " + text);
      response = parse(text);
      return this.commands[response[0]].apply(this, response[1]);
    };

    SimpleBot.prototype.parse = function(text) {
      if (/ニュース/.test(text)) {
        return ['ニュース表示', []];
      } else if (/おはよ/.test(text)) {
        return ['挨拶:朝', []];
      } else if (/こんにちは/.test(text)) {
        return ['挨拶:昼', []];
      } else if (/おやすみ/.test(text)) {
        return ['挨拶:夜', []];
      } else if (/得意なことは/.test(text)) {
        return ['得意なこと', []];
      } else if (/かわいい/.test(text)) {
        return ['喜び', []];
      } else {
        return ['その他', [text]];
      }
    };

    SimpleBot.prototype.onUnknown = function(text) {
      var _this = this;
      return this.character.dlg.show("うーん、わたし「" + text + "」って知らないです。", function() {
        return _this.character.dlg.show("Webで検索してみてもいいですか？", function() {
          Event.initTap($("#yesButton")).tap(function() {
            $(".yesnoButton").hide();
            return _this.character.dlg.show("Googleで探してみますね。", function() {
              return window.open("https://www.google.co.jp/search?q=" + text);
            });
          });
          Event.initTap($("#noButton")).tap(function() {
            return $(".yesnoButton").hide();
          });
          return $(".yesnoButton").fadeIn();
        });
      });
    };

    return SimpleBot;

  })();

}).call(this);
