const replaceZero = number => (number.toString().length < 2)? `0${number}`: number;

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
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hour = replaceZero(newDate.getHours());
  const minute = replaceZero(newDate.getMinutes());
  return `${year}-${month}-${day} ${hour}:${minute}`;
}



//非同步加入圖片，避免錯誤網址
async function appendImage(url, idx) {
  await imageLoaded(url, "post photo")
    .then(function(image) {
      qsAll("picture")[idx].appendChild(image);
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
}


//加載image
function imageLoaded(src, alt = "") {
  return new Promise(function(resolve) {
    const image = document.createElement("img");
    image.setAttribute("class", "mt-4");
    image.setAttribute("alt", alt);
    image.setAttribute("src", src);
    image.addEventListener("load", function() {
      resolve(image);
    });
  });
}