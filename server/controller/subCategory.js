const { Mongoose } = require("mongoose");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader")
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createSubCategory = async (req, res) => {
	try {
		const { name, description , category } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
		const SubCategorysDetails = await SubCategory.create({
			name: name,
			description: description,
      category:categoryDetails._id
		});
		console.log(SubCategorysDetails);
    // Add the new product to the Sub Categories
    const CategoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          subCategory: SubCategorysDetails._id,
        },
      },
      { new: true }
    )
    if(!CategoryDetails2){
      res.status(500).json({
        success: false,
        message: "Unable to add sub category under Category",
      })
    }
    console.log("Sub category added",CategoryDetails2)
		return res.status(200).json({
			success: true,
			message: "SubCategory Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.editSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.body
    const updates = req.body
    const subCategory = await SubCategory.findById(subCategoryId)

    if (!subCategory) {
      return res.status(404).json({ error: "Sub category not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("feature update update")
      const thumbnail = req.files.Feature
     const Image = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      subCategory.feature = Image.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          subCategory[key] = JSON.parse(updates[key])
        } else {
          subCategory[key] = updates[key]
        }
      }
    }

    await subCategory.save()

    const updatedSubCategory = await SubCategory.findOne({
      _id: subCategoryId,
    })
      .populate("category")
      .exec()

    res.json({
      success: true,
      message: "Sub Category updated successfully",
      data: updatedSubCategory,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
};


exports.showAllSubCategories = async (req, res) => {
	try {
    console.log("INSIDE SHOW ALL SUB CATEGORIES");
		const allSubCategorys = await SubCategory.find({});
		res.status(200).json({
			success: true,
			data: allSubCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


//categoryPageDetails 

exports.subCategoryPageDetails = async (req, res) => {
  try {
    const { subCategoryId } = req.body
    console.log("PRINTING CATEGORY ID: ", subCategoryId);
    // Get courses for the specified category
    const selectedSubCategory = await SubCategory.findById(subCategoryId)
    .populate()
      .populate({
        path: "products",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec()

    console.log("SELECTED COURSE", selectedSubCategory)
    // Handle the case when the category is not found
    if (!selectedSubCategory) {
      console.log("Sub Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Sub Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedSubCategory.products.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const subcategoriesExceptSelected = await SubCategory.find({
      _id: { $ne: subCategoryId },
    })
    let differentSubCategory = await SubCategory.findOne(
      subcategoriesExceptSelected[getRandomInt(subcategoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "products",
        match: { status: "Published" },
      })
      .exec()
      console.log("Different PRODUCT", differentSubCategory)
    // Get top-selling courses across all categories
    const allSubCategories = await SubCategory.find()
      .populate({
        path: "products",
        match: { status: "Published" },
      })
      .exec()
    const allProducts = allSubCategories.flatMap((subCategory) => subCategory.products)
    const mostSellingProduct = allProducts
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
     // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedSubCategory,
        differentSubCategory,
        mostSellingProduct,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}