// Peter Mingione March 11, 2015

// cloud aninmation
function anim_clouds_forward(){
	$("#sky-image").animate({left:"-275px"}, 50000  , "linear" , function() {anim_clouds_backward();});	
}

function anim_clouds_backward(){
	$("#sky-image").animate({left:"-800px"}, 50000 , "linear" , function() {anim_clouds_forward();});
}

function anim_tv_lid(){
	$("#tv-lid").animate({top:"-313px"}, 1500  , "linear" ,
		function() { setTimeout( 
			function(){ anim_fade_in(); } , 3000 );	
		}
	);	
}

function anim_fade_in(){
	$("#overlay").animate({ 'background-color': 'rgba(0, 0, 0, 0)'}, 2000  , "linear", function() {anim_sign(); anim_old_spice();
	});	
}

function anim_sign(){
	$("#click-here-sign").animate({top:"-1315px"}, 2000  , "linear");	
}

function anim_old_spice(){
	$("#old-spice").animate({width:"110px"}, 2000  , "linear");	
}

// loads the iframe player API code asynchronously.
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player (	'player', 
							 	{
									playerVars: { 
  													'autoplay': 1, 
  													'controls': 0,
  													'autohide':1,
  													'wmode':'opaque',
													'showinfo':0,
													'loop':1
												},
									//videoId: 'YlFl1OKRnEM',  // old spice locked
  									videoId: 'KXuho3eRfh4',  // old spice not locked
  									// videoId: 't0I4mTEdAf8',  // static
  									events: 	{
  													'onReady': onPlayerReady,
  													'onStateChange': onPlayerStateChange
  												}
  								}
  							);
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.mute();
}

// The API will call this function when the video player is ready.
function onPlayerStateChange(event) {
	player.playVideo();
}

window.onload = function(){

	document.getElementById("click-here-sign").onclick = function() {
		window.open('https://www.youtube.com/watch?v=KXuho3eRfh4');
	}

	anim_clouds_forward();
	anim_tv_lid();	
};
