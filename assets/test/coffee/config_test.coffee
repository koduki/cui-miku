module "Config spec\n"
test "Config toString.\n", ->
    Config = window.Config

    config = new Config()

    config.externalApi.googleCalendar.enable = true 
    config.etc.tts.enable = true
    config.event.alerm.time = "01:00"
    expected = "config.externalApi.googleCalendar.enable\ttrue\nconfig.etc.tts.enable\ttrue\nconfig.event.alerm.time\t01:00"
    equal Config.toString(config), expected, "test config true, true, 01:00\n"

    config.externalApi.googleCalendar.enable = true
    config.etc.tts.enable = false
    config.event.alerm.time = "02:00"
    expected = "config.externalApi.googleCalendar.enable\ttrue\nconfig.etc.tts.enable\tfalse\nconfig.event.alerm.time\t02:00"
    equal Config.toString(config), expected, "test config true, false, 02:00\n"

    config.externalApi.googleCalendar.enable = false
    config.etc.tts.enable = true
    config.event.alerm.time = "01:00"
    expected = "config.externalApi.googleCalendar.enable\tfalse\nconfig.etc.tts.enable\ttrue\nconfig.event.alerm.time\t01:00"
    equal Config.toString(config), expected, "test config false, true, 01:00\n"