//
// define image.
//
var images = [{
    'default' : '通常'
}, {
    '通常' : 'cui/chara/miku/images/001_s.png',
    '怒り' : 'cui/chara/miku/images/003_s.png',
    '喜び' : 'cui/chara/miku/images/002_s.png',
}]
//
// define part.
//
var 頭 = {
    "left" : 20,
    "top" : 40,
    "width" : 100,
    "height" : 80
};
var 胸 = {
    "left" : 20,
    "top" : 220,
    "width" : 120,
    "height" : 60
};

//
// define actions.
//
var actions = [{
    "part" : 胸,
    "action" : "tap",
    "img" : '怒り',
    "msg" : "Hなのはいけないと思います！"
}, {
    "part" : 頭,
    "action" : "nadenade",
    "img" : '喜び',
    "msg" : "♪"
}];

$(function() {
    // initialize
    var character = new Character(images, actions);
    character.dlg = new Dialog({
        "width" : 160,
        "height" : 90,
        "bottom" : 270,
        "left" : 155
    });

    // debug code.
    character.draw(function() {
        // showArea(character, 胸)
        // showArea(character, 頭)
    });

    // main
    character.dlg.show("おはようございますー♪");

    $('#demo-simple').hide()

    window.onHome = function() {
        $('#demo-simple').fadeOut()
        character.dlg.show("おはようございますー♪");
    }

    window.onRSS = function() {
        character.dlg.show("今日のおすめの<br />ニュースでーす♪", function() {
            $('#demo-simple').fadeIn()
        });
    }
});
