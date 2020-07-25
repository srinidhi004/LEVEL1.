var runner,runnerImg;
var building1,building2,building3,building4,building5;
var building;
var buildingbg, buildingbgimg;
var farm,farmImg;
var parachute,parachuteImg;
var mountain, mountainImg,mountI;
var c1,c1img,c2,c2img;
var coin,coinImg;
var cycling,cyclingImg;
var desertImg,desert;
var dig,digImg;
var farm,farmImg;
var farm,farmImg, paper,paperImg;
var treasureChest,stadium;
var treasureChestimg,stadiumimg;
var buildingGroup;
var steps,stepsimg;
var ig, ig2, ig3;
var PLAY=1;
var END= 0;
var gamestate= PLAY;
var LEVEL1;
var LEVEL2;
var LEVEL3;
var LEVEL4;
var LEVEL5;
var level=LEVEL2;
var coingroup, buildingGroup;
var retry, retryimg;
var count,coin;
var farmbg;
var nextlevel;
function preload(){
  runnerImg=loadAnimation("Images/runner1.png","Images/runner3.png","Images/runner2.png","Images/runner4.png");
  runnerJump= loadImage("Images/runner2.png");
  runnerfall= loadImage("Images/runner3.png");
  building1= loadImage("Images/building1.png");
  building2= loadImage("Images/building2.png");
  building3= loadImage("Images/building3.png");
  building4= loadImage("Images/building4.png");
  building5= loadImage("Images/building5.png");
  buildingbgimg= loadImage("Images/buildingBG.png");
  farmImg=loadImage("Images/farm.jpg");
  parachuteImg=loadImage("Images/parachute.png");
  mountainImg=loadImage("Images/mountainClimb.gif");
  mountI= loadImage("Images/mountain.jpg");
  c1img=loadImage("Images/c1.jpg");
  c2img=loadImage("Images/c2.png");
  coinImg=loadImage("Images/coin.png");
  cyclingImg= loadAnimation("Images/cycling.gif");
  desertImg= loadImage("Images/desert.jpg");
  digImg= loadAnimation("Images/dig.gif");
  farmImg= loadImage("Images/farm.jpg");
  paperImg= loadImage("Images/paper.png");
  treasureChestimg=loadImage("Images/treasureChest.jpg");
  stadiumimg= loadImage("Images/stadium.jpg");
  stepsimg= loadImage("Images/steps.png");
  retryimg= loadImage("Images/retry.png");
  nextlevelimg= loadImage ("Images/nextlevel.png");
}



