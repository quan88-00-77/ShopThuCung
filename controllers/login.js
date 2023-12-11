const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

const getLoginPage = (req, res) => {
  res.render("./page/login", { layout: "layout/layoutLoginAndRegister.ejs" });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      req.flash("error_msg", "Tài khoản không tồn tại");
      return res.redirect("/login");
    }

    const isCorrect = bcrypt.compareSync(password, user.password);
    if (!isCorrect) {
      req.flash("error_msg", "Mật khẩu không chính xác");
      return res.redirect("/login");
    }

    const token = jwt.sign({ id: user._id,username:username }, process.env.SECRET_JWT);

    req.flash("success_msg", "Đăng nhập thành công");
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7,
        sameSite: "none",
        secure: true,
      })
      .redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  req.flash("success_msg", "Đã đăng xuất");
  return res.clearCookie("access_token").redirect("/");
};

module.exports = {
  getLoginPage,
  login,
  logout,
};
