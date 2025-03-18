<template>
    <div class="home-page">
      <!-- Banner -->
      <section class="hero">
      </section>
  
      <!-- Sản phẩm nổi bật -->
      <div class="product-page">
        <h2 class="page-title">Sản phẩm nổi bật</h2>
        <ul class="product-list">
          <li v-for="product in topProducts" :key="product.id" class="product-item">
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
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import AddToCartButton from '../components/AddToCartButton.vue'
  
  const products = ref([])
  const topProducts = ref([])

  const formatPrice = (price) => {
    const numberPrice = Number(price) * 1.0; // Nhân với 1.0 để đảm bảo kiểu số
    return new Intl.NumberFormat("vi-VN").format(numberPrice);
  };

  onMounted(async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      products.value = data
      topProducts.value = [...data].sort((a, b) => b.price - a.price).slice(0, 10) // Chọn 10 sản phẩm giá cao nhất
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  })
  </script>
  
<style scoped src = "../assets/css/home.css"></style>
