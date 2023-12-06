import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiConnector'
import { ratingsEndpoints } from '../../services/apis'
import { FaStar } from 'react-icons/fa'


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;


    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("LOgging response in rating", data);

            if(data?.success) {
                setReviews(data?.data);
            }

            console.log("Printing Reviews", reviews);

        }
        fetchAllReviews();
    }, []);

    const [slideNumber, setSlideNumber] = useState(1);
    const HandleslideNo =( )=> {
        window.matchMedia('(min-width: 1809px)').addEventListener('change', () => setSlideNumber(4));
        window.matchMedia('(min-width: 1340px)').addEventListener('change', () => setSlideNumber(3));
        window.matchMedia('(min-width: 990px)').addEventListener('change', () => setSlideNumber(2));
        window.matchMedia('(min-width: 420px)').addEventListener('change', () => setSlideNumber(1));
    }
    HandleslideNo();

  return (
    <div className='text-white  flex lg:mx-0 md:mx-auto sm:mx-auto xs:mx-auto  mt-16  mb-16' >
        <div className='max-w-maxContentmx-auto w-full flex '>
            <Swiper
            slidesPerView={(slideNumber)}
            spaceBetween={34}
            loop={true}
            freeMode={true}
            autoplay={{
                delay: 2500,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className={`w-full `}
            >
            
                {
                    reviews.map((review, index) => (
                      
                        
                        <SwiperSlide key={index}>
                        <div className='w-[305px] p-[22px] rounded-2xl text-center flex flex-col space-y-4  mx-auto bg-richblack-800'>
                        <div className='flex -space-x-8 w-[218px] h-[42px] '>
                            <img
                            src={review?.user?.image
                             ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                              alt='Profile Pic'
                              className='h-[36px] w-[36px] object-cover rounded-full mx-auto'
                            />
                            <div className='flex flex-col'>
                            <p className='font-semibold text-[14px] leading-[22px] text-richblack-5 '>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p className='text-[12px] leading-[20px] text-richblack-600 '>{review?.course?.courseName}</p>
                            </div>
                            </div>
                            <p className='text-[12px] leading-[20px] text-richblack-25 '>
                                {review?.review}
                            </p>
                            <div className='flex gap-[8px] ml-[68px] text-base '>
                            <p className='text-[16px] leading-[22px] text- text-yellow-100'>{review?.rating.toFixed(1)}</p>
                            <div className=''>
                            <ReactStars 
                                count={5}
                                value={review.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                            
                            />
                            </div>
                            </div>
                          </div>
                            
                        </SwiperSlide>
                       
                    ))
                }
                

            </Swiper>
        </div>
    </div>
    
  )
}

export default ReviewSlider
