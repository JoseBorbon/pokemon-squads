// const url = 'https://pokeapi.co/api/v2/pokemon?limit=30'; <--commented this since there was an unintentional behavior caused when referencing url inside of asynchronous function

//create an event listener that will get the current selected value in dropdown and then make it fetch picture for us
const goButton = document.querySelector('#pokemon-selector input[value="Go"]');
const addButton = document.querySelector('button');

addButton.addEventListener('click', () => {
  const teamList = document.querySelector('#team-list');
  const detailsPokemonName = document
    .querySelector('#details-name')
    .textContent.match(/Name:(.*)/)[1]
    .trim();
  const detailsImgContainerImg = document.querySelector(
    '#details-img-container img'
  );
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
      detailsPokemonName
    )
  );
});

goButton.addEventListener('click', (event) => {
  event.preventDefault();
  //get current dropdown select value
  const selectedVal = document.querySelector('#pokemon-select').value;

  (async function fetchMon(selectedValue) {
    const recentList = document.querySelector('#recent-list');
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${selectedValue}`
    );
    response = await response.json();
    // console.log(response);
    //destructuring response -- Will create function for this later//
    const {
      name,
      stats: {
        [0]: { base_stat: monHp },
        [1]: { base_stat: monAttack },
        [2]: { base_stat: monDefense },
        [3]: { base_stat: monSpAttack },
        [4]: { base_stat: monSpDefense },
        [5]: { base_stat: monSpeed },
      },
      sprites: {
        other: {
          ['official-artwork']: { front_default: newFetchedImg },
        },
      },
      types,
      weight,
      height,
    } = response;
    //destructuring response end
    detailsImg = document.querySelector('#details-img-container img');
    detailsImg.src = newFetchedImg;

    const monStats = [
      monHp,
      monSpeed,
      monAttack,
      monSpAttack,
      monDefense,
      monSpDefense,
    ];

    //used so that first letter in name is capitalized
    let properName = name[0].toUpperCase() + name.slice(1);
    //used to remove nidoran-fs annoying f which caused a bug
    //may need to instead clear each elements text content so that it removes after the colin with replace method
    if (properName.includes('-f')) {
      properName = properName.slice(0, -2);
    }
    //array used to give child elements textcontent properties values based on fetched result
    const monDetails = [properName, , weight, height];

    const detailsSubChildren = Array.from(
      document.querySelector('#details-sub-text').children
    );

    detailsSubChildren.forEach((el, index) => {
      if (index < 1) {
        return;
      } else {
        const regex = /: [0-9]*/i;
        let rep = el.textContent.replace(regex, `: ${monStats[index - 1]}`);
        el.textContent = rep;
      }
    });

    const detailsTextChildren = Array.from(
      document.querySelector('#details-text').children
    );
    detailsTextChildren.forEach((el, index) => {
      const regex = /: [a-z0-9]*/i;
      let rep = el.textContent.replace(regex, `: ${monDetails[index]}`);
      if (index === 1) {
        el.textContent = 'Type: ';

        //iterate through types
        let str = types.reduce((acc, { type: { name } }, index) => {
          if (types.length - 1 === index) {
            acc += name[0].toUpperCase() + name.slice(1);
            return acc;
          }
          acc += name[0].toUpperCase() + name.slice(1) + '/';
          return acc;
        }, '');
        el.textContent = el.textContent.replace(regex, `: ${str}`);
        return;
      } else {
        el.textContent = rep;
      }
    });
    //Potentially will be changing this to a closure
    if (childrenLengthIsEqualTo6(recentList.children.length)) {
      removeLastChildEl(recentList);
    }
    document
      .querySelector('#recent-list')
      .prepend(
        createElement(
          'div',
          'recent-list-item',
          'p',
          newFetchedImg,
          `recent image of ${properName}`,
          properName
        )
      );

    // console.log(monDetails);
    // console.log(types); //will need to iterate through types
  })(selectedVal);
});
// figure out what we're going to fetch and read documentation to figure out more about the restful API

addPokemonToDropDown();
