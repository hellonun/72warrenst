let vids = [];
let num = 5;
let playing = false;
let nativeWidth = 1080;
let nativeHeight = 1242;
let nativeNum = 7;
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
        (seqs[i] * nativeSlicewidth) +nativeSlicewidth/10 ,
        0,
        nativeSlicewidth*0.8,
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
      "https://player.vimeo.com/external/539781319.hd.mp4?s=fabb4f223302f594a118d56167f9158d34d06484&profile_id=175"
    );

    vid.loop();
    vid.hide();
    vid.speed(random(0.8, 1.5));
    vids.push(vid);
    seqs.push(floor(random(nativeNum)));
  }
}
