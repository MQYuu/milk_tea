<template>
  <div>
    <h1>Đăng ký</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="name">Tên:</label>
        <input v-model="user.name" type="text" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="user.email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <input v-model="user.password" type="password" id="password" required />
      </div>
      <button type="submit">Đăng ký</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { registerUser } from '../api/users';

const user = ref({ name: '', email: '', password: '' });

const handleRegister = async () => {
  try {
    const response = await registerUser(user.value);
    console.log('Đăng ký thành công:', response.data);
    alert(`Đăng ký thành công: ${response.data.name}`);
  } catch (error) {
    console.error('Lỗi đăng ký:', error);  // Log lỗi đầy đủ
    console.error('Chi tiết lỗi:', error.response?.data || error.message);
    alert('Đăng ký thất bại: ' + (error.response?.data?.message || 'Lỗi không xác định'));
  }
};
</script>

