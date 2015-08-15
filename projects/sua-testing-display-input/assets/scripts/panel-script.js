var male_female_visible = false;

// Answers object with default values.
var answers = {};
answers.country = null;
answers.gender = null;
answers.ageGroup = null;
answers.suaLevel = 0; // Required.

// Save answers to database.
function saveData() {
    $.ajax({
        type: "POST",
        dataType: "text",
        crossDomain: true,
        url: "http://drxbeta.com/sandboxes/peter/saveData.php",
        // url: "saveData.php",
        data: {answers: JSON.stringify(answers)},
        error: function(xhr, desc, e) {
            if( xhr.responseText !== ""){
                alert(xhr.responseText);
            }
        }
    });
}

$(document).ready( function(){

    // The home button resets all buttons and fields
    $(".home-button").on( "click" , function(){
        $("#submit-button").show();
        $("#checkbox-checked").hide();
        $("#checkbox-unchecked").show();
        $("#begin-grey").show();
        $("#begin-black").hide();
        $(".next-grey").show();
        $(".next-black").hide();
        $("#female-red").hide();
        $("#female").show();
        $("#male-red").hide();
        $("#male").show();
        $("#sua").val("");
        $("#country").val("");
        $("#country").css( "color", "#333333");
        $("#age").val(""); 
        $("#age").css( "color", "#333333");

        $("#drop-red").hide();
        $("#drop").show();

        $(".ui-input-text").val('').filter('.ui-slider-input').slider('refresh');
        $(".ui-checkbox input[type='checkbox'], .ui-radio input[type='radio']").prop("checked", false).checkboxradio("refresh"); 
        $('.ui-select select').val('').selectmenu('refresh');

        // Below is how you would reset select boxes if you were not using jquery-mobile...
        // First reset the menu:
        // $('#country option').prop('selected', function() {
        //     return this.defaultSelected;
        // });
        // or
        // $('#country').selectmenu('refresh');
        // or
        // $('#country').prop('selectedIndex',0);
        // or
        // document.getElementsByTagName('select').value = 1;
        // or  
        // document.getElementsByTagName('select').options.length = 0;
        // Then rest the select input's value:
        // $("#country").val("");
        // or
        // get elementById("country").value = "";

    });
 
	// page 1
	$("#checkbox-checked").on( "click" , function(){
    		$("#checkbox-checked").hide();
    		$("#checkbox-unchecked").show();
    		$("#begin-grey").show();
    		$("#begin-black").hide();
	});

    $("#checkbox-unchecked").on( "click" , function(){
            $("#checkbox-checked").show();
            $("#checkbox-unchecked").hide();
            $("#begin-grey").hide();
            $("#begin-black").show();
    });

    $("#begin-black").on( "click" , function(){
            $.mobile.navigate("#page-2", {transition: "slide"});         
    });

    $(document).on("pagebeforeshow","#page-1",function(){
        $("#skip").hide();
        $("#home").hide();
        $("#back-next-global").hide();
        $("#back-next-2").hide();
        $("#back-next-3").hide();
        $("#back-next-4").hide();
        $("#back-next-5").hide();
        $("#tracker").hide();
        $("#tracker-grey").animate({width: '1139px'});
    });

	// page 2
	$("#country").on( "change" ,function(){
		if( $("#country option:selected").val() != "" ){

            answers.country = $("#country option:selected").val();

  			$("#next-grey-2").hide();
            $("#next-black-2").show();
            $("#next-grey-global").hide();
            $("#next-black-global").show();
            $("#tracker-black").animate({width: '1035px'});
            $("#country").css( "color", "#8f1f42");

      	}else{

      		$("#next-grey-2").show();
      		$("#next-black-2").hide();
            $("#next-grey-global").show();
            $("#next-black-global").hide();
            $("#tracker-black").animate({width: '1139px'});
            $("#country").css( "color", "#333333");

      	}
	});

    $(document).on("pageshow","#page-2",function(){

        $("#skip").show();
        $("#home").show();
        $("#back-next-global").show();
        $("#tracker").fadeIn(500);
        $("#red-circle").animate({left: '15px'});
        $("#tracker-grey").animate({width: '1035px'});

        if($("#country option:selected").val() != "" ){   
            $("#next-black-2").show();
            $("#next-black-global").show();
            $("#next-grey-2").hide();
            $("#next-grey-global").hide();
            $("#tracker-black").animate({width: '1035px'});
        }
        else{
            $("#next-black-2").hide();
            $("#next-black-global").hide();
            $("#next-grey-2").show();
            $("#next-grey-global").show();
            $("#tracker-black").animate({width: '1139px'});    
        }

    });

	// page 3
	$("#male").on( "click" , function(){
        answers.gender = "M";
		$("#male-red").show();
		$("#male").hide();
        $("#tracker-black").animate({width: '695px'});

		if ( $("#female-red").is(':visible') ){
			$("#female-red").hide();
			$("#female").show();
		}
		if($("#female-red").is(':visible') || $("#male-red").is(':visible')){
			$("#next-grey-global").hide();
			$("#next-black-global").show();
            $("#next-grey-3").hide();
            $("#next-black-3").show();
            male_female_visible = true;
		}else{
			$("#next-grey-global").show();
			$("#next-black-global").hide();
            $("#next-grey-3").show();
            $("#next-black-3").hide();
            male_female_visible = false;
		}

	});

	$("#female").on( "click" , function(){
        answers.gender = "F";
		$("#female-red").show();
		$("#female").hide();
        $("#tracker-black").animate({width: '695px'});

		if ( $("#male-red").is(':visible')){
			$("#male-red").hide();
			$("#male").show();
		}
		if($("#female-red").is(':visible') || $("#male-red").is(':visible')){
			$("#next-grey-global").hide();
			$("#next-black-global").show();
            $("#next-grey-3").hide();
            $("#next-black-3").show();
            male_female_visible = true;
		}else{
			$("#next-grey-global").show();
			$("#next-black-global").hide();
            $("#next-grey-3").show();
            $("#next-black-3").hide();
            male_female_visible = false;
		}
	});

	$("#male-red").on( "click" , function(){
        delete answers.gender;
		$("#male").show();
		$("#male-red").hide();
        $("#tracker-black").animate({width: '790px'});
		if($("#female-red").is(':visible') || $("#male-red").is(':visible')){
			$(".next-grey").hide();
			$(".next-black").show();
            male_female_visible = true;
		}else{
			$(".next-grey").show();
			$(".next-black").hide();
            male_female_visible = false;
		}
	});

	$("#female-red").on( "click" , function(){
        delete answers.gender;
		$("#female").show();
		$("#female-red").hide();
        $("#tracker-black").animate({width: '790px'});
		if($("#female-red").is(':visible') || $("#male-red").is(':visible')){
			$(".next-grey").hide();
			$(".next-black").show();
            male_female_visible = true;
		}else{
			$(".next-grey").show();
			$(".next-black").hide();
            male_female_visible = false;
		}
	});

    $(document).on("pageshow","#page-3",function(){

        $("#skip").show();
        $("#home").show();
        $("#back-next-global").show();
        $("#tracker").show();
        $("#red-circle").animate({left: '357px'});
        $("#tracker-grey").animate({width: '695px'});
        $("#tracker-black").animate({width: '790px'});

        if(male_female_visible){
            $("#next-black-3").show();
            $("#next-black-global").show();
            $("#next-grey-3").hide();
            $("#next-grey-global").hide();
            $("#tracker-black").animate({width: '695px'});
        }else{
            $("#next-black-3").hide();
            $("#next-black-global").hide();
            $("#next-grey-3").show();
            $("#next-grey-global").show();
            $("#tracker-black").animate({width: '790px'});
        }

    });

	// page 4
    $("#age").on( "change" ,function(){
        if( $("#age option:selected").val() != "" ){
            answers.ageGroup = parseInt($("#age option:selected").val(), 10);
            $("#next-grey-4").hide();
            $("#next-grey-global").hide();
            $("#next-black-4").show();
            $("#next-black-global").show();
            $("#tracker-black").animate({width: '330px'});
            $("#age").css( "color", "#8f1f42");
        }else{
            $("#next-grey-4").show();
            $("#next-grey-global").show();
            $("#next-black-4").hide();
            $("#next-black-global").hide();
            $("#tracker-black").animate({width: '470px'});
            $("#age").css( "color", "#333333");
        }
    });

    $(document).on("pageshow","#page-4",function(){

        $("#skip").show();
        $("#home").show();
        $("#tracker").show();
        $("#red-circle").animate({left: '700px'});
        $("#tracker-grey").animate({width: '330px'});
        $("#tracker-black").animate({width: '470px'});

        if( $("#age option:selected").val() != "" ){
            $("#next-grey-4").hide();
            $("#next-grey-global").hide();
            $("#next-black-4").show();
            $("#next-black-global").show();
            $("#tracker-black").animate({width: '330px'});
        }else{
            $("#next-grey-4").show();
            $("#next-grey-global").show();
            $("#next-black-4").hide();
            $("#next-black-global").hide();
            $("#tracker-black").animate({width: '470px'});
        }

    });

    // page 5

    $('#sua').forceNumeric();

    $("#sua").on("keyup" ,function(){
        if( document.getElementById('sua').value != ""  &&   checkNumber(   document.getElementById('sua').value ) ){

            answers.suaLevel = parseFloat($("#sua").val());
            $("#next-grey-5").hide();
            $("#next-black-5").show();
            $("#next-grey-global").hide();
            $("#next-black-global").show();
            $("#drop").hide();
            $("#drop-red").show();
            $("#tracker-grey").animate({width: '0px'});
            $("#tracker-black").animate({width: '0px'});

            // if (document.getElementById('sua').value.length > 2){
            //     $("#validation-text").hide();
            // }

        }else{

            $("#next-grey-5").show();
            $("#next-black-5").hide();
            $("#next-grey-global").show();
            $("#next-black-global").hide();
            $("#drop-red").hide();
            $("#drop").show();
            $("#tracker-grey").animate({width: '0px'});
            $("#tracker-black").animate({width: '120px'});

            if (document.getElementById('sua').value.length > 2 &&
                document.getElementById('sua').value != "10." &&
                document.getElementById('sua').value != "11." &&
                document.getElementById('sua').value != "12." &&
                document.getElementById('sua').value != "13." &&
                document.getElementById('sua').value != "14." &&
                document.getElementById('sua').value != "15." &&
                document.getElementById('sua').value != "16."){
                $("#validation-text").show();
            } 
            else{
                $("#validation-text").hide();
            }  

        }

    });

    $("#sua").on( "focus" ,function(){

        if( document.getElementById('sua').value == "" ||  !checkNumber(document.getElementById('sua').value) ){
                $("#sua").val("");
                $("#validation-text").hide();
        }

    });

    $(document).on("pageshow","#page-5",function(){
        $("#skip").hide();
        $("#home").show();
        $("#back-next-global").show();
        $("#tracker").fadeIn(500);
        $("#red-circle").animate({left: '1044px'});

        if( document.getElementById('sua').value != "" && checkNumber( document.getElementById('sua').value ) ){

            $("#next-grey-5").hide();
            $("#next-black-5").show();
            $("#next-grey-global").hide();
            $("#next-black-global").show();
            $("#drop").hide();
            $("#drop-red").show();
            $("#tracker-grey").animate({width: '0px'});
            $("#tracker-black").animate({width: '0px'});

            if (document.getElementById('sua').value.length > 2){
                $("#validation-text").hide();
            }

        }else{
            $("#next-grey-5").show();
            $("#next-black-5").hide();
            $("#next-grey-global").show();
            $("#next-black-global").hide();
            $("#drop-red").hide();
            $("#drop").show();
            $("#tracker-grey").animate({width: '0px'});
            $("#tracker-black").animate({width: '120px'});

            if (document.getElementById('sua').value.length > 2){
                $("#validation-text").show();
            }   
            if (document.getElementById('sua').value.length < 3){
                $("#validation-text").hide();
            }        

        }
    });

    // page 6
    $("#submit-button").on( "click" ,function(){
        $("#back-black-6").hide();
        $("#back-grey-6").show();
        $("#submit-button").hide();
        saveData();
    });

    $(document).on("pagebeforeshow","#page-6",function(){
        $("#skip").hide();
        $("#home").show();
        $("#back-next-global").hide();
        $("#tracker").hide();
    });

});


