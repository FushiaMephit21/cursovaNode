const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.scheme = function() {
    return new Schema({
        id_pers: Number,
        name: String,
        date_of_birth: String,
        male: String,
        attachment: Number,
        naukzvannya: String,
        count_operations: Number,
        count_fatal_operations: Number
    });
}