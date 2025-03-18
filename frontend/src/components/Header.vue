<template>
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
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  header {
    text-align: center;
    background-color: #e67e22;
    color: white;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px; /* Đảm bảo header có chiều cao giống footer */
  }
  
  header h1 {
    font-size: 1.5rem; /* Giảm kích thước để phù hợp với footer */
    margin: 0; /* Đảm bảo không có khoảng cách trên và dưới */
  }
  
  nav {
    margin-top: 5px; /* Tạo khoảng cách nhỏ giữa tiêu đề và menu */
  }
  
  nav a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 1rem; /* Đảm bảo kích thước font tương tự footer */
  }
  
  nav a:hover {
    background-color: #34495e;
    padding: 5px 10px;
    border-radius: 5px;
  }
  </style>
  