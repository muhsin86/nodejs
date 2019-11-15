var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    courseId: String,
    courseName: String,
    coursePeriod: Number
});

module.exports = mongoose.model('Courses', courseSchema);