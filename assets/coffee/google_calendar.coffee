class window.GoogleCalendar
  constructor:() ->
    window.plugins.childBrowser.onLocationChange = (loc) =>
      code_match = loc.match(/?code=(.+)/)
      if code_match
        console.log("LocalChange match:" + loc);
        code = code_match[1]
        alert(code)
        console.log(code)
        window.plugins.childBrowser.close()
        #@getCalendarList(access_token)
      else
        console.log("LocalChange unmatch:" + loc);

  authorize:() => 
    client_id = "150899810974-qv8fu9ck15n5cmojbrfd1r8o4l0leatk.apps.googleusercontent.com"
    scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar"
    url = "https://accounts.google.com/o/oauth2/auth?scope=#{scope}&state=%2Fprofile&redirect_uri=https%3A%2F%2Flocalhost%2Foauth2callback&response_type=token&client_id=#{client_id}";
    window.plugins.childBrowser.showWebPage url,{
      showLocationBar : false
    }

  getCalendarList:(access_token) => 
    url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
    @callAPI url, access_token, {}, (data) ->
      alert(data.items[0].description)
      onsole.log(data.items[0].description)

  callAPI:(url, access_token, data, success) => 
    $.ajax
      url : url
      data : data
      headers : {'Authorization':'OAuth ' + access_token }
      dataType : 'json',
      success : (data) => success(data)
      error:(jqXHR, textStatus, errorThrown) =>
        console.log("failed:call google api:" + url + ", " + access_token + ","+ jqXHR +", " + textStatus + ", " + errorThrown)