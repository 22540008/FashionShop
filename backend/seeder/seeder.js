import mongoose from "mongoose"; // Import thư viện mongoose để làm việc với MongoDB
import products from "./data.js"; // Import dữ liệu sản phẩm từ file data.js
import Product from "../models/product.js"; // Import model Product từ module models/product.js

// Khai báo hàm seedProducts là một async function
const seedProducts = async () => {
    try {
        // Kết nối tới cơ sở dữ liệu MongoDB ở địa chỉ mongodb://localhost:27017/FashionShop2
        await mongoose.connect("mongodb://localhost:27017/FashionShop2");

        // Xóa toàn bộ các bản ghi trong collection Product
        await Product.deleteMany();
        console.log("Products are deleted"); // Log thông báo khi các sản phẩm đã được xóa thành công

        // Thêm dữ liệu sản phẩm từ mảng products vào collection Product
        await Product.insertMany(products);
        console.log("Products are added"); // Log thông báo khi các sản phẩm đã được thêm vào thành công
        process.exit(); // Kết thúc quá trình thực thi của Node.js

    } catch (error) {
        console.log(error.message); // Log thông báo lỗi nếu có
        process.exit(); // Kết thúc quá trình thực thi của Node.js
    }
};

// Gọi hàm seedProducts để thực thi việc thêm dữ liệu sản phẩm vào cơ sở dữ liệu
seedProducts();
