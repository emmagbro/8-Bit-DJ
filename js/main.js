$(document).ready(function() {

  //Creating sound array

  // matrix of file names
  var soundLoops = [
/*0 */   ["drumLoops/ECS Beats 04 130 BPM.ogg", "drumLoops/ECS Beats 05 130 BPM.ogg", "musicLoops/BeatLoop_130bpm025_8BitBeats_LoopCache.ogg", "musicLoops/ECS Dope Bassline 130 BPM.ogg", "effects/effect1.wav", "effects/effect2.wav"],
/*1 */   ["drumLoops/ECS Beats 06 130 BPM.ogg", "drumLoops/ECS Beats 12 130 BPM.ogg", "musicLoops/ECS Nanovoice 130 BPM.ogg", "musicLoops/ECS Spooky Chimes 130 BPM.ogg", "effects/effect3.wav", "effects/effect4.wav"],
/*2 */   ["drumLoops/ECS Beats 10 130 BPM.ogg", "drumLoops/ECS Beats 17 130 BPM.ogg", "musicLoops/ECS Super Dope Bassline 130 BPM.ogg", "musicLoops/HiPerkLoop_130bpm010_8BitBeats_LoopCache.ogg", "effects/effect5.wav", "effects/effect6.wav"],
/*3 */   ["drumLoops/ECS Beats 21 130 BPM.ogg", "drumLoops/ECS Beats 22 130 BPM.ogg", "musicLoops/PerkLoop_130bpm021_8BitBeats_LoopCache.ogg", "musicLoops/SynthLoop_130bpm026_8BitBeats_LoopCache.ogg", "effects/effect7.wav", "effects/effect8.wav"]

  ];

  // References to the playable audio objects (keeping track of all of the sfx)
  // This allows us to control the audio clips after they've started (stopping, looping, for example)
  // False means no active audio clip is present at this [row][col] yet
   var audio = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]
  ];

  //Click music button function
  // Any time we press a button
  $(".musicButton").click(function() {

    var $this = $(this);                              // reference to the button pressed
    var col = $(this).index();                        // the col we want to play
    var row = $(this).parent('.buttonRow').index();   // the row we want to play
    var loops = $(this).hasClass("loop");             // Should it loop?

    // If it's not currently playing
    // Here we're using classes added to the buttons to control whether we should be starting or stopping the sound
    if ( $(this).hasClass("off") ) {
      // This sound is off, so we should create a new audio and start the sound

      // Create an array, because we need two audio clips so that we can play them back to back without a gap (alternate the identical clips)
      // Reason is because looping a single clip will always create a small gap. To solve this, I determine the duration of a clip and then subtract
      // a 'buffer' so that there's enough of an overlap that it counters the playback gap.
      var songs = [];

      // Create a physical HTML audio element, then assign it to the array at the first index [0]
      var song = $('<audio preload="auto" id="'+row+'_'+col+'" src="'+soundLoops[row][col]+'"></audio>').appendTo('body');
      songs[0] = song[0];

      // Create another physical HTML audio element, then assign it to the array at the second index [1]
      song = $('<audio preload="auto" id="'+row+'_'+col+'" src="'+soundLoops[row][col]+'"></audio>').appendTo('body');
      songs[1] = song[0];

      // NOTE: Audio clips don't loop automatically (we will create our own loop below using a setInterval timed loop)
      // We do this because we don't want a single clip to loop (as that created a playback gap), so instead we duplicate
      // the track and overlap it using a buffer space


      // We can now access the clips using songs[0] or songs[1] (they're in the array at the first two indexes of 'songs')

      // Now modify the matrix that holds the audio references (the audioboard) to point to an object that holds the new audio file (pair) that we created, as well as a boolean to determine looping playback
      audio[row][col] = {'songs':songs, 'loop':false};

      console.log(audio);

      // Signify that the clip is playing, show that visually
      $(this).removeClass("off").addClass("on");
      var src = $(this).find("img").attr('data-on');
      $(this).find("img").attr("src", src);

      var dur = 0;        // Clip duration
      var buffer = -50;   // Overlap buffer (more negative means more overlap)
      var flip = 0;       // Track which audio clip is currently in use (index 0 or 1)

      // Load up the first clip
      audio[row][col].songs[flip].load();

      // Event: when the clip is loaded...
      audio[row][col].songs[flip].addEventListener('loadeddata', function() {

        // determine the duration of this file
        dur = audio[row][col].songs[flip].duration * 1000 + buffer;

        // Start playing
        audio[row][col].songs[flip].play();

        console.log(dur);

        // If it will loop, set up an interval so that we can time it to the clip stopping (+ a negative buffer)
        if (loops) {
          // Timed loop forever (until audio[row][col] is cleared)
          // ie, Restart the audio clip on a timer
          audio[row][col].loop = setInterval(function() {
            flip = (flip) ? 0 : 1;                    // Flips between track 0 and 1 (ternary)
            audio[row][col].songs[flip].play();       // Plays the new track
          }, dur);
        }
        // If not looping, then just stop and reset the visuals afterward
        else {
          // Run once, only at the duration of the track (track ending)
          var fixbtn = setInterval(function() {
            $this.removeClass("on").addClass("off");
            $this.find("img").attr("src", "img/whiteButton.png");
            clearInterval(fixbtn);  // Stop the loop after one iteration of the song
            audio[row][col] = false;
          }, dur);
        }
      }, false);

    } // end if hasClass('off')

    else {  // Track is playing
      // I want to stop a track from playing
      $(this).removeClass("on").addClass("off");
      $(this).find("img").attr("src", "img/whiteButton.png");

      // Stop infinite loop (kills both tracks)
      clearInterval(audio[row][col].loop);
      audio[row][col].songs[0].pause();
      audio[row][col].songs[1].pause();
      audio[row][col] = false;

    }

  });

});
