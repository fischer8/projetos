import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function SearchBar() {
  const { filteredPlanets, allPlanets, setPlanets } = useContext(StarWarsContext);

  const handleOnChange = ({ target: { value } }) => {
    const filtered = filteredPlanets.length > 0
      ? filteredPlanets.filter(({ name }) => name.match(new RegExp(value, 'i')))
      : allPlanets.filter(({ name }) => name.match(new RegExp(value, 'i')));
    setPlanets(filtered);
  };

  return (
    <input onChange={ handleOnChange } type="text" data-testid="name-filter" />
  );
}
