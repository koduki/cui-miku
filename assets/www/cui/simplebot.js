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
        '地図検索': function(keyword) {
          return _this.character.dlg.show("近くの「" + keyword + "」探すんですね.", function() {
            return _this.character.dlg.show("地図を表示します。", function() {
              return navigator.geolocation.getCurrentPosition(function(position) {
                var url;
                return url = 'https://maps.google.co.jp/maps?q=' + encodeURI(keyword) + '&hl=ja&ie=UTF8&ll=' + position.coords.latitude + ", " + position.coords.longitude;
              }, function() {
                return alert('コード: ' + error.code + '\n' + 'メッセージ: ' + error.message + '\n');
              });
            });
          });
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
      var _this = this;
      console.log("get text: " + text);
      return this.parse(text, function(response) {
        return _this.commands[response[0]].apply(_this, response[1]);
      });
    };

    SimpleBot.prototype.parse = function(text, callback) {
      var analysiser;
      analysiser = window.plugins.morphologicalAnalysiser;
      return analysiser.analyse((function(r) {
        var flag1, flag2, keyword, result, word, _i, _len;
        flag1 = false;
        flag2 = false;
        for (_i = 0, _len = r.length; _i < _len; _i++) {
          word = r[_i];
          if (word.baseform.indexOf('近く') !== -1) {
            flag1 = true;
          }
          if (word.baseform.indexOf('探す') !== -1 || word.baseform.indexOf('教える') !== -1 || word.baseform.indexOf('調べる')) {
            flag2 = true;
          }
          if (word.feature.indexOf('名詞') !== -1 && word.feature.indexOf('一般') !== -1 && word.feature.indexOf('接尾') === -1) {
            keyword = word.surface;
          }
        }
        result = flag1 === true && flag2 === true && keyword !== "" ? ["地図検索", [keyword]] : /ニュース/.test(text) ? ['ニュース表示', []] : /おはよ/.test(text) ? ['挨拶:朝', []] : /こんにちは/.test(text) ? ['挨拶:昼', []] : /こんにちわ/.test(text) ? ['挨拶:昼', []] : /おやすみ/.test(text) ? ['挨拶:夜', []] : /得意なこと/.test(text) ? ['得意なこと', []] : /特技は/.test(text) ? ['得意なこと', []] : /特技を/.test(text) ? ['得意なこと', []] : /かわいい/.test(text) ? ['喜び', []] : /すごいね/.test(text) ? ['喜び', []] : /可愛い/.test(text) ? ['喜び', []] : /凄いね/.test(text) ? ['喜び', []] : ['その他', [text]];
        return callback(result);
      }), text);
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
