<template>
  <div class="container py-4">
    <div class="row g-4">
      <!-- Фільтруємо продукти, які є в улюблених -->
      <div
          v-for="product in favoriteProducts"
          :key="product.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <div class="card shadow-sm p-3">
          <img
              :src="Array.isArray(product.images) ? product.images[0] : product.images"
              class="card-img-top"
              alt="Product Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <!-- Обрізаємо опис до 100 символів і додаємо кнопку для розкриття -->
            <p class="card-text text-muted">
              {{ product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description }}
            </p>
            <button
                v-if="product.description.length > 100"
                @click="showFullDescription(product.id)"
                class="btn btn-link p-0"
            >
              Read more
            </button>
            <div v-if="product.showFullDescription" class="mt-2">
              <p class="card-text text-muted">{{ product.description }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <span class="fw-bold text-primary">Price: ${{ product.price.toFixed(2) }}</span>
            </div>
            <!-- Кнопки для управління улюбленими і кошиком -->
            <div class="buttons d-flex">
              <button
                  class="btn btn-outline-secondary btn-sm"
                  @click="toggleFavorite(product.id)"
              >
                <i :class="isFavorite(product.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
              </button>
              <button
                  class="btn btn-outline-danger btn-sm ms-2"
                  @click="addToCart(product.id)"
              >
                <i :class="isInCart(product.id) ? 'bi bi-cart-fill' : 'bi bi-cart'"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="!favoriteProducts.length" class="text-center mt-4">Немає Улюблених Товарів.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '../stores/productStore';
import { onMounted } from 'vue';

const productStore = useProductStore();

// Завантажуємо продукти при завантаженні компонента
onMounted(() => {
  productStore.fetchProducts();
});

// Фільтруємо продукти, які є в улюблених
const favoriteProducts = computed(() => {
  return productStore.products.filter(product =>
      productStore.favorites.includes(product.id)
  );
});

const showFullDescription = (productId: number) => {
  const product = productStore.products.find(p => p.id === productId);
  if (product) {
    product.showFullDescription = !product.showFullDescription;
  }
};

const toggleFavorite = (productId: number) => {
  productStore.toggleFavorite(productId);
};

const isFavorite = (productId: number) => {
  return productStore.favorites.includes(productId);
};

const isInCart = (productId: number) => {
  return productStore.inCart.includes(productId);
};

const addToCart = (productId: number) => {
  productStore.addToCart(productId);
};
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.card-title {
  font-size: 1rem;
}
.buttons{
  margin-left: 76%;
}
.container {
  min-height: 75vh;
}
</style>
