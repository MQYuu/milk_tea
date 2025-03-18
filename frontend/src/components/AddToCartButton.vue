<template>
  <button @click="addToCart" class="add-to-cart-btn">Thêm vào giỏ hàng</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import cartApi from '../api/carts' 

// Nhận thông tin sản phẩm từ ProductPage
const props = defineProps({
  product: Object
})

// Emit sự kiện để cập nhật giỏ hàng từ component cha
const emit = defineEmits(['update-cart'])

const addToCart = async () => {
  const product = { ...props.product }; // Tạo bản sao để tránh thay đổi trực tiếp props

  // Kiểm tra xem product có _id hợp lệ hay không
  if (!product._id) {
    alert('Sản phẩm không hợp lệ');
    console.error('Product missing _id:', product);  // In ra để kiểm tra dữ liệu sản phẩm
    return;
  }

  // Chuyển _id thành productId nếu backend yêu cầu productId
  const productForCart = {
    ...product,
    productId: product._id  // Đổi _id thành productId
  };

  // Lấy thông tin người dùng từ localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Lấy thông tin từ localStorage

  if (!userInfo || !userInfo.userId) {
    alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
    return;
  }

  try {
    // Gửi yêu cầu thêm sản phẩm vào giỏ hàng với productId thay vì _id
    const updatedCart = await cartApi.addToCart(userInfo.userId, productForCart);

    // Gửi sự kiện cập nhật giỏ hàng cho component cha
    emit('update-cart', updatedCart.items);

    // Thông báo cho người dùng
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  } catch (error) {
    alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    console.error(error);
  }
};

</script>

<style scoped>
.add-to-cart-btn {
  background-color: #e67e22;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #f39c12;
}
</style>
