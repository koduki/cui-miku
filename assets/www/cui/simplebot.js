var SimpleBot = function(character) {
    var self = this
    this.chat = function(text) {
        console.log("get text: " + text);
        if (/ニュース/.test(text)) {
            window.onNews()
        } else {
            self.onUnknown(text)
        }
    }

    this.onUnknown = function(text) {
        character.dlg.show("うーん、「" + text + "」って私知らないです。", function() {
            character.dlg.show("Webで検索してみてもいいですか？", function() {
                Event.initTap($("#yesButton")).tap(function() {
                    $('.yesnoButton').hide()
                    character.dlg.show("Googleで探してみますね。", function() {
                        window.open("https://www.google.co.jp/search?q=" + text)
                    })
                })
                Event.initTap($("#noButton")).tap(function() {
                    $('.yesnoButton').hide()
                })
                $('.yesnoButton').fadeIn()
            })
        });
    }
}