<template>
  <button @click="addToCart" class="add-to-cart-btn">Thêm vào giỏ hàng</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Nhận thông tin sản phẩm từ ProductPage
const props = defineProps({
  product: Object
})

// Emit sự kiện để cập nhật giỏ hàng từ component cha
const emit = defineEmits(['update-cart'])

const addToCart = () => {
  const product = { ...props.product } // Tạo bản sao để tránh thay đổi trực tiếp props

  // Lấy giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || []

  // Kiểm tra nếu sản phẩm đã có trong giỏ hàng thì tăng số lượng lên 1
  const existingProduct = cart.find(item => item.id === product.id)
  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    // Nếu sản phẩm chưa có, thêm vào giỏ hàng với số lượng 1
    product.quantity = 1
    cart.push(product)
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart))

  // Gửi sự kiện cập nhật giỏ hàng cho component cha
  emit('update-cart', cart)

  // Thông báo cho người dùng
  alert(`${product.name} đã được thêm vào giỏ hàng!`)
}
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
