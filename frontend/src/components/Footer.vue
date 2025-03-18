<template>
    <div>
      <!-- Nội dung của trang -->
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
  /* Footer style */
  footer {
    text-align: center;
    background-color: #34495e;
    color: white;
    padding: 1rem;
    font-size: 1rem; /* Kích thước chữ */
    font-weight: 400;
    height: 60px; /* Đặt chiều cao cho footer */
    display: flex;
    align-items: center; /* Căn giữa nội dung theo chiều dọc */
    justify-content: center; /* Căn giữa nội dung theo chiều ngang */
    position: relative; /* Footer sẽ được căn cuối trang */
    margin-top: 20px; /* Thêm khoảng cách trên footer */
  }
  
  /* Giữ nội dung trong trang luôn có chiều cao đầy đủ */
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Đảm bảo chiều cao trang luôn đủ */
  }
  
  router-view {
    flex: 1; /* Nội dung sẽ chiếm hết không gian còn lại */
  }
  </style>
  