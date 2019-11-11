window.onload = loadCourse();


// LÄS IN KURSER MED AJAX ANROP
function loadCourse() { 
    $.getJSON("http://localhost:3000/courses", function(data) {
     // RENSA LISTAN EFTER RADERING BIL
     $("tbody").html("");
    // FÖR LOOP ALLA BILAR 
    for(var i=0; i<data.length; i++) { 
        $("tbody").append("<tr><td>" + data[i].id + "</td><td>" + ' ' + data[i].courseId + "</td><td>" + ' ' + data[i].courseName + "</td><td style='text-align: center;'>" + ' ' + data[i].coursePeriod + "</td><td>" + ' ' +  "<span onclick='deleteCar(" + data[i].id + ")'><button style='width: 100%; border: none; background-color: #ffa500; padding: 5px 8px; font-size: 12px; cursor: pointer; text-align: center;'>RADERA</button></td></tr>");
    }
});
}


// RADERA COURSE
function deleteCar(id){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/courses/" + id
    }).done(function(res) {
        console.log(res);

        // LADDA OM LISTAN EFTER RADERING EN AV BILARANA...
        loadCourse();

    });

    setInterval(loadCourse, 1000);
}


