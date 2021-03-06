window.Event = initTap: (obj) ->
  x = 0
  y = 0
  isTap = false
  tapEvent = undefined
  obj.bind "touchstart", (e) ->
    tapEvent = event
    isTap = true
    x = event.touches[0].pageX
    y = event.touches[0].pageY

  obj.bind "touchmove", (e) ->
    isTap = isTap and (x is event.touches[0].pageX) and (y is event.touches[0].pageY)

  obj.tap = (callback) ->
    obj.bind "touchend", (e) ->
      callback tapEvent  if isTap

  obj

class window.Character
  constructor:(@images, @speechMessage) ->
    @INTERVAL = 1700
    @obj = $("<img />").appendTo("#character")
    Event.initTap @obj
    @hiddenMethods = []
    @defaultImage = @images[1][@images[0]["default"]]
    @obj.attr "src", @defaultImage
    @obj.tap (e) ->
      x = e.touches[0].pageX
      y = e.touches[0].pageY

  action:(actionName, part, callback) ->
    if actionName is "tap"
      @obj.tap (e) =>
        @hiddenAll()
        x = e.touches[0].pageX
        y = e.touches[0].pageY
        top = window.innerHeight - @obj.height() + part.top
        if part.left <= x and x <= part.width and top <= y and y <= (top + part.height)
          callback()
        else
          Speech.recognizeSpeech @speechMessage
    else if actionName is "nadenade"
      left = 0
      right = 0
      buff = 40
      limit = 3
      @obj.bind "touchstart", (e) =>
        @hiddenAll()
        setTimeout (->
          left = 0
          right = 0
        ), 2000

      @obj.bind "touchmove", (e) =>
        x = event.touches[0].pageX
        y = event.touches[0].pageY
        top = window.innerHeight - @obj.height() + part.top
        if top <= y and y <= (top + part.height)
          left++  if part.left <= x and x <= part.left + buff
          right++  if part.left + part.width - buff <= x and x <= part.left + part.width
          if left >= limit and right >= limit
            callback()
            left = 0
            right = 0

  motion:(imageName, interval=1700) =>
    @obj.attr "src", @images[1][imageName]
    setTimeout (=>
      @obj.attr "src", @defaultImage
    ), interval

  draw:(callback) ->
    @obj.bind "load", =>
      callback()

  addHiddenMethod: (callback) ->
    @hiddenMethods.push callback

  hiddenAll: -> 
    i = 0
    while i < @hiddenMethods.length
      @hiddenMethods[i]()
      i++

  init:(actions) ->
    actions.map (action) =>
      @action action.action, action.part, =>
        @motion action.img, @INTERVAL
        @dlg.show action.msg, @INTERVAL

class window.Dialog
  constructor:(size) ->
    @obj = $("<div />").appendTo("#character")
    @obj.hide()
    @obj.addClass "arrow_box"
    @obj.css("width", size["width"] + "px").css("bottom", size["bottom"] + "px").css "left", size["left"] + "px"
    @textarea = $("<p />").appendTo(@obj)
  show:(msg, arg1) ->
    if typeof arg1 is "undefined"
      interval = 1700
    else if jQuery.isFunction(arg1)
      interval = 1700
      callback = arg1
    else
      interval = arg1
    @textarea.html msg
    @obj.show()
    console.log("debug:tts=" + Config.load().etc.tts.enable)
    if Config.load().etc.tts.enable
      TextToSpeech.speak(msg)
    setTimeout (=>
      @obj.fadeOut "fast", ->
        callback()  if jQuery.isFunction(callback)
    ), interval

window.showArea = (sprite, area) ->
  obj = $("<div />").appendTo("#sprite")
  obj.css("position", "absolute").css("width", area["width"] + "px").css("height", area["height"] + "px").css("left", area["left"] + "px").css("bottom", (sprite.height - area["top"] - area["height"]) + "px").css("z-index", 100).css "background-color", "red"

window.Speech =
  chatbot: null
  onDeviceReady: ->
    console.log "onSpeechRecognizerReady"
    window.plugins.speechrecognizer.init Speech.speechInitOk, Speech.speechInitFail

  speechInitOk: ->

  speechInitFail: (m) ->

  recognizeSpeech: (message) ->
    requestCode = 1234
    maxMatches = 1
    promptString = message
    window.plugins.speechrecognizer.startRecognize Speech.speechOk, Speech.speechFail, requestCode, maxMatches, promptString, "ja_JP"

  speechOk: (result) ->
    match = undefined
    respObj = undefined
    requestCode = undefined
    console.log "result: " + result
    if result
      respObj = JSON.parse(result)
      if respObj
        requestCode = respObj.speechMatches.requestCode
        text = respObj.speechMatches.speechMatch[0]
        Speech.chatbot.chat text

  speechFail: (m) ->
    console.log "speechFail: " + m.toString()

window.Location =
  onDeviceReady: ->
    console.log "onGeolocationReady"
    options = 
      frequency : 3000
    watchID = navigator.geolocation.watchPosition(Location.onSuccess, Location.onError, options)

  onSuccess:(position) ->
    Location.latitude = position.coords.latitude
    Location.longitude = position.coords.longitude
    #Location.latitude = 35.562479
    #Location.longitude = 139.716051

  onError:(error) ->
    alert('コード: ' + error.code + '\n' + 'メッセージ: ' + error.message)

window.TextToSpeech =
  isReady:false
  onDeviceReady: ->
    console.log "onTextToSpeechReady"
    window.plugins.tts.startup(TextToSpeech.startupWin, TextToSpeech.fail)

  startupWin:(result) ->
    if result == TTS.STARTED
      window.plugins.tts.setLanguage("ja", TextToSpeech.win, TextToSpeech.fail)
      TextToSpeech.isReady = true
    else
      console.log("WARNING:TTS is not ready. step1, " + result)
  win:(result) ->
    console.log(result);

  fail:(result) ->
    console.log("Error = " + result)

  speak:(text) ->
    console.log("debug_speak:" + text);
    if TextToSpeech.isReady
      console.log("INFO:TTS is ready.")
      window.plugins.tts.speak(text)
    else
      window.plugins.tts.startup(
        (result) => 
          window.plugins.tts.setLanguage("ja", TextToSpeech.win, TextToSpeech.fail)
          TextToSpeech.isReady = true
          window.plugins.tts.speak(text)
        () -> console.log("WARNING:TTS is not ready."))

class window.FlickWindow
  constructor:(@height, @width) ->
    @obj = $("<div id=\"firstitem\" class=\"flickSimple\" style=\"overflow: hidden; \"><ul /></div>")
    $("body").append @obj
    $(".flickSimple").hide()

  add: (title, url, body) ->
    article = $("<article><h1><a></a></h1><p></p>")
    article.find("h1 a").text title
    article.find("h1 a").attr "href", url
    article.find("p").html body
    article.css "height", @height + "px"
    item = $("<li>")
    item.css "width", @width + "px"
    item.append article
    @obj.find("ul").append item
    @obj.find("ul").css "width", @width * @obj.find("li").size() + "px"
    $(".flickSimple").css "width", @width + "px"

  clear: ->
    $("#firstitem article").each ($i, x) ->
      $(x).remove()

  hide: ->
    $(".flickSimple").hide()

  show: ->
    $(".flickSimple").fadeIn()
