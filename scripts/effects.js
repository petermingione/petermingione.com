function anim1(){
	$("#anim").animate({color: "white"}, 4000  , function() {anim2();});	
}

function anim2(){
	$("#anim").animate({color: "black"}, 6000 , function() {anim1();});
}

function loadWelcome(){
	$("#animation-title-inside").hide();
	$("#animation-title-inside").html(welcome);
	$("#animation-title-inside").fadeIn(250);
}

function loadFaceBuilder(){
	$("#animation-title-inside").hide();
	$("#animation-title-inside").html(face_builder);
	$("#animation-title-inside").fadeIn(250);
}

function loadPeanutButterJelly(){
	$("#animation-title-inside").hide();
	$("#animation-title-inside").html(peanut_butter_jelly);
	$("#animation-title-inside").fadeIn(250);
}

function loadCentralParkZoo(){
	$("#animation-title-inside").hide();
	$("#animation-title-inside").html(central_park_zoo);
	$("#animation-title-inside").fadeIn(250);
}

function loadGhostBusters(){
	$("#animation-title-inside").hide();
	$("#animation-title-inside").html(ghost_busters);
	$("#animation-title-inside").fadeIn(250);
}

function loadPortfolio(){
	$("#animation-title-inside").hide();
	$("#animation-title-inside").html(portfolio);
	$("#animation-title-inside").fadeIn(250);
}

$(document).ready(
				function(){

					// $("#link-1").hover( loadFaceBuilder , loadWelcome );
					// $("#link-2").hover( loadPeanutButterJelly , loadWelcome );
					// $("#link-3").hover( loadCentralParkZoo , loadWelcome );
					// $("#link-4").hover( loadGhostBusters , loadWelcome );

					//$("#link-1").mouseenter( loadFaceBuilder );
					//$("#link-1").mouseleave( loadWelcome );
					//$("#link-2").mouseenter( loadFaceBuilder );
					//$("#link-2").mouseleave( loadWelcome );
					//$("#link-3").mouseenter( loadFaceBuilder );
					//$("#link-3").mouseleave( loadWelcome );
					//$("#link-4").mouseenter( loadFaceBuilder );
					//$("#link-4").mouseleave( loadWelcome );

					$("#link-1").on("mouseenter", loadFaceBuilder );
					$("#link-1").on( "mouseleave", loadWelcome );
					$("#link-2").on("mouseenter", loadPeanutButterJelly );
					$("#link-2").on( "mouseleave", loadWelcome );
					$("#link-3").on("mouseenter", loadCentralParkZoo );
					$("#link-3").on( "mouseleave", loadWelcome );
					$("#link-4").on("mouseenter", loadGhostBusters );
					$("#link-4").on( "mouseleave", loadWelcome );
					$("#link-5").on("mouseenter", loadPortfolio );
					$("#link-5").on( "mouseleave", loadWelcome );		

					anim1();
				}
			);


var welcome = "Hello ... I am a Multimedia Computer Programmer and Web Developer and I am currently living in New York City. To all of the visitor's to this site ... WELCOME! It is designed to be a place to view all of my projects. Below are links to games and multimedia apps that I have created. Hover over one of the links to see a description. For more of my projects click the portfolio link on the top or bottom of this page.";

var face_builder = "This is an interactive flash animation that allows you to build a face. After the initial animation stops, use the mouse to drag the parts of the face on top of each other.";

var peanut_butter_jelly = "This is a game called Peanut Butter Jelly Time. You are a bear. The object of the game is to collect as many PB&J sandwiches as you can in thirty seconds. There are three levels of difficulty. The walls of the maze are virtual. You are on your own not to cheat. If the song annoys you, you can silence it by checking the MUTE check box.";

var central_park_zoo = "This is an interactive piece of software designed to be a kiosk for The New York Central Park Zoo. Click on ENTER, then explore the zoo.";

var ghost_busters = "Here's a little flash animation based on the Ghostbuster's movie. To start or stop the animation click on the ghost. It has two settings ... on and off.";

var portfolio = "Click here to see more of my projects ... Here you will find web pages, banner adds, java apps and games, and more.";

