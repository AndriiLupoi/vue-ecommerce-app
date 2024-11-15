import { createRouter, createWebHashHistory } from "vue-router";

// Імпортуємо компоненти
import Cart from "./components/Cart.vue";
import Error404 from "./components/Error404.vue"; // виправлено
import Favorites from "./components/Favorites.vue"; // виправлено
import ProductList from "./components/ProductList.vue"; // виправлено

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: ProductList },
        { path: "/fav", component: Favorites },
        { path: "/cart", component: Cart },
        { path: "/:pathMatch(.*)*", component: Error404 }, // обробка 404 сторінки
    ]
});
