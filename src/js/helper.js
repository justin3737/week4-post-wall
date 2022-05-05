function qs(selector) {
  return document.querySelector(selector);
}

function qsAll(selector) {
  return document.querySelectorAll(selector);
}

function $on(target, type, callback) {
  target.addEventListener(type, callback);
}
