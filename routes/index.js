const productRouter = require('./product');
const cartRouter = require('./cart');
const loginRouter = require('./login');
const registerRouter = require('./register');

function route(app) {
    app.use('/',productRouter)
    app.use('/cart',cartRouter)
    app.use('/login',loginRouter)
    app.use('/register',registerRouter)
}

module.exports = route;