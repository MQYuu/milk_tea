<template>
  <div class="profile-container">
    <h1>Thông tin cá nhân</h1>

    <div v-if="userInfo" class="profile-details">
      <!-- Avatar -->
      <div class="avatar-container">
        <img :src="userInfo.avatar || defaultAvatar" alt="Avatar" class="avatar" />
        <label for="avatarInput" class="avatar-button">🖼️ Thay Avatar</label>
        <input type="file" id="avatarInput" @change="uploadAvatar" accept="image/*" />
      </div>

      <div class="info-item">
        <span class="label">Email:</span>
        <span class="value">{{ userInfo.email }}</span>
      </div>
      <div class="info-item">
        <span class="label">ID:</span>
        <span class="value">{{ userInfo.userId }}</span>
      </div>

      <div class="change-password-container">
        <span>
          <router-link to="/change-password" class="change-password-link">Đổi mật khẩu</router-link>
        </span>
      </div>

      <div class="button-group">
        <router-link to="/" class="home-link">🏠 Về trang chủ</router-link>
        <router-link to="/login" class="login-link">Về trang đăng nhập</router-link>
      </div>
    </div>

    <p v-else>Không tìm thấy thông tin người dùng.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userInfo = ref(null);
const defaultAvatar = ref("https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg");

onMounted(() => {
  const storedUser = localStorage.getItem("userInfo");

  if (storedUser) {
    userInfo.value = JSON.parse(storedUser);
  }
});

const uploadAvatar = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    userInfo.value.avatar = reader.result;
    localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
  };
};

</script>

<style scoped src="../assets/css/profile.css"></style>
