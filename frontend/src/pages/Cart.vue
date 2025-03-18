<template>
  <div class="cart-page">
    <h1>Giỏ hàng</h1>
    <div v-if="cart.length > 0">
      <ul class="cart-list">
        <li v-for="(product, index) in cart" :key="index" class="cart-item">
          <img :src="product.imageUrl" alt="Product Image" class="cart-product-image" />
          <div class="cart-product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p><strong>{{ product.price }}$</strong></p>
            <button @click="removeFromCart(index)">Xóa</button>
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

// Tạo một ref giỏ hàng
const cart = ref([])

// Lấy giỏ hàng từ localStorage khi trang được tải
onMounted(() => {
  const storedCart = JSON.parse(localStorage.getItem('cart'))
  if (storedCart) {
    cart.value = storedCart
  }
})

// Tính tổng tiền giỏ hàng
const totalPrice = computed(() => {
  return cart.value.reduce((total, product) => total + parseFloat(product.price), 0)
})

// Hàm xóa sản phẩm khỏi giỏ hàng
const removeFromCart = (index) => {
  cart.value.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart.value))  // Cập nhật giỏ hàng trong localStorage
}
</script>

<style scoped>
.cart-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #fafafa;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
}

.cart-product-info h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.cart-product-info p {
  font-size: 14px;
  color: #666;
}

.cart-summary {
  margin-top: 20px;
}

.checkout-btn {
  background-color: #e67e22;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.checkout-btn:hover {
  background-color: #f39c12;
}
</style>
