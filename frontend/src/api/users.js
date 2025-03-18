import axios from "axios";

const API_URL = "http://localhost:3001/users"; // Địa chỉ của backend

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        
        // Kiểm tra phản hồi từ backend
        console.log("Response từ backend:", response.data);

        // Kiểm tra nếu response không có token
        if (response.data && response.data.token) {
            localStorage.setItem('userToken', response.data.token);  // Lưu token vào localStorage
            return response.data; // Trả về token và thông tin người dùng
        } else {
            throw new Error('Token không hợp lệ');
        }
    } catch (error) {
        console.error("Đăng nhập thất bại:", error);
        throw new Error('Lỗi khi đăng nhập');
    }
};

// Thêm token vào header cho các request sau
export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) {
            throw new Error('Không tìm thấy token, vui lòng đăng nhập lại');
        }

        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data; // Trả về dữ liệu profile
    } catch (error) {
        console.error("Có lỗi khi lấy thông tin người dùng:", error);
        throw error;
    }
};

// Gửi request đăng ký user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data; // Trả về dữ liệu người dùng đã đăng ký
    } catch (error) {
        console.error("Có lỗi xảy ra khi đăng ký:", error);
        throw error;
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Có lỗi xảy ra khi cập nhật thông tin người dùng:", error);
        throw error;
    }
};

// Xóa người dùng
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Có lỗi xảy ra khi xóa người dùng:", error);
        throw error;
    }
};
