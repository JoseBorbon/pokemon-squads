class TeamState {
  constructor() {
    this.hp = 0;
    this.speed = 0;
    this.attack = 0;
    this.defense = 0;
    this.spAttack = 0;
    this.spDefense = 0;
    this.teamsCache = {};
    this.recentMon = null;
    this.teamMons = [];
    this.teamStatHTMLTextAttributes = [
      'Health Points',
      'Speed',
      'Attack',
      'Defense',
      'Sp.Attack',
      'Sp.Defense',
    ];
    this.teamStatAttributes = [
      'hp',
      'speed',
      'attack',
      'defense',
      'spAttack',
      'spDefense',
    ];
  }

  //methods
  addMonToCache = function (monName, monStats) {
    this.teamMons.push(monName);
    this.teamsCache[monName] = monStats.reduce((acc, currStat, index) => {
      acc[this.teamStatAttributes[index]] = currStat;
      return acc;
    }, {});
    this.incrementTeamStateVals(this.teamsCache[monName]);
  };

  incrementTeamStateVals = function (currMonObj) {
    for (const prop in currMonObj) {
      this[prop] += currMonObj[prop];
    }
    this.updateTeamState();
  };

  removeMonFromCache = function (monName) {
    this.teamMons.splice(this.teamMons.indexOf(monName), 1);
    this.decrementTeamStateVals(this.teamsCache[monName]);
    delete this.teamsCache[monName];
  };

  decrementTeamStateVals = function (currMonObj) {
    //iterate through specific monStats Object
    for (const prop in currMonObj) {
      this[prop] -= currMonObj[prop];
    }
    this.updateTeamState();
  };

  updateTeamState = function () {
    const teamStatVals = [
      this.hp,
      this.speed,
      this.attack,
      this.defense,
      this.spAttack,
      this.spDefense,
    ];
    //function invocation will update the HTML pages elements text contents
    //query select and change text content of all team-list elements
    const statsChildren = Array.from(
      document.querySelector('#team-stats').children
    );

    statsChildren.forEach(
      (el, index) =>
        (el.textContent =
          this.teamStatHTMLTextAttributes[index] + ': ' + teamStatVals[index])
    );
  };
}
