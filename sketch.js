var PLAY=1;
var END=0;
var gamestate=PLAY;
var gameover,apple,banana,bomb,cherry,sword,pomegranate,strawberry,watermelon,ground,start

var gameoverImage,appleImage,bananaImage,bombImage,cherryImage,swordImage,pomegranateImage,strawberryImage,watermelonImage,groundImage,startImage,swordsound

function preload(){
  
  startImage=loadImage("start.jpg")
  groundImage=loadImage("ground.png")
  swordImage=loadImage("sword.png")
  appleImage=loadImage("APPLE.jpg")
  bananaImage=loadImage("BANANA.jpg")
  cherryImage=loadImage("Cherry.png")
  pomegranateImage=loadImage("Pomegranate.png")
  strawberryImage=loadImage("STRAWBERRY.png")
  watermelonImage=loadImage("WATERMELON.jpg")
  bombImage=loadImage("Bomb.png")
  gameoverImage=loadImage("gameover.png")
  swordsound=loadSound("knifeSwooshSound.mp3")
}

function setup(){
  createCanvas(500,500)
  start=createSprite(280,250,800,800);
  start.addImage("startImage",startImage);
   
  ground=createSprite(250,250,1000,1000)
  ground.addImage("groundImage",groundImage)
  ground.visible=false;
  
  sword=createSprite(250,250)
  sword.addImage("swordImage",swordImage)
  sword.visible=false;
  
  gameover=createSprite(200,250)
  gameover.addImage("gameoverImage",gameoverImage)
  gameover.visible=false;
  
  sword.setCollider("rectangle",0,0,40,40);
    score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}
function draw(){
  background("white")
  if(gamestate===PLAY){
  if(keyDown("space")){
  ground.visible=true;
    sword.visible=true;
  }
       
    fruits();
    Enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
        
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      swordsound.play()
      score=score+2;
    }
    else{
     if(enemyGroup.isTouching(sword)) {
       gamestate=END;
       swordsound.play()
       fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
       gameover.visible=true;
        sword.x=200;
        sword.y=200;
     }
    }

drawSprites();
    fill("black");
    text("Score : "+ score,300,30);
    text("click on space to start the game",180,350)
}
}

function fruits (){
  
    if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,7));
    if (r == 1) {
      fruit.addImage("appleImage",appleImage);
    } else if (r == 2) {
      fruit.addImage("bananaImage",bananaImage);
    } else if(r===4){
      fruit.addImage("cherryImage",cherryImage);
    } else if(r===5) {
      fruit.addImage("pomegranateImage",pomegranateImage);
    }else if(r===6){
      fruit.addImage("strawberryImage",strawberryImage);
    }else if(r===7){
      fruit.addImage("watermelonImage",watermelonImage);
    }
      
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-(7+(score/4));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
  
}


function Enemy(){
  if(World.frameCount%200===0){
    bomb=createSprite(400,200,20,20);
  bomb.addImage("bomb",bombImage)
  bomb.y=Math.round(random(100,300));
    bomb.velocityX=-(8+(score/10));
    bomb.setLifetime=50;
    bomb.scale=0.3
    enemyGroup.add(bomb);
  }
}



