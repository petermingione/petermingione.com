function anim1(){
	$("#season_pass").animate({top:"275px"}, 4000  , "linear" , function() {anim2();});	
}

function anim2(){
	$("#season_pass").animate({top:"15px"}, 6000 , "linear" , function() {anim1();});
}

function emailValidation() {
	 validEmail = isValidEmail( document.getElementById("email_input").value  );
		
	if ( document.getElementById("email_input").value != "" ){
		
		if(!validEmail){ 
			alert("The email address you entered is not in the correct format.");
			document.getElementById("email_input").value = "";
		}		
	} 
}

function isValidEmail(email) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	return filter.test(email);
}

function zipValidation() {
	 validZip = isValidZip( document.getElementById("zip_input").value  );
		
	if ( document.getElementById("zip_input").value != "" ){
		
		if(!validZip){ 
			alert("Invalid Zip Code ... Five digits only please.");
			document.getElementById("zip_input").value = "";
		}		
	} 
}

function isValidZip(email){
	var filter = /^\d{5}$/;
	return filter.test(email);
}

function submitForm(){
	if(	document.getElementById("first_input").value == "" ||
		document.getElementById("email_input").value == "" ||
		document.getElementById("last_input").value == "" ||
		document.getElementById("address_input").value == "" ||
		document.getElementById("city_input").value == "" ||
		document.getElementById("state_input").value == "" ||
		document.getElementById("zip_input").value == "" ||
		document.getElementById("why_input").value == "" ||
		!document.getElementById("terms_input").checked ){
		
		alert("You have not completely filled out the form!");
	}
	else{
		alert(document.getElementById("first_input").value + " " + document.getElementById("last_input").value + 
		"\n\nYou have been entered into the \nOne Tough Mudder Sweepstakes.\n" + 
		"\nYour Address is:\n\nStreet: " +  document.getElementById("address_input").value + 
		"\nCity: " + 
		document.getElementById("city_input").value + 
		"\nState: " + 
		document.getElementById("state_input").value + 
		"\nZipcode: " + 
		document.getElementById("zip_input").value + 
		"\nEmail: " + 
		document.getElementById("email_input").value +
		"\n\nYour Text:\n\n" + 
		document.getElementById("why_input").value);
		
		// document.mudderform.submit();	
	
		document.getElementById("first_input").value = "";
		document.getElementById("email_input").value = "";
		document.getElementById("last_input").value = "";
		document.getElementById("address_input").value = "";
		document.getElementById("city_input").value = "";
		document.getElementById("state_input").value = "";
		document.getElementById("zip_input").value = "";
		document.getElementById("why_input").value = "";
		document.getElementById("terms_input").checked = false;
	}
}	

window.onload = function(){
	document.getElementById("submit").onclick=submitForm;
	document.getElementById("email_input").onblur = emailValidation;
	document.getElementById("zip_input").onblur = zipValidation;
	anim1();
};
