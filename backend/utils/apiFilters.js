import { json } from "express";

class APIFilters{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() { 
        const keyword = this.queryStr.keyword 
          ? {
              name: {
                  $regex: this.queryStr.keyword,
                  $options: "i",
              },
          }: {};

        this.query = this.query.find({ ...keyword});
        return this;

    }

    filters() {
        const queryCopy = { ...this.queryStr};

        const fieldsToRemove = ["keyword"];

        fieldsToRemove.forEach((el) => delete queryCopy[el]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;


    }

} 

export default APIFilters;