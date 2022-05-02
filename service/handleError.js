function handleError(res, req) {
  //傳入型別來決定回傳格式
  //String ==> HTML <h1>hello</h1>
  //Array or Object ==> JSON
  res.send({
    status: false,
    data
  }).end();
}

module.exports = handleError;