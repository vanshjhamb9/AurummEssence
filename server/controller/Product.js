const Product = require("../models/Product")
const Category = require("../models/Category")
const SubCategory = require("../models/SubCategory")
const Section = require("../models/Section")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Function to create a new course
exports.createProduct = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    let {
      productName,
      productDescription,
      HowDoesItWork,
      KeyFeatures,
      Content,
      price,
      tag: _tag,
      subCategory,
      Benefits,
      KeyActiveIngredients,
      status,
      instructions: _instructions,
    } = req.body
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnail

    if (!thumbnail || thumbnail.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Thumbnails are mandatory",
      });
    }
    let thumbnailURLs = [];

    // Upload each thumbnail to Cloudinary
    for (let i = 0; i < thumbnail.length; i++) {
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail[i],
        process.env.FOLDER_NAME
      );
      thumbnailURLs.push(thumbnailImage.secure_url);
    }
    console.log("Thumbnail Image is -:" , thumbnail)

    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    console.log("tag", tag)
    console.log("instructions", instructions)
    // Check if any of the required fields are missing
    if (
      !productName ||
      !productDescription ||
      !HowDoesItWork ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !subCategory ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    // Check if the user is an instructor
    const adminDetails = await User.findById(userId, {
      accountType: "Admin",
    })

    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Admin Details Not Found",
      })
    }

    // Check if the tag given is valid
    const subCategoryDetails = await SubCategory.findById(subCategory)
    if (!subCategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Sub Category Details Not Found",
      })
    }
    // Create a new course with the given details
    const newProduct = await Product.create({
      productName,
      productDescription,
      admin: adminDetails._id,
      HowDoesItWork: HowDoesItWork,
      price,
      tag,
      Content,
      subCategory: subCategoryDetails._id,
      thumbnail: thumbnailURLs,
      status: status,
      instructions,
      Benefits,
      KeyActiveIngredients,
      KeyFeatures,
    })

//     // Add the new course to the User Schema of the Instructor
//     await User.findByIdAndUpdate(
//       {
//         _id: instructorDetails._id,
//       },
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },
//       { new: true }
//     )

    // Add the new product to the Sub Categories
    const subCategoryDetails2 = await SubCategory.findByIdAndUpdate(
      { _id: subCategory },
      {
        $push: {
          products: newProduct._id,
        },
      },
      { new: true }
    )
    if(!subCategoryDetails2){
      res.status(500).json({
        success: false,
        message: "Unable to add Product under SubCategory",
      })
    }
    console.log("HEREEEEEEEE", subCategoryDetails2)
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    })
  }
}

