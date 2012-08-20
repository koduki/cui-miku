class window.Config
  externalApi:
    googleCalendar:
      enable:false
      test:123
    googleInfo:"abc"
  etc:
    tts:
      enable:false

window.Config.load = () ->
#  config = window.localStorage.getItem("config")
  parse = (obj, key) ->
    for p of obj
      if Object.prototype.toString.call(obj[p]) == "[object Object]"
        parse(obj[p], key + "." + p)
      else
        obj[p] = window.localStorage.getItem(key + "." + p)
        console.log(key + "." + p + " = " + obj[p])
    obj
  parse(new Config, "config")

window.Config.save = (obj) ->
  parse = (obj, key) ->
    for p of obj
      if Object.prototype.toString.call(obj[p]) == "[object Object]"
        parse(obj[p], key + "." + p)
      else
        window.localStorage.setItem(key + "." + p, obj[p])
        console.log(key + "." + p + " = " + obj[p])
  parse(obj, "config")
