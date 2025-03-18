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
  grid-template-columns: repeat(5, 1fr); /* 5 cột trên mỗi hàng */
  gap: 20px; /* Khoảng cách giữa các sản phẩm */
  list-style: none;
  padding: 0;
}

/* Card sản phẩm */
.product-item {
  display: flex;
  justify-content: center;
  align-items: stretch; /* Đảm bảo tất cả sản phẩm có chiều cao bằng nhau */
  margin-bottom: 30px; /* Khoảng cách giữa các sản phẩm theo chiều dọc */
}

.product-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Đảm bảo chiều cao card bằng nhau */
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Hình ảnh sản phẩm */
.product-image {
  width: 100%;
  height: 200px; /* Đặt chiều cao cố định cho hình ảnh */
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

/* Thông tin sản phẩm */
.product-info {
  padding: 10px;
  flex-grow: 1; /* Đảm bảo phần thông tin chiếm phần còn lại */
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
  flex-grow: 1;
}

.product-price {
  font-size: 18px;
  color: #f44336; /* Màu đỏ đặc trưng */
  font-weight: bold;
  margin-top: 10px;
}

/* Responsive Design: Khi màn hình nhỏ hơn 1024px, lưới sẽ có 3 cột */
@media (max-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr); /* 3 cột */
  }
}

/* Responsive Design: Khi màn hình nhỏ hơn 768px, lưới sẽ có 2 cột */
@media (max-width: 768px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr); /* 2 cột */
  }
}

/* Responsive Design: Khi màn hình nhỏ hơn 480px, lưới sẽ có 1 cột */
@media (max-width: 480px) {
  .product-list {
    grid-template-columns: 1fr; /* 1 cột */
  }
}
</style>
