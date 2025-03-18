<template>
  <div class="app-container">
    <!-- Header -->
    <header>
      <h1>Welcome to the Milk Tea Shop</h1>
      <nav>
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/products">Sản phẩm</router-link>
        <router-link to="/cart">Giỏ hàng</router-link>
        <router-link to="/login">Đăng nhập</router-link>
        <router-link to="/contact">Liên hệ</router-link>
      </nav>
    </header>

    <!-- Nội dung trang chính (các trang con sẽ được hiển thị ở đây) -->
    <router-view />

    <!-- Footer -->
    <footer>
      <p>&copy; 2025 Milk Tea Shop. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped src="./assets/css/app.css"></style>
