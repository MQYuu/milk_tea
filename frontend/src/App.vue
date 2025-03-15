<template>
  <div>
    <Header />
    <router-view /> <!-- Hiển thị nội dung trang hiện tại -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
/* Các style toàn cục nếu cần */
</style>
