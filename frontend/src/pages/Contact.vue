<template>
  <div class="contact-page">
    <!-- Thông tin liên hệ -->
    <div class="contact-info">
      <h1>Liên hệ</h1>
      <p><strong>📍 Địa chỉ:</strong>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
      <p><strong>📞 Hotline:</strong>0123 456 789</p>
      <p><strong>📧 Gmail:</strong>Yuu@gmail.com</p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.contact-page {
  background-image: url('https://antimatter.vn/wp-content/uploads/2022/06/background-tra-sua.jpg');
  /* Đường dẫn ảnh */
  background-size: cover;
  /* Ảnh phủ toàn bộ */
  background-position: center;
  /* Căn giữa ảnh */
  background-repeat: no-repeat;
  /* Không lặp lại */
  min-height: 100vh;
  /* Chiều cao tối thiểu bằng màn hình */
}

.contact-info {
  position: absolute;
  top: 50%;
  left: 66.6%;
  transform: translate(-50%, -50%);
  text-align: left; /* Căn chữ về bên trái */
  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 400px; /* Đảm bảo các dòng có cùng độ rộng */
}

.contact-info h1 {
  text-align: center; /* Chỉ căn giữa tiêu đề */
  margin-bottom: 20px; /* Tạo khoảng cách với nội dung bên dưới */
}

.contact-info p {
  display: flex;
  align-items: center; /* Căn giữa theo chiều dọc */
  white-space: nowrap; /* Ngăn nội dung bị xuống dòng */

}

.contact-info strong {
  min-width: 150px; /* Độ rộng tối thiểu để các tiêu đề thẳng hàng */
  text-align: left;
  display: inline-block;
}

.contact-info span {
  flex: 1; /* Để nội dung tự động giãn ra, tránh đè lên nhau */
}

</style>