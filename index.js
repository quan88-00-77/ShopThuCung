//import all the modules to be used
const createError = require('http-errors');
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const route  = require('./routes/index');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const path = require('path');
const DB = require('./config/connnectDb');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash')
const session = require('express-session')
//utils
const {formatDate} = require('./utils/ejs');
const { verifyTokenUser } = require('./utils/veriflyToken');
const server = require("http").createServer(app)
const io = require("socket.io")(server)


//connect to database
DB.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));


// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method 
      delete req.body._method
      return method
    }
  })
)


//public folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname,"node_modules")))


app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('layout','layout/defaultLayout.ejs')

//connect flash
app.use(flash(session))



io.on("connection", function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update", username + " joined the conversation")
    })
    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username + " left the conversation")
    })
    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message)
    })
})


//set global variable
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.formatDate = formatDate;
  verifyTokenUser(req,res);
  res.locals.user = req.user;
  next();
})

//import all the routes
route(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error',{layout:false});
  });
  
//run server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






