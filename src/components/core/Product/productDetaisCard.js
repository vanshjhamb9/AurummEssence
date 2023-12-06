import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constrants"


function ProductDetailsCard({ product, setConfirmationModal, handleBuyProduct }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: productId,
  } = product


  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div
        className={`flex flex-col  gap-4 rounded-md bg-bistre  p-4 text-richblack-5`}
      >

        <div className="px-8 py-5">
        <div className="justify-center max-w-[1200px] mx-auto text-center py-5">
        <p className={`my-2 text-3xl font-semibold  font-ginger`}>
            Product Description :
            </p>
            <p
            className="text-xl justify-center font-head">{product?.productDescription}</p>
          </div>

          <div className={``}>
            <p className={`my-2 mt-9 text-2xl font-ginger font-semibold `}>
            Prerequisites and instructions :
            </p>
            <div className="flex flex-col gap-3 text-xl mt-4 text-caribbeangreen-100">
              {product?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailsCard