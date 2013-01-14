module "DateUtils spec\n"

load("../www/js/node-date-utils/date-utils.min.js");
DateUtils = window.DateUtils
DateUtils.getCurrentDate = () => new Date(2013,0,13)

test "getCorrectDatetime - 今日.\n", ->
  equal DateUtils.getCorrectDatetime('今日'), '2013-01-13T00:00:00Z', '\n'

test "getCorrectDatetime - 明日.\n", ->
  equal DateUtils.getCorrectDatetime('明日'), '2013-01-14T00:00:00Z',  '\n'

test "getCorrectDatetime - 月曜日.\n", ->
  equal DateUtils.getCorrectDatetime('月曜日'), '2013-01-14T00:00:00Z',  '\n'

test "getCorrectDatetime - 火曜.\n", ->
  equal DateUtils.getCorrectDatetime('火曜'), '2013-01-15T00:00:00Z',  '\n'

test "getCorrectDatetime - 水曜日.\n", ->
  equal DateUtils.getCorrectDatetime('水曜日'), '2013-01-16T00:00:00Z',  '\n'

test "getCorrectDatetime - 木曜日.\n", ->
  equal DateUtils.getCorrectDatetime('木曜日'), '2013-01-17T00:00:00Z',  '\n'

test "getCorrectDatetime - 金曜日.\n", ->
  equal DateUtils.getCorrectDatetime('金曜日'), '2013-01-18T00:00:00Z',  '\n'

test "getCorrectDatetime - 土曜日.\n", ->
  equal DateUtils.getCorrectDatetime('土曜日'), '2013-01-19T00:00:00Z',  '\n'

test "getCorrectDatetime - 日曜日.\n", ->
  equal DateUtils.getCorrectDatetime('日曜日'), '2013-01-20T00:00:00Z',  '\n'

test "getCorrectDatetime - 来週の日曜日.\n", ->
  equal DateUtils.getCorrectDatetime('来週の日曜日'), '2013-01-20T00:00:00Z',  '\n'

test "getCorrectDatetime - 来週の月曜日.\n", ->
  equal DateUtils.getCorrectDatetime('来週の月曜日'), '2013-01-21T00:00:00Z',  '\n'

test "getCorrectDatetime - 来週の火曜日.\n", ->
  equal DateUtils.getCorrectDatetime('来週の火曜日'), '2013-01-22T00:00:00Z',  '\n'

test "getCorrectDatetime - 来週の水曜日.\n", ->
  equal DateUtils.getCorrectDatetime('来週の水曜日'), '2013-01-23T00:00:00Z',  '\n'

test "getCorrectDatetime - 来週の木曜.\n", ->
  equal DateUtils.getCorrectDatetime('来週の木曜'), '2013-01-24T00:00:00Z',  '\n'

test "getCorrectDatetime - 来週の金曜日.\n", ->
  equal DateUtils.getCorrectDatetime('来週の金曜日'), '2013-01-25T00:00:00Z',  '\n'

test "getCorrectDatetime - 来週の土曜日.\n", ->
  equal DateUtils.getCorrectDatetime('来週の土曜日'), '2013-01-26T00:00:00Z',  '\n'

test "getCorrectDatetime - 4月1日.\n", ->
  equal DateUtils.getCorrectDatetime('4月1日'), '2013-04-01T00:00:00Z',  '\n'