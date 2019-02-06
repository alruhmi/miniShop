var cart = {};

function init() {
    //read file goods.json and send it to function goodsOut
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
    // show product to page
    console.log(data);
    var out = "";
    for (var key in data) {
        out += '<div class="cart">';
        out += `<p class="name">${data[key].name}</p>`;
        out += `<img src="images/${data[key].img}" alt="">`;
        out += `<div class="cost">${data[key].cost}</div>`;
        out += `<button class="add-to-cart" data-id="${key}" >شراء</button>`;
        out += `</div>`;
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart() {
    //add id-product to mini cart
    var id = $(this).attr('data-id');
    if (cart[id] == undefined) {
        cart[id] = 1;// if this product not in cart doing it =1
    } else {
        cart[id]++;//if this product in cart so increment product
    }
    showMiniCart();
    saveCart();
console.log(cart);
}
function saveCart() {
    // save cart in localStorage
    localStorage.setItem('cart',JSON.stringify(cart)); //Json.stringify cart to string
}
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расшифрую и записиваю в переменную cart
        cart=JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }

}
function showMiniCart() {
    // show mini cart
    var out = "";
    for (var key in cart) {
        out += key + "=" + cart[key] + "<br>";
        $('.mini-cart').html(out);
    }
}

$(document).ready(function () {
    init();
    loadCart()
});


