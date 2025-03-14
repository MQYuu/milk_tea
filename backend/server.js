// Import thư viện Express để tạo server
const express = require('express'); 
const app = express(); 
// Middleware để phân tích JSON từ body yêu cầu
app.use(express.json());

// Load biến môi trường từ file .env
require('dotenv').config(); 

// Import các route của sản phẩm và xác thực người dùng
const productRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');

// Import hàm kết nối với MongoDB
const connectDB = require('./config/dbConnect');

// Gọi hàm kết nối tới database
connectDB(); 


// Middleware để sử dụng các routes của sản phẩm
app.use('/products', productRoutes);
const cors = require('cors');
app.use(cors({
  origin: '*',  // Cho phép tất cả các domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Cho phép các phương thức này
}));

// Middleware cho route xác thực (hiện đang bị comment, chưa sử dụng)
// app.use('/auth', authRoutes);

port = process.env.PORT || 3001;
// Khởi động server, lắng nghe các request trên cổng 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
