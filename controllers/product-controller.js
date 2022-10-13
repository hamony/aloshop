import product from "../repositories/product-repository.js";

export const getAllCategories = () => {
    return product.categories();
};

export const getCategoryByName = (name) => {
    return product.category(name);
};

export const getProductByName = (name) => {
    return product.getProductByName(name);
};

export const getProductById = (id) => {
    return product.getProductById(id);
};

