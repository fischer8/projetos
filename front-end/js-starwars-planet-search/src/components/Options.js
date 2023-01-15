import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Options() {
  const { allOptions, setAllOptions } = useContext(StarWarsContext);

  const handleOnClick = (index) => {
    setAllOptions((prev) => prev.filter((_opt, i) => i !== index));
  };

  const selectOptions = allOptions.length > 0
  && allOptions.map((option, index) => (
    <p key={ index } data-testid="filter">
      {`${option.column} ${option.comparison} ${option.input}  `}
      <button onClick={ () => handleOnClick(index) } type="button">X</button>
    </p>
  ));

  return (<section>{selectOptions}</section>);
}
