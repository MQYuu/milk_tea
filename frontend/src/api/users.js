import axios from "axios";

const API_URL = "http://localhost:3001/users"; // Địa chỉ của backend

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        
        console.log("Response từ backend:", response); // Kiểm tra toàn bộ response
        console.log("Response.data:", response.data);  // Kiểm tra dữ liệu API trả về

        if (response.data && response.data.token) {
            return response.data;
        } else {
            throw new Error('Token không hợp lệ');
        }
    } catch (error) {
        console.error("Đăng nhập thất bại:", error);
        throw error;
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
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // Trả về dữ liệu người dùng đã đăng ký
    } catch (error) {
        console.error("Có lỗi xảy ra khi đăng ký:", error);
        throw error;
    }
};

