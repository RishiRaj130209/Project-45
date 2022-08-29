var robot, bullet, robot_img,gameOver_img,robot_img
var zombie,zombie_img
var bg, ground1, ground2, ground3
var robot_running
var robot_running,robot_shooting
var zombieGroup1,zombieGroup2,zombieGroup3,zombieSound,robotSound,bulletSound
var bulletGroup
var level, selectLevel
var life = 3
var score = 0
var GameState = 0

function preload(){
  bg = loadImage("background.png")
  robot_img = loadImage("./robot_img/robot.png")
  gameOver_img = loadImage("game_over.png")
  youWin_img = loadImage("you_win.png")
  zombieSound_snd = loadSound("./Sounds/ZombieSound.wav")
  robotSound_snd = loadSound("./Sounds/RobotSound.mp3")
  bulletSound_snd = loadSound("./Sounds/BulletSound.mp3")

  zombie_walking = loadAnimation("./zombie_img/Walk (1).png",  "./zombie_img/Walk (2).png", "./zombie_img/Walk (3).png",
   "./zombie_img/Walk (4).png", "./zombie_img/Walk (5).png", "./zombie_img/Walk (6).png", "./zombie_img/Walk (7).png",
    "./zombie_img/Walk (8).png", "./zombie_img/Walk (9).png", "./zombie_img/Walk (10).png", )

  zombie_attacking = loadAnimation("./zombie_img/attack1.png",  "./zombie_img/attack2.png", "./zombie_img/attack3.png",
   "./zombie_img/attack4.png", "./zombie_img/attack5.png", "./zombie_img/attack6.png", "./zombie_img/attack7.png",
    "./zombie_img/attack8.png", )

  robot_running = loadAnimation("./robot_img/run1.png", "./robot_img/run2.png", "./robot_img/run3.png",
   "./robot_img/run4.png", "./robot_img/run5.png", "./robot_img/run6.png", "./robot_img/run7.png",
   "./robot_img/run8.png")

   robot_shooting = loadAnimation("./robot_img/Shoot (1).png",  "./robot_img/Shoot (2).png",
    "./robot_img/Shoot (3).png", "./robot_img/Shoot (4).png", )

  bullet_animation = loadAnimation("./robot_img/Objects/Bullet_000.png",  "./robot_img/Objects/Bullet_001.png",
   "./robot_img/Objects/Bullet_002.png", "./robot_img/Objects/Bullet_003.png", "./robot_img/Objects/Bullet_004.png", )

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  robot = createSprite(100,500,20,20)
  robot.addImage("robot", robot_img)
  robot.addAnimation("run", robot_running)
  robot.addAnimation("shoot", robot_shooting)
  robot.scale = 0.25


  ground1 = createSprite(500,575,3000,10)
  ground1.visible = false

  ground2 = createSprite(1050,393,1550,10)
  ground2.visible = false

  ground3 = createSprite(1170,210,1000,10)
  ground3.visible = false
  
  left_wall = createSprite(1,200,1,1000)
  left_wall.visible = false

  zombieGroup1 = new Group()
  zombieGroup2 = new Group()
  zombieGroup3 = new Group()
  bulletGroup = new Group()


}

