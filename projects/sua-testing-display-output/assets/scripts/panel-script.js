var data;
var index = 1;
var rotation = "";
var myVar = null;

// Collection of answer data returned from database.
var data = [];

$(document).ready( function(){

    rotation = prompt("Enter a number in milliseconds:", "10000");

    if (rotation == ""){
        rotation = 10000;
    }

    myVar = setInterval(function () {myTimer()}, rotation);

    getData();

    // $(".back-next-global").on("mouseenter", function(){
    //     $(".back-next-global").addClass("show-buttons");    
    // });

    // $(".back-next-global").on("mouseout", function(){
    //     $(".back-next-global").removeClass("show-buttons");
    // });

    $(".back-next").on("mouseenter", function(){
        $(".back-next").addClass("show-buttons");    
    });

    $(".back-next").on("mouseout", function(){
        $(".back-next").removeClass("show-buttons");
    });

    $("#play-pause").on("mouseenter", function(){
        $("#play-pause").addClass("show-buttons");    
    });

    $("#play-pause").on("mouseout", function(){
        $("#play-pause").removeClass("show-buttons");
    });

    $("#play").on("click", function(){
        myVar = setInterval(function () {myTimer()}, rotation);
        $("#play").hide();
        $("#pause").show(); 
        $("#play-pause").removeClass("button-hold");
        
    });

    $("#pause").on("click", function(){
        clearInterval(myVar);
        $("#pause").hide();
        $("#play").show();
        $("#play-pause").addClass("button-hold");  
        
    });
});

function myTimer() {

    if (index > 7){ index = 0; }

    index++;

    // Update data on the first page.
    if (index == 2 || index == 4 || index == 6 || index == 8){
        getData(); 
    }

    $.mobile.navigate('#page-' + index , {transition: "slide"});    
   
}

// Get answers from database.
function getData() {
    $.ajax({
        url: "http://drxbeta.com/sandboxes/peter/getData.php",
        dataType: "jsonp",
        success: plotData,

        error: function(XMLHttpRequest, textStatus, errorThrown){
           console.log('error status:' + XMLHttpRequest.status + ', error status text: ' + XMLHttpRequest.statusText);
        }
    });
}

