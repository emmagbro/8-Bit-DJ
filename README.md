# 8 Bit DJ
Interactive interface music player with chiptune beats and effects.

I designed the interface and created the graphics in Photoshop, going for a retro, pixelated look and feel. Next, I found a collection of chiptune loops and sound effects to fit in with the retro 8-bit theme.

I programmed the interface using HTML, CSS, and jQuery. The audio is played using a matrix of HTML audio elements corresponding to its button's position. On click, the button changes colour to indicate a track is playing and loops the selected track until the button is clicked again. Since HTML audio files always add a small gap to loops, I used JavaScript to create an array of two identical audio clips and alternated them to achieve gapless playback.

