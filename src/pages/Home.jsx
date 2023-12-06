import React from "react";
import bgImage from "./image/Hero.jpg"
import ProductSlider from "../components/core/Catalog/ProductSlider";
import { useEffect } from "react";
import { ProductEndpoints, categories } from "../services/apis";
import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import Error from "./Error";
import axios from "axios";
import allProduct from "./AllProduct";
import NewProducts from "../components/core/Catalog/NewProducts";
import Footer from "../components/common/Footer.js";
import Banner from "../assets/videos/Skin Care Product example commercial.mp4"



const Home = () => {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [productData, setProductData] = useState(null);
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    let video = document.querySelector("video");

    // Function to play/pause video based on scrolling
    const playPauseVideo = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && video.paused) {
          video.play();
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    };

    // Create an intersection observer
    let observer = new IntersectionObserver(playPauseVideo, { threshold: 0.2 });

    // Observe the video element
    observer.observe(video);

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    return(
 <div className="scroll-smooth">
   <section className="relative">
        <div
          className="relative w-full h-[80%] object-contain mb-32"
          style={{ transform: `translateY(${scrollY * 0.17}px)` }}
        >
          <img src={bgImage} alt="Background" className="w-full  h-[60%]  object-cover" />
        </div>
        <div className="absolute top-[15%] ml-[15%] w-[70%] mx-auto items-center text-center space-y-5">
          <button className="w-[200px] bg-black rounded-2xl text-white py-5 font-edu-sa text-2xl hover:bg-peach-900 hover:text-richblack-900 hover:border-2 border-black transition-all duration-200 leading-7 ease-linear">
            Learn More
          </button>
          <div className="text-[80px] flex flex-col bg-blend-hard-light font-head object-contain text-center">
            DISCOVER THE ESSENCE OF OUR BRAND
          </div>
        </div>
      </section>

      <div className="w-[60%] justify-center z-50 transition-all mx-auto flex flex-col items-center py-4 text-center space-y-6">
        <p className="flex leading-7 font-mono text-xl">WELCOME TO AURUM ESSENCE NATURALS</p>
        <h1 className="flex text-[50px] font-ginger text-[#69401f]">Skincare that is good for you and the planet</h1>
        <p className="leading-2 space-x-3 text-[24px] font-inter">The primary purpose of beauty products is to enhance one's natural features or address specific beauty concerns. They can help smooth and nourish the skin, even out the complexion, add color and definition to facial features, or maintain healthy and well-groomed hair and nails.</p>
        <button className="w-[350px] bg-black rounded-2xl text-white py-5 font-edu-sa text-2xl hover:bg-peach-900 hover:text-richblack-900 hover:border-2 border-black transition-all duration-200 leading-7 ease-linear">Feel the difference</button>
      </div>

<div className="w-11/12  my-56 ">
  <div className='mx-36  relative lg:w-[985px] lg:h-[480px] sm:w-[488px] xs-[370px] my-28 mt-9  shadow-[30px_100px_7px_20px_rgb(0,0,0,0.1)] lg:shadow-white'>    
  <video
                loop
                autoPlay
                poster=""
                className='mt-14   '
                controls
                muted={false}
            >
                <source src={Banner} type="video/mp4" />
            </video>
            </div>
            </div>

     <section className="w-11/12 mx-auto space-y-5 mt-[100px] py-7" >
     <div className="flex justify-between">
     <h1 className="font-ginger  text-[50px] mb-4 ">Shop Favorites</h1>
     <Link to={"/allProduct"} >
     <div className="mt-16 cursor-pointer font-inter hover:font-bold border-2  py-2 px-5 mr-5 rounded-lg " > View All</div>
     </Link>
     </div>
     <ProductSlider Products={products}  />
     </section>  

     <div className="w-11/12 h-[0.5px] mx-auto mt-5 bg-richblack-500"></div>

     <section className="w-11/12 mx-auto space-y-5 mt-[50px] py-7">
     <div className="flex justify-between">
     <h1 className="font-ginger  text-[50px] mb-4 ">New Launches</h1>
     <Link to={"/allProduct"} >
     <div className="mt-16 cursor-pointer font-inter hover:font-bold border-2  py-2 px-5 mr-5 rounded-lg " > View All</div>
     </Link>
     </div>
     <NewProducts Product={products} />
     </section>  
     
     <div>
     <Footer/>
     </div>
</div>
    )
}

export default Home;