function plotData(result) {
    if (!result) {
        console.log("Success but ...No data returned from server!");
        alert("Success but ... No data returned from server!");
        return;
    }

    data = result;

    // Remove old data from the date chart

    $("#col-2015-06-10").html("");
    $("#col-2015-06-11").html("");
    $("#col-2015-06-12").html("");
    $("#col-2015-06-13").html("");

    // alert( "2015-06-10 | " + $("#col-2015-06-10").html() );
    // alert( "2015-06-11 | " + $("#col-2015-06-11").html() );
    // alert( "2015-06-12 | " + $("#col-2015-06-12").html() );
    // alert( "2015-06-13 | " + $("#col-2015-06-13").html() );

    // Add data to the date chart
    for(var i=0;  i < result[0].answers.length; i++){
            
        $("#col-" + result[0].answers[i].answer_date).append('<div class="chart-marker" style="bottom:' + pixel_object[result[0].answers[i].sua_level] + 'px";></div>');

    }

    // Add mean to the date chart
    for(var i=0;  i < result[0].means.length; i++){

        $("#col-" + result[0].means[i].answer_date).append('<div class="chart-marker-red-dot" style="bottom:' + pixel_object[parseFloat(result[0].means[i].mean).toFixed(1) ] + 'px";></div>');
    }

    // Remove old data from the country chart

    $("#col-us").html("");
    $("#col-uk").html("");
    $("#col-germany").html("");
    $("#col-canada").html("");
    $("#col-brazil").html("");
    $("#col-france").html("");
    $("#col-italy").html("");
    $("#col-spain").html("");

    // alert(  "us | " + $("#col-us").html()  );
    // alert(  "uk | " + $("#col-uk").html()  );
    // alert(  "germany | " + $("#col-germany").html()  );
    // alert(  "canada | " + $("#col-canada").html()  );
    // alert(  "brazil | " + $("#col-brazil").html()  );
    // alert(  "france | " + $("#col-france").html()  );
    // alert(  "italy | " + $("#col-italy").html()  );
    // alert(  "spain | " + $("#col-spain").html()  );

    // Add data to the country chart
    for(var i=0;  i < result[1].answers.length; i++){ 

        if (result[1].answers[i].country == "us" || result[1].answers[i].country == "uk" || result[1].answers[i].country == "germany" || result[1].answers[i].country == "france" || result[1].answers[i].country == "italy" || result[1].answers[i].country == "spain" || result[1].answers[i].country == "brazil" || result[1].answers[i].country == "canada"){

                $("#col-" + result[1].answers[i].country).append('<div class="chart-marker" style="bottom:' + pixel_object[result[1].answers[i].sua_level] + 'px";></div>');
            }
    }

    // Add mean to the country chart
    for(var i=0;  i < result[1].means.length; i++){   

        if (result[1].means[i].country == "us" || result[1].means[i].country == "uk" || result[1].means[i].country == "germany" || result[1].means[i].country == "france" || result[1].means[i].country == "italy" || result[1].means[i].country == "spain" || result[1].means[i].country == "brazil" || result[1].means[i].country == "canada"){

            $("#col-" + result[1].means[i].country).append('<div class="chart-marker-red-dot" style="bottom:' + pixel_object[parseFloat(result[1].means[i].mean).toFixed(1)] + 'px";></div>');
        }
    }

    // Remove old data from the gender chart

    $("#col-F").html("");
    $("#col-M").html("");

    // alert( "Female | " + $("#col-F").html()  ); 
    // alert( "Male | " + $("#col-M").html()  );   

    // Add data to the gender chart
    for(var i=0;  i < result[2].answers.length; i++){   
        $("#col-" + result[2].answers[i].gender).append('<div class="chart-marker" style="bottom:' + pixel_object[result[2].answers[i].sua_level] + 'px";></div>');
    }

    // Add mean to gender chart
    for(var i=0;  i < result[2].means.length; i++){ 
       
        $("#col-" + result[2].means[i].gender).append('<div class="chart-marker-red-dot" style="bottom:' + pixel_object[parseFloat(result[2].means[i].mean).toFixed(1)] + 'px";></div>');
    }

    // Remove data from the age chart

    $("#col-2").html("");
    $("#col-3").html("");
    $("#col-4").html("");
    $("#col-5").html("");
    $("#col-6").html("");
    $("#col-7").html("");

    // alert( "20 | " + $("#col-2").html()  );  
    // alert( "30 | " + $("#col-3").html()  );  
    // alert( "40 | " + $("#col-4").html()  ); 
    // alert( "50 | " + $("#col-5").html()  );  
    // alert( "60 | " + $("#col-6").html()  );  
    // alert( "70 | " + $("#col-7").html()  );   
                
    // Add data to the age chart
    for(var i=0;  i < result[3].answers.length; i++){        
        $("#col-" + result[3].answers[i].age_group).append('<div class="chart-marker" style="bottom:' + pixel_object[result[3].answers[i].sua_level] + 'px";></div>');
    }

    // Add mean to age chart
    for(var i=0;  i < result[3].means.length; i++){  
      
        $("#col-" + result[3].means[i].age_group).append('<div class="chart-marker-red-dot" style="bottom:' + pixel_object[parseFloat(result[3].means[i].mean).toFixed(1)] + 'px";></div>');
    }

}

function numUp(){

    if (index > 7){ index = 0; }
    index++;

    // Update data on the first page.
    if (index == 2 || index == 4 || index == 6 || index == 8){ getData(); }
}

function numDown(){

    if (index < 2){ index = 9; }
    index--;

    // Update data on the first page.
    if (index == 2 || index == 4 || index == 6 || index == 8){ getData(); }   
}
			