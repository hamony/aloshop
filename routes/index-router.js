import express from "express";

import { getAllCategories } from "../controllers/product-controller.js";

const router = express.Router();
router.get('/', (req, res, next) => {
    try {
        res.locals.categories = getAllCategories();
        res.render('index');
    } catch (error) {
        next(error);
    }
});

export default router;