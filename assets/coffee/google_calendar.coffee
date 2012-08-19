class window.GoogleCalendar
  constructor:() ->
    @client_id = "150899810974-qv8fu9ck15n5cmojbrfd1r8o4l0leatk.apps.googleusercontent.com"
    @scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar"
    @client_secret = 'NuHzWDgOqRQ3HIbtrTaJtZjE'

  authorize:(success) => 
    url = "https://accounts.google.com/o/oauth2/auth?scope=#{@scope}&state=%2Fprofile&redirect_uri=https%3A%2F%2Flocalhost%2Foauth2callback&response_type=code&client_id=#{@client_id}&access_type=offline";
    window.plugins.childBrowser.onLocationChange = (loc) =>
      code_match = loc.match(/&code=(.+)&*/)
      if code_match
        code = code_match[1]
        console.log(code)
        window.plugins.childBrowser.close()
        @getRefreshToken(code, success)
      else
        console.log("LocalChange unmatch:" + loc);
 
    window.plugins.childBrowser.showWebPage url,{
      showLocationBar : false
    }

  getRefreshToken:(code, success) =>
    console.log("start:getRefreshToken")
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
        refresh_token = data.refresh_token
        window.localStorage.setItem("googleapi.calendar.refresh_token", refresh_token)
        success(refresh_token)
      error:(jqXHR, textStatus, errorThrown) =>
        window.errorStatus = jqXHR
        console.log("failed:getRefreshToken:" + ", " + code + ","+ @client_id + ", " + @client_secret + ", " + errorThrown)

  getAccessToken:(refresh_token, success) =>
    console.log("start:getAccessToken")
    $.ajax
      type:'post'
      url : 'https://accounts.google.com/o/oauth2/token'
      data : 
        'client_id':@client_id
        'client_secret':@client_secret
        'grant_type':'refresh_token'
        'refresh_token':refresh_token
      dataType : 'json'
      success:(data) =>
        window.resultStatus = data
        success(data.access_token)
      error:(jqXHR, textStatus, errorThrown) =>
        window.errorStatus = jqXHR
        console.log("failed:getAccessToken :" + ", " + refresh_token + ","+ @client_id + ", " + @client_secret + ", " + errorThrown)

  callAPI:(url, access_token, data, success) =>
    $.ajax
      url : url
      data : data
      headers : {'Authorization':'OAuth ' + access_token }
      dataType : 'json',
      success : (data) => success(data)
      error:(jqXHR, textStatus, errorThrown) =>
        window.errorStatus = jqXHR
        console.log("failed:call google api:" + url + ", " + access_token + ","+ jqXHR +", " + textStatus + ", " + errorThrown)

  executeAPI:(url, data, success) =>
    refresh_token = window.localStorage.getItem("googleapi.calendar.refresh_token")

    if refresh_token == null
      console.log("not found refresh token")
      @authorize (refresh_token) => 
        @getAccessToken refresh_token, (access_token) =>
          @callAPI(url, access_token, data, success)
    else
      console.log("found refresh token")
      @getAccessToken refresh_token, (access_token) =>
        @callAPI(url, access_token, data, success)

  getCalendarList:() => 
    url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
    @executeAPI url, {}, (data) ->
      alert(data.items[0].description)
      console.log(data.items[0].description)