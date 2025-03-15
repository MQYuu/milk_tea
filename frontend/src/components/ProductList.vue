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
            <p class="product-price">{{ product.price }}$</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])

onMounted(async () => {
  try {
    // Gọi API với proxy
    const response = await fetch('/api/products')  // Đường dẫn proxy
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>

<style scoped>
/* Tổng thể layout */
.product-page {
  font-family: 'Arial', sans-serif;
  background-color: #fafafa;
  padding: 20px;
}

/* Tiêu đề trang */
.page-title {
  text-align: center;
  font-size: 36px;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
}

/* Danh sách sản phẩm */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
}

/* Card sản phẩm */
.product-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Hình ảnh sản phẩm */
.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
}

/* Thông tin sản phẩm */
.product-info {
  padding: 10px;
}

.product-name {
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.product-price {
  font-size: 18px;
  color: #f44336; /* Màu đỏ đặc trưng */
  font-weight: bold;
}
</style>
