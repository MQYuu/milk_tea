<template>
  <div>
    <h1>Đăng nhập</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input v-model="user.email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <input v-model="user.password" type="password" id="password" required />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>

    <p>Bạn chưa có tài khoản?  
      <router-link to="/register">Đăng ký</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { loginUser } from '../api/users'; // Import API login
import { useRouter } from 'vue-router';

const user = ref({ email: '', password: '' });
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await loginUser(user.value.email, user.value.password);  // Gửi email và password
    if (response.token) {
      localStorage.setItem('userToken', response.token); // Lưu token vào localStorage
      router.push('/profile'); // Chuyển hướng đến profile sau khi đăng nhập thành công
    } else {
      alert('Đăng nhập thất bại'); // Thông báo nếu không có token
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập');
  }
};

</script>
