class window.Config
  externalApi:
    googleCalendar:
      enable:"true"
  etc:
    tts:
      enable:false

window.Config.load = () ->
  parse = (obj, key) ->
    for p of obj
      if Object.prototype.toString.call(obj[p]) == "[object Object]"
        parse(obj[p], key + "." + p)
      else
        value = window.localStorage.getItem(key + "." + p)
        obj[p] = if value == "true"
                  true
                 else if value == "false"
                  false
                 else
                  value
    obj
  parse(new Config, "config")

window.Config.save = (obj) ->
  parse = (obj, key) ->
    for p of obj
      if Object.prototype.toString.call(obj[p]) == "[object Object]"
        parse(obj[p], key + "." + p)
      else
        window.localStorage.setItem(key + "." + p, obj[p])
  parse(obj, "config")
