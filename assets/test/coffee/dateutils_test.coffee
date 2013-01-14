module "DateUtils spec\n"

load("../www/js/node-date-utils/date-utils.min.js");
DateUtils = window.DateUtils
DateUtils.getCurrentDate = () => new Date(2013,1,13)

test "getCorrectDatetime - 今日.\n", ->
  equal DateUtils.getCorrectDatetime('今日'), '2013-02-13T00:00:00Z', '\n'

test "getCorrectDatetime - 明日.\n", ->
  equal DateUtils.getCorrectDatetime('明日'), '2013-02-14T00:00:00Z',  '\n'