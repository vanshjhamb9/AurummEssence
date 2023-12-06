import React, { useEffect, useState } from "react"

import ConfirmationModal from "../components/common/ConfirmationModal"
import { fetchProductDetails } from "../services/operations/productDetailsAPI"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import GetAvgRating from "../utils/avgRating"
import RatingStars from "../components/common/RatingStars"
import { BiInfoCircle } from "react-icons/bi"
import { formatDate } from "../services/formatDate"
import { buyProduct } from "../services/operations/purchaseProduct"
import { addToCart } from "../slices/cartSlice"
import { ACCOUNT_TYPE } from "../utils/constrants"
import { toast } from "react-hot-toast"
import Error from "./Error"
import ProductDetailsCard from "../components/core/Product/productDetaisCard"
import { BsFillCaretRightFill } from "react-icons/bs"
import { setLoading } from "../slices/authSlice"
import borderImage from "../assets/Images/Icons/22890281_6722012.svg";
import BorderImages from "../components/common/BorderImage"
import image1 from "../assets/Images/Icons/cherry-blossom.png";
import image2 from "../assets/Images/Icons/flower (1).png";
import { FaShareSquare } from "react-icons/fa"
import copy from "copy-to-clipboard"
import Footer from "../components/common/Footer"
import SafeProduct from "../components/core/Product/SafeProduct"
import ProductSlider from "../components/core/Catalog/ProductSlider"
import { ProductEndpoints, catalogData } from "../services/apis"
import { apiConnector } from "../services/apiConnector"
import ReviewSlider from "../components/common/ReviewSlider"

