const mongoose = require("mongoose");

// Define the Courses schema
const productsSchema = new mongoose.Schema({
	productName: { type: String },
	productDescription: { type: String },
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	HowDoesItWork: {
		type: String,
	},
	Content: {
		type: [String],
	},
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	price: {
		type: Number,
	},
	thumbnail: {
		type: [String], // Store multiple image URLs as an array of strings
	  },
	tag: {
		type: [String],
		required: true,
	},
	Benefits:{
		type:[String],
		required: true,
	},
	KeyFeatures:{
		type:[String],
        required: true
	},
	isNew:{
		type:Boolean
	},
	KeyActiveIngredients:{
		type:[String],
		required:true
	},
	subCategory: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "SubCategory",
	},
	sold: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	}
});

// Export the Courses model
module.exports = mongoose.model("Product", productsSchema);