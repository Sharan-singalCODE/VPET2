var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedbut,addbut;
var fedTime,lastFed;
var foodObj;
function preload(){
   dogImg=loadImage("images/dogImg1.png");
   dogImg1=loadImage("images/dogImg.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);
  foodObj = new Food();
  addbut = createButton("ADD")
  fedbut = createButton("FEED")

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

 database.ref('Food').on('value',readStock)
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
  
 // if(keyWentDown(UP_ARROW)){
 //   writeStock(foodS);
//   dog.addImage(dogImg1);
 foodObj.display()
 fedTime = database.ref('feedTime');
 fedTime.on("value",function(data){
   lastFed = data.val()
 })
console.log(foodS)
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
function addFood(){
if(mousePressedover(addbut)){
  foodS=+1;
  database.ref('/').update({
    Food:foodS
  })
};
}
 function feedFood(){
 dog.addImage(dogImg1);
 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
    Feedtime:hour()
 })
 
  
  
}