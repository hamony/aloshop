$(document).ready(() => {
    $('.add-to-cart').on('click', addToCart);
});

function applyVoucher(voucher) {
    $.ajax({
        url: '/cart/apply-voucher',
        type: 'POST',
        data: {voucher},
        success: function(result) {
            $('.voucher-error').html("");
            if (result.error) {
                $('.voucher-error').html("Invalid voucher");
            }
            $('#totalDiscount').html('&#163;' + result.totalDiscount);
            $('#total').html('&#163;' + result.total);
        }
    });
}

function addToCart() {
    let id = $(this).data('id');
    let quantity = $('#product_quantity') ? $('#product_quantity').val() : 1;
    $.ajax({
        url: '/cart',
        type: 'POST',
        data: {id, quantity},
        success: function(result) {
            $('#cart-badge').html(result.totalQuantity);
        }
    });
}

function updateCart(id, quantity) {
    if (quantity == 0) {
        removeCartItem(id);
    } else {
        updateCartItem(id, quantity);
    }
}

function removeCartItem(id) {
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        data: {id},
        success: function(result) {
            $('#cart-badge').html(result.totalQuantity);
            $('#subTotal').html('&#163;' + result.subTotal);
            $('#total').html('&#163;' + result.total);
            if (result.totalQuantity > 0) {
                $(`#item${id}`).remove();
            } else {
                $('#cart-body').html('<div class="alert alert-info text-center">Your cart is empty.</div>');
            }
        }
    });
}

function updateCartItem(id, quantity) {
    $.ajax({
        url: '/cart',
        type: 'PUT',
        data: {id, quantity},
        success: function(result) {
            $('#cart-badge').html(result.totalQuantity);
            $('#subTotal').html('&#163;' + result.subTotal);
            $('#totalDiscount').html('&#163;' + result.totalDiscount);
            $('#total').html('&#163;' + result.total);
            $(`#itemTotal${id}`).html('&#163;' + result.item.total);
        }
    });
}

function clearCart() {
    if (confirm('Do you really want to remove all items?')) {
        $.ajax({
            url: '/cart/all',
            type: 'DELETE',
            success: function() {
                $('#cart-badge').html(0);
                $('#cart-body').html('<div class="alert alert-info text-center">Your cart is empty.</div>');
            }
        });   
    }
}