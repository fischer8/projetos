import React from 'react';
import Header from './components/Header';
import Missions from './components/Missions';
import SolarSystem from './components/SolarSystem';
import './components/styles/style.css';

class App extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <SolarSystem />
        <Missions />
      </section>
    );
  }
}

export default App;
