<template>
  <div class="cart-page">
    <h1>Giỏ hàng</h1>
    <div v-if="cart.length > 0">
      <ul class="cart-list">
        <li v-for="product in cart" :key="product.id" class="cart-item">
          <img :src="product.imageUrl" alt="Product Image" class="cart-product-image" />
          <div class="cart-product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p><strong>{{ product.price }}$</strong></p>
            <p>Số lượng: {{ product.quantity }}</p>
            <button @click="updateQuantity(product.id, 1)">+</button>
            <button @click="updateQuantity(product.id, -1)">-</button>
            <button @click="removeFromCart(product.id)">Xóa</button>
          </div>
        </li>
      </ul>
      <div class="cart-summary">
        <p>Tổng tiền: {{ totalPrice }}$</p>
        <button class="checkout-btn">Thanh toán</button>
      </div>
    </div>
    <div v-else>
      <p>Giỏ hàng của bạn hiện tại chưa có sản phẩm nào.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cart = ref([])

// Load giỏ hàng từ localStorage khi trang tải
onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || []
})

// Tính tổng tiền giỏ hàng
const totalPrice = computed(() => {
  return cart.value.reduce((total, product) => total + product.price * product.quantity, 0)
})

// Hàm cập nhật số lượng sản phẩm (tăng hoặc giảm)
const updateQuantity = (id, amount) => {
  const productIndex = cart.value.findIndex(product => product.id === id)

  if (productIndex !== -1) {
    if (cart.value[productIndex].quantity + amount > 0) {
      cart.value[productIndex].quantity += amount
    } else {
      cart.value.splice(productIndex, 1) // Xóa sản phẩm nếu số lượng = 0
    }
    updateLocalStorage()
  }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
const removeFromCart = (id) => {
  cart.value = cart.value.filter(product => product.id !== id)
  updateLocalStorage()
}

// Cập nhật giỏ hàng trong localStorage
const updateLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}
</script>

<style scoped src="../assets/css/cart.css"></style>
