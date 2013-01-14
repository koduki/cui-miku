DateUtils = {}
DateUtils.getCurrentDate = () => new Date()
DateUtils.getCorrectDatetime = (day) =>
  switch day
    when "今日"
      date = DateUtils.getCurrentDate()
    when "明日"
      date = (DateUtils.getCurrentDate()).addDays(1)

  date.toFormat('YYYY-MM-DD') + 'T00:00:00Z'

window.DateUtils = DateUtils
