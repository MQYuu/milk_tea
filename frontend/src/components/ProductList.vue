<template>
    <div>
      <h2>Danh sách sản phẩm</h2>
      <ul>
        <li v-for="product in products" :key="product.id">
          <div>
            <h3>{{ product.name }} - {{ product.price }}$</h3>
            <p>{{ product.description }}</p>
            <img :src="product.imageUrl" alt="Product Image" width="100" />
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
  /* Thêm style nếu cần */
  </style>
  