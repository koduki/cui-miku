class window.SimpleBot
  constructor:(@character) ->
  chat:(text) ->
    console.log "get text: " + text
    if /ニュース/.test(text)
      window.onNews()
    else if /おはよ/.test(text)
      @character.dlg.show "おはようございます♪"
    else if /こんにちは/.test(text)
      @character.dlg.show "こんにちはー。"
    else if /おやすみ/.test(text)
      @character.motion("喜び")
      @character.dlg.show "はい。良い夢を♪"
    else if /得意なことは/.test(text)
      @character.dlg.show "歌をうたうのが得意です！"
    else if /かわいい/.test(text)
      @character.motion("喜び")
      @character.dlg.show "ありがとうございます♪"
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