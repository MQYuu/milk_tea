const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnect');
const path = require('path');

const app = express(); 
dotenv.config();
connectDB();

// Cấu hình CORS trước khi định nghĩa routes
app.use(cors({
  origin: 'http://localhost:5173', // Chỉ cho phép frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json()); // Middleware parse JSON

// Import routes
const productRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const cartRoutes = require('./routes/cartRouter');

app.use('/products', productRoutes);
app.use('/users', usersRoutes);
app.use('/cart', cartRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
