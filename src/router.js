"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
// Імпортуємо компоненти
var Cart_vue_1 = require("./components/Cart.vue");
var Error404_vue_1 = require("./components/Error404.vue"); // виправлено
var Favorites_vue_1 = require("./components/Favorites.vue"); // виправлено
var ProductList_vue_1 = require("./components/ProductList.vue"); // виправлено
exports.default = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHashHistory)(),
    routes: [
        { path: "/", component: ProductList_vue_1.default },
        { path: "/fav", component: Favorites_vue_1.default },
        { path: "/cart", component: Cart_vue_1.default },
        { path: "/:pathMatch(.*)*", component: Error404_vue_1.default }, // обробка 404 сторінки
    ]
});
