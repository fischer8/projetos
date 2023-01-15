const data = require('../data/zoo_data');

const findSpecies = (param) => data.species.find((specie) => specie.name === param);

const isDay = (param) => Object.entries(data.hours).some((day) => day.includes(param));

const speciesAvailabilityByDate = (date) => data.species
  .filter(({ availability }) => availability.includes(date))
  .map((specie) => specie.name);

const isExhibitionAvailable = (date) => {
  if (date === 'Monday') return 'The zoo will be closed!';
  return speciesAvailabilityByDate(date);
};

const isOfficeHourAvailable = (hour) => {
  if (hour.open) return `Open from ${hour.open}am until ${hour.close}pm`;
  return 'CLOSED';
};

const fetchSchedule = ([date, hour]) => {
  const schedule = {};
  schedule[date] = {
    officeHour: isOfficeHourAvailable(hour),
    exhibition: isExhibitionAvailable(date),
  };
  return schedule;
};

const allDaysSchedule = () => Object.entries(data.hours)
  .reduce((obj, date) => ({ ...obj, ...fetchSchedule(date) }), {});

const singleDaySchedule = (day) =>
  fetchSchedule(Object.entries(data.hours)
    .find((daySchedule) => daySchedule.includes(day)));

function getSchedule(scheduleTarget) {
  if (findSpecies(scheduleTarget)) {
    return findSpecies(scheduleTarget).availability;
  }
  if (isDay(scheduleTarget)) {
    return singleDaySchedule(scheduleTarget);
  }
  return allDaysSchedule();
}

module.exports = getSchedule;
