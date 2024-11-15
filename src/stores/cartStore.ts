import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export const useCartStore = defineStore('cart', () => {
    const cart = ref<CartItem[]>([]);

    const addToCart = (product: CartItem) => {
        const existingProduct = cart.value.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.value.push(product);
        }
        saveToLocalStorage();
    };

    const removeFromCart = (productId: number) => {
        cart.value = cart.value.filter(item => item.id !== productId);
        saveToLocalStorage();
    };

    const clearCart = () => {
        cart.value = [];
        saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    };

    const loadFromLocalStorage = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart.value = JSON.parse(storedCart);
        }
    };

    loadFromLocalStorage();

    const cartTotal = computed(() => {
        return cart.value.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    const cartItemCount = computed(() => {
        return cart.value.reduce((count, item) => count + item.quantity, 0);
    });

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
    };
});