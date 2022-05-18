const handleErrorAsync = function handleErrorAsync(func) {
  //func 先將 async func 帶入參數儲存
  //middleware 先接住 router 資料
  return function(res, req, next) {
    //再執行函式, async可以用 catch統一捕捉
    func(req, res, next).catch(
      function(error) {
        return next(error);
      }
    )
  }
}

module.exports = handleErrorAsync;