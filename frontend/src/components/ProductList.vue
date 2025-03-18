<template>
  <div class="product-page">
    <h2 class="page-title">Danh sách sản phẩm</h2>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <div class="product-card">
          <img :src="product.imageUrl" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">{{ formatPrice(product.price) }} VND</p>
            <!-- Truyền thông tin sản phẩm vào AddToCartButton -->
            <AddToCartButton :product="product" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddToCartButton from './AddToCartButton.vue'

const formatPrice = (price) => {
    const numberPrice = Number(price) * 1.0; // Nhân với 1.0 để đảm bảo kiểu số
    return new Intl.NumberFormat("vi-VN").format(numberPrice);
  };

const products = ref([])

onMounted(async () => {
  try {
    // Gọi API với proxy để lấy sản phẩm
    const response = await fetch('/api/products')  // Đường dẫn API để lấy dữ liệu sản phẩm
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>

<style scoped src="../assets//css/productList.css"></style>
