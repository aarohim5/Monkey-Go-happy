var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running);
 monkey.scale = 0.1;
 

 ground = createSprite(400,350,900,10);
 ground.velocityX = -4;
 ground.x = ground.width/2;
  
  monkey.setCollider("circle",0,0,270);
  monkey.debug = false;
  
 
 score = 0;
 FoodGroup = createGroup();
 obstacleGroup = createGroup();
  
}

 
function draw() {
  background(225);
  
   text("SURVIVAL TIME : "+ score, 250,50);
  
  if(gameState === PLAY){
    if(ground.x<0){
    ground.x=ground.width/2;
  }
  
   if(keyDown("space")&&monkey.y>10){
     monkey.velocityY = -10;
   }
   monkey.velocityY = monkey.velocityY + 0.8;
    
  
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+2;
    }
    
     if(monkey.isTouching(obstacleGroup)){
       gameState=END;
     }
     Food();
     Enemy();
  
  }else if ( gameState === END){
    
        ground.velocityX = 0;
        monkey.velocityX = 0;
      
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
  
     
  }
  
   monkey.collide(ground);
  
  
    
  
 
  drawSprites();
  
}

function Food(){
  if(World.frameCount%80===0){
   banana= createSprite(400,100,20,20);
   Math.round(random(120,200));
   banana.scale = 0.1;
   banana.addImage(bananaImage);
   banana.velocityX=-11;
   banana.setlifetime = 100;
    FoodGroup.add(banana);
   } 
  
}

function Enemy(){
  if(World.frameCount%300===0){
    obstacle = createSprite(400,330,20,20);
    Math.round(random(100,200));
    obstacle.scale = 0.1;
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -8;
    obstacle.setlfetime = 50;
    obstacleGroup.add(obstacle);
  }
}





