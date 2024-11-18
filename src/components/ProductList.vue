<template>
  <div class="container py-4">
    <div class="row">
      <!-- Left Sidebar -->
      <div class="col-12 col-md-3">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h5 class="card-title">Фільтрація Товарів</h5>

            <!-- Search by title -->
            <div class="mb-3">
              <label for="searchInput" class="form-label">Пошук за Назвою</label>
              <input
                  type="text"
                  id="searchInput"
                  class="form-control"
                  v-model="searchQuery"
                  placeholder="Введіть назву товару"
              />
            </div>

            <!-- Price Range Filter -->
            <div class="mb-3">
              <label for="minPrice" class="form-label">Ціновий Діапазон</label>
              <div class="d-flex justify-content-between">
                <input
                    type="number"
                    id="minPrice"
                    class="form-control"
                    v-model="minPrice"
                    :min="0"
                    placeholder="Мін"
                />
                <input
                    type="number"
                    id="maxPrice"
                    class="form-control"
                    v-model="maxPrice"
                    :min="minPrice"
                    placeholder="Макс"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product List -->
      <div class="col-12 col-md-9">
        <div class="row g-4">
          <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <!-- Use ProductItem component -->
            <ProductItem
                :product="product"
                :toggleFavorite="toggleFavorite"
                :isFavorite="isFavorite"
                :addToCart="addToCart"
                :isInCart="isInCart"
            />
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="filteredProducts.length > 0" class="d-flex justify-content-center mt-4">
          <button
              class="btn btn-secondary"
              :disabled="currentPage === 1"
              @click="previousPage">
            Попередня
          </button>
          <span class="mx-3">Сторінка {{ currentPage }} з {{ totalPages }}</span>
          <button
              class="btn btn-secondary"
              :disabled="currentPage === totalPages"
              @click="nextPage">
            Наступна
          </button>
        </div>

        <p v-if="!filteredProducts.length" class="text-center mt-4">Немає доступних продуктів.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '../stores/productStore';
import { onMounted, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductItem from '../components/ProductItem.vue';

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

// Load products on component mount
onMounted(() => {
  productStore.fetchProducts();

  // Initialize filters from URL
  searchQuery.value = typeof route.query.search === 'string' ? route.query.search : '';
  minPrice.value = typeof route.query.minPrice === 'string' ? Number(route.query.minPrice) : 0;
  maxPrice.value = typeof route.query.maxPrice === 'string' ? Number(route.query.maxPrice) : 10000;
  currentPage.value = typeof route.query.page === 'string' ? Number(route.query.page) : 1;
});


// Search and filter logic
const searchQuery = ref('');
const minPrice = ref(0);
const maxPrice = ref(10000); // Default max price

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 8; // Number of products per page

// Filtered products based on search and price range
const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesPriceRange =
        product.price >= minPrice.value && product.price <= maxPrice.value;

    return matchesSearch && matchesPriceRange;
  });
});

// Paginated products based on filtered list and current page
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

// Total number of pages
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

// Page navigation functions
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Favorites logic
const toggleFavorite = (productId: number) => {
  productStore.toggleFavorite(productId);
};

const isFavorite = (productId: number) => {
  return productStore.favorites.includes(productId);
};

const addToCart = (productId: number) => {
  productStore.addToCart(productId);
};

const isInCart = (productId: number) => {
  return productStore.inCart.includes(productId);
};

// Sync filters with URL
watch(
    [searchQuery, minPrice, maxPrice, currentPage],
    () => {
      const query = {
        search: searchQuery.value || undefined,
        minPrice: minPrice.value || undefined,
        maxPrice: maxPrice.value || undefined,
        page: currentPage.value || undefined,
      };

      router.push({ query });
    },
    { immediate: true }
);
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.card-title {
  font-size: 1rem;
}

.container {
  min-height: 75vh;
}
</style>