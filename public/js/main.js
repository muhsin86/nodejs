window.onload = loadCourse();


// LÄS IN KURSER MED AJAX ANROP
function loadCourse() { 
    $.getJSON("http://localhost:3000/courses/", function(data) {
     // RENSA LISTAN EFTER RADERING BIL
     $("tbody").html("");
    // FÖR LOOP ALLA BILAR 
    for(var i=0; i<data.length; i++) { 
        $("tbody").append("<tr><td>" + data[i].courseId + "</td><td>" + ' ' + data[i].courseName + "</td><td style='text-align: center;'>" + ' ' + data[i].coursePeriod + "</td><td>" + ' ' +  "<span onclick='deleteCar(\"" + data[i]._id + "\")'> <button style='width: 100%; border: none; background-color: rgb(255, 68, 0);; padding: 5px 8px; font-size: 12px; cursor: pointer; text-align: center;'>DELETE</button></td>' + '<td><button style='width: 100%; border: none; background-color:#cee40d; padding: 5px 8px; font-size: 12px; cursor: pointer; text-align: center;'>EDIT</button></td></tr>");
    }
});
}

// ADD COURSE
function addCourse() {
	$.ajax({
	  url: 'http://localhost:3000/courses/',
	  type: 'POST',
	  data: {
		courseId: 'courseId',
		courseName: 'courseName',
		coursePeriod: 'coursePeriod',
	  },
	  success: function(data) {
		console.log(data)
	  },
	  error: function(error) {
		console.log(error)
	  },
	})
  }

// RADERA COURSE
function deleteCar(id){
    $.ajax({
        type: "DELETE",
		url: "http://localhost:3000/courses/" + id,
		timeout: 2000,
    }).done(function(res) {
        console.log(res);

        // LADDA OM LISTAN EFTER RADERING EN AV BILARANA...
        loadCourse();

    });

    setInterval(loadCourse, 1000);
}


