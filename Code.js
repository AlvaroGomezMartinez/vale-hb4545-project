/**
 * This is a custom function that was created for the purpose of calculating the duration of time in minutes.
 * 
 * This custom function uses the values from the timestamp in column A and depending on whether the student
 * signs in during the morning or after school, the formula will use the AM end time of 8:33 or the PM end time of 4:30.
 * If you want to tweak the end times, you will need to go into the project file in Google Apps Script and adjust the times there.
 * 
 * To have the formula automatically fill down the column add 'iferror' and 'arrayformula' to it, for example, =iferror(arrayformula(calculateEndTime(A2:A)))
 * The formula will re-calculate everytime a student fills out the Google Form to log in and the data is sent to this sheet.
 * You can find the custom function in the Apps Script project by going to the toolbar above and clicking on 'Exenstions' then 'Apps Script'. The file containing the custom function is called 'Vale HB4545 Report'.
 * 
 * @param {Date} timestamp - The timestamp to convert.
 * @return The rounded duration of time in minutes.
 * @customfunction
 */
function calculateEndTime(timeStamp) {
  if (!Array.isArray(timeStamp)) {
    timeStamp = [[timeStamp]];
  }

  return timeStamp.map(function(row) {
    return row.map(function(start) {
      var startTime = new Date(start);

      var endTimeMorning = new Date(startTime);
      endTimeMorning.setHours(8, 33, 0); // 8:33 AM

      var endTimeAfternoon = new Date(startTime);
      endTimeAfternoon.setHours(16, 30, 0); // 4:30 PM

      var timeDiff;
      if (startTime <= endTimeMorning) {
        timeDiff = (endTimeMorning - startTime) / (1000 * 60); // Difference in minutes
      } else if (startTime >= new Date(startTime.setHours(15, 55, 0))) { // 3:55 PM
        timeDiff = (endTimeAfternoon - startTime) / (1000 * 60); // Difference in minutes
      } else {
        return "";
      }

      var hours = Math.floor(timeDiff / 60);
      var minutes = Math.round(timeDiff % 60);

      return hours + minutes;
    });
  });
}