jQuery.fn.forceNumeric = function () {
    return this.each(function () {
        $(this).keydown(function (e) {

            var key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&

                // numbers
                key >= 48 && key <= 57 ||

                // Numeric keypad
                key >= 96 && key <= 105 ||

                // comma, period and minus, . on keypad
                key == 190 || key == 188 || key == 109 || key == 110 ||

                // Backspace and Tab and Enter
                key == 8 || key == 9 || key == 13 ||

                // Home and End
                key == 35 || key == 36 ||

                // left and right arrows
                key == 37 || key == 39 ||

                // Del and Ins
                key == 46 || key == 45)

                return true;

            return false;
        });
    });
}


function checkNumber(num){
    if(num == "0.0"){
        return false;
    }
    if( num == "10.0" ||
        num == "10.1" ||
        num == "10.2" ||
        num == "10.3" ||
        num == "10.4" ||
        num == "10.5" ||
        num == "10.6" ||
        num == "10.7" ||
        num == "10.8" ||
        num == "10.9" ||
        num == "11.0" ||
        num == "11.1" ||
        num == "11.2" ||
        num == "11.3" ||
        num == "11.4" ||
        num == "11.5" ||
        num == "11.6" ||
        num == "11.7" ||
        num == "11.8" ||
        num == "11.9" ||
        num == "12.0" ||
        num == "12.1" ||
        num == "12.2" ||
        num == "12.3" ||
        num == "12.4" ||
        num == "12.5" ||
        num == "12.6" ||
        num == "12.7" ||
        num == "12.8" ||
        num == "12.9" ||
        num == "13.0" ||
        num == "13.1" ||
        num == "13.2" ||
        num == "13.3" ||
        num == "13.4" ||
        num == "13.5" ||
        num == "13.6" ||
        num == "13.7" ||
        num == "13.8" ||
        num == "13.9" ||
        num == "14.0" ||
        num == "14.1" ||
        num == "14.2" ||
        num == "14.3" ||
        num == "14.4" ||
        num == "14.5" ||
        num == "14.6" ||
        num == "14.7" ||
        num == "14.8" ||
        num == "14.9" ||
        num == "15.0" ||
        num == "15.1" ||
        num == "15.2" ||
        num == "15.3" ||
        num == "15.4" ||
        num == "15.5" ||
        num == "15.6" ||
        num == "15.7" ||
        num == "15.8" ||
        num == "15.9" ||
        num == "16.0"){
        return true;
    }
        var filter = /^[0-9]\.[0-9]$/ ;
        return filter.test(num) ;
}
			