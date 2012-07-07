(function() {

  module("SimpleBot spec\n");

  test("MorphologicalAnalysiser.\n", function() {
    var analysiser, bot;
    bot = new window.SimpleBot();
    analysiser = window.morphologicalAnalysiser;
    return analysiser.analyse((function(result) {
      equal(result[0].pronunciation, "ラーメン", "test pronunciation.\n");
      equal(result[1].feature, "助詞,格助詞,一般,*,*,*", "test feature.\n");
      return equal(result[2].baseform, "食べる", "test baseform.\n");
    }), "ラーメンが食べたい");
  });

  test("chat parser - ニュース.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    deepEqual(bot.parse('ニュース表示して'), ['ニュース表示', []], '\n');
    deepEqual(bot.parse('ニュースを表示して'), ['ニュース表示', []], '\n');
    return deepEqual(bot.parse('今日のニュース表示'), ['ニュース表示', []], '\n');
  });

  test("chat parser - 挨拶:朝.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    deepEqual(bot.parse('おはよ'), ['挨拶:朝', []], '\n');
    deepEqual(bot.parse('おはよう'), ['挨拶:朝', []], '\n');
    return deepEqual(bot.parse('おはようございます'), ['挨拶:朝', []], '\n');
  });

  test("chat parser - 挨拶:昼.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    deepEqual(bot.parse('こんにちは'), ['挨拶:昼', []], '\n');
    return deepEqual(bot.parse('こんにちわ'), ['挨拶:昼', []], '\n');
  });

  test("chat parser - 挨拶:夜.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    deepEqual(bot.parse('おやすみ'), ['挨拶:夜', []], '\n');
    return deepEqual(bot.parse('おやすみなさい'), ['挨拶:夜', []], '\n');
  });

  test("chat parser - 得意なこと.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    deepEqual(bot.parse('得意なこと'), ['得意なこと', []], '\n');
    deepEqual(bot.parse('得意なこと教えて'), ['得意なこと', []], '\n');
    deepEqual(bot.parse('特技を教えて'), ['得意なこと', []], '\n');
    return deepEqual(bot.parse('特技は'), ['得意なこと', []], '\n');
  });

  test("chat parser - 喜び.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    deepEqual(bot.parse('可愛い'), ['喜び', []], '\n');
    deepEqual(bot.parse('かわいい'), ['喜び', []], '\n');
    deepEqual(bot.parse('すごいね'), ['喜び', []], '\n');
    return deepEqual(bot.parse('凄いね'), ['喜び', []], '\n');
  });

  test("chat parser - 地図検索.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    deepEqual(bot.parse('近くのラーメン屋探して'), ['地図検索', ['ラーメン']], '\n');
    deepEqual(bot.parse('近くにあるコンビニを教えて'), ['地図検索', ['コンビニ']], '\n');
    return deepEqual(bot.parse('近くの駅調べて'), ['地図検索', ['駅']], '\n');
  });

  test("chat parser - その他.\n", function() {
    var bot;
    bot = new window.SimpleBot();
    deepEqual(bot.parse('ラーメン'), ['その他', ['ラーメン']], '\n');
    return deepEqual(bot.parse('あいうえお'), ['その他', ['あいうえお']], '\n');
  });

}).call(this);
