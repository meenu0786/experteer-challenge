export const formatDate = (date) => {
  let newDate = new Date(date);
  let dateArr = newDate.toDateString().split(' ');
  dateArr[2] = dateArr[2].split('')[0] === "0" ? dateArr[2].split('')[1] : dateArr[2];
  return dateArr[2] + ' '+dateArr[1]+' '+dateArr[3];
}