function ProductDetails() {
const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const [response, setResponse] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const { paymentLoading } = useSelector((state) => state.product)
  const [thumbnailPhoto , setThumbnailPhoto] = useState("")
  const [products, setProducts] = useState([]);
  const [subCategoProducts, setSubCategoryProducts] = useState(" ")


useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await apiConnector("GET", ProductEndpoints.GET_ALL_PRODUCT_API);
        const productData = res.data.data;
        console.log("Product data ", res)
        console.log("Data:", productData); // Log the received data
        
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    getProducts(); // Call the function to fetch data

  }, []);

  


  const { productId } = useParams()

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.productDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])
  console.log("avgReviewCount: ", avgReviewCount)

    useEffect(() => {
        // Calling fetchCourseDetails fucntion to fetch the details
        ;(async () => {
          try {
            const res = await fetchProductDetails(productId)
            console.log("product details res: ", res)
            setResponse(res)
          } catch (error) {
            console.log("Could not fetch Product Details")
          }
        })()
      }, [productId])

      if (loading || !response) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!response.success) {
        return false
      }
    
      const {
        _id: product_id,
        productName,
        productDescription,
        thumbnail,
        tag,
        price,
        whatYouWillLearn,
        Content,
        ratingAndReviews,
        instructions,
        studentsEnrolled,
        subCategory_id,
        createdAt,
      } = response.data?.productDetails

    const handleBuyProduct = () => {
    if (token) {
      buyProduct(token, [productId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }
  
  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.ADMIN) {
      toast.error("You are an Admin. You can't buy a product.");
      return;
    }
    if (token) {
      dispatch(addToCart({
        product: response?.data?.productDetails,
        quantity: 1,
      }));

      toast.success("Product added to cart successfully!"); // Add this toast

      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  const imageHandler = (thumbnail) => {
    setLoading(true);
    setThumbnailPhoto(thumbnail)
    setLoading(false)

  }


    return(
        < >
    

        <div className={`relative w-full bg-peach-300  mt-[8rem]`}>

        <div className=" ">
          <img className="w-[13rem] opacity-70 absolute -left-2 " src={image1} />
          <img className="w-[13rem] opacity-70 absolute -right-4 top-52   " src={image2} />
        </div>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 bg-bistre lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]">
              </div>
            </div>
            <div className="flex p-14 space-x-20 ">
            <img
              src={ thumbnailPhoto == 0   ? (thumbnail[0]) : (thumbnailPhoto)} 
              alt="thumbnail" 
              className="w-[445px] h-[625px] absolute object-contain  -top-16 overflow-clip "  
              />
              <div className="relative w-[10rem]">

              </div>

            
            
            <div className="flex absolute top-[36rem] left-[6rem]  flex-wrap space-x-4 items-center justify-evenly">
              <div className="h-[17rem] max-w-[15rem] border-4 overflow-clip border-bistre rounded-xl cursor-pointer flex justify-center items-center bg-peach-300  ">
              <img
               onClick={() => imageHandler(thumbnail[1])} 
              src={thumbnail[1]}
              className="object-fill   " />
              </div>
              <div className="h-[17rem] max-w-[15rem] border-4 overflow-clip border-bistre rounded-xl cursor-pointer flex justify-center items-center bg-peach-300  ">
              <img
               onClick={() => imageHandler(thumbnail[2])} 
              src={thumbnail[2]}
              className="w-[16rem] mx-auto " />
              </div>
              <div className="h-[17rem] max-w-[15rem] border-4 overflow-clip border-bistre rounded-xl cursor-pointer flex justify-center items-center bg-peach-300  ">
              <img
               onClick={() => imageHandler(thumbnail[3])} 
              src={thumbnail[3]}
              className="w-[16rem]" />
              </div>
              <div className="h-[17rem] max-w-[15rem] border-4 overflow-clip border-bistre rounded-xl cursor-pointer flex justify-center items-center bg-peach-300   ">
              <img
               onClick={() => imageHandler(thumbnail[4])} 
              src={thumbnail[4]}
              className="w-[16rem]" />
              </div>

              
            </div>

           
      
            <div
              className={`z-30 my-5 flex flex-col items-center text-center w-[920px] justify-center gap-4 py-5 text-lg text-peach-300 `}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {productName}
                </p>
              </div>
              <p className={`flex`}>
              {tag?.map((item, i) => {
                return (
                  <p className={`flex gap-2 `} key={i}>
                    <span>{ item }</span>
                    <p>|</p>
                  </p>
                )
              })}
              </p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                
              </div>
              
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> {Content}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                </p>
                </div>
                <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {price}
          </div>
          <div className="flex flex-col gap-4">
        
            {
              <button onClick={handleAddToCart}
              className="blackButton bg-peach-300 text-bistre w-[336px] h-[48px]  rounded-[8px] p-[12px] shadow-inner-lg font-bold  ">
                Add to Cart
              </button>
            }
            <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
          </div>
         </div> 
              
            </div>
            
            


            
          </div>
          </div>
        </div>
      </div>

      <div className="mt-[27rem] right-[4rem] top-[400px] mx-auto min-h-[600px] translate-y-24 md:translate-y-0 lg:block">
      <ProductDetailsCard
      product={response?.data?.productDetails}
              setConfirmationModal={setConfirmationModal}
         />
      </div>

      <div>
      <productFeature subcategoryid={subCategory_id} />
      <SafeProduct  />
        
      </div>

<div className="bg-bistre ">
    <section className="w-11/12 mx-auto space-y-5 mt-[100px] py-7" >
     <div className="flex justify-between">
     <h1 className="font-ginger  text-[50px] mb-4 text-peach-500 ">Similar Products</h1>
     <Link to={"/allProduct"} >
     <div className="mt-16 cursor-pointer text-peach-500 font-inter hover:font-bold border-2  py-2 px-5 mr-5 rounded-lg " > View All</div>
     </Link>
     </div>
     <ProductSlider  Products={products} color={"peach-500"} />
     </section>  
     </div>

     <div >
     <div className="w-11/12 mx-auto space-y-5 mt-[100px] flex flex-col space-x-6 py-7">
      <div className="font-ginger  text-[50px] mb-4 text-bistre mx-auto">What our customer say</div>
      <ReviewSlider />
      </div>
     </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  
        

        </>


    )

}

export default ProductDetails