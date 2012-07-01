images = [
  default: "通常"
,
  "通常": "cui/chara/miku/images/001_s.png"
  "怒り": "cui/chara/miku/images/003_s.png"
  "喜び": "cui/chara/miku/images/002_s.png"
 ]
Head =
  left: 20
  top: 40
  width: 100
  height: 80

Breast =
  left: 20
  top: 220
  width: 120
  height: 60

actions = [
  part: Breast
  action: "tap"
  img: "怒り"
  msg: "Hなのはいけないと思います！"
,
  part: Head
  action: "nadenade"
  img: "喜び"
  msg: "♪"
 ]
$ ->
  character = new Character(images, "")
  character.init(actions)
  character.dlg = new Dialog(
    width: 160
    bottom: 270
    left: 155
  )
  flickWindow = new FlickWindow(180, 300)
  character.addHiddenMethod ->
    $(".yesnoButton").hide()
  character.addHiddenMethod ->
    flickWindow.hide()

  Speech.chatbot = new SimpleBot(character)
  character.dlg.show "好きなところをタップしてください♪"
  window.onHome = ->
    character.dlg.show "好きなところをタップしてください♪"

  window.onNews = ->
    character.dlg.show "今日のおすめの<br />ニュースでーす♪", ->
      Function.showNews flickWindow
  character.hiddenAll()