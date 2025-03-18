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

        <!-- Hiển thị lỗi nếu có -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        
        <button type="submit" class="login-button">Đăng ký</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { registerUser } from '../api/users';

const user = ref({ name: '', email: '', password: '' });
const errorMessage = ref(''); // Lưu thông báo lỗi từ backend

const handleRegister = async () => {
  try {
    errorMessage.value = ''; // Reset lỗi trước khi gửi request
    console.log("Gửi request đăng ký với dữ liệu:", user.value);

    const response = await registerUser(user.value);

    console.log("Phản hồi từ server:", response);

    if (response && response._id) {
      alert(`Đăng ký thành công: ${response.name}`);
    } else {
      throw new Error("Phản hồi từ server không hợp lệ");
    }
  } catch (error) {
    console.error("Lỗi đăng ký:", error);

    // Kiểm tra response từ server
    if (error.response) {
      console.error("Chi tiết lỗi từ server:", error.response.data);

      // Nếu server có trả về lỗi chi tiết
      if (error.response.data.message) {
        errorMessage.value = error.response.data.message;
      } else if (typeof error.response.data === 'string') {
        errorMessage.value = error.response.data;
      } else {
        errorMessage.value = "Có lỗi xảy ra, vui lòng thử lại!";
      }
    } else {
      errorMessage.value = "Không thể kết nối đến server!";
    }
  }
};
</script>

<style scoped src="../assets/css/register.css"></style>

<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
