const Character = (() => {
  const characters = [];
  return class Character {
    constructor(json) {
      this.id = json.id;
      this.name = json.name;
      this.role = json.role;
      this.wins = 0;
      this.games = 0;
      characters.push(this);
    }

    average() {
      let average = Math.round(this.wins / this.games * 100);
      if (isNaN(average) === true) {
        return 0;
      } else {
        return average;
      }
    }

    static all() {
      return characters;
    }
  };
})();

const populateCharacters = () => {
  fetch("http://localhost:3000/api/v1/characters")
    .then(resp => resp.json())
    .then(json => json.forEach(characterjson => new Character(characterjson)))
    .then((parsedCharacters = Character.all()));
};

const updateCharacterWin = () => {
  parsedCharacters.forEach(character => {
    character.wins = 0;
    character.games = 0;
  });
  parsedReplays.forEach(function(replay) {
    replay.players.forEach(function(player) {
      let character = parsedCharacters.filter(function(character) {
        return character.id === player.characterId;
      });
      character[0].games += 1;
      if (player.winner) {
        character[0].wins += 1;
      }
    });
  });
};

let parsedCharacters = [];

const makeCharacterSelectForm = map => {
  $("#selectSpace")[0].innerHTML = "";
  let charactersSorted = parsedCharacters;
  charactersSorted
    .sort(function(a, b) {
      return a.average() - b.average();
    })
    .reverse();
  let selectInnerHTML = [];
  charactersSorted.forEach(function(character) {
    newOption = `<option value=${character.id}>${character.name} Role: ${character.role} Avg: ${character.average()} </option>`;
    selectInnerHTML.push(newOption);
  });

  $("#selectSpace")[0].innerHTML = `<form id='characterSelect'>

      <div class="select">
        <select name="character" id='characterChoice'>
          ${selectInnerHTML.join("")}
        </select>
      </div>
      <div class="field has-addons has-addons-left">
      <div class="select">
        <select name="team" id='team'>
          <option value='red'>Red Team</option>
          <option value='blue'>Blue Team</option>
          <option value='ban'>Banned</option>
        </select>
      </div>
      <div class="control">
        <button type="submit" class="button is-primary">Choose</button>
      </div>
      </div>
  </form>`;

  $(`#characterSelect`)[0].addEventListener("submit", function(event) {
    event.preventDefault();
    parseReplays();
  });
};

const updateCharacterAfterInitial = () => {
  parsedCharacters.forEach(character => {
    character.wins = 0;
    character.games = 0;
  });
  parsedReplays.forEach(function(replay) {
    replay.players.forEach(function(player) {
      let character = parsedCharacters.filter(function(character) {
        return character.id === player.characterId;
      });
      if (
        typeof character[0] !== "undefined" &&
        typeof character[0].games !== "undefined"
      ) {
        character[0].games += 1;
        if (player.winner) {
          character[0].wins += 1;
        }
      }
    });
  });
  makeCharacterSelectForm();
};
