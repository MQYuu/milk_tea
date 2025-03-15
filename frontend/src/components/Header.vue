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
    padding: 1rem;
  }
  
  header h1 {
    color: white;
    font-size: 2rem;
  }
  
  nav {
    margin-top: 1rem;
  }
  
  nav a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 1.1rem;
  }
  
  nav a:hover {
    background-color: #34495e;
    padding: 5px 10px;
    border-radius: 5px;
  }
  </style>
  