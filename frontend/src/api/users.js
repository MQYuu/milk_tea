import axios from "axios";

const API_URL = "http://localhost:3001/users"; // Địa chỉ của backend

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('userToken', response.data.token);  // Lưu token vào localStorage
    return response.data;
};

// Thêm token vào header cho các request sau
export const getUserProfile = async () => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Gửi request đăng ký user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data; // Trả về dữ liệu người dùng đã đăng ký
    } catch (error) {
        console.error("Có lỗi xảy ra khi đăng ký", error);
        throw error;
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Có lỗi xảy ra khi cập nhật thông tin người dùng", error);
        throw error;
    }
};

// Xóa người dùng
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Có lỗi xảy ra khi xóa người dùng", error);
        throw error;
    }
};
