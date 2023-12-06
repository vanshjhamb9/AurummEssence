import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { catalogData } from "../../../services/apis";

function productFeatures(subcategoryid){

    console.log(subcategoryid);

    const[subCategoryProducts, setSubCategoryProducts] = useState("");

    useEffect(() => {
    const getSubCategoryPageDetails = async () => {
        try {
          const res = await apiConnector("GET", catalogData.CATALOGPAGEDATA_API);
          const subCategoryData = res.data.data;
          console.log("Sub category data ", res)
          console.log("Data:", subCategoryData); // Log the received data
          
          setSubCategoryProducts(subCategoryData);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
  
      getSubCategoryPageDetails(); // Call the function to fetch data
  
    }, []);

     

    return(
        <div>Feature</div>

    )

}
export default productFeatures