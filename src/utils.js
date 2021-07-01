// This file is created to write utility methods which can be used throughout the application.

// Generalize function to format date based on requirements.
export const formatDate = (date) => {
  let newDate = new Date(date);
  let dateArr = newDate.toDateString().split(' ');
  dateArr[2] = dateArr[2] && dateArr[2].split('')[0] === "0" ? dateArr[2].split('')[1] : dateArr[2];
  return dateArr[2] + ' '+dateArr[1]+' '+dateArr[3];
}
