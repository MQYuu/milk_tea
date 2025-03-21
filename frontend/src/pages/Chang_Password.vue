<template>
    <div class="change-password-container">
        <h2>Đổi mật khẩu</h2>

        <div class="password-inputs">
            <input v-model="oldPassword" type="password" placeholder="Nhập mật khẩu cũ" />
            <input v-model="newPassword" type="password" placeholder="Nhập mật khẩu mới" />
        </div>

        <p v-if="message" class="message">{{ message }}</p>

        <button @click="changePassword" class="change-password-btn">Xác nhận</button>
        <button @click="goBack" class="back-btn">Quay lại trang cá nhân</button>
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
            message.value = "Đổi mật khẩu thành công!";
            oldPassword.value = "";
            newPassword.value = "";

            // Quay lại trang profile sau 2 giây
            setTimeout(() => {
                router.push("/profile");
            }, 1500);
        } else {
            message.value = response.message;
        }
    } catch (error) {
        console.error("Lỗi đổi mật khẩu:", error);
        message.value = error;
    }
};

const goBack = () => {
    router.push("/profile");
};
</script>

<style scoped src="../assets/css/change-password.css"></style>
