import express from "express";

import { getCategoryByName, getAllCategories } from "../controllers/product-controller.js";

const router = express.Router();
router.get('/:name', (req, res, next) => {
    try {
        res.locals.categories = getAllCategories();
        res.locals.category = getCategoryByName(req.params.name);
        res.render('category');
    } catch (error) {
        next(error);
    }
});

export default router;