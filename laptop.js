img = "";
status = "";
objects = [];

function preload(){
img = loadImage("pic1.jpg");
}

function setup(){
canvas = createCanvas(640, 420);
canvas.center();

objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw(){
image(img, 0, 0, 640, 420);

if(status != ""){
    for(i = 0; i < objects.length; i++){
    document.getElementById("status").innerHTML = "There are 3 big objects in this picture but Coco SSD model has detected only 1 object"
    percent =  floor(objects[i].confidence * 100);
    fill('red');
    noFill();
    stroke('red');
    text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
}

function modelLoaded(){
console.log("Model Loaded!");
status = true;
objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
if(error){
console.log(error);
}
console.log(results);
objects = results;
}