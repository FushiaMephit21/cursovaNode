const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.scheme = function() {
	return new Schema({
		name: String,
		give_consultation: String
	});
}