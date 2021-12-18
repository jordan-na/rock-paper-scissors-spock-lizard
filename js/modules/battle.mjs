import { Move } from "./move.mjs";

export class Battle {
   #moves = [];

   constructor() {
      this.#moves.push(new Move("scissors", ["paper", "lizard"]));
      this.#moves.push(new Move("paper", ["rock", "spock"]));
      this.#moves.push(new Move("rock", ["lizard", "scissors"]));
      this.#moves.push(new Move("lizard", ["paper", "spock"]));
      this.#moves.push(new Move("spock", ["scissors", "rock"]));
   }

   startBattle(moveName) {
      const playerMove = this.#moves.filter(m => m.getName() === moveName)[0];
      console.log("Player chose: " + playerMove.getName());
      const houseMove = this.#generateRandomMove();
      console.log("House chose: " + houseMove.getName());
      return {
         status: playerMove.battle(houseMove),
         playerMove: playerMove.getName(),
         houseMove: houseMove.getName()
      };
   }

   #generateRandomMove() {
      return this.#moves[Math.floor(Math.random() * 5)];
   }
}