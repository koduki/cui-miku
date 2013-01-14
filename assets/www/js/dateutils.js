(function() {
  var DateUtils,
    _this = this;

  DateUtils = {};

  DateUtils.getCurrentDate = function() {
    return new Date();
  };

  DateUtils.getCorrectDatetime = function(day) {
    var date;
    switch (day) {
      case "今日":
        date = DateUtils.getCurrentDate();
        break;
      case "明日":
        date = (DateUtils.getCurrentDate()).addDays(1);
    }
    return date.toFormat('YYYY-MM-DD') + 'T00:00:00Z';
  };

  window.DateUtils = DateUtils;

}).call(this);
