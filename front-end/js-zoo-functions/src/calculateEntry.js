const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const visitors = {
    child: entrants.filter(({ age }) => age < 18).length,
    adult: entrants.filter(({ age }) => age >= 18 && age < 50).length,
    senior: entrants.filter(({ age }) => age >= 50).length,
  };
  return visitors;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) { return 0; }
  const defined = countEntrants(entrants);
  return defined.child * 20.99 + defined.adult * 49.99 + defined.senior * 24.99;
}

module.exports = { calculateEntry, countEntrants };
