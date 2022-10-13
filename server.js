import createError from "http-errors";
import express from "express";
import expressHbs from "express-handlebars";
import session from "express-session";

const env = process.env.NODE_ENV || 'development';
const app = express();

import IndexRouter from "./routes/index-router.js";
import CategoryRouter from "./routes/category-router.js";
import ProductRouter from "./routes/product-router.js";
import CartRouter from "./routes/cart-router.js";
import { createDropdownMenu } from "./helpers/url.js";
import { CartController } from "./controllers/cart-controller.js";

app.engine('hbs', expressHbs.engine({
    layoutsDir: './views/layouts',
    partialsDir: './views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: { allowProtoPropertiesByDefault: true },
    helpers: {
        createDropdownMenu: createDropdownMenu,
    }
}));

app.set('view engine', 'hbs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    cookie: {httpOnly: true, maxAge: null},
    secret: 'S3cret',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    const Cart = new CartController(req.session.cart ? req.session.cart : {});
    req.session.cart = Cart.cart;
    res.locals.totalQuantity = Cart.cart.totalQuantity;
    next();
});

/**
 * Router
 */
 app.use('/', IndexRouter);
 app.use('/categories', CategoryRouter);
 app.use('/products', ProductRouter);
 app.use('/cart', CartRouter);


 // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next){
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;