import { audioController } from "./audio-controller.mjs";
import { bgController } from "./bg-controller.mjs";
import { stringUtils } from "./string-utils.mjs";

export const settingsController = (() => {
   const settingOptionBtns = document.querySelectorAll(".setting-option-btn");

   const backgroundOptionsContainer = document.querySelector("#background-options-container");
   const backgroundTypeSelectorBtn = document.querySelectorAll(".selector-btn")[0];
   const arrow1 = document.querySelectorAll(".down-arrow")[0];
   const backgroundTypes = document.querySelectorAll(".selector-list")[0];
   const applyBtn = document.querySelector("#apply-btn");
   const backgroundOptions = document.querySelector("#background-options");
   const colorBtns = document.querySelectorAll(".color-btn");
   const imgBtns = document.querySelectorAll(".img-btn");
   const fileBtn = document.querySelector("#file-btn");
   const fileInput = document.querySelector("#file-input");
   const previewImgContainer = document.querySelector("#preview-img-container");
   const previewImg = document.querySelector("#preview-img");
   const fileName = document.querySelector("#file-name");
   const fileErrorMssg = document.querySelector("#file-error-mssg");
   let appliedBg = false;
   let currentBg = colorBtns[0];
   let currentSelected;

   const audioOptionsContainer = document.querySelector("#audio-options-container");
   const musicSelectorBtn = document.querySelectorAll(".selector-btn")[1];
   const arrow2 = document.querySelectorAll(".down-arrow")[1];
   const musicChoices = document.querySelectorAll(".selector-list")[1];
   const sfxSelectorBtn = document.querySelectorAll(".selector-btn")[2];
   const arrow3 = document.querySelectorAll(".down-arrow")[2];
   const sfxChoices = document.querySelectorAll(".selector-list")[2];

   const changeSettingsOption = (evt) => {
      if (evt.currentTarget.id === "background") {
         backgroundOptionsContainer.classList.add("show");
         audioOptionsContainer.classList.remove("show");
         settingOptionBtns[0].classList.add("selected");
         settingOptionBtns[1].classList.remove("selected");
      } else {
         audioOptionsContainer.classList.add("show");
         backgroundOptionsContainer.classList.remove("show");
         settingOptionBtns[1].classList.add("selected");
         settingOptionBtns[0].classList.remove("selected");
      }
      closeSelectors();
   };

   const toggleBackgroundTypes = () => {
      backgroundTypes.classList.toggle("show");
      arrow1.classList.toggle("flip");
   };

   const changeBackgroundOption = (evt) => {
      for (const option of backgroundOptions.children) {
         option.classList.remove("show");
      }
      if (evt.target.innerText === "COLORS") backgroundOptions.children[0].classList.add("show");
      else if (evt.target.innerText === "IMAGES") {
         backgroundOptions.children[1].classList.add("show");
      } else if (evt.target.innerText === "UPLOAD") backgroundOptions.children[2].classList.add("show");
      backgroundTypeSelectorBtn.childNodes[0].nodeValue = evt.target.innerText;
      toggleBackgroundTypes();
      removeUnappliedBgs();
      currentSelected = currentBg;
   };

   const selectBgBtn = (btn) => {
      for (const btn of colorBtns) {
         btn.classList.remove("selected");
      }
      for (const btn of imgBtns) {
         btn.classList.remove("selected");
      }
      btn.classList.add("selected");
      applyBtn.classList.add("active");
      appliedBg = false;
      currentSelected = btn;
   };

   const applyBg = (evt, type) => {
      localStorage.removeItem("bg-color");
      localStorage.removeItem("bg-img");
      localStorage.removeItem("uploaded-bg-img");
      if ((!type && backgroundTypeSelectorBtn.childNodes[0].nodeValue === "UPLOAD") || type === "upload") {
         try {
            removePreviewImg();
            const imgSrc = previewImg.src;
            localStorage.setItem("uploaded-bg-img", imgSrc);
            bgController.changeBackgroundImg(imgSrc);
            currentBg = imgSrc;
            for (const btn of colorBtns) {
               btn.classList.remove("selected");
            }
            for (const btn of imgBtns) {
               btn.classList.remove("selected");
            }
         } catch (e) {
            fileErrorMssg.classList.add("show");
         }
      } else {
         if ((!type && backgroundTypeSelectorBtn.childNodes[0].nodeValue === "COLORS") || type === "color") {
            const bodyClassName = `bg${[...currentSelected.parentElement.children].indexOf(currentSelected) + 1}`;
            bgController.changeBackgroundColor(bodyClassName);
            const radialGradient = getComputedStyle(document.body).backgroundImage;
            const rgbFrom = radialGradient.substring(
               stringUtils.nthIndex(radialGradient, "rgb", 1),
               stringUtils.nthIndex(radialGradient, ")", 1) + 1
            );
            const rgbTo = radialGradient.substring(
               stringUtils.nthIndex(radialGradient, "rgb", 2),
               stringUtils.nthIndex(radialGradient, ")", 2) + 1
            );
            localStorage.setItem("bg-color", rgbFrom + " " + rgbTo);
         } else if ((!type && backgroundTypeSelectorBtn.childNodes[0].nodeValue === "IMAGES") || type === "image") {
            const imgSrc = currentSelected.children[0].src;
            bgController.changeBackgroundImg(imgSrc);
            localStorage.setItem("bg-img", imgSrc);
         }
         currentBg = currentSelected;
      }
      appliedBg = true;
      applyBtn.classList.remove("active");
   };

   const removeUnappliedBgs = () => {
      if (!appliedBg) {
         for (const btn of colorBtns) {
            btn.classList.remove("selected");
         }
         if (currentBg.classList) currentBg.classList.add("selected");
         if (currentSelected && currentSelected != currentBg) currentSelected.classList.remove("selected");
      }
      removePreviewImg();
      applyBtn.classList.remove("active");
      backgroundTypes.classList.remove("show");
      arrow1.classList.remove("flip");
   };

   const closeSelectors = () => {
      backgroundTypes.classList.remove("show");
      musicChoices.classList.remove("show");
      sfxChoices.classList.remove("show");
      arrow1.classList.remove("flip");
      arrow2.classList.remove("flip");
      arrow3.classList.remove("flip");
   };

   const previewUploadedImg = () => {
      const file = fileInput.files[0];
      fileBtn.classList.remove("show");
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
         previewImg.src = reader.result;
      };
      reader.onerror = function (error) {
         console.log("Error: ", error);
      };
      previewImgContainer.classList.add("show");
      fileName.innerText = file.name;
      applyBtn.classList.add("active");
   };

   const removePreviewImg = () => {
      previewImgContainer.classList.remove("show");
      fileName.innerText = "";
      fileBtn.classList.add("show");
      fileInput.value = "";
      applyBtn.classList.remove("active");
   };

   const toggleMusicOptions = () => {
      musicChoices.classList.toggle("show");
      arrow2.classList.toggle("flip");
      sfxChoices.classList.remove("show");
      arrow3.classList.remove("flip");
   };

   const changeMusic = (evt, btnElem) => {
      const btn = evt ? evt.target : btnElem;
      musicSelectorBtn.childNodes[0].nodeValue = btn.innerText;
      audioController.changeMusic(
         [...btn.parentElement.parentElement.children].indexOf(btn.parentElement)
      );
      toggleMusicOptions();
      localStorage.setItem("music-type", btn.innerText);
   };

   const toggleSfxOptions = () => {
      sfxChoices.classList.toggle("show");
      arrow3.classList.toggle("flip");
      musicChoices.classList.remove("show");
      arrow2.classList.remove("flip");
   };

   const toggleSfx = (value) => {
      sfxSelectorBtn.childNodes[0].nodeValue = value;
      if (value === "ON") audioController.turnOnSfx();
      else if (value === "OFF") audioController.turnOffSfx();
      toggleSfxOptions();
      localStorage.setItem("sfx", value);
   };

   return {
      changeSettingsOption: changeSettingsOption,
      toggleBackgroundTypes: toggleBackgroundTypes,
      changeBackgroundOption: changeBackgroundOption,
      selectBgBtn: selectBgBtn,
      applyBg: applyBg,
      removeUnappliedBgs: removeUnappliedBgs,
      closeSelectors: closeSelectors,
      previewUploadedImg: previewUploadedImg,
      removePreviewImg: removePreviewImg,
      toggleMusicOptions: toggleMusicOptions,
      changeMusic: changeMusic,
      toggleSfxOptions: toggleSfxOptions,
      toggleSfx: toggleSfx,
   };
})();
