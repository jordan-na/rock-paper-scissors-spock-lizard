import { audioController } from "./audio-controller.mjs";
import { settingsController } from "./settings-controller.mjs";

export const uiController = (() => {
   const scoreNum = document.querySelector("#score-num");
   const moveBtnsContainer = document.querySelector("#move-btns-container");
   const moveBtnContainers = document.querySelectorAll("#move-btns li");
   const pentagon = document.querySelector("#pentagon");
   const gameContainer = document.querySelector("#game-container");
   const playerMove = document.querySelector("#player-move");
   const houseMove = document.querySelector("#house-move");
   const gameResult = document.querySelector("#game-result");
   const resultMessage = document.querySelector("#result-message");
   const darkBg = document.querySelector("#dark-bg");
   const settings = document.querySelector("#settings-container");
   const rules = document.querySelector("#rules-container");

   let score = 0;
   const imgSrcs = {
      scissors: "images/scissors-btn.svg",
      paper: "images/paper-btn.svg",
      rock: "images/rock-btn.svg",
      lizard: "images/lizard-btn.svg",
      spock: "images/spock-btn.svg",
   };

   const playGameAnimation = async (moveBtn, result) => {
      removeUnselectedMoves(moveBtn.parentElement);
      await animateSelectedMove(moveBtn.parentElement, 500);
      await animatePentagon(400);
      await showGameResult(result.status, result.playerMove, result.houseMove, moveBtn.parentElement);
      if (result.status === "win") setScore(++score);
   };

   const removeUnselectedMoves = (elem) => {
      for (const move of moveBtnContainers) {
         if (move != elem) {
            if (move.id === "scissors-btn-container") {
               move.animate([{ transform: "translateX(-50%) rotate(360deg) scale(0.5)", opacity: "0" }], {
                  duration: 400,
                  fill: "forwards",
               });
            } else {
               move.animate([{ transform: "rotate(360deg) scale(0.5)", opacity: "0" }], {
                  duration: 400,
                  fill: "forwards",
               });
            }
         } else {
            move.classList.add("selected");
         }
         move.classList.add("no-pointer-events");
      }
   };

   const animateSelectedMove = (elem, duration) => {
      return new Promise((resolve, reject) => {
         let moveToCenter;
         const middleY = moveBtnsContainer.getBoundingClientRect().bottom - moveBtnsContainer.offsetHeight / 2;
         const deltaY = elem.getBoundingClientRect().bottom - middleY - elem.offsetHeight / 2;
         if(elem.id === "scissors-btn-container") {
            moveToCenter = `translate(calc(0px - 50%), ${-deltaY}px)`;
         } else {
            const middleX = moveBtnsContainer.getBoundingClientRect().right - moveBtnsContainer.offsetWidth / 2;
            const deltaX = elem.getBoundingClientRect().right - middleX - elem.offsetWidth / 2;
            moveToCenter = `translate(${-deltaX}px, ${-deltaY}px)`;
         }
         const scale = " scale(1.1)";
         elem.animate([{ transform: moveToCenter + scale }], { duration: duration, fill: "forwards" });
         setTimeout(() => resolve(), duration);
      });
   };

   const animatePentagon = (duration) => {
      return new Promise((resolve, reject) => {
         pentagon.animate([{ transform: "translate(-50%, -50%) scale(0.2)" }], {
            duration: duration,
            fill: "forwards",
         });
         setTimeout(() => resolve(), duration);
      });
   };

   const showGameResult = async (result, playerMoveName, houseMoveName, playerMoveElement) => {
      moveBtnsContainer.classList.remove("show");
      await wait(500);
      repositionSelectedMove(playerMoveElement);
      unanimatePentagon();
      moveBtnsContainer.classList.add("remove");
      gameContainer.classList.remove("remove");
      await wait(100);
      gameContainer.classList.add("show");
      playerMove.src = imgSrcs[playerMoveName];
      houseMove.src = imgSrcs[houseMoveName];
      await wait(600);
      houseMove.classList.add("show");
      if (result === "win") {
         setTimeout(audioController.playWinSfx, 600);
         resultMessage.innerText = "You Win";
         await wait(200);
         playerMove.parentElement.classList.add("winner");
      } else if (result === "lose") {
         setTimeout(audioController.playLoseSfx, 600);
         resultMessage.innerText = "You Lose";
         await wait(200);
         houseMove.parentElement.classList.add("winner");
      } else if (result === "draw") {
         resultMessage.innerText = "Draw";
      }
      await wait(350);
      gameContainer.classList.add("spread-apart");
      await wait(400);
      gameResult.classList.add("show");
   };

   const repositionSelectedMove = (elem) => {
      const moveBackToPos =
         elem.id === "scissors-btn-container" ? "translate(calc(0px - 50%), 0px)" : "translate(0px, 0px)";
      elem.animate([{ transform: moveBackToPos }], { duration: 100, fill: "forwards" });
   };

   const unanimatePentagon = () => {
      pentagon.animate([{ transform: "translate(-50%, -50%) scale(1)" }], {
         duration: 100,
         fill: "forwards",
      });
   };

   const resetUI = async () => {
      gameResult.classList.remove("show");
      await wait(400);
      gameContainer.classList.remove("spread-apart");
      await wait(150);
      gameContainer.classList.remove("show");
      playerMove.parentElement.classList.remove("winner");
      houseMove.parentElement.classList.remove("winner");
      houseMove.classList.remove("show");
      await wait(500);
      gameContainer.classList.add("remove");
      moveBtnsContainer.classList.remove("remove");
      await wait(100);
      moveBtnsContainer.classList.add("show");
      bringBackUnselectedMoves();
   };

   const bringBackUnselectedMoves = () => {
      for (const move of moveBtnContainers) {
         if (move.classList.contains("selected")) {
            move.classList.remove("selected");
         } else {
            if (move.id === "scissors-btn-container") {
               move.animate(
                  [
                     { transform: "translateX(-50%) rotate(360deg) scale(0.5)", opacity: "0" },
                     { transform: "translateX(-50%) rotate(0deg) scale(1)", opacity: "1" },
                  ],
                  {
                     duration: 400,
                     fill: "forwards",
                  }
               );
            } else {
               move.animate(
                  [
                     { transform: "rotate(360deg) scale(0.5)", opacity: "0" },
                     { transform: "rotate(0deg) scale(1)", opacity: "1" },
                  ],
                  {
                     duration: 400,
                     fill: "forwards",
                  }
               );
            }
         }
         move.classList.remove("no-pointer-events");
      }
   };

   const wait = (duration) => {
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(), duration);
      });
   };

   const setScore = (s) => {
      score = s;
      scoreNum.innerText = s;
      localStorage.setItem("score", s);
   };

   const openSettings = () => {
      darkBg.classList.add("show");
      settings.classList.add("show");
   };

   const closeSettings = () => {
      darkBg.classList.remove("show");
      settings.classList.remove("show");
      settingsController.removeUnappliedBgs();
      settingsController.closeSelectors();
   };

   const toggleRules = () => {
      darkBg.classList.toggle("show");
      rules.classList.toggle("show");
   };

   return {
      playGameAnimation: playGameAnimation,
      resetUI: resetUI,
      openSettings: openSettings,
      closeSettings: closeSettings,
      toggleRules: toggleRules,
      setScore: setScore,
   };
})();
