let vid;
let nativeWidth = 1080;
let nativeHeight = 1920;
let nativeNum = 5;
let nativeSlicewidth = nativeWidth / nativeNum;

let sliceWidth, sliceHeight;
let num;
let w = 1440;
let h = 2560;
let a; // width, height, aspect ratio

let seqs = []; // video sequence
let vids = [];
let completions = [];
let pcompletions = [];

let playing = false;

function setup() {
  canvas = createCanvas(w, h);
  calculateCanvassize();

  canvas.id("myCanvas");
}

function draw() {
  background(220);
  if (!playing) {
    background(0);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text("Click to start", width / 2, height / 2);
  } else {
    for (i = 0; i < num; i++) {
      // sequence
      vids[i].width = a * nativeNum * height;
      vids[i].height = height;
      image(
        vids[i],

        i * sliceWidth,
        0,
        sliceWidth,
        sliceHeight,

        // nativeNum = 3, sliceWidth
        // nativeNum = 4, sliceWidth + sliceWidth /2
        // nativeNum = 5, sliceWidth * 2

        sliceWidth * (nativeNum / 2 - 0.5),
        // sliceWidth , // FIX HERE

        0,
        sliceWidth,
        sliceHeight
      );

      // stroke(0);
      // rect(i * sliceWidth,
      //   0,
      //   sliceWidth,
      //   sliceHeight);

      completions[i] = vids[i].time() / vids[i].duration();
      if (completions[i] < pcompletions[i]) {
        vids[i].speed(random(0.8, 1.5));
        seqs[i] = floor(random(nativeNum));
      }
      pcompletions[i] = completions[i];
    }
  }
}

function mousePressed() {
  if (playing == false) {
    loadVideo();
    playing = true;
  }
}

function calculateCanvassize() {
  a = nativeSlicewidth / nativeHeight;
  sliceHeight = height;
  sliceWidth = sliceHeight * a;

  num = 5;
  w = sliceWidth * num;
  h = sliceHeight;
  // if (windowWidth % sliceWidth > 0.9 * sliceWidth) {
  //   // if it's almost full, make it full by adding 1 more
  //   // canvas is bigger than screen - positioned in the middle
  //   num = floor(windowWidth / sliceWidth) + 1;
  //   w = sliceWidth * num;
  //   h = sliceHeight;
  // } else {
  //   // otherwise resize height to fit screen - cut off top/bottom
  //   num = floor(windowWidth / sliceWidth);
  //   sliceWidth = windowWidth / num;
  //   sliceHeight = sliceWidth / a;
  //   w = windowWidth;
  //   h = sliceHeight;
  // }
}

function loadVideo() {
  for (i = 0; i < num; i++) {
    let vid = createVideo(
      "https://player.vimeo.com/progressive_redirect/playback/701775492/rendition/1080p/file.mp4?loc=external&signature=96d7ebcd899cf127755d2fe1164960a2575fe697800dda72b5135fa20063ac5e"
    );

    vid.loop();
    vid.hide();
    vid.time(floor(random(50)));
    vid.speed(random(0.8, 1.5));
    vids.push(vid);
    seqs.push(floor(random(nativeNum)));
  }
  shuffle(seqs, true);
}
