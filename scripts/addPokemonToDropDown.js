async function addPokemonToDropDown() {
  const dropdown = document.querySelector('#pokemon-select');
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
  const { results, url } = await response.json();

  //iterate through response and append options with values
  results.forEach((el) => {
    createDropDownOptions(dropdown, el);
  });
}
