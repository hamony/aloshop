import express from "express";

import { getProductByName, getAllCategories } from "../controllers/product-controller.js";

const router = express.Router();
router.get('/:name', (req, res, next) => {
    try {
        res.locals.categories = getAllCategories();
        res.locals.product = getProductByName(req.params.name);
        res.render('product');
    } catch (error) {
        next(error);
    }
});

export default router;