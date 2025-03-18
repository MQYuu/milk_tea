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

<style scoped>
/* Cấu trúc chung */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  text-align: center;
  background-color: #34495e;
  color: white;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: center;
  background-color: #34495e;
  padding: 1rem 0;
}

nav a {
  color: #ecf0f1;
  text-decoration: none;
  margin: 0 20px;
  font-size: 1.1rem;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #e67e22;
  color: #fff;
}

footer {
  text-align: center;
  background-color: #34495e;
  color: white;
  padding: 1rem;
  position: relative;
  bottom: 0;
  width: 100%;
  font-size: 1rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Đảm bảo rằng nội dung trang chính chiếm không gian còn lại */
router-view {
  flex: 1;
}
</style>
