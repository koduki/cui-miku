class Config
    if define? and define.amd
        define -> Config
    else if module?.exports
        module.exports = Config
    else
        window.Config = Config

    externalApi:
        googleCalendar:
            enable:"true"
    etc:
        tts:
            enable:false
    event:
        alerm:
            time:""

    @toString = (obj) ->
      parse = (obj, key) ->
        for p of obj
          if Object.prototype.toString.call(obj[p]) == "[object Object]"
            parse(obj[p], key + "." + p)
          else
            key + "." + p + "\t" + obj[p]
      parse(obj, "config").join("\n")

    @load = () ->
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
      parse(new Config(), "config")
    
    @save = (obj) ->
      parse = (obj, key) ->
        for p of obj
          if Object.prototype.toString.call(obj[p]) == "[object Object]"
            parse(obj[p], key + "." + p)
          else
            window.localStorage.setItem(key + "." + p, obj[p])
      parse(obj, "config")

      text = Config.toString(obj)
      if LocalFileSystem?
        FileUtil.open "COLAS/config.tsv", (file) ->
            file.write text
      else
        console.log "not found LocalFileSystem"
        console.log text

