<script setup lang="ts">
// Визначаємо лише типи для пропсів, щоб Vue автоматично їх обробляв
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  countInCart?: number;
}

const props = defineProps<{
  product: Product;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  addToCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
}>();
</script>

<template>
  <div class="card h-100 shadow-sm position-relative">
    <!-- Зображення продукту -->
    <img :src="product.images[0]" :alt="product.title" class="card-img-top" />

    <div class="card-body d-flex flex-column">
      <!-- Назва продукту -->
      <h5 class="card-title">{{ product.title }}</h5>
      <!-- Ціна продукту -->
      <p class="card-text text-primary fw-bold mb-3">
        ${{ product.price.toFixed(2) }}
      </p>
      <!-- Короткий опис -->
      <p class="card-text text-muted" style="font-size: 0.9rem;">
        {{ product.description.substring(0, 80) }}...
      </p>
    </div>

    <!-- Кнопки для додавання до улюбленого та в кошик -->
    <div class="btn-group bottom-0 end-0">
      <button
          class="btn btn-outline-danger favorite-btn"
          @click="toggleFavorite(product.id)"
      >
        <i :class="isFavorite(product.id) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
      </button>
      <button
          class="btn btn-outline-primary cart-btn"
          @click="addToCart(product.id)"
      >
        <i :class="isInCart(product.id) ? 'bi bi-cart-fill' : 'bi bi-cart'"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 1rem;
}

/* Контейнер для кнопок */
.btn-group {
  display: flex;
  gap: 10px;
  width: 70px;
  align-self: end;
  margin-right: 20px;
  margin-bottom: 10px;
}

/* Кнопка для улюбленого */
.favorite-btn {
  border-radius: 50%;
  padding: 8px;
  background-color: transparent;
  border: 2px solid #dc3545; /* Червоний для улюбленого */
}

.favorite-btn:hover {
  background-color: #f8d7da;
}

/* Кнопка для кошика */
.cart-btn {
  border-radius: 50%;
  padding: 8px;
  background-color: transparent;
  border: 2px solid #007bff; /* Синій для кошика */
}

.cart-btn:hover {
  background-color: #cce5ff;
}

/* Відступи для кнопок */
.btn-group .btn {
  width: 40px;
  height: 40px;
}

/* Відступи для кнопок, якщо треба */
.card-body {
  padding-bottom: 20px;
}
</style>
