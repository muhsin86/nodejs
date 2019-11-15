/* IMPORT DIFFERENT FILES */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const jsonfile = require('jsonfile');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

// CONNECT TO THE MONGODB
mongoose.connect('mongodb://localhost:27017/coursedb', { useUnifiedTopology: true });

// READ MONGODB SCHEMA 
var Courses = require('./app/models/courses.js');

// USE MIDDLEWARE TO ALLOW EVERY DOMAIN CAN READ, WRITE, UPDATE AND DELETE 
app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	next();
});


// USE MIDDLEWARE BUILT IN BODYPARS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ( {extended: false } ));

// CREATE STATIC SEARCH PATH
app.use(express.static(path.join(__dirname, 'public')));

// DOWNLOAD ALL COURSES
app.get("/courses/", function(req, res) {
   Courses.find(function(err, Courses){
      if(err){
         res.send(err)
      }
      res.json(Courses);
   });
});

// GET SPECIFIC COURSE WITH ID
app.get('/courses/:id', (req, res, next) => {

   var course_id = req.params.id;

   var obj = -1;
   for(var i=0; i < Courses.length; i++){
      // Find the array index that holds _id = id   
       if(Courses[i].id == course_id) obj = i; 
   } 
   console.log(Courses[obj]);
   res.contentType('application/json');
   // If we find the course id then return the course object otherwise return error message
   res.send(obj>=0?Courses[obj]:'SORRY NO ID WAS FOUND'); 

});

// ADDING A NEW COURSE
app.post("/courses/", function(req, res) {

   var course = new Courses();
   // CREATE A NEW OBJECT
   course.courseId = req.body.courseId;
   course.courseName = req.body.courseName;
   course.coursePeriod = req.body.coursePeriod;

   // SAVE AND READ EVEN ERROR MESSAGES 
   course.save(function(err){
    if(err){
   res.send(err);
    }
   });


   // STAYS THE SAME PAGE AFTER POSTING A NEW COURSE
    res.redirect("/");
});



// DELETE COURSE WITH SPECIFIC ID
app.delete("/courses/:id", function(req, res) {
   var deleteId = req.params.id;
   
   Courses.deleteOne({
      _id:deleteId
   }, function(err, Courses){
      if(err){
         res.send(err)
      }
      res.json({message: "ONE COURSE WAS DELETED WITH ID NR:" + deleteId + "IN THE COURSE LIST..."});
   });
});

// PICK UP THE HIGHEST ID
function getNextId(arr) {
   var max = 0;

   for(var i=0; i<arr.length; i++) {
      var current = parseInt(arr[i].id);
      if(current > max) { max = current; }
      }

      return max + 1;
}


app.listen(port, () => 
   console.log('LISTENING ON PORT:' + ' ' + port + '...'));
