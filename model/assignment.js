//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let assignmentModel = mongoose.Schema({
    Course: String,
    Instructor: String,
    Description: String,
    DueDate: Number
},
{
    collection:"Bio_assignments"
});
module.exports =mongoose.model('assignment',assignmentModel);
