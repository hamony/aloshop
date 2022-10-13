import express from "express";
import { getProductById, getAllCategories } from "../controllers/product-controller.js";

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        const cart = req.session.cart;
        res.locals.cart = cart.getCart();
        res.locals.categories = getAllCategories();
        res.render('cart');
    } catch (error) {
        next(error);
    }
});

router.post('/', (req, res, next) => {
    try {
        let productId = req.body.id;
        let quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
        const product = getProductById(productId);
        const cartItem = req.session.cart.add(product, productId, quantity);
        res.json(cartItem);
    } catch (error) {
        next(error);
    }
});

router.put('/', (req, res) => {
    let productId = req.body.id;
    let quantity = parseInt(req.body.quantity);
    let cartItem = req.session.cart.update(productId, quantity);
    res.json(cartItem);
});

router.delete('/', (req, res) => {
    let productId = req.body.id;
    req.session.cart.remove(productId);
    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice,
        total: req.session.cart.total,
    });
});

router.delete('/all', (req, res) => {
    req.session.cart.empty();
    res.sendStatus(204);
    res.end();
});

router.post('/apply-voucher', (req, res, next) => {
    try {
        let voucher = req.body.voucher;
        const cart = req.session.cart.applyVoucher(voucher);
        res.json(cart);
    } catch (error) {
        next(error);
    }
});

export default router;