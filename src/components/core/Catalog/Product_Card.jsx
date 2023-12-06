// Product_Card.js

import React, { useEffect, useState } from 'react';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import NewLogo from '../../../assets/Images/board.png';

const Product_Card = ({ Product, Height, comeFrom, isNewProduct , textColor, bgColor }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isProduct , setIsNewProduct] = useState(false);

  useEffect(() => {
    const setNewProductData = async () => {
      setLoading(true);
      comeFrom === true ? setIsNewProduct(true) : setIsNewProduct(false);
    };
    setNewProductData();
  }, []);


  useEffect(() => {
    const count = GetAvgRating(Product.ratingAndReviews);
    setAvgReviewCount(count);
  }, [Product]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Link to={`/Products/${Product._id}`}>
        <div
          className="group/item transition-all duration-200 ease-in-out"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="rounded-lg">
            {isNewProduct && <img src={NewLogo} className='absolute w-[120px]' alt="New Product" />} {/* Display "New" badge */}
            <img
              src={isNewProduct ? isHovered ? Product?.thumbnail[3] : Product?.thumbnail[2] : isHovered ? Product?.thumbnail[1] : Product?.thumbnail[0]}
              alt="Product thumbnail"
              className={`${Height} sm:w-full xs:w-[95%] rounded-xl object-cover`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3 font-ginger">
            <p className={`text-xl text-${textColor} font-bold`}>{Product?.productName}</p>
            <p className={`text-xl text-${textColor}`}>{Product?.Content}</p>
            
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className={`text-${textColor} text-lg`}>
                {Product?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className={`text-xl text-${textColor} font-semibold`}>Rs. {Product?.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product_Card;
