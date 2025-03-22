<template>
  <div class="profile-container">
    <h1>Thông tin cá nhân</h1>

    <div v-if="userInfo" class="profile-details">
      <!-- Avatar -->
      <div class="avatar-container">
        <img :src="userInfo.avatar || defaultAvatar" alt="Avatar" class="avatar" />
        <label for="avatarInput" class="avatar-button">Đổi Avatar</label>
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
        <router-link to="/change-password" class="change-password-link">Đổi mật khẩu</router-link>
      </div>

      <div class="button-group">
        <router-link to="/" class="home-link">Về trang chủ</router-link>
        <router-link to="/login" class="login-link">Về trang đăng nhập</router-link>
      </div>
    </div>

    <p v-else>Không tìm thấy thông tin người dùng.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userInfo = ref(null);
const defaultAvatar = ref("https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg");

onMounted(async () => {
  const storedUser = localStorage.getItem("userInfo");

  if (storedUser) {
    userInfo.value = JSON.parse(storedUser);
  }

  // Kiểm tra nếu không có avatar thì gọi API lấy lại từ backend
  if (!userInfo.value?.avatar) {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userInfo.value.userId}`);
      if (response.data.avatar) {
        userInfo.value.avatar = `http://localhost:3001${response.data.avatar}`;

        // Cập nhật lại localStorage
        const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
        storedUser.avatar = userInfo.value.avatar;
        localStorage.setItem("userInfo", JSON.stringify(storedUser));
      }
    } catch (error) {
      console.error("Lỗi khi tải avatar từ backend:", error);
    }
  }
});

const uploadAvatar = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.post(`http://localhost:3001/users/upload-avatar/${userInfo.value.userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.avatar) {
      const newAvatar = `http://localhost:3001${response.data.avatar}`;
      userInfo.value.avatar = newAvatar;

      // Cập nhật localStorage
      const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
      storedUser.avatar = newAvatar;
      localStorage.setItem("userInfo", JSON.stringify(storedUser));

      console.log("Cập nhật avatar thành công!", newAvatar);
    } else {
      console.error("Lỗi khi upload avatar:", response.data.message);
    }
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu upload:", error);
  }
};

</script>

<style scoped src="../assets/css/profile.css"></style>
