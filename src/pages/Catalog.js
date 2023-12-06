import React, { useEffect, useState } from 'react'
// import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Product_Card from '../components/core/Catalog/Product_Card';
import ProductSlider from '../components/core/Catalog/ProductSlider';
import { useSelector } from "react-redux"
import Error from "./Error"
import NewProducts from '../components/core/Catalog/NewProducts';

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
      const subCategories = catalogPageData?.data?.selectedCategory?.subCategories;
      const products = subCategories?.products;

  // Sort the courses based on the createdAt date in ascending order
  const sortedProducts = [...products].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  });

  // Get the latest course by selecting the last element in the sorted array
  const latestProduct = sortedProducts[sortedProducts.length - 1];
    console.log("Catalog Products " +catalogPageData?.data?.selectedCategory?.products)

    
      return (
        <>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading w-[1200px] h-[38px] font-semibold text-[30px] leading-[38px] text-richblack-5 ">Products to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
            {
              active == 2 ? (<ProductSlider products={[latestProduct]} />)
               : (<ProductSlider
                Products ={catalogPageData?.data?.selectedCategory?.products} 
              />)
            }
              
              </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading w-[1200px] h-[38px] font-semibold text-[30px] leading-[38px] text-richblack-5  ">
              Top products in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <ProductSlider
                Products={catalogPageData?.data?.differentCategory?.products}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading w-[1200px] h-[38px] font-semibold text-[30px] leading-[38px] text-richblack-5 ">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingProducts
                  ?.slice(0, 4)
                  .map((product, i) => (
                    <Product_Card product={product} key={i} Height={"sm:h-[400px] xs:h-[250px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          {/* <Footer /> */}
        </>
      )
    }
    
    export default Catalog