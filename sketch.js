var ghost,ghostImg;
var door,doorImg;
var climber,climberImg;
var invisibleBlock;
var bgImg,bgSound,bg;
var PLAY=1;
var END=0;
var gameState;
var climberGroup,invisibleBlockGroup;

function preload(){
  ghostImg=loadAnimation("ghost-jumping.png","ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  bgImg=loadImage("tower.png");
  bgSound=loadSound("spooky.wav");      
}

function setup(){
  createCanvas(600,600);
  
  gameState=PLAY;
  
  bg=createSprite(300,400,1,1);
  bg.addImage(bgImg);
  //bg.y=bg.height/2;
  //bg.scale=0.67;
  bg.velocityY=3;
  
  ghost=createSprite(300,200,1,1);
  ghost.addAnimation("ghost",ghostImg);
  ghost.scale=0.5;
  
  invisibleBlockGroup = new Group();
  climberGroup = new Group();
}

function draw(){
  background("black");
  if(gameState===PLAY){
  if(bg.y>600){
    bg.y=300;
  } 
    if(keyDown("space")){
    ghost.velocityY=-7;
  }
    if(keyDown("left")){
    ghost.x=ghost.x-2;
  }else if(keyDown("right")){
    ghost.x=ghost.x+2;
  }
  spawnDoors();
    climberGroup.collide(ghost);
    
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    gameState=END;
  }
  }
  if(gameState===END){
    textSize(30);
    fill("yellow")
    text("Game Over ",200,300)
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
   
  
  drawSprites();
}

function spawnDoors(){
  if(frameCount%150===0){
    door=createSprite(random(200,400),0,1,1);
    door.addImage(doorImg);
    door.velocityY=3;
    door.lifetime=200;
    climber=createSprite(door.x,door.y+30,1,1);
    climber.addImage(climberImg);
    climber.velocityY=3;
    climber.lifetime=200;
    climberGroup.add(climber);
    invisibleBlock=createSprite(door.x,door.y+50,60,1);
    invisibleBlock.velocityY=3;
    invisibleBlock.debug=true;
    invisibleBlock.visible=false;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
