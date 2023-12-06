import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { addToCart, removeFromCart, updateQuantity } from "../../../../slices/cartSlice"
import GetAvgRating from "../../../../utils/avgRating"

export default function RenderCartProducts() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleIncreaseQuantity = (productId) => {
    dispatch(addToCart({ product: cart.find((item) => item._id === productId), quantity: 1 }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(removeFromCart({ productId, quantity: 1 }));
  };


  return (
    <div className="flex flex-1 flex-col">
      {cart.map((product, indx) => (
        <div
          key={product._id}
          className={`flex md:flex-row xs:flex-col p-16   bg-bistre mx-auto  rounded-lg  w-full md:border-0 xs:border-[1.5px] xs:border-richblack-200 xs:p-4 flex-wrap items-center ml-12   justify-between gap-6 ${
            indx !== cart.length - 1 && "border-2 border-b-bistre pb-6"
          } ${indx !== 0 && "mt-6"} `}
        > 
          <div className="flex flex-1 rounded-lg items-center justify-around md:flex-col gap-4 w-full xl:flex-row">
            <img
              src={product?.thumbnail[0]}
              alt={product?.productName}
              className="h-[288px] w-[420px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className=" font-ginger text-2xl  text-peach-200 ">
                {product?.productName}
              </p>
              <p className="text-md text-peach-800 ">
                {product?.subCategory?.name}
              </p>
              <div className="flex sm:flex-row xs:flex-col xs:gap-y-1 sm:items-center xs:items-start gap-2">
                <span className="text-yellow-5">{GetAvgRating(product?.ratingAndReviews)}</span>
                <ReactStars
                  count={5}
                  value={product?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-peach-50 ">
                  {product?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-col md:flex-col xs:flex-row md:gap-0 xs:gap-x-8 items-end space-y-2">
          <div className="flex items-center gap-x-1">
              <button
                onClick={() => handleDecreaseQuantity(product._id, product.quantity)}
                className="rounded-md border text-xl font-bold font-edu-sa   border-peach-800 bg-peach-200 py-1 px-2 text-bistre"
              >
                -
              </button>
              <span className="px-2 font-ginger text-2xl text-peach-800 ">{product.quantity}</span>
              <button
                onClick={() => handleIncreaseQuantity(product._id)}
                className="rounded-md border text-xl font-bold font-edu-sa border-peach-800 bg-peach-200 py-1 px-2 text-bistre"
              >
                +
              </button>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(product._id))}
              className="flex items-center gap-x-1 rounded-md border border-peach-800  bg-peach-200  py-3 px-[12px] text-bistre"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {product?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}