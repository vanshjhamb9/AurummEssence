// AllProduct.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductEndpoints, subCategories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { apiConnector } from "../services/apiConnector";
import ProductSlider from "../components/core/Catalog/ProductSlider";
import Product_Card from "../components/core/Catalog/Product_Card";
import border1 from "../assets/Images/Icons/47040.svg"
import border2 from "../assets/Images/Icons/1333410.svg"
import border3 from "../assets/Images/Icons/lavender.png"
import border4 from "../assets/Images/Icons/fern-plant.png"
import border5 from "../assets/Images/Icons/floral-design.png"
import Footer from "../components/common/Footer";

function AllProduct() {
  const { loading } = useSelector((state) => state.profile)
  const [ products , setProducts] = useState("");

  useEffect (() => {
    const getAllProducts = async() => {
      const res = await apiConnector("GET", ProductEndpoints.GET_ALL_PRODUCT_API);
      const products = res?.data?.data;
      setProducts(products);
  }
  getAllProducts();
},[]);

if (loading || !products) {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="spinner"></div>
    </div>
  )
}

      return (
        <>
        <div className={`absolute h-full z-10 `}>
          <img className="w-[250px] -ml-2 opacity-70 transition-all duration-200 z-50   " src={border1} />
          <img className="w-[350px] opacity-70 animation rotate-90 mt-[370px] -ml-24   " src={border2} />
          <img className="w-[250px] opacity-70 transition-all duration-200 z-50 mt-[770px] -ml-3 -rotate-90 " src={border1} />
        </div>
        <div className={`absolute right-2 -bottom-[74rem]   rotate-180 h-full `}>
          <img className="w-[250px] -ml-2 opacity-70 transition-all duration-200 z-50   " src={border1} />
          <img className="w-[350px] opacity-70 animation rotate-90 mt-[770px] -ml-24   " src={border2} />
          <img className="w-[250px] opacity-70 transition-all duration-200 z-50 mt-[370px] -ml-3 -rotate-90 " src={border1} />
        </div>

        <div className="box-content max-h-[1800px] overflow-y-scroll scrollbar-hide p-20 w-[1230px] mx-auto  bg-peach-900  px-4">
          {products ? (
            <div className="mx-auto w-11/12 flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
              <p className="text-xl text-richblue-600">
                {`Home / Catalog / `}
                <span className="text-bistre font-ginger font-semibold ">
                  All Product
                </span>
              </p>
              <span className="p-6 text-kombugreen text-2xl font-ginger mx-auto ">Total Products -: {products.length}</span>
              <p className="text-3xl mt-8 grid grid-cols-3 p-10 gap-8 text-richblack-5">
              
              {products?.map((product, i) => (
              <Product_Card Product={product} textColor={"bistre"} Height={'h-[400px]'} />
              ))}
              
              </p>
             
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

      <Footer />
    
        </>
      );
    }

    export default AllProduct;
