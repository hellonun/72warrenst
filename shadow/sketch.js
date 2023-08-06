let vids = [];
let num = 5;
let playing = false;
let nativeWidth = 1730;
let nativeHeight = 1080;
let nativeNum = 9;
let nativeSlicewidth = nativeWidth / nativeNum;

let seqs = [];
let completions = [];
let pcompletions = [];

function setup() {
  createCanvas(1440,2560);
}

function draw() {
  background(220);
  if (playing) {
    for (i = 0; i < num; i++) {
      image(
        vids[i],
        (width / 5) * i,
        0,
        width / 5,
        height,
        (seqs[i] * nativeSlicewidth) + (nativeSlicewidth/10), // position
        0,
        nativeSlicewidth*0.9, // size, technically doesn't wannt because overdrawn
        nativeHeight
      );
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

function loadVideo() {
  for (i = 0; i < nativeNum; i++) {
    let vid = createVideo(
      "https://player.vimeo.com/progressive_redirect/playback/523955586/rendition/1080p/file.mp4?loc=external&signature=46c2af585666912929b09cd4a029445db1dc5343bd1f01d884ab6c899f1a3bff"
    );

    vid.loop();
    vid.hide();
    vid.speed(random(0.8, 1.5));
    vids.push(vid);
    seqs.push(floor(random(nativeNum)));
  }
}
