import { useEffect, useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserPurchasedProducts } from "../../../services/operations/profileAPI"

export default function History() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [purchasedProducts, setPurchasedProducts] = useState(null)
  const getPurchasedProducts = async () => {
    try {
      const res = await getUserPurchasedProducts(token);

      setPurchasedProducts(res);
    } catch (error) {
      console.log("Could not fetch History.")
    }
  };
  useEffect(() => {
    getPurchasedProducts();
  }, [])

  return (
    <>
      <div className="text-3xl text-richblack-50">Purchase History</div>
      {!purchasedProducts ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !purchasedProducts.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not purchased any product yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex xs:hidden sm:hidden md:flex lg:flex-row rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Product Name</p>
            <p className="w-1/4 px-4 py-3">Product Details</p>
          </div>
          {purchasedProducts.map((product, i, arr) => (
            <div
              className={`flex items-center lg:space-x-24  border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex lg:flex-row sm:flex-col md:flex-row xs:flex-col lg:w-[67%] md:w-[55%] sm:w-[100%] xs:w-[100%] cursor-pointer md:items-center sm:items-start xs:items-start gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${product?._id}/section/${product.Content?.[0]?._id}}`
                  )
                }}
              >
                <img
                  src={product.thumbnail[0]}
                  alt="product_img"
                  className=" lg:w-44 md:w-40 sm:w-36 xs:w-32  xs:h-24  rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{product.productName}</p>
                  <p className="text-xs text-richblack-300">
                    {product.productDescription.length > 50
                      ? `${product.productDescription.slice(0, 50)}...`
                      : product.productDescription}
                  </p>
                </div>
              </div>
              <div className="flex w-full md:flex-row lg:flex-row sm:flex-col xs:flex-col">
              
              </div>
              </div>
            
          ))}
        </div>
      )}
    </>
  )
}