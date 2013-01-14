(function() {
  var Breast, Head, actions, images;

  images = [
    {
      "default": "通常"
    }, {
      "通常": "cui/chara/miku/images/001_s.png",
      "怒り": "cui/chara/miku/images/003_s.png",
      "喜び": "cui/chara/miku/images/002_s.png"
    }
  ];

  Head = {
    left: 20,
    top: 40,
    width: 100,
    height: 80
  };

  Breast = {
    left: 20,
    top: 220,
    width: 120,
    height: 60
  };

  actions = [
    {
      part: Breast,
      action: "tap",
      img: "怒り",
      msg: "Hなのはいけないと思います！"
    }, {
      part: Head,
      action: "nadenade",
      img: "喜び",
      msg: "♪"
    }
  ];

  $(function() {
    var character, flickWindow;
    character = new Character(images, "");
    character.init(actions);
    character.dlg = new Dialog({
      width: 160,
      bottom: 270,
      left: 155
    });
    Speech.chatbot = new SimpleBot(character);
    flickWindow = new FlickWindow(180, 300);
    character.addHiddenMethod(function() {
      return $(".yesnoButton").hide();
    });
    character.addHiddenMethod(function() {
      return flickWindow.hide();
    });
    window.onHome = function() {
      return character.dlg.show("好きなところをタップしてください♪");
    };
    window.onNews = function() {
      return character.dlg.show("今日のおすめの<br />ニュースでーす♪", function() {
        return Function.showNews(flickWindow);
      });
    };
    character.hiddenAll();
    return character.dlg.show("好きなところをタップしてください♪");
  });

}).call(this);