function draw() {
  background(bg);
  
  text("x" + mouseX + "y" + mouseY,mouseX,mouseY)

  if(keyDown(UP_ARROW)){
    robot.y -= 5 
  }else{
    robot.y += 4
  }

  if(keyDown(DOWN_ARROW)){
    robot.y += 5 
  }

  if(keyIsDown(LEFT_ARROW)){
    robot.x -= 5 
    robot.changeAnimation("run", robot_running)
  }else{
    robot.changeImage("robot", robot_img)
  }

  if(keyDown(RIGHT_ARROW)){
     robot.x += 5 
     robot.changeAnimation("run", robot_running)
  }


  if(keyDown("space")){
    shoot()
  }

  if(bulletGroup.isTouching(zombieGroup1)){
    bulletGroup.destroyEach()
    zombieGroup1.destroyEach()
    score += 10
  } 

  if(bulletGroup.isTouching(zombieGroup2)){
    bulletGroup.destroyEach()
    zombieGroup2.destroyEach()
    score += 10
  } 

  if(bulletGroup.isTouching(zombieGroup3)){
    bulletGroup.destroyEach()
    zombieGroup3.destroyEach()
    score += 10
  } 
  


  robot.collide(ground1)
  robot.collide(ground2)
  robot.collide(ground3)

  if(zombieGroup2.xEach < 230){
    zombieGroup2.velocityYEach(10)
    //zombieGroup2.velocityXEach(0)
  }

  if(zombieGroup3.xEach < 624){
    zombieGroup3.velocityYEach(10)
    //zombieGroup3.velocityXEach(0)
  }



  if(GameState === 0){
    selectLevel = Math.round(random(1, 3))

    if(selectLevel === 1){
      createZombieL1()
    }

    if(selectLevel === 2){
      createZombieL2()
    }

    if(selectLevel === 3){
      createZombieL3()
    }
  
  }

  fill("white")
  textSize(30)
  text("Life: " + life,50,50 )

  fill("white")
  textSize(30)
  text("Score: " + score,50,100 )
     
  if(robot.isTouching(zombieGroup1) || robot.collide(zombieGroup2) || robot.collide(zombieGroup3)){
    GameOver()
  } 

  if(life === 0){
    GameOver()
  }

 // if(zombieGroup1.isTouching(left_wall) || zombieGroup2.isTouching(left_wall) || zombieGroup3.isTouching(left_wall )){
    //life -= 1

    if(zombieGroup1.isTouching(left_wall)){
      zombieGroup1.destroyEach()
      life -= 1
    }
    if(zombieGroup2.isTouching(left_wall)){
      zombieGroup2.destroyEach()
      life -= 1
    }
    if(zombieGroup3.isTouching(left_wall)){
      zombieGroup3.destroyEach()
      life -= 1
    }
  //}

  // if(score === 50){
  //   zombieGroup1.velocityXEach(-6)
  //   zombieGroup2.velocityXEach(-6)
  //   zombieGroup3.velocityXEach(-6)
  // }

  // if(score === 100){
  //   zombieGroup1.velocityXEach(-6)
  //   zombieGroup2.velocityXEach(-6)
  //   zombieGroup3.velocityXEach(-6)
  // }

  if (score === 50){
    Level1End()
  }
  
  drawSprites();
}

function shoot(){
  bullet = createSprite(robot.x+50,robot.y,10,10)
  bullet.addAnimation("bullet", bullet_animation)
  bullet.scale = 0.25
  bullet.velocityX   = 6 
  bulletGroup.add(bullet)
  bullet.lifetime = width/6

  robot.changeAnimation("shoot", robot_shooting)
}

function createZombieL1(){
  if(frameCount%120 === 0){
    zombie = createSprite(windowWidth+20,500,20,20);
    zombie.addAnimation("walking", zombie_walking)
    zombie.scale = 0.25
    zombie.velocityX = -4 
    zombie.collide(ground1)

    zombieGroup1.add(zombie)
    zombie.lifetime = width/3
    zombieSound = addSound("zombie_sound", zombieSound_snd)
  }

}

function createZombieL2(){
  if(frameCount%120 === 0){
    zombie = createSprite(windowWidth+20,330,20,20);
    zombie.addAnimation("walking", zombie_walking)
    zombie.scale = 0.25
    zombie.velocityX = -4 
    zombie.collide(ground2)
    zombie.collide(ground3)

    zombieGroup2.add(zombie)
    zombie.lifetime = width/3
  }

}

function createZombieL3(){
  if(frameCount%120 === 0){
    zombie = createSprite(windowWidth+20,150,20,20);
    zombie.addAnimation("walking", zombie_walking)
    zombie.scale = 0.25
    zombie.velocityX = -4 
    zombie.collide(ground1)
    zombie.collide(ground2)
    zombie.collide(ground3)

    zombieGroup3.add(zombie)
    zombie.lifetime = width/3
  }

}

function GameOver(){
  robot.destroy()
  zombieGroup1.destroyEach()
  zombieGroup2.destroyEach()
  zombieGroup3.destroyEach()
  bulletGroup.destroyEach()

  gameOver = createSprite(700,300,500,200)
  gameOver.addImage("GameOver", gameOver_img)
  gameOver.scale = 0.8

  GameState = 1
}

function Level1End(){
  robot.destroy()
  zombieGroup1.destroyEach()
  zombieGroup2.destroyEach()
  zombieGroup3.destroyEach()
  bulletGroup.destroyEach()

  youWin = createSprite(700,300,500,200)
  youWin.addImage("YouWin", youWin_img)
  youWin.scale = 0.8
  }
  
