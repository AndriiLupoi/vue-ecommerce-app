<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue';
import Footer from "./components/Footer.vue";
</script>

<template>
  <!-- Додаємо компонент навігації перед router-view -->
  <NavigationBar />
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped>
/* Ваші стилі для цього компонента */
</style>
