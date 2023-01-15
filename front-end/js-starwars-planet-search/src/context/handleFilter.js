export default function handleFilter(planet, option) {
  const { column, comparison, input } = option;
  switch (comparison) {
  case 'maior que':
    return +planet[column] > +input;
  case 'menor que':
    return +planet[column] < +input;
  case 'igual a':
    return +planet[column] === +input;
  default:
    return [];
  }
}
