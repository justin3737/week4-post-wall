function qs(selector) {
  return document.querySelector(selector);
}

function qsAll(selector) {
  return document.querySelectorAll(selector);
}

function $on(target, type, callback) {
  target.addEventListener(type, callback);
}
function formatDate(date){
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  return `${year}-${month}-${day} ${hour}:${minute}`
}