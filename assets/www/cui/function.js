(function() {
  var showRss;

  window.Function = {};

  showRss = function(flickWindow, url) {
    $.get(url, function(res, code) {
      var items, xml;
      xml = $(res);
      items = xml.find("item").map(function(i, x) {
        return {
          title: $(x).find("title").text(),
          link: $(x).find("link").text(),
          description: $(x).find("description").text()
        };
      });
      return items.each(function(i, item) {
        return flickWindow.add(item.title, item.link, item.description.slice(0, 60));
      });
    });
    return flickWindow.show();
  };

  Function.showNews = function(flickWindow) {
    var url;
    url = "https://twitter.com/statuses/user_timeline/82492709.rss";
    url = "http://feeds.feedburner.com/hatena/b/hotentry";
    return showRss(flickWindow, url);
  };

}).call(this);
