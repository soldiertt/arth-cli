"use strict";
var Order = (function () {
    function Order(article) {
        this.article = article;
        this.count = 1;
    }
    return Order;
}());
exports.Order = Order;
var Cart = (function () {
    function Cart() {
        this.totalAmount = 0;
        this.totalCount = 0;
        this.orders = [];
    }
    return Cart;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cart;
//# sourceMappingURL=cart.class.js.map