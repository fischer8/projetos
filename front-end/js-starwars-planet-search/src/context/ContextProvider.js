import { useState, useMemo, useEffect } from 'react';
import { node } from 'prop-types';
import handleFilter from './handleFilter';
import fetchPlanets from '../services/api';
import StarWarsContext from './StarWarsContext';

export default function ContextProvider({ children }) {
  const defaultOpts = { column: 'population', comparison: 'maior que', input: '0' };
  const categoryOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterOptions, setOptions] = useState(defaultOpts);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [allCategories, setCategories] = useState(categoryOptions);
  const [sortOptions, setSort] = useState({});

  const contextValue = useMemo(() => (
    {
      planets,
      setPlanets,
      allPlanets,
      setAllPlanets,
      filterOptions,
      setOptions,
      filteredPlanets,
      setFilteredPlanets,
      allOptions,
      setAllOptions,
      allCategories,
      setCategories,
      sortOptions,
      setSort,
    }), [planets, allPlanets,
    filterOptions, filteredPlanets,
    allOptions, allCategories, sortOptions]);

  useEffect(() => {
    const fetchApi = async () => {
      const apiResponse = await fetchPlanets();
      apiResponse?.forEach((planet) => {
        delete planet.residents;
      });
      setAllPlanets(apiResponse);
      setPlanets(apiResponse);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const handleReduceOpt = (planetsArr, option) => planetsArr
      .filter((planet) => handleFilter(planet, option));

    const handleReduceCat = (categoriesArr, option) => categoriesArr
      .filter((categorie) => categorie !== option.column);

    const filteredCategories = () => allOptions
      .reduce(handleReduceCat, categoryOptions);

    const categories = allOptions.length > 0
      ? filteredCategories()
      : categoryOptions;

    const reducedResult = allOptions.reduce(handleReduceOpt, allPlanets);

    setOptions((prev) => {
      const cat = categories[0];
      prev.column = cat;
      return prev;
    });

    setCategories(categories);
    setPlanets(reducedResult);
    setFilteredPlanets(reducedResult);
  }, [allOptions]);

/*
useEffect(() => {
  const { column, sort } = sortOptions;

  const sortedPlanets = planets.sort((planet1, planet2) => {
    if (planet1[column] === 'unknown') {
      return sort === 'ASC' ? 1 : -1;
    }
    if (planet2[column] === 'unknown') {
      return sort === 'ASC' ? -1 : 1;
    }

    if (sort === 'ASC') {
      return planet1[column] - planet2[column];
    } else {
      return planet2[column] - planet1[column];
    }
  });

  setPlanets(sortedPlanets);
}, [sortOptions]);
*/

  useEffect(() => {
    const { column, sort } = sortOptions;
    const filterUnknown = planets.filter((planet) => planet[column] !== 'unknown');
    const unknownPlanets = planets.filter((planet) => planet[column] === 'unknown');

    const sortedPlanets = sort === 'ASC'
      ? filterUnknown.sort((planet1, planet2) => planet1[column] - planet2[column])
      : filterUnknown.sort((planet1, planet2) => planet2[column] - planet1[column]);

    setPlanets([...sortedPlanets, ...unknownPlanets]);
  }, [sortOptions]);

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: node.isRequired,
};
