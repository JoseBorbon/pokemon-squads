// const url = 'https://pokeapi.co/api/v2/pokemon?limit=30'; <--commented this since there was an unintentional behavior caused when referencing url inside of asynchronous function

//created IIFE to add all fetched pokemon from fetch
(async function addPokemonToDropDown() {
  const dropdown = document.querySelector('#pokemon-select');
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
  const { results, url } = await response.json();

  //iterate through response and append options with values
  results.forEach((el) => {
    createDropDownOptions(dropdown, el);
  });
})();

//create an event listener that will get the current selected value in dropdown and then make it fetch picture for us
const goButton = document.querySelector('#pokemon-selector input[value="Go"]');

goButton.addEventListener('click', (event) => {
  event.preventDefault();
  //get current dropdown select value
  const selectedVal = document.querySelector('#pokemon-select').value;
  (async function fetchMon(selectedValue) {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${selectedValue}`
    );
    response = await response.json();
    console.log(response);
  })(selectedVal);
});
// figure out what we're going to fetch and read documentation to figure out more about the restful API
