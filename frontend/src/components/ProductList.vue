<template>
  <div class="product-page">
    <h2 class="page-title">Danh sách sản phẩm</h2>

    <!-- Danh sách sản phẩm -->
    <ul class="product-list">
      <li v-for="product in paginatedProducts" :key="product.id" class="product-item">
        <div class="product-card">
          <img :src="product.imageUrl" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">{{ formatPrice(product.price) }} VND</p>
            <AddToCartButton :product="product" />
          </div>
        </div>
      </li>
    </ul>

    <!-- Nút điều hướng phân trang -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">⬅ Trang trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Trang sau ➡</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AddToCartButton from './AddToCartButton.vue'

// Hàm format giá tiền
const formatPrice = (price) => {
  const numberPrice = Number(price) * 1.0
  return new Intl.NumberFormat("vi-VN").format(numberPrice)
}

const products = ref([])
const currentPage = ref(1)  // Trang hiện tại
const itemsPerPage = 10      // Số sản phẩm trên mỗi trang

onMounted(async () => {
  try {
    const response = await fetch('/api/products')
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})

// Tính tổng số trang
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage))

// Lấy danh sách sản phẩm theo trang
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return products.value.slice(start, end)
})

// Chuyển sang trang trước
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Chuyển sang trang sau
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>

<style scoped src="../assets/css/productList.css"></style>
