const Jwt = require("jsonwebtoken");

 const verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
    if (!token) return res.redirect("/login");

    Jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
        if (err) return res.redirect("/login");
        req.user = user;
        next();
    });
}

const verifyTokenUser = (req, res) => {
    const token = req.cookies.access_token;
     if (!token) return req.user = null;
 
     Jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
         if (err) return req.user = null;
         req.user = user;
     });
 }
 

 

module.exports = {
    verifyToken,
    verifyTokenUser
}
