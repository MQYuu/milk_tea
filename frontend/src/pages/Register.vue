<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Đăng ký</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Tên:</label>
          <input v-model="user.name" type="text" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="user.email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input v-model="user.password" type="password" id="password" required />
        </div>
        <button type="submit" class="login-button">Đăng ký</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { registerUser } from '../api/users';

const user = ref({ name: '', email: '', password: '' });

const handleRegister = async () => {
  try {
    console.log("Gửi request đăng ký với dữ liệu:", user.value);
    const response = await registerUser(user.value);
    
    console.log("Phản hồi từ server:", response);

    // Không còn dùng response.data nữa
    if (!response || !response.name) {
      throw new Error("Phản hồi từ server không hợp lệ");
    }

    alert(`Đăng ký thành công: ${response.name}`);
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    console.error("Chi tiết lỗi:", error.response?.data || error.message);
    alert("Đăng ký thất bại: " + (error.response?.data?.message || "Lỗi không xác định"));
  }
};
</script>

<style scoped src = "../assets/css/register.css"></style>

