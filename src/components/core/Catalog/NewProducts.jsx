import React, { useState } from 'react'
import ProductSlider from './ProductSlider';


const NewProducts = ({Product}) => {

    const [course,setCourse] = useState("");
    console.log("Product data is -: "+ Product);



    // const products = Product?.Date.filter(d => new Date(d) - new Date() > 0);
  return (
    <div>
      <ProductSlider Products={Product} productFromNew={true} isNewProduct={true} /> {/* Pass isNewProduct prop */}
    </div>
  )
}

export default NewProducts
