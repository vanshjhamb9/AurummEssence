const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
	title: { type: String },
    sectionName:{ type:String },
	description: { type: String },
});

module.exports = mongoose.model("Section", SectionSchema);