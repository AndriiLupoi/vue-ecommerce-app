import { defineStore } from 'pinia';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    countInCart?: number;
}

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [] as Product[],
        favorites: [] as number[], // Save favorite product IDs
        inCart: [] as number[], // Save product IDs in cart
    }),
    actions: {
        // Fetch products from API
        async fetchProducts() {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products');
                const data: Product[] = await response.json();
                this.products = data;

                // Load favorites and inCart from LocalStorage
                this.loadFavoritesFromLocalStorage();
                this.loadInCartFromLocalStorage();
            } catch (error) {
                alert('Помилка: ' + error);
            }
        },

        // Toggle product in favorites
        toggleFavorite(productId: number) {
            if (this.favorites.includes(productId)) {
                this.favorites = this.favorites.filter((id) => id !== productId);
            } else {
                this.favorites.push(productId);
            }
            this.saveFavoritesToLocalStorage(); // Save to LocalStorage after change
        },

        // Add/remove product from cart
        addToCart(productId: number) {
            if (this.inCart.includes(productId)) {
                this.inCart = this.inCart.filter((id) => id !== productId);
            } else {
                this.inCart.push(productId);
            }
            this.saveInCartToLocalStorage(); // Save to LocalStorage after change
        },

        // Increase product count in cart
        increaseCount(productId: number) {
            const product = this.products.find((p) => p.id === productId);
            if (product) {
                product.countInCart = (product.countInCart || 1) + 1;
            }
        },

        // Decrease product count in cart
        decreaseCount(productId: number) {
            const product = this.products.find((p) => p.id === productId);
            if (product && product.countInCart && product.countInCart > 0) {
                product.countInCart -= 1;
            }
        },

        // Save favorites to LocalStorage
        saveFavoritesToLocalStorage() {
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },

        // Save inCart to LocalStorage
        saveInCartToLocalStorage() {
            localStorage.setItem('inCart', JSON.stringify(this.inCart));
        },

        // Load favorites from LocalStorage
        loadFavoritesFromLocalStorage() {
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                this.favorites = JSON.parse(savedFavorites);
            }
        },

        // Load inCart from LocalStorage
        loadInCartFromLocalStorage() {
            const savedInCart = localStorage.getItem('inCart');
            if (savedInCart) {
                this.inCart = JSON.parse(savedInCart);
            }
        }
    }
});