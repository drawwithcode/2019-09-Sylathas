var spray, instructions, shake = 0, more, gif_createImg;

function preload(){
  //Load Spray Can 3D Model
  spray = loadModel("assets/Spraycan.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  //Increase normal Shake Threshold so that you have to shake it harder
  setShakeThreshold(80);

  //Create instructions
  instructions = createDiv('The Spray is not working! Try shaking it!');
  instructions.style('position: absolute; bottom: 4%; left: 20%; width: 60vw; height: 10vh; color: white; text-align: center; font-family: Verdana; font-size: 30px');
}

function draw() {
  background(0);

  //Show model before the second shake
  if(shake < 2){
    //Rotate model with Gyroscope
    translate(rotationY, rotationX*3, 0);
    rotateY(90 + rotationY);

    //lights
    ambientLight(50, 50, 50);
    directionalLight(255, 20, 0, 0, 1, 0);

    //Load Model
    rotateZ(180);
    noStroke();
    scale(3);
    model(spray);
  }
  //Show Gif of Can Spray
  if(shake === 2){
    //Create Gif as html img to refresh frames
    gif_createImg = createImg("assets/spray.gif");
    gif_createImg.position(width/2-480, height/2-360);
    gif_createImg.size(960,720);
    more.style('display: none;');
    instructions.style('display: none;');
  }
}

function deviceShaken() {
    shake++;
    if(shake === 1){
      more = createDiv('Harder!');
      more.style('position: absolute; bottom: 30%; left: 20%; width: 60vw; height: 10vh; color: white; text-align: center; font-family: Verdana; font-size: 100px');
      setShakeThreshold(150);
    } else if(shake === 2){
      clear();
    }
}

function text(){

}

//Function to stop the moving of the window with the touch
function touchMoved() {
  return false;
}

//Ask permission on IOs s devices
function touchEnded(event) {
  DeviceOrientationEvent.requestPermission()
}
