export class Move {
   #name;
   #winsAgainst;

   constructor(name, winsAgainst) {
      this.#name = name;
      this.#winsAgainst = winsAgainst;
   }

   getName() {
      return this.#name;
   }

   battle(move) {
      if (move instanceof Move) {
         if (move.#name === this.#name) return "draw";
         return this.#winsAgainst.includes(move.#name) ? "win" : "lose";
      } else {
         throw new Error("Paramter is not an instance of type Move");
      }
   }
}