function setup() {
  createCanvas(1300,600);
  buildingbg= createSprite(650, 300, 2500, 1000);
  buildingbg.addImage(buildingbgimg);
  farmbg= createSprite(650, 300, 2500, 1000);
  farmbg.addImage(farmImg);
  farmbg.visible=false;
  buildingbg.scale= 3.5;
  farmbg.scale=3.5;
  runner= createSprite(130, 100,30,50);
  runner.addAnimation("running",runnerImg);
  runner.scale=0.4;
  runner.setCollider("circle",0,0,100);
  buildingGroup= createGroup();
  coingroup= createGroup();
  ig= createSprite(100,140,150,20);
  ig.visible=false;
  ig2= createSprite(200,530,1500,20);
  ig2.visible=false; 
  ig3= createSprite(200, 300, 1500, 20);
  ig3.visible= false;
 /* ig4= createSprite(600,350 ,1300,20);
  ig4.visible=false;*/
  retry= createSprite(700, 300);
  retry.addImage(retryimg);
  retry.visible= false;
  count= 0;
  coin = 0;
  
}
function draw() {

  background("white"); 
  
  var count= Math.round(World.frameCount/5);
 

  if(gamestate===PLAY){
    if(frameCount<285 || frameCount===285){
      runner.collide(ig); 
      coingroup.setVisibilityEach= false;
     }
     else{
       runner.collide(buildingGroup);
       coingroup.setVisibilityEach= true;
     }
     if(keyDown("space")&& runner.y > 150){
      runner.velocityY=-10 ;
      runner.addImage(runnerJump);
      runner.collide(buildingGroup);
    }
    level=LEVEL1;
    if(count===0 || count>0 && count < 1000){
      level=LEVEL1;
      buildings(); 
      buildingbg.velocityX=-(4+Math.round(World.frameCount/100));
   if(buildingbg.x<0){
     buildingbg.x= buildingbg.width/2;
   }  
    }
     runner.velocityY= runner.velocityY+0.8;
    if(level===LEVEL1){
     // buildings(); 
      buildingbg.velocityX=-(4+Math.round(World.frameCount/100));
   if(buildingbg.x<0){
     buildingbg.x= buildingbg.width/2;
   }  
   
    if( ig2.collide(runner)){
     gamestate= END;
     runner.addAnimation(runnerfall);
     retry.visible=true;
     buildingbg.velocityX = 0;
     buildingbg.velocityY = 0;
     
     buildingGroup.setLifetimeEach(-1);
     runner.velocityY= 0;
     buildingGroup.setVelocityXEach(0);
     buildingGroup.setVelocityYEach(0);     
     runner.addImage(runnerfall);
     count= count;
   }
   if(count>1000 || count===1000){
     level= LEVEL2;
     
   }
    }
     /*if(runner.isTouching(coingroup)){
     coin= coin+1;
     coingroup.visibility=false;
     //console.log(coin);
   }  */
     /*if(level=== LEVEL2){
    buildingbg.visible=false;
    farmbg.visible=true;
    
    

  }*/
  }
 
   if(gamestate===END){
      if(buildingGroup.isTouching(runner)){
        // buildingGroup.collide(runner);
         buildingbg.velocityX = 0;
         buildingbg.velocityY = 0;
         buildingGroup.setLifetimeEach(-1);
         coingroup.setLifetimeEach(-1);
         runner.velocityY= 0;
         buildingGroup.setVelocityXEach(0);
         buildingGroup.setVelocityYEach(0); 
         coingroup.setVelocityXEach(0);
         coingroup.setVelocityYEach(0);   
         runner.addAnimation(runnerfall);
         retry.visible=true;
         frameCount=0;
         //console.log(buildingGroup.velocityXEach);
         if(mousePressedOver(retry)){
           buildings();
           reset();
           runner.x=90;
           count=0;
           //if(frameCount<285 || frameCount===285){
            runner.collide(ig); 
         }
           else {
             runner.collide(buildingGroup);
           }
         }
      }
     


    
  drawSprites();
  text("Score 0"+count,1200,50);
  text("Coins 0"+coin, 900, 50);
  fill(0,0,0);
  fontSize= 100;

    }
function buildings(){
if(frameCount % 100 === 0){
  building= createSprite(1300,500 ,50,200);
   building.velocityX=-6;
   //building.debug=true;
   buildingGroup.add(building);
   var rand = Math.round (random(1,5));
   //steps.visible=false;
   //console.log(rand);
   switch (rand){
    case 1 : building.addImage(building1);
    break;
    case 2 : building.addImage(building2);
    break;
    case 3 : building.addImage(building3);
    break;
    case 4 : building.addImage(building4);
    break;
    case 5 : building.addImage(building5);
    break;
    default : break;
   }
   building.depth=1;
 }
 
}

function coins(){
  if(frameCount % 60 === 0  || frameCount % 80 === 0){
    var rand= Math.round(random(1200, 1300));
    var rand1= Math.round(random(100,300));
    coin= createSprite(rand,rand1 ,50,200);
    coin.addImage(coinImg);
     coin.velocityX=-8;
     coin.scale=0.1;
     coingroup.add(coin);
   }
   
  }

function reset(){
  gamestate= PLAY;
  retry.visible= false;
 /* if(frameCount<285 || frameCount===285){
    runner.collide(ig); 
   }*/
   runner.collide(ig);
   runner.x=90;
  buildingGroup.destroyEach();
  buildingbg.velocityX=-(4+Math.round(World.frameCount/100));;
  count=0;
}
