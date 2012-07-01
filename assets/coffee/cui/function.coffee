window.Function = {}
showRss = (flickWindow, url) ->
  $.get url, (res, code) ->
    xml = $(res)
    items = xml.find("item").map((i, x) ->
      title: $(x).find("title").text()
      link: $(x).find("link").text()
      description: $(x).find("description").text()
    )
    items.each (i, item) ->
      flickWindow.add item.title, item.link, item.description.slice(0, 60)

  flickWindow.show()

Function.showNews = (flickWindow) ->
  url = "https://twitter.com/statuses/user_timeline/82492709.rss"
  url = "http://feeds.feedburner.com/hatena/b/hotentry"
  showRss flickWindow, url