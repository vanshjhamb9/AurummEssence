import React from 'react'
import HighlightText from '../Home/HighlightText'

const Quote = () => {
  return (
    <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-bistre">
        Transform your skincare routine into a ritual. Our {" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            serums, moisturizers, and creams
            {" "}
        </span>
        are designed to nurture and rejuvenate
        <span className="bg-gradient-to-b from-[#5923a0] to-[#f923ee] text-transparent bg-clip-text font-bold">
            {" "}
            , harnessing the essence of herbs 
            {" "}
        </span> 
        for a truly enchanting experience
    </div>
  )
}

export default Quote