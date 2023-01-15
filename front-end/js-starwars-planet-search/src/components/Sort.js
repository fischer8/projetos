import { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Sort() {
  const { setSort } = useContext(StarWarsContext);
  const [sortOptions, setSortOptions] = useState({ column: 'population' });

  const allCategories = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const categories = allCategories.map((opt) => (
    <option value={ opt } key={ `${opt}2` }>{opt}</option>
  ));

  const handleOnChange = ({ target: { name, value } }) => {
    setSortOptions((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  return (
    <form>
      <select
        name="column"
        onChange={ handleOnChange }
        data-testid="column-sort"
      >
        {categories}
      </select>
      <label htmlFor="sort">
        Ascendente
        <input
          name="sort"
          value="ASC"
          onChange={ handleOnChange }
          type="radio"
          data-testid="column-sort-input-asc"
        />
        Descendente
        <input
          name="sort"
          value="DESC"
          onChange={ handleOnChange }
          type="radio"
          data-testid="column-sort-input-desc"
        />
      </label>
      <button
        disabled={ !('sort' in sortOptions) }
        onClick={ () => setSort({ ...sortOptions }) }
        type="button"
        data-testid="column-sort-button"
      >
        ORDENAR
      </button>
    </form>
  );
}
