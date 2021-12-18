import { Battle } from "./battle.mjs";
import { eventHandler } from "./event-handler.mjs";
import { uiController } from "./ui-controller.mjs";
import { userSettings } from "./user-settings.mjs";

export const game = (() => {
   const battle = new Battle();

   const load = () => {
      eventHandler.setupEventListeners();
      userSettings.apply();
   }

   const start = (evt) => {
      const moveName = evt.currentTarget.id.substring(0, evt.currentTarget.id.length - 4);
      const result = battle.startBattle(moveName);
      uiController.playGameAnimation(evt.currentTarget, result);
   };

   const playAgain = () => uiController.resetUI();

   const resetScore = () => uiController.setScore(0);

   return {
      load: load,
      start: start,
      playAgain: playAgain,
      resetScore: resetScore,
   };
})();
