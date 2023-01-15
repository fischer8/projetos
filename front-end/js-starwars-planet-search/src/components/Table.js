import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { planets } = useContext(StarWarsContext);

  const header = (
    <tr>
      {Object.keys(planets[0] || '')?.map((head) => <th key={ head }>{head}</th>)}
    </tr>
  );

  const info = planets?.map((inf, index) => (
    <tr key={ index }>
      {
        Object.values(inf).map((result, i) => {
          if (i === 0) {
            return <th key={ result } data-testid="planet-name">{result}</th>;
          }
          return <th key={ result }>{result}</th>;
        })
      }
    </tr>
  ));

  return (
    <table>
      <thead>
        {header}
      </thead>
      <tbody>
        {info}
      </tbody>
    </table>
  );
}
