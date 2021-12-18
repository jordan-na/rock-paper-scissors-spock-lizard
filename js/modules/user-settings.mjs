import { uiController } from "./ui-controller.mjs";
import { settingsController } from "./settings-controller.mjs";
import { stringUtils } from "./string-utils.mjs";

export const userSettings = (() => {

   const apply = () => {
      const score = localStorage.getItem("score");
      const bgColor = localStorage.getItem("bg-color");
      const bgImg = localStorage.getItem("bg-img");
      const uploadedBgImg = localStorage.getItem("uploaded-bg-img");
      const musicType = localStorage.getItem("music-type");
      const sfx = localStorage.getItem("sfx");
      if (score != null) {
         uiController.setScore(score);
      }
      if (bgColor != null) {
         for (const btn of document.querySelectorAll(".color-btn")) {
            const linearGradient = getComputedStyle(btn).backgroundImage;
            const rgbFrom = linearGradient.substring(
               stringUtils.nthIndex(linearGradient, "rgb", 1),
               stringUtils.nthIndex(linearGradient, ")", 1) + 1
            );
            const rgbTo = linearGradient.substring(
               stringUtils.nthIndex(linearGradient, "rgb", 2),
               stringUtils.nthIndex(linearGradient, ")", 2) + 1
            );
            if (rgbFrom + " " + rgbTo === bgColor) {
               settingsController.selectBgBtn(btn);
               settingsController.applyBg(null, "color");
               break;
            }
         }
      }
      if (bgImg != null) {
         for(const img of document.querySelectorAll(".background-img")) {
            if(img.src === bgImg) {
               settingsController.selectBgBtn(img.parentElement);
               settingsController.applyBg(null, "image");
            }
         }
      }
      if (uploadedBgImg != null) {
         document.querySelector("#preview-img").src = uploadedBgImg;
         settingsController.applyBg(null, "upload");
      }
      if(musicType != null) {
         for(const btn of document.querySelectorAll(".selector-option.second")) {
            if(btn.innerText.toLowerCase() === musicType.toLowerCase()) {
               settingsController.changeMusic(null, btn);
               break;
            }
         }
      }
      if(sfx != null) {
         settingsController.toggleSfx(sfx);
      }
   };

   return {
      apply: apply,
   };
})();
