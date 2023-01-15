const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const specs = data.species.find((specie) => animal === specie.name).residents;
  return specs.every((spec) => age <= spec.age);
}

module.exports = getAnimalsOlderThan;
