import processing.core.*; 
import processing.xml.*; 

import ddf.minim.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class Project2 extends PApplet {

/** 
  CIS 3.5 - Fall 2010
  Project Two
  Peter Mingione
  Version 12
*/

// import statement for audio

/***********************************************
  Variables:
************************************************/
// audio player variables
Minim minim;
AudioPlayer song;
AudioPlayer song2;
// for positioning the UFO
float x; 
// for positioning the UFO
float y; 
// for the size of the UFO
float xx;  
// for the size of the UFO
float yy; 
// Used to create the flashing on the UFO
int vImage; 
// Used to create the flashing on the UFO
int numImages; 
// Used to seed the random number generator 
// that makes the UFO jittery
float speed;
// Number of frames in the Earth animation
int numFrames; 
// index for the array that holds the 
// gifs of the rotating Earth
float frame; 
// array that holds the gifs of the rotating Earth
PImage[] images; 
// background image of the moon and space
PImage backgr;
// background image for the start screen 
PImage backgr2;
// string to chose between the states
String state;
/***********************************************
  Fonts:  
************************************************/
PFont Font1;
PFont Font2;
PFont Font3;
PFont Font4;
PFont Font5;
PFont Font6;
PFont Font7;
PFont Font8;
PFont Font9;
PFont Font10;
PFont Font11;
PFont Font12;
PFont littleFont;
PFont mediumFont;
PFont bigFont;
/***********************************************
  setup():  
************************************************/
public void setup() 
{
  size(700, 700);
  //create a new audio player
  minim = new Minim(this);
  // loads .wav files from the data folder
  song = minim.loadFile("panic.wav");
  song2 = minim.loadFile("theglowing.wav");
  // loop play the start screen music
  song.setLoopPoints(0, 40500);
  song.loop();
  // sets the state to the stat screen
  state = "start";
  // create a font list array
  String[] fontList = PFont.list();
  // fonts for the start screen
  Font1 = createFont(fontList[0], 12);
  Font2 = createFont(fontList[0], 14); 
  Font3 = createFont(fontList[0], 16); 
  Font4 = createFont(fontList[0], 18); 
  Font5 = createFont(fontList[0], 22); 
  Font6 = createFont(fontList[0], 24); 
  Font7 = createFont(fontList[0], 26); 
  Font8 = createFont(fontList[0], 28);
  Font9 = createFont(fontList[0], 30);
  Font10 = createFont(fontList[0], 32);
  Font11 = createFont(fontList[0], 34);
  Font12 = createFont(fontList[0], 36);
  littleFont = createFont(fontList[0], 18); 
  mediumFont = createFont(fontList[0], 30);
  bigFont = createFont(fontList[0], 38);
  // sets the frame rate  
  frameRate(100);
  // variables for the UFO
  x = 350;
  y = 350;
  xx = 120;
  yy = 30;
  vImage = 0;  
  numImages = 3;
  speed = 5;
  // variables to alternate the UFO image
  numFrames = 44;
  frame = 0;
  images = new PImage[numFrames]; 
  // adds anit alias smoothing to the UFO
  smooth(); 
  // backgroung images for both screen states
  backgr = loadImage("moon.gif");
  backgr2 = loadImage("space.gif");
  // images for the rotating earth
  for(int i = 0; i < 44; i++)
  { 
      images[i] = loadImage("rotating_earth_" + i + ".gif"); 
  }
}
/***********************************************
  draw():  
************************************************/
public void draw() 
{
    if(state == "start")  // if statement to chose between states
    {    
        startScreen();      // calls the start screen funtion
     } 
     else 
    {     
         image(backgr,0,0); // sets the background image
         image (images[PApplet.parseInt(frame)], 270, 170); // sets the image of the earth
         frame = (frame + .0156625f) % numFrames; //increments the image of the earth 
                
         if(xx <= 0 || yy <= 0) // keeps the UFO from having a negative size
         {
              xx = 0;
              yy = 0;
          }
          
          draw_image(); // draws the UFO
          move(); // calls move function which makes the UFO jittery
        
          vImage = vImage + 1; //makes the UFO flash colors
          if(vImage >= numImages) 
         {
            vImage = 0;
         }
        
         if(x > width) // keeps the UFO from flying off screen right
         {
            x = width;
         }
         if(y > height) // keeps the UFO from flying off screen bottom
         {
            y = height;
         }
         if(x < 0) // keeps the UFO from flying off screen left
         {
            x = 0;
         }
         if(y < 0 ) // keeps the UFO from flying off screen top
         {
            y = 0;
         }
    }
}
/***********************************************
  stop() function needed for the audio player
************************************************/
public void stop()
{
  song.close();
  song2.close();
  minim.stop();
 
  super.stop();
}
/***********************************************
  Event Listeners:
************************************************/
public void mouseDragged()   // click and drag the UFO to reposition
{    
    if(mouseX <= (x + xx) && mouseY <= (y + yy))
    {
        x = mouseX;
        y = mouseY;
     }
}
public void keyPressed() // event listeners for arrow, + and - keys 
{
    println("pressed " + PApplet.parseInt(key) + " " + keyCode);
  
    if(keyCode == 61 || keyCode == 107)
    {
        xx += 12;
        yy += 3;
        println(xx + " " + yy);
    }
    if(keyCode == 45 || keyCode == 109)
    {
        xx -= 12;
        yy -= 3;
        println(xx + " " + yy);
    }
    if(keyCode == 40)
    {
        y += 20;
        println(xx + " " + yy);
    }
    if(keyCode == 38)
    {
        y -= 20;
        println(xx + " " + yy);
    }
        if(keyCode == 39)
    {
        x += 20;
        println(xx + " " + yy);
    }
    if(keyCode == 37)
    {
        x -= 20;
        println(xx + " " + yy);
    }
        if(keyCode == 81)
    {
        stop();
        exit();
    }
}
/***********************************************
  Functions:  
************************************************/
public void move() // creates a jittery UFO
{
     x -= random(-speed, speed);
     y -= random(-speed, speed);
}
public void draw_image() // draw has three UFO graphics with rotating colors
{
    if(vImage == 0)
    {
        stroke(0,0,0);
        strokeWeight(xx * .02f); 
        fill(100,100,100);
        ellipseMode(CENTER);
        ellipse(x, y, xx, yy);
        
        stroke(100,100,100); 
        strokeWeight(xx * .02f); 
        fill(59,99,123);   
        ellipseMode(CENTER);
        ellipse(x, y - (yy * .25f),xx * .75f, yy * .75f);
        
        stroke(59,99,123); 
        noFill();
        arc(x, y - (yy * .25f),xx * .75f,yy * 2.25f, 11*PI/12, 25*PI/12);
 
    }
    if(vImage == 1)
    {
        stroke(59,99,123); 
        strokeWeight(xx * .02f); 
        noFill();   
        ellipseMode(CENTER);
        ellipse(x, y, xx, yy);
        
        stroke(0,0,0);
        strokeWeight(xx * .02f); 
        noFill();
        ellipseMode(CENTER);
        ellipse(x, y - (yy * .25f),xx * .75f, yy * .75f);
        
        stroke(100,100,100);
        noFill(); 
        arc(x, y - (yy * .25f),xx * .75f,yy * 2.25f, 11*PI/12, 25*PI/12);
 
    }
     if(vImage == 2)
    {
        stroke(100,100,100); 
        strokeWeight(xx * .02f); 
        fill(59,99,123);   
        ellipseMode(CENTER);
        ellipse(x, y, xx, yy);
        
        stroke(59,99,123); 
        strokeWeight(xx * .02f); 
        fill(100,100,100);   
        ellipseMode(CENTER);
        ellipse(x, y - (yy * .25f),xx * .75f, yy * .75f);
        
        stroke(0,0,0);
        noFill();
        arc(x, y - (yy * .25f),xx * .75f,yy * 2.25f, 11*PI/12, 25*PI/12);
 
        
    }    
}
/***********************************************
start screen function:  
************************************************/
public void startScreen()
{
  image(backgr2,0,0); // background image
  
  // creates the title
  textAlign(CENTER);
  fill(0xffffffff);
  textFont(bigFont); 
  text("Welcome to the UFObject Screen Saver", width/2, 80); 
  // creates the instructions
  textAlign(CENTER);
  fill(0xffffffff);
  textFont(Font1);
  text("He has a mind of", width/2, 120); 
  textFont(Font1);
  text("his own.So just let him", width/2, 140); 
  textFont(Font1);
  text("do his thing. Don't worry if", width/2, 160); 
  textFont(Font2);
  text("he gets stuck in a corner.", width/2, 180); 
  textFont(Font2);
  text("He will eventually find his", width/2, 201); 
  textFont(Font3);
  text("own way out. And he will", width/2, 223);
  textFont(Font4);  
  text(" never go out of view. But", width/2, 245); 
  textFont(Font5);
  text("if you want, feel free to", width/2, 270);
  textFont(Font6);
  text("grab him with the mouse", width/2, 297);
  textFont(Font7); 
  text("and drag him  back to the", width/2, 328);
  textFont(Font8); 
  text("center of the screen. You can", width/2, 358); 
  textFont(Font9); 
  text("also fly the UFObject yourself", width/2, 393); 
  textFont(Font10);
  text("using the arrow keys. Use the + & -", width/2, 428); 
  textFont(Font11);
  text("keys if you want to bring him in for a", width/2, 466); 
  textFont(Font12);
  text("closer look, or send him into outer space.", width/2, 506);
  textFont(bigFont);  
  text("Press Q to quit when  you've had enough.", width/2, 553);
  
  // creates the start button
  stroke(0xffffffff);
  strokeWeight(2);
  noFill();
  arc((width/2), 625,120,105, 11*PI/12, 25*PI/12);
  
  stroke(0xff000000); 
  strokeWeight(1);
  fill(0xffffffff);
  ellipseMode(CENTER);
  ellipse((width/2), 635, 144, 60);
  
  fill(0xffffffff);
  ellipseMode(CENTER);
  ellipse((width/2), 625, 125, 45);
  
  textFont(mediumFont);
  textAlign(CENTER);
  fill(0xff000000);
  text("START", width/2, 635); 
  
  // event listener for the start button
  if (mousePressed == true) 
  {
     if( mouseX <= (width/2)+150 && 
         mouseX >= (width/2)-150 && 
         mouseY <= 655 && 
         mouseY >= 605) 
     {
         state="UFObject";
         song.pause();
         song2.loop();
     }
  }
}
  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#FFFFFF", "Project2" });
  }
}
