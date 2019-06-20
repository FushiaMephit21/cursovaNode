const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.scheme = function() {
	return new Schema({
		name: String,
		date_of_birth: String,
		male: String,
		posada: String,
		naukzvannya: String,
		attachment: Number,
		consultations: String
	});
}