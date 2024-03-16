import Product from "../models/product.js"; // Import model Product từ đường dẫn ../models/product.js

/*
Hàm điều khiển (controller functions) cho các file routes và xác định route
Các điều khiển và các logic cho tài nguyên sản phẩm (product resource)
*/
export const getProducts = async (req, res) => { // Khai báo hàm điều khiển getProducts nhận req và res làm tham số
    const products = await Product.find(); // Tìm tất cả các sản phẩm từ cơ sở dữ liệu và gán cho biến products
    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa danh sách sản phẩm
        products, // Trả về danh sách sản phẩm
    }); 
};

//Tạo sản phẩm mới với đường dẫn => /api/v1/admin/products
export const newProduct = async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
    const product = await Product.create(req.body); // Tạo một sản phẩm mới từ dữ liệu được gửi trong yêu cầu và gán cho biến product
    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
        product, // Trả về thông tin của sản phẩm mới được tạo
    });
};
