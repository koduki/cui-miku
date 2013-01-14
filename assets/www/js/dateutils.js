(function() {
  var DateUtils,
    _this = this;

  DateUtils = {};

  DateUtils.getCurrentDate = function() {
    return new Date();
  };

  DateUtils.getCorrectDatetime = function(day) {
    var d, date, target, today, week;
    switch (day) {
      case "今日":
        date = DateUtils.getCurrentDate();
        break;
      case "明日":
        date = (DateUtils.getCurrentDate()).addDays(1);
        break;
      default:
        week = {
          "日": 0,
          "月": 1,
          "火": 2,
          "水": 3,
          "木": 4,
          "金": 5,
          "土": 6
        };
        target = week[day.substring(0, 1)];
        today = DateUtils.getCurrentDate();
        d = target > today.getDay() ? target - today.getDay() : target - today.getDay() + 7;
        date = today.addDays(d);
    }
    return date.toFormat('YYYY-MM-DD') + 'T00:00:00Z';
  };

  window.DateUtils = DateUtils;

}).call(this);
