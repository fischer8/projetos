const data = require('../data/zoo_data');

const findEmployeeById = (id) => data.employees.find((employee) => employee.id.includes(id));

const findResidentById = (id) => data.species.find((specie) => specie.id.includes(id));

const findOldestAgeByResidents = ([...species]) =>
  species.map((specie) => specie.age).reduce((a, b) => Math.max(a, b));

function getOldestFromFirstSpecies(id) {
  const idFirstSpecie = findEmployeeById(id).responsibleFor[0];
  const { residents } = findResidentById(idFirstSpecie);
  const oldestAge = findOldestAgeByResidents(residents);
  return [...Object.values(residents.find((resident) => resident.age === oldestAge))];
}

module.exports = getOldestFromFirstSpecies;
