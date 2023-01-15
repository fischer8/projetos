const data = require('../data/zoo_data');

function countAnimals(animal) {
  if (!animal) {
    const species = {};
    data.species.forEach((specie) => { species[specie.name] = specie.residents.length; });
    return species;
  }
  const { residents } = data.species.find((speciee) => speciee.name === animal.specie);
  if (animal.sex) {
    return residents.filter((species) => species.sex === animal.sex).length;
  }
  return residents.length;
}

module.exports = countAnimals;
