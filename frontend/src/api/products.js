import axios from 'axios';

const API_URL = 'http://localhost:3001/products'; // Địa chỉ của backend

// Hàm để lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy sản phẩm", error);
    throw error;
  }
};
