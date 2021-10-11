// const url = 'https://pokeapi.co/api/v2/pokemon?limit=30'; <--commented this since there was an unintentional behavior caused when referencing url inside of asynchronous function

//create an event listener that will get the current selected value in dropdown and then make it fetch picture for us
const goButton = document.querySelector('#pokemon-selector input[value="Go"]');
const addButton = document.querySelector('button');

addButton.addEventListener('click', () => {
  const detailsPokemonName = document
    .querySelector('#details-name')
    .textContent.match(/Name:(.*)/)[1]
    .trim();

  //guard clause to prevent repeat adds to team
  if (currState.teamMons.includes(detailsPokemonName)) {
    return;
  }
  const teamList = document.querySelector('#team-list');
  const detailsImgContainerImg = document.querySelector(
    '#details-img-container img'
  );

  const detailsPokemonStats = document.querySelectorAll('.base-stats');
  const monStats = [];

  detailsPokemonStats.forEach((node, index) => {
    monStats[index] = Number(node.textContent.match(/[0-9]+/gi)[0]);
  });

  //Used to prevent additional mons from being added to team if size is 6 already
  if (childrenLengthIsEqualTo6(teamList.children.length)) {
    return;
  }

  teamList.append(
    createElement(
      'li',
      '',
      'span',
      detailsImgContainerImg.src,
      'Pokémon Team Thumbnail',
      detailsPokemonName,
      true //true for wantsEventListener, otherwise default will be false
    )
  );

  currState.addMonToCache(detailsPokemonName, monStats);
});

goButton.addEventListener('click', (event) => {
  event.preventDefault();
  //get current dropdown select value
  const selectedVal = document.querySelector('#pokemon-select').value;
  fetchMon(selectedVal);
});

//Used to add all fetched pokemon to dropdown menu
addPokemonToDropDown();
//object used to keep track of current state
const currState = new TeamState();
