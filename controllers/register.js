const users = require("../models/users");
const bcrypt = require("bcryptjs");

const getRegisterPage = (req, res) => {
  res.render("./page/register", {
    layout: "layout/layoutLoginAndRegister.ejs",
  });
};

const register = async (req, res) => {
  const { username, password, comfirmPassword } = req.body;
  try {
    const user = await users.findOne({ username: username });
    if (user) {
      req.flash("error_msg", "Tài khoản đã tồn tại");
      return res.redirect("/register");
    }
    if (password !== comfirmPassword) {
      req.flash("error_msg", "Mật khẩu không khớp");
      return res.redirect("/register");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new users({
      username,
      password: hashPassword,
    });
    await newUser.save();
    req.flash("success_msg", "Đăng ký thành công");
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRegisterPage,
  register,
};
