DateUtils = {}
DateUtils.getCurrentDate = () => new Date()
week = {"日":0,"月":1,"火":2,"水":3,"木":4,"金":5,"土":6 }

# 直近の曜日の日付を計算.
calcDay = (text) =>
  day = text.substring(0, 1)
  target = week[day]
  today = DateUtils.getCurrentDate()
  d = if target > today.getDay()
    target - today.getDay()
  else
    target - today.getDay() + 7
  today.addDays(d)

# 直近の曜日の日付を計算.
calcWeekAndDay = (text) =>
  target = week[text.substring(3, 4)]
  today = DateUtils.getCurrentDate()
  next = 7 - today.getDay()
  d = next + target
  today.addDays(d)

# 月日を直接指定された場合の日付を計算.
calcDirectDate = (group) =>
  y = DateUtils.getCurrentDate().getFullYear()
  m = group[1] - 1
  d = group[2]
  new Date(y, m, d)

# 入力された文字列から適切な日付に変換する.
DateUtils.getCorrectDatetime = (text) =>
  switch text
    when "今日"
      date = DateUtils.getCurrentDate()
    when "明日"
      date = (DateUtils.getCurrentDate()).addDays(1)
    else
      date = if text.substring(0, 2) == "来週"
         # 来週の曜日
        calcWeekAndDay(text)
      else if week.hasOwnProperty text.substring(0, 1) 
         # 直近の曜日
        calcDay(text)
      else if group = text.match(/^(\d+)月(\d+)/)
        # 月日を直接指定
       calcDirectDate(group)
  date

# YYYY-MM-DDT00:00:00Z 形式に変換する.
DateUtils.toString = (date) -> date.toFormat('YYYY-MM-DD') + 'T00:00:00Z'

window.DateUtils = DateUtils
