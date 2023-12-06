import { useDispatch, useSelector } from "react-redux"

import RenderTotalAmount from "./RenderTotalAmount"
import { set } from "react-hook-form"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { resetCart } from "../../../../slices/cartSlice"
import RenderCartProducts from "./RenderCartProducts"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)


  const [Items , setItems] = useState([])

  const emptyHandler = () => {
    {
      totalItems > 0 ? (setItems(totalItems[0]))
       : (toast.success("Items are already Empty"))
    }
  }

  const dispatch = useDispatch()

  return (
    <>
      {/* <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1> */}
      <p className="border-b flex flex-row border-b-bistre pb-2 font-semibold text-bistre mt-24 justify-between">
       <p className="mx-auto "> {totalItems} Products in Cart </p>
       {total > 0 && (
        <div className=" cursor-pointer text-bistre border-2 border-bistre p-2 rounded-md mr-5"
       onClick={() => dispatch(resetCart(totalItems))} >Empty</div>
       )}
     </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col items-start gap-x-10 gap-y-6 space-x-28 w-11/12   lg:flex-row">
          <RenderCartProducts />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-bistre">
          Your cart is empty
        </p>
      )}
    </>
  )
}