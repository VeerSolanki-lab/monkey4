var PLAY =1;
var END =0;
var gameState = PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, ground;
var r,rI
var over,overI;
var up,upI;
var endSound

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  rI=loadImage("images__3_-removebg-preview.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 overI=loadImage("pngtree-game-over-illustration-for-t-shirt-design-png-image_2217283-removebg-preview.png")
  upI=loadImage("download__7_-removebg-preview.png")
  FoodGroup= new Group()
  obstacleGroup= new Group()
  
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  score=0
  r=createSprite(windowWidth/2,windowHeight/2)
  r.addImage(rI);
  over=createSprite(windowWidth/2,windowHeight/2-150);
  over.addImage(overI);
  over.scale=0.5
  up=createSprite(windowWidth-40,windowHeight-40)
  up.addImage(upI);
  up.scale=0.3
  ground=createSprite(windowWidth,windowHeight,1500,10)
  
   monkey=createSprite(90,370,10,10)
  monkey.addAnimation("monkey_running",monkey_running)
  monkey.scale=0.1
  
  
  
  

  }
function draw() {
  background("green")
  
  if((mousePressedOver(up)||touches.length>0)&&monkey.y >= 350){
    monkey.velocityY=-10
    gameState=PLAY;
     touches = [];
  }
if (gameState === PLAY){
 
  monkey.velocityY = monkey.velocityY + 0.3
  monkey.collide(ground);
  ground.velocityX = -7 
 ground.x = ground.width/2;
    r.visible=false;
  monkey.visible=true;
  over.visible=false;
  up.visible=true;
 
 if(World.frameCount%200===0){
    fruits()
 }
  
  if(World.frameCount%300===0){
    stones()
 }
  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach()
    score=score+1
      }

}
  else if (gameState === END){
  monkey.velocityY=0;
    ground.velocityX=0;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.visible=false
    r.visible=true;
    over.visible=true;
    score=0
    up.visible=false;
    if(touches.lenght>0||mousePressedOver(r)){
      gameState=PLAY
      touches = []
    }
  }
  
  
  
  if (obstacleGroup.isTouching(monkey)){
    gameState=END
  }
 
 drawSprites()
  fill("white") 
  text("Score: "+ score, 500,50);
  
  
}

function fruits(){
  banana=createSprite(670,Math.round(random(windowWidth,windowHeight-200)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-5
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(windowWidth,windowHeight,10,10)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-4
  obstacle.scale=0.2
  obstacleGroup.add(obstacle)
}







