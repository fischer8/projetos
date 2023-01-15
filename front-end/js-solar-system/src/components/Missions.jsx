import React from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';

class Missions extends React.Component {
  render() {
    return (
      <div data-testid="missions" className="missions-container">
        <Title headline="Missões" />
        <section className="missions-content">
          {missions.map(({ name, year, country, destination }) => (<MissionCard
            key={ name }
            name={ name }
            year={ year }
            country={ country }
            destination={ destination }
          />))}
        </section>
      </div>
    );
  }
}

export default Missions;
