const Player = (() => {
  const players = [];
  return class Player {
    constructor(json) {
      this.id = json.id;
      this.characterId = json.character_id;
      this.winner = json.winner;
      players.push(this);
    }
    static all() {
      return players;
    }
  };
})();
