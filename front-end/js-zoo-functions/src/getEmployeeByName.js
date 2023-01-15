const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (!employeeName) { return {}; }
  return data.employees.find((e) => employeeName === e.firstName || employeeName === e.lastName);
}

module.exports = getEmployeeByName;
