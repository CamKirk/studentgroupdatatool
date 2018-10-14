let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let student = new Schema({
    "firstName": String,
    "lastName": String,
    "fName": String,
    "lName": String,
    "groups": Array
});

module.exports = mongoose.model('student',student);