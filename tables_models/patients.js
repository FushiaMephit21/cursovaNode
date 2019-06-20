const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.scheme = function() {
    return new Schema({
        id_pers: Number,
        name: String,
        date_of_birth: String,
        male: String,
        history_disease: String,
        attachment: Number,
        dogtor: Number,
        count_operations: Number,
        count_appointment: Number
    });
}