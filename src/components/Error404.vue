<script setup lang="ts">
</script>

<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-title">404</h1>
      <p class="error-message">Сторінку не знайдено</p>
      <router-link to="/" class="back-home-link">Повернутись на головну</router-link>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7f6; /* Світлий фон для контрасту */
  padding: 20px;
}

.error-content {
  text-align: center;
  background-color: #fff; /* Білий фон для контенту */
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 400px;
  width: 100%;
}

.error-title {
  font-size: 6rem;
  font-weight: bold;
  color: #ff6f61; /* Кольори, що підходять до попереднього дизайну */
  margin-bottom: 20px;
}

.error-message {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 20px;
}

.back-home-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.back-home-link:hover {
  background-color: #e85c4f; /* Темніший відтінок при наведенні */
}
</style>