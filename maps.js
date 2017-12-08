const Map = (() => {
  const maps = [];
  return class Map {
    constructor(json) {
      this.id = json.id;
      this.name = json.name;
      maps.push(this);
    }
    static all() {
      return maps;
    }
  };
})();

const makeMapForm = () => {
  let maps = Map.all();
  let mapOptions = [];
  mapOptions.push(`<select>`);
  maps.forEach(map => {
    let newOption = `<option value="${map.id}">${map.name}</option>`;
    mapOptions.push(newOption);
  });
  let form = ($(
    "#map_dropdown"
  )[0].innerHTML = `<form id='selectForm'><div class="field has-addons">
    <div class="control">
      <div class="select">
        <select name="map" id='selectArea'> </select>
        </div>
      </div>
      <div class="control">
        <button type="submit" class="button is-primary">Choose</button>
      </div>
    </div>
  </form>`);
  let selectArea = $("#selectArea")[0];
  selectArea.innerHTML += mapOptions.join("");
  $("#selectForm")[0].addEventListener("submit", function(event) {
    event.preventDefault();
    searchReplays(event);
  });
};
