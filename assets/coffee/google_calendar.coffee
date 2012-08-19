class window.GoogleCalendar
  constructor:() ->
    window.plugins.childBrowser.onLocationChange = (loc) =>
      code_match = loc.match(/&access_token=(.+?)&/)
      if code_match
        console.log("LocalChange success;" + code_match)
        access_token = code_match[1]
        alert(access_token)
        console.log(access_token)

        $.ajax
          url : 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
          data : {}
          headers : {'Authorization':'OAuth ' + access_token }
          dataType : 'json',
          success : (data) =>
            alert(data.items[0].description)
            onsole.log(data.items[0].description)
          error:(jqXHR, textStatus, errorThrown) =>
            console.log("failed:ajax:" + access_token + ","+jqXHR+", " + textStatus + ", " + errorThrown)
   
        window.plugins.childBrowser.close();
      else
        console.log("LocalChange unmatch:" + loc);

  authorize:() => 
    url = "https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&state=%2Fprofile&redirect_uri=https%3A%2F%2Flocalhost%2Foauth2callback&response_type=token&client_id=150899810974-qv8fu9ck15n5cmojbrfd1r8o4l0leatk.apps.googleusercontent.com";
    window.plugins.childBrowser.showWebPage url,{
      showLocationBar : false
    }
