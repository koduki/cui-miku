(function() {

  window.SimpleBot = (function() {

    function SimpleBot(character) {
      this.character = character;
    }

    SimpleBot.prototype.chat = function(text) {
      console.log("get text: " + text);
      if (/ニュース/.test(text)) {
        return window.onNews();
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
