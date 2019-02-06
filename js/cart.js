$(document).ready(function () {
    loadCart();
});

var cart={};

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расшифрую и записиваю в переменную cart
        cart=JSON.parse(localStorage.getItem('cart'));
        showCart();
    }
    else {
        $('.main-cart').html('سلة الشراء فارغة');
    }
}
function showCart() {
    if (isEmpty(cart)){
        $.getJSON('goods.json',function (data) {
            var goods =data;
            var out='';
            for (var id in cart){
                out+=`<button data-id="${id}" class="del-goods">x</button>`;
                out+=`<img src="images/${goods[id].img}" alt="">`;
                out+=`${goods[id].name}`;
                out+=`<span>${cart[id]}</span>`;
                out+=`<br>`;
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click',delGoods);
        });
    }else {
        $('.main-cart').html('سلة الشراء فارغة');
    }

}
function delGoods(){
    // remove goods from cart
    var id= $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function saveCart() {
    // save cart in localStorage
    localStorage.setItem('cart',JSON.stringify(cart)); //Json.stringify cart to string
}

function isEmpty(object) {
    //проверка массив на пустоту 
    for (var key in object){
        if (object.hasOwnProperty(key)){
            return true;
        } else {
            return false;
        }
    }

}



