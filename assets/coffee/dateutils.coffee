DateUtils = {}
DateUtils.getCurrentDate = () => new Date()
DateUtils.getCorrectDatetime = (day) =>
  switch day
    when "今日"
      date = DateUtils.getCurrentDate()
    when "明日"
      date = (DateUtils.getCurrentDate()).addDays(1)
    else
      week = {"日":0,"月":1,"火":2,"水":3,"木":4,"金":5,"土":6 }
      target = week[day.substring(0,1)]
      today = DateUtils.getCurrentDate()
      d = if target > today.getDay()
        target - today.getDay()
      else
        target - today.getDay() + 7
      date = today.addDays(d)
  date.toFormat('YYYY-MM-DD') + 'T00:00:00Z'

window.DateUtils = DateUtils
