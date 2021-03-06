var score=0;
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint=Matter.Constraint;
var engine, world;
var box1, pig1;
var backgroundImg,platform;
var gamestate="onsling"
function preload() {
    gettime()
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(170, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    birdAngle=(bird.body.angle)
chain=new Chain(bird.body,{x:200,y:50})
}

function draw(){
    if(backgroundImg){
           background(backgroundImg);
    }
    noStroke()
    textSize(35)
    fill("white")
    text("score:"+score,300,50)
    
    Engine.update(engine);
  
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();
    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
chain.display();
    bird.display();
    platform.display();
    
}
async function gettime(){
    var response= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var responsejson=await response.json();
    var datetime=responsejson.datetime
    console.log(responsejson)
    var hour=datetime.slice(11,13)
    console.log(datetime)
    console.log(hour)
    if(hour>=19||hour<=6){
        backgroundImg=loadImage("sprites/bg2.jpg")
    }
    else{
backgroundImg=loadImage("sprites/bg.png")
    }
}
function mouseDragged(){
    if(gamestate==="onsling"){
        Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
    }
    
} 
function mouseReleased(){
chain.fly()
gamestate="launched"
}
function keyPressed() {
if(keyCode===32){
    bird.trajectory=[]
    bird.body.speed=0.2
    bird.body.angle=(birdAngle)
    Matter.Body.setPosition(bird.body,{x:200,y:50})
   chain.attach(bird.body) 
}
}