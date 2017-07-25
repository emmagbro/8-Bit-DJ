var audio;
var s;
$(document).ready(function() {

  //Creating sound array

  var soundLoops = [
/*0 */   ["drumLoops/ECS Beats 04 130 BPM.ogg", "drumLoops/ECS Beats 05 130 BPM.ogg", "musicLoops/BeatLoop_130bpm025_8BitBeats_LoopCache.ogg", "musicLoops/ECS Dope Bassline 130 BPM.ogg", "effects/effect1.wav", "effects/effect2.wav"],
/*1 */   ["drumLoops/ECS Beats 06 130 BPM.ogg", "drumLoops/ECS Beats 12 130 BPM.ogg", "musicLoops/ECS Nanovoice 130 BPM.ogg", "musicLoops/ECS Spooky Chimes 130 BPM.ogg", "effects/effect3.wav", "effects/effect4.wav"],
/*2 */   ["drumLoops/ECS Beats 10 130 BPM.ogg", "drumLoops/ECS Beats 17 130 BPM.ogg", "musicLoops/ECS Super Dope Bassline 130 BPM.ogg", "musicLoops/HiPerkLoop_130bpm010_8BitBeats_LoopCache.ogg", "effects/effect5.wav", "effects/effect6.wav"],
/*3 */   ["drumLoops/ECS Beats 21 130 BPM.ogg", "drumLoops/ECS Beats 22 130 BPM.ogg", "musicLoops/PerkLoop_130bpm021_8BitBeats_LoopCache.ogg", "musicLoops/SynthLoop_130bpm026_8BitBeats_LoopCache.ogg", "effects/effect7.wav", "effects/effect8.wav"]

  ];

   audio = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]
  ];

  //Click music button function

  $(".musicButton").click(function() {

    var $this = $(this);
    var col = $(this).index();
    var row = $(this).parent('.buttonRow').index();
    var playSong;
    var loops = $(this).hasClass("loop");

    //Check button for class and turn on colour if it's "off", vice versa

    if ( $(this).hasClass("off") ) {

      var songs = [];

      var song = $('<audio preload="auto" id="'+row+'_'+col+'" src="'+soundLoops[row][col]+'"></audio>').appendTo('body');
      songs[0] = song[0];

      song = $('<audio preload="auto" id="'+row+'_'+col+'" src="'+soundLoops[row][col]+'"></audio>').appendTo('body');
      songs[1] = song[0];

      audio[row][col] = {'songs':songs, 'loop':false};

      console.log(audio);

      $(this).removeClass("off").addClass("on");
      var src = $(this).find("img").attr('data-on');
      $(this).find("img").attr("src", src);

      var dur = 0;
      var buffer = -50;
      var flip = 0;

      audio[row][col].songs[flip].load();
      audio[row][col].songs[flip].addEventListener('loadeddata', function() {

        dur = audio[row][col].songs[flip].duration * 1000 + buffer;
        audio[row][col].songs[flip].play();

        console.log(dur);

        if (loops) {
          // Loop until we're told to stop
          audio[row][col].loop = setInterval(function() {
            flip = (flip) ? 0 : 1;
            audio[row][col].songs[flip].play();
          }, dur);
        }
        else {
          var fixbtn = setInterval(function() {
            $this.removeClass("on").addClass("off");
            $this.find("img").attr("src", "img/whiteButton.png");
            clearInterval(fixbtn);
          }, dur);
        }
      }, false);
    }
    else {
      $(this).removeClass("on").addClass("off");
      $(this).find("img").attr("src", "img/whiteButton.png");

      // Stop infinite loop
      clearInterval(audio[row][col].loop);
      audio[row][col].songs[0].pause();
      audio[row][col].songs[1].pause();
    }

  });

});
