/**
  Given a sequence of timestamps & actions of a dasher's activity within a day, we would like to know the active time of the dasher. Idle time is defined as the dasher has NO delivery at hand. (That means all items have been dropped off at this moment and the dasher is just waiting for another pickup) Active time equals total time minus idle time. Below is an example. Dropoff can only happen after pickup. 12:00am means midnight and 12:00pm means noon. All the time is within a day.

  Timestamp(12h), Action
  8:30am, pickup
  9:10am, dropoff
  10:20am, pickup
  12:15pm, pickup
  12:45pm, dropoff
  2:25pm, dropoff

  total time = 2:25pm-8:30am = 355 mins;
  idle time = 10:20am-9:10am = 70 mins;
  active time = total time-idle time = 355-70 = 285 mins;
*/

function getActiveTime (timeStampActions) {
  let pickupArr = []
  let dropoffArr = []
  const PICK_UP = 'pickup'

  let totalActiveTime = 0
  for (let [timestamp, action] of timeStampActions) {
    if (action === PICK_UP) {
      pickupArr.push(timestamp)
    } else {
      if (pickupArr.length - (dropoffArr.length + 1) > 0) {
        dropoffArr.push(timestamp)
      } else if (pickupArr.length - (dropoffArr.length + 1) === 0) {
        totalActiveTime += calculateTimeDiffInMinutes(pickupArr[0], timestamp)
        pickupArr = []
        dropoffArr = []
      }
    }
  }
  return totalActiveTime
}

function getDateFormat () {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  let dayString = `${dd}`
  let monthString = `${mm}`

  if (dd < 10) {
    dayString = '0' + dd;
  }
  if (mm < 10) { monthString = '0' + mm; }

  const formattedToday = monthString + '/' + dayString + '/' + yyyy;
  return formattedToday;
}

function calculateTimeDiffInMinutes (start, end) {
  const startTimeAmPM = start.slice(-2)
  const endTimeAmPM = end.slice(-2)

  const startTime = start.slice(0, -2)
  const endTime = end.slice(0, -2)
  const todayDateFormatted = getDateFormat()

  const startDateTime = new Date(`${todayDateFormatted} ${startTime} ${startTimeAmPM.toUpperCase()}`)
  const endDateTime = new Date(`${todayDateFormatted} ${endTime} ${endTimeAmPM.toUpperCase()}`)
  const diff = (endDateTime - startDateTime) / 60000; // dividing by seconds and milliseconds
  return diff
}

// console.log(calculateTimeDiffInMinutes('8:30am', '2:25pm'))

const timestampActions = [
  ["8:30am", "pickup"],
  ["9:10am", "dropoff"],
  ["10:20am", "pickup"],
  ["12:15pm", "pickup"],
  ["12:45pm", "dropoff"],
  ["2:25pm", "dropoff"]
]
console.log(getActiveTime(timestampActions))