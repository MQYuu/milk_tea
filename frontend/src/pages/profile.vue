<template>
    <div>
      <h1>Thông tin người dùng</h1>
      <div v-if="user">
        <p>Tên: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Quyền admin: {{ user.isAdmin ? 'Có' : 'Không' }}</p>
      </div>
      <div v-else>
        <p>Không tìm thấy thông tin người dùng.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const user = ref(null);
  
  onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Giải mã JWT và lấy thông tin người dùng
      const decoded = JSON.parse(atob(token.split('.')[1]));  // Giải mã JWT
      user.value = {
        name: decoded.name,
        email: decoded.email,
        isAdmin: decoded.isAdmin
      };
    }
  });
  </script>
  