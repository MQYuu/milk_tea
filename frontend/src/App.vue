<template>
  <div>
    <h1>Welcome to the Milk Tea Shop</h1>
    <nav>
      <router-link to="/">Trang chủ</router-link>
      <router-link to="/products">Sản phẩm</router-link>
      <router-link to="/cart">Giỏ hàng</router-link>
      <router-link to="/login">Đăng nhập</router-link>
      <router-link to="/contact">Liên hệ</router-link>
    </nav>
    <router-view /> <!-- Hiển thị nội dung trang hiện tại -->
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Reset default browser styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Cài đặt font chữ cho toàn bộ trang */
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  color: #333;
  line-height: 1.6;
}

/* Đảm bảo phần tử root Vue chiếm toàn bộ chiều cao */
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Định dạng tiêu đề */
h1 {
  text-align: center;
  color: #e67e22;
  font-size: 2.5rem;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Style cho phần thanh điều hướng */
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

/* Style cho vùng hiển thị nội dung */
router-view {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 80%;
  border-radius: 10px;
  flex-grow: 1; /* Chiếm phần còn lại */
}

/* Thiết lập responsive cho trang */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }

  nav a {
    margin: 10px 0;
  }

  router-view {
    width: 100%;
  }
}

</style>
