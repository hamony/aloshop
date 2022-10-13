export const discounts = [
    {
        id: 1,
        discount_name: "Get 10% off bulk drinks – any drinks are 10% off the listed price (including already reduced items) when buying 10 or more",
        discount_amount: 0.1,
        discount_unit: "percentage",
        conditions: [
            {condition_type: "category", condition_value: "Drinks"},
            {condition_type: "quantity", condition_value: 10},
        ]
    },
    {
        id: 2,
        discount_name: "£5.00 off your order when spending £50.00 or more on Baking/Cooking Ingredients",
        discount_amount: 5,
        discount_unit: "amount",
        conditions: [
            {condition_type: "category", condition_value: "Baking/Cooking Ingredients"},
            {condition_type: "total", condition_value: 50},
        ]
    },
];

export const vouchers = [
    {
        discount_name: "£20.00 off your total order value when spending £100.00 or more and using the code 20OFFPROMO",
        discount_amount: 20,
        discount_unit: "amount",
        voucher_code: "20OFFPROMO",
        conditions: [
            {condition_type: "subTotal", condition_value: 100, comparison: "gte"},
        ]
    },
];