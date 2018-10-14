let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let group = new Schema({
    "groupNumber": String,
    "members": String,
});

module.exports = mongoose.model('group',group);