import { json } from "express";

class APIFilters{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() { 
        // Tìm kiếm theo từ khóa được truyền vào
        //{{DOMAIN}}/api/products?keyword=Áo
        const keyword = this.queryStr.keyword 
          ? {
              name: {
                // Sử dụng biểu thức regex để tìm kiếm không phân biệt chữ hoa chữ thường với tùy chọn "i"
                  $regex: this.queryStr.keyword,
                  $options: "i",
              },        
          }
          // Nếu không có từ khóa, sử dụng đối tượng rỗng
          : {};
          const category = this.queryStr.category; // Assuming category is a top-level string
          if (category) {
            // // Hung: Initialize keyword.category as an object if it doesn't exist
            // keyword.category = keyword.category || {}; // Hung
            // keyword.category.name = category; // Filter by category name
            keyword['category.name'] = category; // Filter by category name
          }
          const subCategory = this.queryStr.subCategory;
            if (subCategory) {
                keyword['category.subCategory'] = subCategory; // Lọc theo tên subcategory
            }

            const subSubCategory = this.queryStr.subSubCategory;
            if (subSubCategory) {
                keyword['category.subSubCategory'] = subSubCategory; // Lọc theo tên subcategory
            }
        
          // Thực hiện tìm kiếm dựa trên từ khóa và gán kết quả vào biến 'query'
        this.query = this.query.find({ ...keyword});
        // Trả về đối tượng hiện tại để cho phép gọi tiếp tục các phương thức chuỗi
        return this;

    }

    filters() {
        // Tạo một bản sao của đối tượng truy vấn để tránh ảnh hưởng đến đối tượng gốc
        const queryCopy = { ...this.queryStr};
        // Xác định các trường cần loại bỏ khỏi bản sao truy vấn
        const fieldsToRemove = ["keyword", "page", "category","subCategory", "subSubCategory", "sort", "resPerPage"];
        // Loại bỏ các trường đã xác định khỏi bản sao truy vấn
        fieldsToRemove.forEach((el) => delete queryCopy[el]);
        // Chuyển đổi bản sao truy vấn thành chuỗi JSON
        let queryStr = JSON.stringify(queryCopy);
        // Thay thế các toán tử so sánh trong chuỗi JSON bằng cú pháp của MongoDB
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        // Thực hiện tìm kiếm dựa trên các điều kiện lọc và gán kết quả vào biến 'query'
        
        // Kiểm tra xem category có tồn tại và có trường name không trước khi truy cập
        // console.log('Before:');
        // console.log(this.queryStr);
        // console.log(this.queryStr.category);
        // console.log('After:');

        // if (this.queryStr.category && typeof this.queryStr.category === 'object' && this.queryStr.category.name) {
        //     this.query = this.query.find({
        //         'category.name': this.queryStr.category.name
        //     });
        // }

        if (this.queryStr.category) {
            this.query = this.query.find({ 'category.name': this.queryStr.category });
        }
        

        this.query = this.query.find(JSON.parse(queryStr));

        

        return this;
    }
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }


    sortByPrice() {
        if (this.queryStr.priceSort) {
            const sort = this.queryStr.priceSort === 'asc' ? 1 : -1;
            this.query = this.query.sort({ price: sort });
        }
        return this;
    }

    sorting() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    
} 

export default APIFilters;

