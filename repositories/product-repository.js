import { products } from "../models/products.js";

const product = {};
product.categories = () => {
    let cats = [];
    for (const product of products) {
        if (cats[product.category] == undefined) {
            cats[product.category] = [];
        }
        cats[product.category].push(product);
    }
    // Reformat 
    let categories = [];
    for (const key in cats) {
        categories.push({"name": key, "products": cats[key]});
    }
    
    return categories;
};

 product.category = (name) => {
    for (const category of product.categories()) {
        if (category.name == name) {
            return category;
        }
    }
    return null;
};
product.getProductByName = (name) => {
    for (const product of products) {
        if (product.name == name) {
            return product;
        }
    }
    return null;
};

product.getProductById = (id) => {
    for (const product of products) {
        if (product.id == id) {
            return product;
        }
    }
    return null;
};

export default product;