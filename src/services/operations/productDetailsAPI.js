import { toast } from "react-hot-toast"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { ProductEndpoints, profileEndpoints } from "../apis"

const {
  PRODUCT_DETAILS_API,
  PRODUCT_CATEGORIES_API,
  PRODUCT_SUBCATEGORIES_API,
  GET_ALL_PRODUCT_API,
  CREATE_PRODUCT_API,
  EDIT_PRODUCT_API,
  DELETE_PRODUCT_API,
  GET_FULL_PRODUCT_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
} = ProductEndpoints

export const getAllProducts = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_PRODUCT_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_PRODUCT_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchProductDetails = async (productId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", PRODUCT_DETAILS_API, {
      productId,
    })
    console.log("PRODUCT_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("PRODUCT_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// fetching the available Product categories
export const fetchProductCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", PRODUCT_CATEGORIES_API)
    console.log("PRODUCT_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("PRODUCT_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// fetching the available Product categories
export const fetchProductSubCategories = async () => {
    let result = []
    try {
      const response = await apiConnector("GET", PRODUCT_SUBCATEGORIES_API)
      console.log("PRODUCT_SUBCATEGORIES_API API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Product Sub Categories")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("PRODUCT_SUBCATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
  }

// add the Product details
export const addProductDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Product Details")
    }
    toast.success("Product Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the Product details
export const editProductDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Product Details")
    }
    toast.success("Product Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// delete a Product
export const deleteProduct = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_PRODUCT_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Product")
    }
    toast.success("Product Deleted")
  } catch (error) {
    console.log("DELETE PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}



// get full details of a Product
export const getFullDetailsOfProduct = async (productId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_PRODUCT_DETAILS_AUTHENTICATED,
      {
        productId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("PRODUCT_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("PRODUCT_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// create a rating for Product
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}
