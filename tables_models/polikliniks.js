const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.scheme = function() {
    return new Schema({
        id_med_inst: Number,
        name: String
    });
}