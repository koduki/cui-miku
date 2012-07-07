(function() {

  window.SimpleBot = (function() {

    function SimpleBot(character) {
      this.character = character;
    }
    SimpleBot.prototype.chat2 = function(text) {
        console.log("get text: " + text);
        return "おはようございます♪";
    }
    SimpleBot.prototype.chat = function(text) {
      console.log("get text: " + text);
      if (/ニュース/.test(text)) {
        return window.onNews();
      } else if (/おはよ/.test(text)) {
        return this.character.dlg.show("おはようございます♪");
      } else if (/こんにちは/.test(text)) {
        return this.character.dlg.show("こんにちはー。");
      } else if (/おやすみ/.test(text)) {
        this.character.motion("喜び");
        return this.character.dlg.show("はい。良い夢を♪");
      } else if (/得意なことは/.test(text)) {
        return this.character.dlg.show("歌をうたうのが得意です！");
      } else if (/かわいい/.test(text)) {
        this.character.motion("喜び");
        return this.character.dlg.show("ありがとうございます♪");
      } else {
        return this.onUnknown(text);
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
