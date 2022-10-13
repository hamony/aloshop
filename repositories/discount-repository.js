import { discounts, vouchers } from "../models/discount.js";

export class Discount {
    getDiscount(items){
        let itemsDiscounted = [];
        for (const discount of discounts) {
            let validItems = [];
            let quantity = 0;
            let total = 0.00;
            let validDiscount = {"discount": discount, "amount": 0.00};
            for (const condition of discount.conditions) {
                for (const keyItem in items) {
                    // If the same category then put to array
                    if (condition.condition_type == "category" && items[keyItem].category == condition.condition_value) {
                        validItems.push(items[keyItem]);
                    }
                }

                // Discount 1, Count quantity of product
                if (condition.condition_type == "quantity") {
                    for (const validItem of validItems) {
                        quantity += validItem.quantity;  
                        total += parseFloat(validItem.total); 
                    }
                    if (quantity >= condition.condition_value) {
                        if (discount.discount_unit == "percentage") {
                            validDiscount.amount += discount.discount_amount * total;   
                        }
                        validDiscount.items = validItems; // Saving items were discounted.
                        itemsDiscounted.push(validDiscount);
                    }
                }

                // Discount 2
                if (condition.condition_type == "total") {
                    for (const validItem of validItems) {
                        total += parseFloat(validItem.total); 
                    }

                    if (total >= condition.condition_value) {
                        if (discount.discount_unit == "amount") {
                            validDiscount.amount += discount.discount_amount;
                        }
                        validDiscount.items = validItems; // Saving items were discounted.
                        itemsDiscounted.push(validDiscount);
                    }
                }
            }
        }

        return itemsDiscounted;
    }

    isValidVoucher(code){
        for (const voucher of vouchers) {
            if (voucher.voucher_code == code) {
                return voucher;
            }
        }
        return null ;
    }

    deduceVoucher(code, cart){
        const voucher = this.isValidVoucher(code);
        let amountDiscount = 0;
        let numConditions = voucher.conditions.length;
        for (const condition of voucher.conditions) {
            switch (condition.comparison) {
                case "gte":
                    if (cart[condition.condition_type] >= condition.condition_value){
                        numConditions--;
                    }
                    break;                
            }
        }
        if (numConditions == 0) {
            switch (voucher.discount_unit) {
                case "amount":
                    amountDiscount += voucher.discount_amount;
                    break;
            }
        }

        return amountDiscount;
    }
}