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

    var FlickWindow = function(height, width) {
        var obj = $('<div id="firstitem" class="flickSimple landscape" style="overflow: hidden; "><ul /></div>');
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
          //  obj.find("ul").css("width", width * obj.find("li").size() + "px")

            $(".flickSimple").css("width", width + "px")
        }
    }
    var flickWindow = new FlickWindow(180, 300);
    var url = 'https://twitter.com/statuses/user_timeline/82492709.rss'
    $.get(url, function(res, code) {
        var xml = $(res);
        var items = xml.find("item").map(function(i, x) {
            return {
                "title" : $(x).find("title").text(),
                "link" : $(x).find("link").text(),
                "description" : $(x).find("description").text(),
            }
        })

        items.each(function(i, item) {
            flickWindow.add(item.title, item.link, item.description)
        })
    });

    window.onHome = function() {
        $('.flickSimple').fadeOut()
        character.dlg.show("おはようございますー♪");
    }

    window.onRSS = function() {
        character.dlg.show("今日のおすめの<br />ニュースでーす♪", function() {
            $('.flickSimple').fadeIn()
        });
    }
});
