const { handleErrorAsync, appError } = require("../service/handleError");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = handleErrorAsync(async (req, res, next) => {
  // 確認 token 是否存在
  const {
    headers: { authorization = "" },
  } = req;

  let token = "";
  if (authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return next(appError(401, "你尚未登入！"));
  }

  // 驗證 token 正確性
  const decoded = await new Promise((resolve, reject)=>{
    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
      if(err){
        reject(err);
      }else{
        resolve(payload);
      }
    });
  });
  const currentUser = await User.findById(decoded.id);

  req.user = currentUser;
  next();
});

module.exports = auth;