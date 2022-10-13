'use strict';

import { Discount } from "./discount-repository.js";

export class Cart {
    constructor(oldCart){
        this.items = oldCart.items || {};
        this.discount = oldCart.discount || 0.00;
        this.totalDiscount = oldCart.totalDiscount || 0.00;
        this.totalQuantity = oldCart.totalQuantity || 0;
        this.subTotal = oldCart.subTotal || 0.00;
        this.total = oldCart.total || 0.00;
        this.paymentMethod = oldCart.paymentMethod || "COD";
    }

    getTotalQuantity() {
        let quantity = 0;
        for (let id in this.items) {
            quantity += parseInt(this.items[id].quantity);
        }
        this.totalQuantity = quantity;

        return this.totalQuantity;
    }

    getSubTotal(){
        let subTotal = 0.00;
        for (let id in this.items) {
            subTotal += parseFloat(this.items[id].total);
        }
        this.subTotal = subTotal;
        return this.subTotal.toFixed(2);
    }

    getTotal(){
        this.total = this.subTotal - this.totalDiscount;
        return this.total.toFixed(2) ;
    }

    getTotalDiscount(){
        let discount = 0;
        for (let id in this.items) {
            discount += parseFloat(this.items[id].discount);
        }
        this.totalDiscount = discount + this.discount;
        return this.totalDiscount.toFixed(2) ;
    }

    add(item, id, quantity){
        let storedItem = this.items[id];
        if (!storedItem) {
            this.items[id] = {
                id: item.id,
                name: item.name,
                image_path: item.image_path,
                category: item.category,
                price: item.price,
                available:item.available,
                quantity: 0, 
                discount: 0.00,
                total: 0.00
            };
            storedItem = this.items[id];
        }
        storedItem.quantity += parseInt(quantity);
        storedItem.total = parseFloat(storedItem.price * storedItem.quantity).toFixed(2);

        // Telling discount object whether the product has discount for any thing.
        const discount = new Discount();
        const discounts = discount.getDiscount(this.items);
        this.setDiscount(this.items, discounts);

        this.totalQuantity = this.getTotalQuantity();
        this.totalDiscount = this.getTotalDiscount();
        this.subTotal = this.getSubTotal();
        this.total = this.getTotal();
        return this.getCartItem(id);
    }

    update(id, quantity){
        let storedItem = this.items[id];
        if (storedItem && quantity >= 1) {
            storedItem.quantity = quantity;
            storedItem.total = (storedItem.price * storedItem.quantity).toFixed(2);

            // Telling discount object whether the product has discount for any thing.
            const discount = new Discount();
            const discounts = discount.getDiscount(this.items);
            this.setDiscount(this.items, discounts);

            this.totalQuantity = this.getTotalQuantity();
            this.totalDiscount = this.getTotalDiscount();
            this.subTotal = this.getSubTotal();
            this.total = this.getTotal();
        }
        return this.getCartItem(id);
    }

    remove(id){
        let storedItem = this.items[id];
        if (storedItem) {
            delete this.items[id];
            this.totalQuantity = this.getTotalQuantity();
            this.totalDiscount = this.getTotalDiscount();
            this.subTotal = this.getSubTotal();
            this.total = this.getTotal();
        }
    }

    empty(){
        this.items = {};
        this.totalQuantity = 0;
        this.totalPrice = 0.00;
        this.totalDiscount = 0.00;
        this.total = 0.00;
        this.discount = 0.00;
    }

    generateArray(){
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }

    getCart() {
        let cart = {
            items: this.generateArray(),
            totalQuantity: this.getTotalQuantity(),
            subTotal: this.getSubTotal(),
            paymentMethod: this.paymentMethod,
            totalDiscount: this.getTotalDiscount(),
            discount: this.discount,
            total: this.getTotal()
        };
        return cart;
    }

    getCartItem(id) {
        let cartItem = {
            item: this.items[id],
            totalQuantity: this.totalQuantity,
            subTotal: this.subTotal,
            totalDiscount: this.totalDiscount,
            total: this.total,
        };
        return cartItem;
    }

    setDiscount(items, discounts){
        this.resetDiscountValue();
        for (const discount of discounts) {
            const lastDiscountItem = discount.items[discount.items.length -1];
            for (const key in items) {
                if (items[key].id == lastDiscountItem.id) {
                    items[key].discount = discount.amount;
                }
            }
        }
    }

    resetDiscountValue(){
        for (const key in this.items) {
            this.items[key].discount = 0; // reset discount value
        }
    }

    applyVoucher(voucher){
        const cart = this.getCart();
        // Telling discount object whether the product has discount for any thing.
        const discount = new Discount();
        if (!discount.isValidVoucher(voucher)) {
            cart.error = true;

            return cart;
        }
        this.discount = discount.deduceVoucher(voucher, cart);

        return this.getCart();
    }
}