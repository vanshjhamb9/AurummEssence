import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import productReducer from "../slices/productSlice"
import viewProductReducer from "../slices/viewProductSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    product:productReducer,
    viewProduct:viewProductReducer,
})

export default rootReducer