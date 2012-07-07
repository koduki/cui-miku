(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.SimpleBot = (function() {

    function SimpleBot(character) {
      this.character = character;
      this.chat = __bind(this.chat, this);

    }

    SimpleBot.prototype.chat = function(text) {
      var commands, response,
        _this = this;
      commands = {
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
      console.log("get text: " + text);
      response = /ニュース/.test(text) ? ['ニュース表示', []] : /おはよ/.test(text) ? ['挨拶:朝', []] : /こんにちは/.test(text) ? ['挨拶:昼', []] : /おやすみ/.test(text) ? ['挨拶:夜', []] : /得意なことは/.test(text) ? ['得意なこと', []] : /かわいい/.test(text) ? ['喜び', []] : ['その他', [text]];
      return commands[response[0]].apply(this, response[1]);
    };

    return SimpleBot;

  })();

  ({
    onUnknown: function(text) {
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
    }
  });

}).call(this);
