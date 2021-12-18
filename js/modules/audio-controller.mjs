export const audioController = (() => {
   const musicVolume = document.querySelector("#music-volume");
   const music = [
      new Audio("../../audio/peaceful.mp3"),
      new Audio("../../audio/intense.wav"),
      new Audio("../../audio/focused.wav"),
      new Audio("../../audio/techno.wav"),
      new Audio("../../audio/safari.wav"),
   ];
   music.forEach((m) => (m.loop = true));
   let musicIndex = 0;
   const softenedMusicVolume = 0.3;

   const sfxVolume = document.querySelector("#sfx-volume");
   const winSfx = new Audio("../../audio/win.wav");
   const loseSfx = new Audio("../../audio/lose.wav");

   const playMusic = () => music[musicIndex].play();

   const pauseMusic = () => music[musicIndex].pause();

   const setMusicVolume = (value) => (music[musicIndex].volume = value);

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
