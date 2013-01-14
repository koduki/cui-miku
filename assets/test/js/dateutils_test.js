(function() {
  var DateUtils,
    _this = this;

  module("DateUtils spec\n");

  load("../www/js/node-date-utils/date-utils.min.js");

  DateUtils = window.DateUtils;

  DateUtils.getCurrentDate = function() {
    return new Date(2013, 0, 13);
  };

  test("getCorrectDatetime - 今日.\n", function() {
    return equal(DateUtils.getCorrectDatetime('今日'), '2013-01-13T00:00:00Z', '\n');
  });

  test("getCorrectDatetime - 明日.\n", function() {
    return equal(DateUtils.getCorrectDatetime('明日'), '2013-01-14T00:00:00Z', '\n');
  });

  test("getCorrectDatetime - 月曜日.\n", function() {
    return equal(DateUtils.getCorrectDatetime('月曜日'), '2013-01-14T00:00:00Z', '\n');
  });

  test("getCorrectDatetime - 火曜.\n", function() {
    return equal(DateUtils.getCorrectDatetime('火曜'), '2013-01-15T00:00:00Z', '\n');
  });

  test("getCorrectDatetime - 水曜日.\n", function() {
    return equal(DateUtils.getCorrectDatetime('水曜日'), '2013-01-16T00:00:00Z', '\n');
  });

  test("getCorrectDatetime - 木曜日.\n", function() {
    return equal(DateUtils.getCorrectDatetime('木曜日'), '2013-01-17T00:00:00Z', '\n');
  });

  test("getCorrectDatetime - 金曜日.\n", function() {
    return equal(DateUtils.getCorrectDatetime('金曜日'), '2013-01-18T00:00:00Z', '\n');
  });

  test("getCorrectDatetime - 土曜日.\n", function() {
    return equal(DateUtils.getCorrectDatetime('土曜日'), '2013-01-19T00:00:00Z', '\n');
  });

  test("getCorrectDatetime - 日曜日.\n", function() {
    return equal(DateUtils.getCorrectDatetime('日曜日'), '2013-01-20T00:00:00Z', '\n');
  });

}).call(this);
