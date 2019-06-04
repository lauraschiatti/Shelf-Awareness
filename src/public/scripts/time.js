export function getDate(held_on) {
  var year = held_on.substring(0, 4);
  var month = held_on.substring(5, 7);
  var day = held_on.substring(8, 10);

  switch (month) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
  }

  var date = day + ". " + month + " " + year + ".";
  return date;
}

export function getTime(held_on) {
  return held_on.substring(11, 16);
}