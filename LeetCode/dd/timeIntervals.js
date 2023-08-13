/**
 * you are given 2 strings.  startTime : "mon 10:45 am" and  endTime: "mon 11:00 am". 
 * you need to output all the times between starttime and endtime in the interval of 5 minutes. 
 * output: ["11045", "11050","11055", "11100"].
 * 
 * in output each string represents the day+time+minute. eg: 11045: 1+10+45 => monday represents 1. tuesday 2 etc. 
 * Also, the output should be in 24hr format and input will be in 12hr format. 
 * you are required to do input validations as they can have invalid time formats.
 * 11:55 am
 * 
 * input: start="mon 11:50 pm", end="tue 12:10 am"
 * 1 2350
 */

const DAY_MAP = {
  'mon': 1,
  'tue': 2,
  'wed': 3,
  'thur': 4,
  'fri': 5,
  'sat': 6,
  'sun': 7,
}

function getTimeIntervals (start, end) {
  validateTimestamps(start, end)
  const [start_date, start_time, start_ampm] = start.split(' ')
  const [end_date, end_time, end_ampm] = end.split(' ')
  let startFormatted = formatTime(start_date, start_time, start_ampm)
  let endFormatted = formatTime(end_date, end_time, end_ampm)

  let startInteval = startFormatted
  let endInterval = endFormatted

  let result = []

  while (startInteval !== endInterval) {
    result.push(startInteval)
    startInteval = addInterval(startInteval, 5)
  }
  return result
}

function validateTimestamps (start, end) {
  const startTime = start.toLowerCase()
  const endTime = end.toLowerCase()
  const regex = /^(mon|tue|wed|thur|fri|sat|sun)\s(0[0-9]|1[0-2]):[0-5][0-9]\s(am|pm)$/i // this currently matches mon 12:59 pm as valid.
  if (!startTime.test(regex) || !endTime.test(regex)) {
    throw new Error('Invalid input')
  }

  const [start_date, start_time, start_ampm] = start.split(' ')
  const [end_date, end_time, end_ampm] = end.split(' ')

  let isValidDateProgression = false
  if ((start_date === 'mon' || start_date === 'sun') && (end_date === 'mon' || end_date === 'sun')) {
    isValidDateProgression = true
  } else {
    isValidDateProgression = DAY_MAP[start_date] < DAY_MAP[end_date]
  }

  if (!isValidDateProgression) {
    throw new Error('End date should be after start date')
  }
  return true
}

function formatTime (date, time, ampm) {
  let [hour, min] = time.split(':')
  let formattedHour = hour
  if (ampm === 'pm') {
    // 12:05 pm 1:05 pm
    if (hour !== '12') {
      formattedHour = (parseInt(hour) + 12).toString()
    }
  } else {
    // 12:05 am
    if (hour === '12') {
      formattedHour = '00'
    }
  }
  return `${DAY_MAP[date]}${formattedHour}${min}`
}

// 12350
function addInterval (formatTime, interval) {
  let curMin = parseInt(formatTime.slice(-2))
  let curHour = parseInt(formatTime.slice(1, 3))
  let curDay = parseInt(formatTime.slice(0, 1))
  let newDay = curDay

  let nextMin = curMin + interval
  let newMin = nextMin % 60
  let finalMin = newMin.toString()


  if (newMin < 10) {
    finalMin = `0${newMin}`
  }
  // console.log('newMin', newMin, 'finalMin', finalMin)

  let hourIncrement = 0

  // hour increment should be 1 if at minute 59 and increment 5 minutes.
  if (nextMin >= 60) {
    if (nextMin === 60) {
      hourIncrement = 1
    } else {
      hourIncrement = Math.floor(nextMin / 60)
    }
  }

  let newHour = hourIncrement + curHour
  let finalHour = newHour.toString()

  // handle day change
  if (newHour >= 24) {
    newDay += 1
    // goes from Sunday 8 to Monday 1
    if (newDay > 7) {
      newDay = newDay % 7
    }

    if (newHour === 24) {
      finalHour = '00'
    }

    if (newHour > 24) {
      newHour = newHour % 24
    }

    if (newHour < 10) {
      finalHour = `0${newHour}`
    }
  } else if (newHour < 10) {
    finalHour = `0${newHour}`
  }

  return `${newDay}${finalHour}${finalMin}`
}

// console.log('getTimeIntervals start = "mon 11:50 pm", end = "tue 12:10 am"', getTimeIntervals("mon 11:50 pm", "tue 12:10 am"))
// console.log('getTimeIntervals', getTimeIntervals("mon 11:50 am", "mon 12:10 pm"))
// console.log('getTimeIntervals', getTimeIntervals("mon 11:50 am", "tue 12:10 pm"))
// console.log('getTimeIntervals', getTimeIntervals("mon 12:00 am", "tue 12:10 am"))
console.log('getTimeIntervals start = "sun 11:50 pm", end= "mon 01:10 am"', getTimeIntervals("sun 11:50 pm", "mon 01:10 am"))

