// ProductSlider.js

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import Product_Card from './Product_Card';

const ProductSlider = ({ Products, productFromNew, isNewProduct , color }) => {
  const [loading, setLoading] = useState(false);
  const [product, setProducts] = useState(false);

  console.log('Data in product slider -:', Products);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      console.log(Products);
      if (Products.length) setProducts(Products);
      setLoading(false);
    };
    getProductData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="lds-ripple"></div>
      ) : Products?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
          }}
          className="max-h-[40rem]"
        >
          {Products?.map((product, i) => (
            <SwiperSlide key={i}>
              <Product_Card Product={product} textColor={color} Height={'h-[400px]'} isNewProduct={isNewProduct} /> {/* Pass isNewProduct prop */}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Product Found</p>
      )}
    </>
  );
};

export default ProductSlider;
