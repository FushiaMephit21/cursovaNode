const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.scheme = function() {
	return new Schema({
		id_med: Number,
		number: Number,
		speciality: String,
		attachment: Number,
		count_wards: Number,
		count_beds: Number
	});
}