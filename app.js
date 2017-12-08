document.addEventListener("DOMContentLoaded", function() {
  populateMaps();
  populateCharacters();
  $("#reset")[0].addEventListener("click", () => location.reload());
});

const populateMaps = () => {
  fetch("http://localhost:3000/api/v1/maps")
    .then(resp => resp.json())
    .then(function(json) {
      json.forEach(function(map) {
        let newMap = new Map(map);
      });
    })
    .then(() => makeMapForm());
};

const searchReplays = event => {
  let map = $("#selectArea")[0].value;
  $("#selectSpace")[0].innerHTML = "Searching...";
  fetch(`http://localhost:3000/api/v1/maps/${map}/replays`)
    .then(resp => resp.json())
    .then(function(json) {
      json.forEach(function(replay) {
        let newReplay = new Replay(replay);
      });
      parsedReplays = Replay.all();
      updateCharacterWin();
      makeCharacterSelectForm(map);
    })
    .then(() => {
      let mapName = Map.all().filter(function(currentMap) {
        console.log(currentMap.name);
        return currentMap.id === parseInt(map);
      });
      console.log(parseInt(map));
      $("#mapName")[0].innerHTML += `<h4>Drafting for ${mapName[0].name}:</h4>`;
    });
};
