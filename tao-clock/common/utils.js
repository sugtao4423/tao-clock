// Add zero in front of numbers < 10
export function zeroPad(i) {
  if(i < 10){
    i = '0' + i;
  }
  return i;
}

export function getTime(preferences){
  const today = new Date();
  let hours = today.getHours();
  if(preferences.clockDisplay === '12h'){
    hours = hours % 12 || 12;
  }
  hours = zeroPad(hours);
  const mins = zeroPad(today.getMinutes());
  return `${hours}:${mins}`;
}

export function getDate(dateFormat = 'yyyy/MM/dd E'){
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = zeroPad(today.getDate());
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];

  return dateFormat
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', date)
    .replace('E', day);
}
