<template>
  <div class="container py-4">
    <div v-if="inCartProducts.length" class="card-box row flex-column g-3">
      <div
          v-for="product in inCartProducts"
          :key="product.id"
          class="col-12"
      >
        <div class="card shadow-sm d-flex flex-row p-3 align-items-center">
          <!-- Image section -->
          <img
              :src="Array.isArray(product.images) ? product.images[0] : product.images"
              class="rounded"
              alt="Product Image"
              style="width: 150px; height: 150px; object-fit: cover; margin-right: 1rem;"
          />

          <!-- Text section -->
          <div class="flex-grow-1">
            <h5 class="card-title mb-2 text-truncate">{{ product.title }}</h5>
            <p class="card-text text-muted mb-2 text-truncate">
              {{ product.description }}
            </p>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-bold text-primary">Price: ${{ product.price.toFixed(2) }}</span>
              <div class="d-flex align-items-center justify-content-between">
                <!-- Кнопки для зміни кількості -->
                <div class="quantityButtons d-flex align-items-center">
                  <button
                      class="btn btn-outline-secondary btn-sm"
                      @click="decreaseCount(product.id)"
                      :disabled="product.countInCart <= 1"
                  >
                    -
                  </button>
                  <span class="mx-2">{{ product.countInCart || 1 }}</span>
                  <button
                      class="btn btn-outline-secondary btn-sm"
                      @click="increaseCount(product.id)"
                  >
                    +
                  </button>
                </div>

                <!-- Кнопки для додавання до улюблених і видалення з кошика -->
                <div class="d-flex align-items-center">
                  <button
                      class="btn btn-outline-secondary btn-sm"
                      @click="toggleFavorite(product.id)"
                  >
                    <i :class="isFavorite(product.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
                  </button>
                  <button
                      class="btn btn-outline-danger btn-sm"
                      @click="addToCart(product.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div v-if="inCartProducts.length" class="price text-center mt-4">
        <h4>Загальна Сума: ${{ totalPrice.toFixed(2) }}</h4>
      </div>
    </div>

    <p v-else class="text-center mt-4 text-muted">
      Корзина Порожня
    </p>


  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '../stores/productStore';
import { onMounted, computed } from 'vue';

const productStore = useProductStore();

// Fetch products on component mount
onMounted(() => {
  productStore.fetchProducts();
});

// Get the products that are in the cart (filtered by inCart array)
const inCartProducts = computed(() => {
  return productStore.products.filter(product => productStore.inCart.includes(product.id));
});

// Calculate the total price of the products in the cart
const totalPrice = computed(() => {
  return inCartProducts.value.reduce((sum, product) => {
    return sum + (product.price * (product.countInCart || 1)); // Multiply by count if available
  }, 0);
});

// Logic for favorites
const toggleFavorite = (productId: number) => {
  productStore.toggleFavorite(productId);
};

const isFavorite = (productId: number) => {
  return productStore.favorites.includes(productId);
};

// Add product to the cart
const addToCart = (productId: number) => {
  productStore.addToCart(productId);
};

// Check if the product is in the cart
const isInCart = (productId: number) => {
  return productStore.inCart.includes(productId);
};
const increaseCount = (productId: number) => {
  const product = productStore.products.find((p) => p.id === productId);
  if (product) {
    product.countInCart = (product.countInCart || 1) + 1;
  }
};

const decreaseCount = (productId: number) => {
  const product = productStore.products.find((p) => p.id === productId);
  if (product && product.countInCart) {
    product.countInCart = Math.max(product.countInCart - 1, 1);
  }
};


</script>

<style scoped>
.card-box{
  width: 100%;
  border-radius: 10px;
  padding: 10px;
}
.card {
  border: none;
  border-radius: 12px;
  background: #efefef;
  width: 100%;
  margin-bottom: 10px;
}

.card-title {
  font-size: 1.25rem;
  color: #343a40;
}

.card-text {
  font-size: 0.875rem;
  color: #6c757d;
}

.text-truncate {
  max-width: 80%;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
}


.text-primary {
  color: #0d6efd !important;
}
.btn-outline-danger{
  margin-left: 6px;
}
.quantityButtons{
  margin-right: 15px;
}
.shadow-sm {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.container {
  min-height: 75vh;
}
</style>