exports.editProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const updates = req.body;
    
    // Find the product by ID
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (req.files && req.files.thumbnails) {
      const thumbnailImages = req.files.thumbnails;
   
      const updatedImageUrls = [];
      
      for (let i = 0; i < thumbnailImages.length; i++) {
        const thumbnailImage = thumbnailImages[i];
        const thumbnailImageURL = await uploadImageToCloudinary(
          thumbnailImage,
          process.env.FOLDER_NAME
        );
        updatedImageUrls.push(thumbnailImageURL.secure_url);
      }
   
      // Append the updated image URLs to the existing images array

      product.thumbnail = [...updatedImageUrls];
    }
   
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          product[key] = JSON.parse(updates[key]);
        } else {
          product[key] = updates[key];
        }
      }
    }
    
    // Save the updated product to the database
    await product.save();
    // Fetch the updated product with populated data
    const updatedProduct = await Product.findById(productId)
      .populate({
        path: "admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("subCategory")
      .populate("ratingAndReviews")
      .populate({
        path: "Content",
      })
      .exec();



    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get Course List
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find(
      { status: "Published" },
      {
        productName: true,
        productDescription:true,
        price: true,
        thumbnail: true,
        admin: true,
        ratingAndReviews: true,
        sold: true,
        Benefits:true,
        Features:true,
        ActiveIngredients:true,
      }
    )
    .populate({
      path: "admin",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("subCategory")
    .populate("ratingAndReviews")
    .populate({
      path: "Content"
    })
    .exec()

    // Calculate the date threshold for new products (e.g., products created in the last 30 days are considered new)
    const currentDate = new Date();
    const daysLimitForNew = 20; // Adjust this threshold as needed

    // Enrich products with isNew property based on creation date
    const enrichedProducts = allProducts.map((product) => {
      const daysSinceCreation = (currentDate - product.createdAt) / (1000 * 60 * 60 * 24);
      product.isNew = daysSinceCreation <= daysLimitForNew;
      return product;
    });

    return res.status(200).json({
      success: true,
      data: enrichedProducts,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Product Data`,
      error: error.message,
    })
  }
}
// Get One Single Course Details
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()
//     // console.log(
//     //   "###################################### course details : ",
//     //   courseDetails,
//     //   courseId
//     // );
//     if (!courseDetails || !courseDetails.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }

//     if (courseDetails.status === "Draft") {
//       return res.status(403).json({
//         success: false,
//         message: `Accessing a draft course is forbidden`,
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       data: courseDetails,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }
exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body
    const productDetails = await Product.findOne({
      _id: productId,
    })
      .populate({
        path: "admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("subCategory")
      .populate("ratingAndReviews")
      .populate({
        path: "Content"
      })
      .exec()

    if (!productDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find product with id: ${productId}`,
      })
    }

    if (productDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

    // let totalDurationInSeconds = 0
    // productDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //     totalDurationInSeconds += timeDurationInSeconds
    //   })
    // })

    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        productDetails,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// exports.getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const userId = req.user.id
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     let courseProgressCount = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })

//     console.log("courseProgressCount : ", courseProgressCount)

//     if (!courseDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }

//     // if (courseDetails.status === "Draft") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: `Accessing a draft course is forbidden`,
//     //   });
//     // }

//     let totalDurationInSeconds = 0
//     courseDetails.courseContent.forEach((content) => {
//       content.subSection.forEach((subSection) => {
//         const timeDurationInSeconds = parseInt(subSection.timeDuration)
//         totalDurationInSeconds += timeDurationInSeconds
//       })
//     })

//     const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

//     return res.status(200).json({
//       success: true,
//       data: {
//         courseDetails,
//         totalDuration,
//         completedVideos: courseProgressCount?.completedVideos
//           ? courseProgressCount?.completedVideos
//           : [],
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// Get a list of Course for a given Instructor
// exports.getInstructorCourses = async (req, res) => {
//   try {
//     // Get the instructor ID from the authenticated user or request body
//     const instructorId = req.user.id
//     console.log(instructorId)

//     // Find all courses belonging to the instructor
//     const instructorCourses = await Course.find({
//       instructor: instructorId,
//     }).sort({ createdAt: -1 })

//     // Return the instructor's courses
//     res.status(200).json({
//       success: true,
//       data: instructorCourses,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve instructor courses",
//       error: error.message,
//     })
//   }
// }
// Delete the Course


exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body

    // Find the product
    const product = await Product.findById(productId)
    connsole.log("Product is"+product)
    if (!product) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const sold = product.sold
    for (const consumerId of sold) {
      await User.findByIdAndUpdate(consumerId, {
        $pull: { products: productId },
      })
    }

    // // Delete sections and sub-sections
    // const productSections = course.Content
    // for (const subCategoryId of productSections) {
    //   // Delete sub-sections of the section
    //   const subCategory = await SubCategory.findById(subCategoryId)
    //   if (subCategory) {
    //     const subCategorys = Category.subCategory
    //     for (const subCategoryId of subCategorys) {
    //       await SubCategory.findByIdAndDelete(subCategoryId)
    //     }
    //   }

    //   // Delete the section
    //   await Section.findByIdAndDelete(sectionId)
    // }

    // Delete the course
    await Product.findByIdAndDelete(productId)

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
};
