export const audioController = (() => {
   const musicVolume = document.querySelector("#music-volume");
   const music = [
      new Audio("https://cdn.rawgit.com/jordan-na/rock-paper-scissors-spock-lizard/main/audio/peaceful.mp3"),
      new Audio("https://cdn.rawgit.com/jordan-na/rock-paper-scissors-spock-lizard/main/audio/intense.wav"),
      new Audio("https://cdn.rawgit.com/jordan-na/rock-paper-scissors-spock-lizard/main/audio/focused.wav"),
      new Audio("https://cdn.rawgit.com/jordan-na/rock-paper-scissors-spock-lizard/main/audio/techno.wav"),
      new Audio("https://cdn.rawgit.com/jordan-na/rock-paper-scissors-spock-lizard/main/audio/safari.wav"),
   ];
   music.forEach((m) => {
      m.loop = true;
      m.volume = 0;
   });
   let musicIndex = 0;
   const softenedMusicVolume = 0.3;

   const sfxVolume = document.querySelector("#sfx-volume");
   const winSfx = new Audio("https://cdn.rawgit.com/jordan-na/rock-paper-scissors-spock-lizard/main/audio/win.wav");
   winSfx.volume = 0;
   winSfx.muted = true;
   const loseSfx = new Audio("https://cdn.rawgit.com/jordan-na/rock-paper-scissors-spock-lizard/main/audio/lose.wav");
   loseSfx.volume = 0;
   loseSfx.muted = true;

   const playMusic = () => music[musicIndex].play();

   const pauseMusic = () => music[musicIndex].pause();

   const setMusicVolume = (value) => music.forEach((m) => (m.volume = value));

   const updateMusicVolume = () => {
      playMusic();
      const volume = musicVolume.value / 100;
      if (volume === 0) {
         pauseMusic();
      } else {
         playMusic();
         setMusicVolume(volume);
      }
   };

   const changeMusic = (index) => {
      pauseMusic();
      musicIndex = index;
      if (musicVolume.value > 0) playMusic();
   };

   const turnOnSfx = () => {
      winSfx.muted = false;
      loseSfx.muted = false;
   };

   const turnOffSfx = () => {
      winSfx.muted = true;
      loseSfx.muted = true;
   };

   const updateSfxVolume = () => {
      const volume = sfxVolume.value / 100;
      winSfx.volume = volume;
      loseSfx.volume = volume;
   };

   const playWinSfx = () => {
      softenMusicVolume(1100);
      winSfx.play();
   };

   const playLoseSfx = () => {
      softenMusicVolume(1100);
      loseSfx.play();
   };

   const softenMusicVolume = (duration) => {
      const normalVolume = music[musicIndex].volume;
      if (normalVolume > softenedMusicVolume) setMusicVolume(softenedMusicVolume);
      setTimeout(() => setMusicVolume(normalVolume), duration);
   };

   return {
      updateMusicVolume: updateMusicVolume,
      changeMusic: changeMusic,
      turnOnSfx: turnOnSfx,
      turnOffSfx: turnOffSfx,
      updateSfxVolume: updateSfxVolume,
      playWinSfx: playWinSfx,
      playLoseSfx: playLoseSfx,
   };
})();

audioController.turnOffSfx();
