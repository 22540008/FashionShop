import React, { useEffect } from "react"
import MetaData from "./layout/MetaData"
import { useGetProductsQuery } from "../redux/api/productsApi" // auto chèn khi chọn useGetProductsQuery
import ProductItem from "./product/ProductItem.jsx";
import Loader from "./layout/Loader.jsx"; // auto chèn khi chọn Loader
import toast from "react-hot-toast"
import CustomPagination from "./layout/CustomPagination.jsx";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters.jsx";

const Home = () => {
  
  // truyền số page number về backend bằng biến params
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || ""; // keyword: từ khóa tìm kiếm
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  const params = { page, keyword };

  min != null && (params.min = min);
  max != null && (params.max = max);
  // console.log("====================================")
  // console.log(params);
  // console.log("====================================")

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  // console.log(data, isLoading);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />

  return (
      <>
      <MetaData title={"Cửa hàng thời trang"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={keyword? "col-6 col-md-9": "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword ? `${data?.filteredProductsCount} Sản phẩm được tìm thấy với từ khoá: ${keyword}` : "Sản phẩm nổi bật"}
            
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product = {product} columnSize={columnSize} />
              )) }
              

            </div>
          </section>

  
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
      </>
  )
}

export default Home

/*
Nếu có keyword thì 9 column, không thì 12 column
3 column cho filter, 9 column cho sản phẩm
{keyword ? `${data?.products?.length} -> hiện đang show ra <= 4 sp

*/