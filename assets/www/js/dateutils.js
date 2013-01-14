(function() {
  var DateUtils, calcDay, calcWeekAndDay, week,
    _this = this;

  DateUtils = {};

  DateUtils.getCurrentDate = function() {
    return new Date();
  };

  week = {
    "日": 0,
    "月": 1,
    "火": 2,
    "水": 3,
    "木": 4,
    "金": 5,
    "土": 6
  };

  calcDay = function(text) {
    var d, day, target, today;
    console.log("hello world");
    day = text.substring(0, 1);
    target = week[day];
    today = DateUtils.getCurrentDate();
    d = target > today.getDay() ? target - today.getDay() : target - today.getDay() + 7;
    return today.addDays(d);
  };

  calcWeekAndDay = function(text) {
    var d, next, target, today;
    target = week[text.substring(3, 4)];
    today = DateUtils.getCurrentDate();
    next = 7 - today.getDay();
    d = next + target;
    return today.addDays(d);
  };

  DateUtils.getCorrectDatetime = function(text) {
    var date;
    switch (text) {
      case "今日":
        date = DateUtils.getCurrentDate();
        break;
      case "明日":
        date = (DateUtils.getCurrentDate()).addDays(1);
        break;
      default:
        date = text.substring(0, 2) === "来週" ? calcWeekAndDay(text) : week.hasOwnProperty(text.substring(0, 1)) ? calcDay(text) : void 0;
    }
    return date.toFormat('YYYY-MM-DD') + 'T00:00:00Z';
  };

  window.DateUtils = DateUtils;

}).call(this);
