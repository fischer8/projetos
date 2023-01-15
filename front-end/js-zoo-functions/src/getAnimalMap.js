const data = require('../data/zoo_data');

const findEspecieByLocation = (local) => data.species
  .find(({ location }) => location.includes(local));

const getResidentsBySpecie = (specie) => data.species
  .find(({ name }) => name.includes(specie)).residents.map((resident) => resident.name);

const fetchSpecieResidents = (specie) =>
  ({ [Object.keys(specie)]: Object.values(specie)[0].sort() });

const filterSex = (specie, sex) => data.species
  .find(({ name }) => name.includes(specie)).residents
  .filter((residents) => residents.sex === sex).map((resident) => resident.name);

const fetchMap = (location) => ({ [location]: [findEspecieByLocation(location).name] });

const fetchNamesInLocations = (specie) => ({ [specie]: getResidentsBySpecie(specie) });

const fetchFilteredNames = (specie, sex) => ({ [specie]: filterSex(specie, sex) });

const allLocations = () => data.species
  .reduce((obj, specie) => {
    if (Object.keys(obj).includes(specie.location)) {
      obj[specie.location].push(specie.name);
    } else {
      return ({ ...obj, ...fetchMap(specie.location) });
    }
    return obj;
  }, {});

const fetchSortedNames = (location, species) => {
  const obj = {
    [location]: [],
  };
  species.forEach((specie) => obj[location].push(fetchSpecieResidents(specie)));
  return obj;
};

const sortMap = (objLocations) => {
  const a = Object.entries(objLocations).reduce((obj, [location, species]) => {
    if (Object.keys(obj).includes(location)) {
      species.forEach((specie) => obj[location].push(fetchSpecieResidents(specie)));
    } else {
      return ({ ...obj, ...fetchSortedNames(location, species) });
    }
    return obj;
  }, {});
  return a;
};

const includeNamesInAllLocations = (options) => {
  const map = Object.entries(allLocations())
    .reduce((obj, [location, species]) => {
      if (options.sex) {
        species.forEach((specie) => obj[location].push(fetchFilteredNames(specie, options.sex)));
      } else {
        species.forEach((specie) => obj[location].push(fetchNamesInLocations(specie)));
      }
      return obj;
    }, { NE: [], NW: [], SE: [], SW: [] });
  if (options.sorted) {
    return sortMap(map);
  }
  return map;
};

function getAnimalMap(options) {
  if (!options || !options.includeNames) {
    return allLocations();
  }
  return includeNamesInAllLocations(options);
}

module.exports = getAnimalMap;
