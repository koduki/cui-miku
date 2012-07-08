class window.SimpleBot
  constructor:(@character) ->
    @commands = 
      'ニュース表示': =>  
        window.onNews()
      '地図検索': (keyword)=>
        @character.dlg.show "近くの「" + keyword + "」を探すんですね.", =>
          @character.dlg.show "地図を表示します。", =>
            url = 'http://maps.google.co.jp/maps?q=' + encodeURI(keyword) + '&hl=ja&ie=UTF8&sll=' + window.Location.latitude + "," + window.Location.longitude + '&ll=' + window.Location.latitude + "," + window.Location.longitude;
            console.log("open" + url)
            window.open(url)
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
    @parse(text, (response) => @commands[response[0]].apply(this, response[1]))

  parse:(text, callback) =>
    analysiser = window.plugins.morphologicalAnalysiser
    searchLocation = (r) =>
      flag1 = false
      flag2 = false
      for word in r
        if word.baseform.indexOf('近く') != -1
          flag1 = true
        if word.baseform.indexOf('探す') != -1 or word.baseform.indexOf('教える') != -1 or word.baseform.indexOf('調べる') 
          flag2 = true
        if word.feature.indexOf('名詞') != -1 and word.feature.indexOf('一般') != -1 and word.feature.indexOf('接尾') == -1
          keyword = word.surface
      if flag1 == true and flag2 == true and keyword != ""
        keyword
      else
         ""
 
    analysiser.analyse ((r) ->
      result = if (keyword = searchLocation(r)) != ""
        ["地図検索",[keyword]]
      else if /ニュース/.test(text)
        ['ニュース表示',[]]
      else if /おはよ/.test(text)
        ['挨拶:朝',[]]
      else if /こんにちは/.test(text)
        ['挨拶:昼',[]]
      else if /こんにちわ/.test(text)
        ['挨拶:昼',[]]
      else if /おやすみ/.test(text)
        ['挨拶:夜',[]]
      else if /得意なこと/.test(text)
        ['得意なこと',[]]
      else if /特技は/.test(text)
        ['得意なこと',[]]
      else if /特技を/.test(text)
        ['得意なこと',[]]
      else if /かわいい/.test(text)
        ['喜び',[]]
      else if /すごいね/.test(text)
        ['喜び',[]]
      else if /可愛い/.test(text)
        ['喜び',[]]
      else if /凄いね/.test(text)
        ['喜び',[]]
      else
        ['その他',[text]]

      callback(result)
    ), text

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