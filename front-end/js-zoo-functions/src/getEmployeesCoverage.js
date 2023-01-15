const data = require('../data/zoo_data');

const getEmployee = (idOrName) => data.employees.find((employee) =>
  employee.id.includes(idOrName) || employee.firstName.includes(idOrName)
  || employee.lastName.includes(idOrName));

const findEspecieById = (id) => data.species.find((specie) => specie.id.includes(id));

const findSpecieByArrayOfIds = (ids) => {
  const species = [];
  ids.forEach((id) => species.push(findEspecieById(id).name));
  return species;
};

const findLocationByArrayOfIds = (ids) => {
  const species = [];
  ids.forEach((id) => species.push(findEspecieById(id).location));
  return species;
};

const fetchEmployees = (idOrName) => {
  const employee = {
    id: getEmployee(idOrName).id,
    fullName: `${getEmployee(idOrName).firstName} ${getEmployee(idOrName).lastName}`,
    species: findSpecieByArrayOfIds(getEmployee(idOrName).responsibleFor),
    locations: findLocationByArrayOfIds(getEmployee(idOrName).responsibleFor),
  };
  return employee;
};

const allEmployees = () => [...data.employees.map((employee) => fetchEmployees(employee.id))];

function getEmployeesCoverage(nameOrId) {
  if (!nameOrId) {
    return allEmployees();
  }
  const idOrName = Object.values(nameOrId);
  if (!getEmployee(idOrName)) {
    throw new Error('Informações inválidas');
  }
  return fetchEmployees(idOrName);
}

module.exports = getEmployeesCoverage;
