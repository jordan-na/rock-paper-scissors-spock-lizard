import { audioController } from "./audio-controller.mjs";
import { game } from "./game.mjs";
import { settingsController } from "./settings-controller.mjs";
import { uiController } from "./ui-controller.mjs";

export const eventHandler = (() => {
   const setupResetScoreBtnListener = () => {
      const scoreBtn = document.querySelector("#score-container");
      scoreBtn.addEventListener("click", game.resetScore);
   };

   const setupMoveBtnListeners = () => {
      const moveBtns = document.querySelectorAll(".move-btn");
      for (const btn of moveBtns) {
         btn.addEventListener("click", game.start);
      }
   };

   const setupPlayAgainBtnListener = () => {
      const playAgainBtn = document.querySelector("#play-again-btn");
      playAgainBtn.addEventListener("click", game.playAgain);
   };

   const setupSettingsBtnListener = () => {
      const settingsBtn = document.querySelector("#settings-btn");
      const closeBtn = document.querySelectorAll(".close-btn")[0];
      settingsBtn.addEventListener("click", uiController.openSettings);
      closeBtn.addEventListener("click", uiController.closeSettings);
   };

   const setupSettingsListeners = () => {
      document.querySelectorAll(".selector-btn")[0].addEventListener("click", settingsController.toggleBackgroundTypes);
      document.querySelector("#apply-btn").addEventListener("click", settingsController.applyBg);
      for (const btn of document.querySelectorAll(".selector-option.first"))
         btn.addEventListener("click", settingsController.changeBackgroundOption);
      for (const btn of document.querySelectorAll(".color-btn, .img-btn"))
         btn.addEventListener("click", () => settingsController.selectBgBtn(btn));
      document.querySelector("#file-input").addEventListener("change", settingsController.previewUploadedImg);
      document.querySelector("#remove-img-btn").addEventListener("click", settingsController.removePreviewImg);

      for (const btn of document.querySelectorAll(".setting-option-btn"))
         btn.addEventListener("click", settingsController.changeSettingsOption);

      document.querySelectorAll(".selector-btn")[1].addEventListener("click", settingsController.toggleMusicOptions);
      for (const btn of document.querySelectorAll(".selector-option.second"))
         btn.addEventListener("click", settingsController.changeMusic);
      document.querySelector("#music-volume").addEventListener("input", audioController.updateMusicVolume);

      document.querySelectorAll(".selector-btn")[2].addEventListener("click", settingsController.toggleSfxOptions);
      for (const btn of document.querySelectorAll(".selector-option.third"))
         btn.addEventListener("click", () => settingsController.toggleSfx(btn.innerText));
      document.querySelector("#sfx-volume").addEventListener("input", audioController.updateSfxVolume);

      document.querySelector("#file-error-mssg").addEventListener("animationend", (evt) => evt.currentTarget.classList.remove("show"));
   };

   const setupRulesBtnListeners = () => {
      const rulesBtn = document.querySelector("#rules-btn");
      const closeBtn = document.querySelectorAll(".close-btn")[1];
      rulesBtn.addEventListener("click", uiController.toggleRules);
      closeBtn.addEventListener("click", uiController.toggleRules);
   };

   const setupEventListeners = () => {
      setupResetScoreBtnListener();
      setupMoveBtnListeners();
      setupPlayAgainBtnListener();
      setupSettingsBtnListener();
      setupSettingsListeners();
      setupRulesBtnListeners();
   };

   return {
      setupEventListeners: setupEventListeners,
   };
})();
