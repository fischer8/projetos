import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Filter() {
  const { filterOptions, setOptions, allCategories,
    setAllOptions, allOptions } = useContext(StarWarsContext);
  const { column, comparison, input } = filterOptions;
  const MAX_LENGTH = 4;

  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  const categoriesOpts = allCategories.map((opt) => (
    <option value={ opt } key={ opt }>{opt}</option>
  ));
  const comparisonOpts = comparisonOptions.map((opt) => (
    <option value={ opt } key={ opt }>{opt}</option>
  ));

  const handleOnChange = ({ target: { value, id } }) => {
    const options = filterOptions;
    options[id] = value;
    setOptions({ ...options });
  };

  return (
    <form>
      <select
        value={ column }
        id="column"
        onChange={ handleOnChange }
        data-testid="column-filter"
      >
        {categoriesOpts}
      </select>
      <select
        value={ comparison }
        id="comparison"
        onChange={ handleOnChange }
        data-testid="comparison-filter"
      >
        {comparisonOpts}
      </select>
      <input
        id="input"
        value={ input }
        onChange={ handleOnChange }
        type="number"
        data-testid="value-filter"
      />
      <button
        disabled={ allOptions.length > MAX_LENGTH }
        onClick={ () => setAllOptions((prev) => [...prev, { ...filterOptions }]) }
        type="button"
        data-testid="button-filter"
      >
        FILTRAR
      </button>
      {allOptions.length > 0 && (
        <button
          onClick={ () => setAllOptions([]) }
          type="button"
          data-testid="button-remove-filters"
        >
          REMOVER FILTROS
        </button>
      )}
    </form>
  );
}
