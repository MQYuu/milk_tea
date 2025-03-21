<template>
  <div class="home-page">
    <!-- Banner -->
    <section class="hero">
    </section>

    <section class="content">
      <div class="text-image">
        <div class="text-container">
          <h2 class="title">Trà Sữa Dâu Tây</h2>
          <p class="description">
            Trà sữa dâu tây là một sự kết hợp tinh tế giữa vị thanh nhẹ của trà, độ béo ngậy của sữa và hương dâu tây
            tươi mát. Mỗi ly trà sữa như một bản nhạc dịu êm, nơi vị chua nhẹ của dâu tây vỡ tan trên đầu lưỡi, hòa
            quyện cùng lớp sữa mịn màng, mang đến cảm giác vừa tươi mới, vừa ngọt ngào, vừa sảng khoái.
            Một buổi chiều thảnh thơi, cầm trên tay ly trà sữa dâu tây mát lạnh, nhâm nhi từng giọt
            ngọt ngào, cảm nhận sự dịu dàng của thiên nhiên – còn gì tuyệt vời hơn thế nữa?
          </p>
        </div>
        <img class="image" src="https://dayphache.edu.vn/wp-content/uploads/2022/02/tra-sua-dau-thom-mat.jpg"
          alt="Trà sữa dâu">
      </div>
    </section>

    <section class="content">
      <div class="text-image">
        <div class="text-container">
          <h2 class="title">Trà sữa bạc hà</h2>
          <p class="description">
            Hương trà dịu nhẹ kết hợp với vị ngọt của sữa, thêm chút the mát từ bạc hà, tạo nên một sự cân bằng hoàn hảo
            giữa ngọt ngào và sảng khoái.
            Nhấp một ngụm trà sữa bạc hà, bạn sẽ cảm nhận ngay vị tươi mát lan tỏa khắp vòm miệng, đánh thức mọi giác
            quan. Cái nóng oi ả dường như tan biến, nhường chỗ cho cảm giác nhẹ nhàng, thư giãn như một cơn gió mát lành
            giữa ngày hè.
          </p>
        </div>
        <img class="image"
          src="https://dayphache.edu.vn/wp-content/uploads/2018/05/01d8b43f4f3fa760f12ff89aa5d9028b.jpg"
          alt="Trà sữa dâu">
      </div>
    </section>

    <section class="content">
      <div class="text-image">
        <div class="text-container">
          <h2 class="title">Trà sữa phúc bồn tử</h2>
          <p class="description">
            Vị chua nhẹ nhàng lan tỏa, cân bằng hoàn hảo với độ ngọt mịn màng của sữa, để lại hậu vị tươi mới, đầy sảng
            khoái. Mỗi lần thưởng thức là một lần cảm nhận sự hòa quyện giữa dịu dàng và mạnh mẽ, như một bản nhạc đầy
            cảm xúc. Không chỉ là một thức uống, trà sữa phúc bồn tử còn là một trải nghiệm, một khoảnh khắc thư giãn
            giữa nhịp sống hối hả.
          </p>
        </div>
        <img class="image"
          src="https://xebanhangluudongvn.01122018.exdomain.net/image/catalog/TS-PhucBonTu/cach-lam-tra-sua-phuc-bon-tu.jpg"
          alt="Trà sữa dâu">
      </div>
    </section>

    <!-- Sản phẩm nổi bật
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
    </div> -->

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

<style scoped src="../assets/css/home.css"></style>
