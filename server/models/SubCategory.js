const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	feature:{
		type: [String],
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);