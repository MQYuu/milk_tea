<template>
  <div class="profile-container">
    <h1>Thông tin cá nhân</h1>

    <div v-if="userInfo" class="profile-details">
      <div class="info-item">
        <span class="label">Email:</span>
        <span class="value">{{ userInfo.email }}</span>
      </div>
      <div class="info-item">
        <span class="label">ID:</span>
        <span class="value">{{ userInfo.userId }}</span>
      </div>

      <router-link to="/" class="home-link">🏠 Về trang chủ</router-link>
    </div>
    
    <p v-else>Không tìm thấy thông tin người dùng.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userInfo = ref(null);
const formattedDate = ref("");

onMounted(() => {
  const storedUser = localStorage.getItem("userInfo");

  if (storedUser) {
    userInfo.value = JSON.parse(storedUser);
  }
});
</script>

<style scoped src="../assets/css/profile.css"></style>
