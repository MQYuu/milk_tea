<template>
  <div class="login-container">
    <div v-if="isLoggedIn" class="profile-box">
      <h1>Chào mừng, {{ userInfo.email }}</h1>
      <button class="logout-button" @click="handleLogout">Đăng xuất</button>
    </div>
    <div v-else class="login-box">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../api/users';

const user = ref({ email: '', password: '' });
const userInfo = ref({});
const isLoggedIn = ref(false);
const router = useRouter();

// Kiểm tra nếu đã đăng nhập thì hiển thị thông tin
onMounted(() => {
  const storedUser = localStorage.getItem("userInfo");
  if (storedUser) {
    userInfo.value = JSON.parse(storedUser);
    isLoggedIn.value = true;
  }
});

const handleLogin = async () => {
  try {
    const response = await loginUser(user.value.email, user.value.password);
    if (response.token) {
      localStorage.setItem("userToken", response.token);
      localStorage.setItem("userInfo", JSON.stringify({ email: user.value.email }));
      userInfo.value = { email: user.value.email };
      isLoggedIn.value = true;
    } else {
      alert("Đăng nhập thất bại");
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
  }
};

const handleLogout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userInfo");
  isLoggedIn.value = false;
  userInfo.value = {};
};
</script>

<style scoped src="../assets/css/login.css"></style>
