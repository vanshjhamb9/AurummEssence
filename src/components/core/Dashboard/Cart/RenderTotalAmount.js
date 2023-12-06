import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconButton"
import { buyProduct } from "../../../../services/operations/purchaseProduct"

import { applyCoupon, updateQuantity } from "../../../../slices/cartSlice";
import { useState } from "react";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    dispatch(applyCoupon({ couponCode }));
  };

  const handleBuyProduct = () => {
    const products = cart.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    }));

    console.log("Products in cart are :", products);
    buyProduct(token, products, user, navigate, dispatch);
  };
  return (
    <div className="min-w-[260px] rounded-md border-[1px] space-y-6 border-peach-800 bg-bistre p-6">
      <p className="mb-1 text-lg font-medium text-peach-500 ">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="border rounded-md py-1 px-2 focus:outline-none focus:border-peach-500"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-peach-200 text-bistre py-1 px-4 rounded-md"
        >
          Apply
        </button>
      </div>
      <div className="flex text-lg text-peach-500 space-x-3 ">
        <p>Shipping charges :</p>

        <p className="text-xl line-through">100 </p>  <span className="text-pink-300 text-xl ">Free </span> 
      </div>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyProduct}
        customClasses="w-full justify-center"
      />
    </div>
  )
}