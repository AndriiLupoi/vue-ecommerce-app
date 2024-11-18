<template>
  <footer class="footer bg-dark text-white py-4">
    <div class="container text-center">
      <p class="footer-item">Ільків Богдан Миколайович (343А-1)</p>
      <p class="footer-item">Лупой Андрій Русланович (343А-1)</p>
      <p class="footer-item">Чорноокий Андрій Васильович (343А-1)</p>
      <p class="footer-item">
        <a href="https://github.com" class="text-white" target="_blank">GitHub</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Стиль футера */
.footer {
  background-color: #2d3e28; /* Soft Green */
}

/* Відцентровування тексту */
.footer-item {
  margin: 5px 0;
  font-size: 1.1rem;
}

/* Стиль для посилання */
.footer-item a {
  text-decoration: none;
  color: #ffffff;
  transition: color 0.3s ease;
}

.footer-item a:hover {
  color: #a3c3a9; /* Soft Green для ховера */
}
</style>