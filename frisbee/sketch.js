let vids = [];
let speeds = [
  [1, 1, 1, 1, 1],
  [1.2, 1.1, 1, 0.9, 0.8],
  [0.8, 0.9, 1, 1.1, 1.2],
  [1.4, 0.9, 1, 1.3, 0.8],
  [0.6, 1.1, 1, 0.7, 1.2],
  [1, 1, 1, 1, 1],
  [0.6, 1.1, 1, 0.7, 1.2],
  [1.4, 0.9, 1, 1.3, 0.8],
  [0.8, 0.9, 1, 1.1, 1.2],
  [1.2, 1.1, 1, 0.9, 0.8],
  [1, 1, 1, 1, 1],
];
let num = 5;
let originX, originY, originW, originH;
let s = 0;
let timelog;

function preload() {
  for (let i = 0; i < num; i++) {
    let vid = createVideo(
      "frisbee.mp4"
    );
    // vid = createVideo(
    //   "https://player.vimeo.com/progressive_redirect/playback/553277495/rendition/720p/file.mp4?loc=external&signature=5b6aa01e50747852bbc511a8a1ca88f3470dcf8648a27550fe40f4a5ca9d0672"
    // );
    // vid.play();
    vid.hide();
    vid.speed(speeds[0][i]);
    vids.push(vid);
  }
}
function setup() {
  createCanvas(720, 720);
  originX = 0;
  originY = (height / 20) * 8;
  originW = width;
  originH = height / num;
}

function draw() {
  background(220);
  if (millis() < 1000) {
    text("wait", width / 2, height / 2);
  }
  for (let i = 0; i < num; i++) {
    image(
      vids[i],
      0,
      originH * i,
      originW,
      originH,
      originX,
      originY,
      originW,
      originH
    );
  }
  if (timelog && s < speeds.length - 1) {
    if (floor(millis() / 1000) - timelog > 3) {
      changeSpeed();
    }
  }
  // console.log(millis()); 
}

function changeSpeed() {
  s++;
  // console.log("changing speed");
  console.log("current speed: " + speeds[s]);
  for (let i = 0; i < num; i++) {
    vids[i].speed(speeds[s][i]);
    timelog = floor(millis() / 1000);
  }
}

function mousePressed() {
  s = 0;
  for (let i = 0; i < num; i++) {
    vids[i].play();
    started = true;
    timelog = floor(millis() / 1000);
  }
}
