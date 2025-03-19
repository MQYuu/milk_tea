import axios from 'axios'

const API_URL = 'http://localhost:3001/cart'

export default {
  async getCart(userId) {
    const response = await axios.get(`${API_URL}/${userId}`)
    return response.data
  },

  async addToCart(userId, product) {
    const response = await axios.post(`${API_URL}/add`, { userId, ...product })
    return response.data
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
