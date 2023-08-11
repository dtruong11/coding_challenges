/**
 * you are given 2 strings.  startTime : "mon 10:45 am" and  endTime: "mon 11:00 am". 
 * you need to output all the times between starttime and endtime in the interval of 5 minutes. 
 * output: ["11045", "11050","11055", "11100"]. 
 * in output each string represents the day+time+minute. eg: 11045: 1+10+45 => monday represents 1. tuesday 2 etc. 
 * Also, the output should be in 24hr format and input will be in 12hr format. you are required to do input validations as they can have invalid time formats.
 * 11:55 am
 */

function getIntervals(start, end) {
  const daysMap = { mon: 1, tue: 2, wed: 3, thur: 4, fri: 6 };

  if (!isValidTime(start, daysMap) || !isValidTime(end, daysMap)) {
    throw new Error("Invalid Timestamps");
  }

  const [startDay, startTime, startTimeOfDay] = start.split(" ");
  const [endDay, endTime, endTimeOfDay] = start.split(" ");

  let [startHour, startMinutes] = startTime.split(":");

  let startTimeNum = convertTimeToNum(startTime)
  let endTimeNum = convertTimeToNum(endTime)

  while (startTimeNum <= endTimeNum) {
    startTime;
  }

  // 10:45 am => 11:15 am => 11:45 am =>
}

function convertTimeToNum (time) {
  const [hour, mins] = time.split(':')
  return `${hour}${mins}`
  
}

function isValidTime(timeParts, daysMap) {
  const timeParts = time.split(" ");

  if (timeParts.length !== 3) {
    return false;
  }

  if (daysMap[timeParts[0]] === undefined) {
    return false;
  }

  if (timeParts[2] !== "am" || timeParts[2] !== "pm") {
    return false;
  }

  const time = timeParts[1];
  if (time.length !== 5 || !time.includes(":")) {
    return false;
  }

  const timeHoursSplit = time.split(":");

  if (
    timeHoursSplit.length !== 2 ||
    isNaN(timeHoursSplit[0]) ||
    isNaN(timeHoursSplit[1]) ||
    parseInt(timeHoursSplit[0]) > 12 ||
    parseInt(timeHoursSplit[1]) > 59
  ) {
    return false;
  }
  return true;
}
