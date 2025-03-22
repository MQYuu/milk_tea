import axios from "axios";

const API_URL = "http://localhost:3001/users"; // Địa chỉ của backend

// Gửi request đăng nhập 
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

// Gửi request đổi password 
export const changePasswordApi = async (userId, oldPassword, newPassword) => {
    try {
        const response = await axios.post(`${API_URL}/change-password`, {
            userId,
            oldPassword,
            newPassword,
        });

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Lỗi kết nối đến server!";
    }
};

// Lấy thông tin user từ backend
export const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      return null;
    }
  };

// Upload avatar
export const uploadUserAvatar = async (userId, file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
        const response = await axios.post(`${API_URL}/upload-avatar/${userId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi upload avatar:", error);
        return null;
    }
};

// Lấy user từ localStorage hoặc backend
export const fetchUserData = async () => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
        const user = JSON.parse(storedUser);

        // Nếu chưa có avatar, gọi API lấy từ backend
        if (!user.avatar) {
            const data = await getUserInfo(user.userId);
            if (data?.avatar) {
                user.avatar = `${API_URL}${data.avatar}`;

                // Cập nhật lại localStorage
                localStorage.setItem("userInfo", JSON.stringify(user));
            }
        }
        return user;
    }

    return null;
};