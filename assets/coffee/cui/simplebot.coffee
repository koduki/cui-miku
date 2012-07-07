class window.SimpleBot
  constructor:(@character) ->
    @commands = 
      'ニュース表示': =>  
        window.onNews()
      '挨拶:朝': => 
        @character.dlg.show "おはようございます♪"
      '挨拶:昼': => 
        @character.dlg.show "こんにちはー。"
      '挨拶:夜': =>
        @character.motion("喜び")
        @character.dlg.show "はい。良い夢を♪"
      '得意なこと': =>
        @character.dlg.show "歌をうたうのが得意です！"
      '喜び': =>
        @character.motion("喜び")
        @character.dlg.show "ありがとうございます♪"
      'その他': (text) =>
        @onUnknown text

  chat:(text) =>
      console.log "get text: " + text
      response = @parse(text)
      @commands[response[0]].apply(this, response[1])

  parse:(text) =>
    if /ニュース/.test(text)
      ['ニュース表示',[]]
    else if /おはよ/.test(text)
      ['挨拶:朝',[]]
    else if /こんにちは/.test(text)
      ['挨拶:昼',[]]
    else if /おやすみ/.test(text)
      ['挨拶:夜',[]]
    else if /得意なことは/.test(text)
      ['得意なこと',[]]
    else if /かわいい/.test(text)
      ['喜び',[]]
    else
      ['その他',[text]]

  onUnknown:(text) =>
    @character.dlg.show "うーん、わたし「" + text + "」って知らないです。", =>
      @character.dlg.show "Webで検索してみてもいいですか？", =>
        Event.initTap($("#yesButton")).tap =>
          $(".yesnoButton").hide()
          @character.dlg.show "Googleで探してみますね。", =>
            window.open "https://www.google.co.jp/search?q=" + text

        Event.initTap($("#noButton")).tap ->
          $(".yesnoButton").hide()

        $(".yesnoButton").fadeIn()