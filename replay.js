const Replay = (() => {
  const replays = [];
  return class Replay {
    constructor(json) {
      this.id = json.id;
      this.players = [];
      json.players.forEach(player => {
        let newPlayer = new Player(player);
        this.players.push(newPlayer);
      });
      replays.push(this);
    }

    characters() {
      let characters = [];
      this.players.forEach(function(player) {
        let character = Character.all().filter(function(obj) {
          return obj.id == player.characterId;
        });
        characters.push(character);
      });
      return characters;
    }

    static all() {
      return replays;
    }
  };
})();

const parseReplays = () => {
  let team = $("#team")[0].value;
  let characterPick = Character.all().filter(function(obj) {
    return obj.id == $("#characterChoice")[0].value;
  });
  let oldParsedReplays = parsedReplays;
  parsedReplays = [];
  if (team == "ban") {
    oldParsedReplays.forEach(function(replay) {
      if (
        !Array.prototype.concat
          .apply([], replay.characters())
          .includes(characterPick[0])
      ) {
        parsedReplays.push(replay);
      }
    });
  } else {
    oldParsedReplays.forEach(function(replay) {
      replay.characters().forEach(function(character) {
        if (character[0].name === characterPick[0].name) {
          parsedReplays.push(replay);
        }
      });
    });
  }

  parsedCharacters = parsedCharacters.filter(function(character) {
    return character.id != characterPick[0].id;
  });
  let teamPick = $(`#team`)[0].value;
  $(
    `#${teamPick}`
  )[0].innerHTML += `<div class="box is-small">${characterPick[0]
    .name}: ${characterPick[0].role}</div>`;
  updateCharacterAfterInitial();
};

let parsedReplays = [];
