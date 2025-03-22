<template>
  <div class="profile-container">
    <h1>Thông tin cá nhân</h1>

    <!-- Kiểm tra nếu có thông tin user thì hiển thị -->
    <div v-if="userInfo" class="profile-details">
      <!-- Hiển thị Avatar -->
      <div class="avatar-container">
        <img :src="userInfo.avatar || defaultAvatar" alt="Avatar" class="avatar" />
        <label for="avatarInput" class="avatar-button">Đổi Avatar</label>
        <input type="file" id="avatarInput" @change="uploadAvatar" accept="image/*" />
      </div>

      <!-- Hiển thị email -->
      <div class="info-item">
        <span class="label">Email:</span>
        <span class="value">{{ userInfo.email }}</span>
      </div>

      <!-- Hiển thị ID -->
      <div class="info-item">
        <span class="label">ID:</span>
        <span class="value">{{ userInfo.userId }}</span>
      </div>

      <!-- Link đổi mật khẩu -->
      <div class="change-password-container">
        <router-link to="/change-password" class="change-password-link">Đổi mật khẩu</router-link>
      </div>

      <!-- Link điều hướng -->
      <div class="button-group">
        <router-link to="/" class="home-link">Về trang chủ</router-link>
        <router-link to="/login" class="login-link">Về trang đăng nhập</router-link>
      </div>
    </div>

    <!-- Nếu không tìm thấy userInfo, hiển thị thông báo -->
    <p v-else>Không tìm thấy thông tin người dùng.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchUserData, uploadAvatar } from '../api/users'; // Import API

const userInfo = ref(null);
const defaultAvatar = ref("https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg");

onMounted(async () => {
  userInfo.value = await fetchUserData();

  if (!userInfo.value) {
    console.error("Không tìm thấy thông tin người dùng.");
  }
});

const handleUploadAvatar = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const response = await uploadAvatar(userInfo.value.userId, file);
  if (response?.avatar) {
    const newAvatar = `http://localhost:3001${response.avatar}`;
    userInfo.value.avatar = newAvatar;

    // Cập nhật localStorage
    const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
    storedUser.avatar = newAvatar;
    localStorage.setItem("userInfo", JSON.stringify(storedUser));

    console.log("Cập nhật avatar thành công!", newAvatar);
  } else {
    console.error("Lỗi khi upload avatar");
  }
};
</script>

<style scoped src="../assets/css/profile.css"></style>
