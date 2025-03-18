<template>
  <header>
    <div class="header-content">
      <h1>Welcome to the Milk Tea Shop</h1>
      <nav>
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/products">Sản phẩm</router-link>
        <router-link to="/cart">Giỏ hàng</router-link>
        <router-link to="/login">Đăng nhập</router-link>
        <router-link to="/contact">Liên hệ</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
header {
  width: 100vw; /* Chiều rộng full màn hình */
  position: fixed; /* Cố định header */
  top: 0;
  left: 0;
  background-color: #e67e22;
  color: white;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Giữ header luôn ở trên */
}

.header-content {
  width: 90%; /* Định dạng nội dung bên trong */
  max-width: 1200px; /* Giữ nội dung không quá rộng */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

nav {
  margin-top: 10px;
}

nav a {
  color: white;
  margin: 0 15px;
  text-decoration: none;
  font-size: 1rem;
}

nav a:hover {
  background-color: #34495e;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
