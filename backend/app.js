// File nhập liệu chính của backend
import express from "express"; // Import thư viện Express để tạo ứng dụng backend

// Tạo 1 đối tượng ứng dụng Express mới
const app = express(); 

// Một thư viện của JavaScript load các biến môi trường từ tập tin '.env' vào môi trường thực thi của ứng dụng
import dotenv from "dotenv"; 

import { connectDatabase } from "./config/dbConnect.js"; // Import hàm connectDatabase từ module dbConnect.js trong thư mục config

dotenv.config({ path: "backend/config/config.env" }); // Load các biến môi trường từ tập tin config.env

connectDatabase(); // Gọi hàm connectDatabase để kết nối với cơ sở dữ liệu MongoDB

app.use(express.json()); // Sử dụng middleware để phân tích các yêu cầu gửi đến dưới dạng JSON

// Import tất cả các routes (đường dẫn)
import productRoutes from "./routes/products.js"; // Import module chứa các routes liên quan đến sản phẩm

app.use("/api", productRoutes); // Sử dụng các routes được định nghĩa trong productRoutes với đường dẫn /api

// Ứng dụng Express lắng nghe các yêu cầu và chạy trên cổng được chỉ định trong biến môi trường PORT
app.listen(process.env.PORT, () => {
    console.log(
        `Server đang chạy ở port ${process.env.PORT} ở chế độ ${process.env.NODE_ENV}`
    ); // In ra thông báo cho biết server đang chạy ở cổng và chế độ nào
});
