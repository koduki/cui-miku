class window.GoogleCalendar
  constructor:() ->
    @client_id = "150899810974-qv8fu9ck15n5cmojbrfd1r8o4l0leatk.apps.googleusercontent.com"
    @scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar"
    @client_secret = 'NuHzWDgOqRQ3HIbtrTaJtZjE'
    window.plugins.childBrowser.onLocationChange = (loc) =>
      code_match = loc.match(/&code=(.+)&*/)
      if code_match
        code = code_match[1]
        alert(code)
        console.log(code)
        window.plugins.childBrowser.close()
        @getRefreshToken(code)
        #@getCalendarList(access_token)
      else
        console.log("LocalChange unmatch:" + loc);

  authorize:() => 
    url = "https://accounts.google.com/o/oauth2/auth?scope=#{@scope}&state=%2Fprofile&redirect_uri=https%3A%2F%2Flocalhost%2Foauth2callback&response_type=code&client_id=#{@client_id}&access_type=offline";
    window.plugins.childBrowser.showWebPage url,{
      showLocationBar : false
    }

  getCalendarList:(access_token) => 
    url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
    @callAPI url, access_token, {}, (data) ->
      alert(data.items[0].description)
      onsole.log(data.items[0].description)

  getRefreshToken:(code) =>
    $.ajax
      type:'post'
      url : 'https://accounts.google.com/o/oauth2/token'
      data : 
        'client_id':@client_id
        'client_secret':@client_secret
        'redirect_uri':'https://localhost/oauth2callback'
        'grant_type':'authorization_code'
        'code':code
      dataType : 'json'
      success:(data) =>
        window.resultStatus = data
        alert(data.refresh_token)
        alert(data.access_token)
      error:(jqXHR, textStatus, errorThrown) =>
        window.errorStatus = jqXHR
        console.log("failed:call google api:" + ", " + code + ","+ @client_id + ", " + @client_secret + ", " + errorThrown)

  callAPI:(url, access_token, data, success) => 
    $.ajax
      url : url
      data : data
      headers : {'Authorization':'OAuth ' + access_token }
      dataType : 'json',
      success : (data) => success(data)
      error:(jqXHR, textStatus, errorThrown) =>
        console.log("failed:call google api:" + url + ", " + access_token + ","+ jqXHR +", " + textStatus + ", " + errorThrown)