import axios from 'axios'

const API_URL = 'http://localhost:3001/cart'

export default {
  async getCart(userId) {
    const response = await axios.get(`${API_URL}/${userId}`)
    return response.data
  },

  async addToCart(userId, product) {
    // Chỉnh lại product để tránh gửi `_id` không cần thiết
    const productToSend = {
        productId: product._id, // Đổi `_id` thành `productId`
        name: product.name,
        price: product.price,
        quantity: 1, // Mặc định là 1 nếu chưa có
        imageUrl: product.imageUrl
    };

    console.log("Dữ liệu gửi lên:", productToSend); // Log để kiểm tra

    const response = await axios.post(`${API_URL}/add`, { 
        userId, 
        items: [productToSend] // Đảm bảo gửi `items` là một mảng
    });

    return response.data;
},

  async updateCart(userId, productId, quantity) {
    const response = await axios.put(`${API_URL}/update`, { userId, productId, quantity })
    return response.data
  },

  async removeFromCart(userId, productId) {
    if (!productId) {
      console.error('Product ID is missing!');
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/${userId}/${productId}`)
      return response.data
    } catch (error) {
      console.error('Error removing product from cart:', error)
    }
  },

  async clearCart(userId) {
    const response = await axios.delete(`${API_URL}/clear/${userId}`)
    return response.data
  }
}
