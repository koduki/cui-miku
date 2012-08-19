class window.Config
  save:() =>
    window.localStorage.setItem("config", JSON.stringify(this))
  externalApi:
    googleCalendar:false
  etc:
    tts:false

window.Config.load = () ->
  config = window.localStorage.getItem("config")
  if config == null
    new Config()
  else
    JSON.parse(config)