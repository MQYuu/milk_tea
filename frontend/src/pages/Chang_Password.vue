<template>
  <div class="change-password-container">
    <h2>🔒 Đổi mật khẩu</h2>

    <div class="password-inputs">
      <input v-model="oldPassword" type="password" placeholder="🔑 Nhập mật khẩu cũ" />
      <input v-model="newPassword" type="password" placeholder="🔐 Nhập mật khẩu mới" />
    </div>

    <button @click="changePassword" class="change-password-btn">✅ Xác nhận</button>
    <button @click="goBack" class="back-btn">⬅️ Quay lại trang cá nhân</button>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { changePasswordApi } from "../api/users";

const oldPassword = ref("");
const newPassword = ref("");
const message = ref("");
const router = useRouter();

const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

const changePassword = async () => {
  if (!oldPassword.value || !newPassword.value) {
    message.value = "Vui lòng nhập đầy đủ thông tin!";
    return;
  }

  try {
    const response = await changePasswordApi(userInfo.userId, oldPassword.value, newPassword.value);
    if (response.success) {
      message.value = "🎉 Đổi mật khẩu thành công!";
      oldPassword.value = "";
      newPassword.value = "";

      // Quay lại trang profile sau 2 giây
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } else {
      message.value = response.message;
    }
  } catch (error) {
    console.error("Lỗi đổi mật khẩu:", error);
    message.value = "Lỗi khi đổi mật khẩu!";
  }
};

const goBack = () => {
  router.push("/profile");
};
</script>

<style scoped>
.change-password-container {
  text-align: center;
  max-width: 400px;
  margin: auto;
}

.password-inputs input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.change-password-btn, .back-btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.change-password-btn {
  background-color: #4CAF50;
  color: white;
}

.back-btn {
  background-color: #f44336;
  color: white;
}

.message {
  margin-top: 10px;
  color: green;
  font-weight: bold;
}
</style>
