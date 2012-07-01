class window.SimpleBot
  constructor:(@character) ->
  chat:(text) ->
    console.log "get text: " + text
    if /ニュース/.test(text)
      window.onNews()
    else
      @onUnknown text

  onUnknown:(text) ->
    @character.dlg.show "うーん、わたし「" + text + "」って知らないです。", =>
      @character.dlg.show "Webで検索してみてもいいですか？", =>
        Event.initTap($("#yesButton")).tap =>
          $(".yesnoButton").hide()
          @character.dlg.show "Googleで探してみますね。", =>
            window.open "https://www.google.co.jp/search?q=" + text

        Event.initTap($("#noButton")).tap ->
          $(".yesnoButton").hide()

        $(".yesnoButton").fadeIn()