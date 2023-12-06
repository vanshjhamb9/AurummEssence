// getCatalogPageData.js
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  console.log("In page And Component ", categoryId);
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch Category page data");
    }

    result = response?.data;
  } catch (error) {
    console.error("CATALOG PAGE DATA API ERROR:", error);
    toast.error(error.message);
    result = error.response?.data;
  }

  toast.dismiss(toastId);
  return result;
};
