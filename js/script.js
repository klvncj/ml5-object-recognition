let video;
let detector;
let detections = [];

preload = () => {
  detector = ml5.objectDetector("cocossd");
};

gotDetections = (error, results) => {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
};

height = window.innerHeight;
width = window.innerWidth;
setup = () => {
  createCanvas(640,480);
  video = createCapture(VIDEO);
  video.size(640,480);
  video.hide();
  detector.detect(video, gotDetections);
};

function percentage(digit) {
  percent = (digit * 100).toFixed(2);
  return percent;
}

function draw() {
  image(video, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
    text(percentage(object.confidence) + "%", object.x + 150, object.y + 24);
  }
}
