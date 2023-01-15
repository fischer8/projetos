import SearchBar from './components/SearchBar';
import Table from './components/Table';
import Filter from './components/Filter';
import Options from './components/Options';
import Sort from './components/Sort';

export default function Main() {
  return (
    <section>
      <SearchBar />
      <Filter />
      <Sort />
      <Options />
      <Table />
    </section>
  );
}
