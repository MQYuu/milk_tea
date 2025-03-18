<template>
  <div class="cart-page">
    <h1>Giỏ hàng</h1>
    <div v-if="cart.length > 0">
      <ul class="cart-list">
        <li v-for="product in cart" :key="product.productId" class="cart-item">
          <img :src="product.imageUrl" alt="Product Image" class="cart-product-image" />
          <div class="cart-product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description || 'Không có mô tả' }}</p>
            <p><strong>{{ formatCurrency(product.price) }}</strong></p>
            <p>Số lượng: {{ product.quantity }}</p>
            <div class="quantity-buttons">
              <button @click="updateQuantity(product.productId, product.quantity + 1)">+</button>
              <button @click="updateQuantity(product.productId, product.quantity - 1)">-</button>
            </div>
            <button class="remove-btn" @click="removeFromCart(product.productId)">Xóa</button>
          </div>
        </li>
      </ul>
      <div class="cart-summary">
        <p><strong>Tổng tiền: {{ formatCurrency(totalPrice) }}</strong></p>
        <button class="checkout-btn" @click="checkout">Thanh toán</button>
      </div>
    </div>
    <div v-else>
      <p>Giỏ hàng của bạn hiện tại chưa có sản phẩm nào.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import cartApi from '../api/carts'

const userStore = useUserStore()
const cart = ref([])

onMounted(async () => {
  if (userStore.userId) {
    // Đảm bảo trả về một giỏ hàng hợp lệ
    const response = await cartApi.getCart(userStore.userId)
    cart.value = response.items || [] // Nếu không có sản phẩm thì trả về mảng rỗng
  }
})

const totalPrice = computed(() => {
  return cart.value.reduce((total, product) => {
    // Kiểm tra và đảm bảo giá trị hợp lệ trước khi tính toán
    const price = product.price && typeof product.price === 'number' ? product.price : 0
    const quantity = product.quantity && typeof product.quantity === 'number' ? product.quantity : 0
    return total + price * quantity
  }, 0)
})

// Hàm format giá trị tiền tệ
const formatCurrency = (amount) => {
  // Kiểm tra nếu amount là số và có giá trị hợp lệ
  if (typeof amount === 'number' && !isNaN(amount)) {
    return amount.toLocaleString('vi-VN') + ' VND'
  }
  return '0 VND' // Trường hợp giá trị không hợp lệ
}

const updateQuantity = async (productId, quantity) => {
  if (quantity > 0) {
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    await cartApi.updateCart(userStore.userId, productId, quantity)
  } else {
    // Nếu số lượng <= 0 thì xóa sản phẩm khỏi giỏ
    await cartApi.removeFromCart(userStore.userId, productId)
  }
  // Lấy lại giỏ hàng sau khi thay đổi
  const response = await cartApi.getCart(userStore.userId)
  cart.value = response.items || []
}

const removeFromCart = async (productId) => {
  // Xóa sản phẩm khỏi giỏ
  await cartApi.removeFromCart(userStore.userId, productId)
  const response = await cartApi.getCart(userStore.userId)
  cart.value = response.items || []
}

const checkout = async () => {
  alert('Thanh toán thành công!')
  // Xóa giỏ hàng khi thanh toán
  await cartApi.clearCart(userStore.userId)
  cart.value = [] // Đặt lại giỏ hàng thành rỗng
}
</script>

<style scoped src="../assets/css/cart.css"></style>
