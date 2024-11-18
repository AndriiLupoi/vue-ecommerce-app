<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Онлайн Магазин</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="bi bi-shop nav-icon"></i> Каталог
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/fav">
              <i class="bi bi-heart nav-icon"></i> Улюблені
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">
              <i class="bi bi-cart nav-icon"></i> Корзина
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Основні стилі навігації */
.navbar {
  background-color: #2d3e28; /* Soft Green */
}

.navbar-brand {
  color: #ffffff; /* Білий для бренду */
  font-weight: bold;
}

.navbar-nav .nav-item .nav-link {
  color: #ffffff; /* Білий текст для меню */
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  transition: all 0.3s ease-in-out;
}

.navbar-nav .nav-item .nav-link:hover {
  color: #a3c3a9; /* Soft Green для ховера */
}

.navbar-nav .nav-item .nav-link:focus {
  color: #a3c3a9; /* Soft Green для фокуса */
}

/* Іконки */
.nav-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

/* Відступи між пунктами меню */
.navbar-nav .nav-item {
  margin-left: 20px;
}

/* Стиль для активного елементу */
.navbar-nav .nav-item .router-link-active {
  color: #a3c3a9; /* Soft Green для активного пункту */
}
</style>