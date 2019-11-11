/* IMPORT DIFFERENT FILES */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const jsonfile = require('jsonfile');
const port = process.env.PORT || 3000;

// LOAD JSON FILE
var file = "courses.json";
//
var courses = [];

//
jsonfile.readFile(file, function(err, obj) {
   if(err) {
      console.log(err);
   } else {
      console.log(obj),
      courses = obj;
   }
});

// USE MIDDLEWARE BUILT IN BODYPARS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ( {extended: false } ));

// CREATE STATIC SEARCH PATH
app.use(express.static(path.join(__dirname, 'public')));

// DOWNLOAD ALL COURSES
app.get("/courses", function(req, res) {
    res.send(courses);
});

// DOWNLOAD SPECIFIC COURSE WITH ID
app.get('/courses/:id', (req, res, next) => {

   var course_id = req.params.id;

   var obj = -1;
   for(var i=0; i < courses.length; i++){
      // Find the array index that holds _id = id   
       if(courses[i].id == course_id) obj = i; 
   } 
   console.log(courses[obj]);
   res.contentType('application/json');
   // If we find the course id then return the course object otherwise return error message
   res.send(obj>=0?courses[obj]:'SORRY NO ID WAS FOUND'); 

});

// ADDING COURSE
app.post("/courses/", function(req, res) {
   // DOWNLOAD NEXT COURSE WITH ID
   var newId = getNextId(courses);

   // CREATE A NEW OBJECT
   var newCourse = {
      id: newId,
      CourseId: req.body.CourseId,
      CourseName: req.body.CourseName,
      coursePeriod: req.body.coursePeriod
   }

   // ADD THE ARRAY
   courses.push(newCourse);

   // CALL WRITE TO JSON FILE
   saveJsonFile();

   // STAYS THE SAME PAGE AFTER POSTING A NEW COURSE
    res.redirect("/");
});



// REMOVE COURSE
app.delete("/courses/:id", function(req, res) {
   var deleteId = req.params.id;
   // LETA RÄTT PÅ COURSE SOM MOTSVARAR ID
   for(var i=0; i<courses.length; i++) {
      if(courses[i].id == deleteId) {
         courses.splice(i, 1);
      }
   }

   // CALL WRITE TO JSON FILE
   saveJsonFile();
});

// SAVE JSON-FILE
function saveJsonFile() {
   jsonfile.writeFile(file, courses, function(err) {
      console.log(err);
   });
}

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
   console.log('I AM GETTING THIS INFORMATION FROM' + ' ' + '=>' + ' ' + '(' + 'PORT:' +port + '...' + ')'));
