import { Cart } from "../repositories/cart-repository.js";

export class CartController {
    constructor(oldCart){
        this.cart = new Cart(oldCart);
    }
}