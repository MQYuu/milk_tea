<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Đăng nhập</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="user.email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input v-model="user.password" type="password" id="password" required />
        </div>
        <button type="submit" class="login-button">Đăng nhập</button>
      </form>
      <p class="register-text">
        Bạn chưa có tài khoản?
        <router-link to="/register">Đăng ký</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../api/users';

const user = ref({ email: '', password: '' });
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await loginUser(user.value.email, user.value.password);
    if (response.token) {
      localStorage.setItem("userToken", response.token);
      router.push("/profile");
    } else {
      alert("Đăng nhập thất bại");
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
  }
};
</script>

<style scoped src="../assets/css/login.css"></style>
