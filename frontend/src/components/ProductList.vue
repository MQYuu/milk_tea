<template>
  <div class="product-page">
    <h2 class="page-title">Danh sách sản phẩm</h2>

    <!-- Thanh tìm kiếm -->
    <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="Tìm kiếm sản phẩm..." class="search-input" />
      <button class="search-button">
        🔍
      </button>
    </div>

    <!-- Danh sách sản phẩm được hiển thị theo trang -->
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

// Hàm định dạng giá tiền theo chuẩn Việt Nam
const formatPrice = (price) => {
  const numberPrice = Number(price) * 1.0 // Chuyển đổi về số để tránh lỗi
  return new Intl.NumberFormat("vi-VN").format(numberPrice)
}

// Danh sách sản phẩm
const products = ref([])
const searchQuery = ref("")

// Biến lưu số trang hiện tại
const currentPage = ref(1)

// Số sản phẩm trên mỗi trang (có thể điều chỉnh nếu muốn)
const itemsPerPage = 10

// Khi component được tải lần đầu tiên, gọi API để lấy danh sách sản phẩm
onMounted(async () => {
  try {
    const response = await fetch('/api/products') // Gọi API lấy dữ liệu sản phẩm
    const data = await response.json()
    products.value = data // Gán dữ liệu vào biến products
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})

// Lọc sản phẩm theo từ khóa tìm kiếm
const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Tính tổng số trang dựa trên tổng số sản phẩm chia cho số sản phẩm mỗi trang
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end); // Sử dụng danh sách đã lọc
});

// Chuyển về trang trước (nếu không phải trang đầu tiên)
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Chuyển sang trang sau (nếu chưa phải trang cuối cùng)
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>

<style scoped src="../assets/css/productList.css"></style>
