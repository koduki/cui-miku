(function() {

  module("SimpleBot spec\n");

  test("MorphologicalAnalysiser.\n", function() {
    var analysiser, bot;
    bot = new window.SimpleBot();
    analysiser = window.plugins.morphologicalAnalysiser;
    return analysiser.analyse((function(result) {
      equal(result[0].pronunciation, "ラーメン", "test pronunciation.\n");
      equal(result[1].feature, "助詞,格助詞,一般,*,*,*", "test feature.\n");
      return equal(result[2].baseform, "食べる", "test baseform.\n");
    }), "ラーメンが食べたい");
  });

  test("chat parser - ニュース.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    bot.parse('ニュース表示して', function(actual) {
      return deepEqual(actual, ['ニュース表示', []], '\n');
    });
    bot.parse('ニュースを表示して', function(actual) {
      return deepEqual(actual, ['ニュース表示', []], '\n');
    });
    return bot.parse('今日のニュース表示', function(actual) {
      return deepEqual(actual, ['ニュース表示', []], '\n');
    });
  });

  test("chat parser - 挨拶:朝.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    bot.parse('おはよ', function(actual) {
      return deepEqual(actual, ['挨拶:朝', []], '\n');
    });
    bot.parse('おはよう', function(actual) {
      return deepEqual(actual, ['挨拶:朝', []], '\n');
    });
    return bot.parse('おはようございます', function(actual) {
      return deepEqual(actual, ['挨拶:朝', []], '\n');
    });
  });

  test("chat parser - 挨拶:昼.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    bot.parse('こんにちは', function(actual) {
      return deepEqual(actual, ['挨拶:昼', []], '\n');
    });
    return bot.parse('こんにちわ', function(actual) {
      return deepEqual(actual, ['挨拶:昼', []], '\n');
    });
  });

  test("chat parser - 挨拶:夜.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    bot.parse('おやすみ', function(actual) {
      return deepEqual(actual, ['挨拶:夜', []], '\n');
    });
    return bot.parse('おやすみなさい', function(actual) {
      return deepEqual(actual, ['挨拶:夜', []], '\n');
    });
  });

  test("chat parser - 得意なこと.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    bot.parse('得意なこと', function(actual) {
      return deepEqual(actual, ['得意なこと', []], '\n');
    });
    bot.parse('得意なこと教えて', function(actual) {
      return deepEqual(actual, ['得意なこと', []], '\n');
    });
    bot.parse('特技を教えて', function(actual) {
      return deepEqual(actual, ['得意なこと', []], '\n');
    });
    return bot.parse('特技は', function(actual) {
      return deepEqual(actual, ['得意なこと', []], '\n');
    });
  });

  test("chat parser - 喜び.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    bot.parse('可愛い', function(actual) {
      return deepEqual(actual, ['喜び', []], '\n');
    });
    bot.parse('かわいい', function(actual) {
      return deepEqual(actual, ['喜び', []], '\n');
    });
    bot.parse('すごいね', function(actual) {
      return deepEqual(actual, ['喜び', []], '\n');
    });
    return bot.parse('凄いね', function(actual) {
      return deepEqual(actual, ['喜び', []], '\n');
    });
  });

  test("chat parser - 地図検索.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    bot.parse('近くのラーメン屋探して', function(actual) {
      return deepEqual(actual, ['地図検索', ['ラーメン']], '\n');
    });
    bot.parse('近くにあるコンビニを教えて', function(actual) {
      return deepEqual(actual, ['地図検索', ['コンビニ']], '\n');
    });
    return bot.parse('近くの駅調べて', function(actual) {
      return deepEqual(actual, ['地図検索', ['駅']], '\n');
    });
  });

  test("chat parser - その他.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    bot.parse('ラーメン', function(actual) {
      return deepEqual(actual, ['その他', ['ラーメン']], '\n');
    });
    return bot.parse('あいうえお', function(actual) {
      return deepEqual(actual, ['その他', ['あいうえお']], '\n');
    });
  });

}).call(this);
