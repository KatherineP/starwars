import React, { useEffect, useState } from 'react';
import './random-planet.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import useInterval from '@use-it/interval';
//import PropTypes from 'prop-types';

const swapi = new SwapiService();

const RandomPlanet = () => {
  const [planet, setPlanet] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 25 + 1));

  useEffect(() => {
    swapi
    .getPlanet(randomId)
    .then(onPlanetLoaded)
    .catch(onError);
  }, [randomId]);

  useInterval(() => {
    setRandomId(Math.floor(Math.random() * 25 + 1))
  }, 10000);


  // const updatePlanet = () => {
  //   swapi
  //   .getPlanet(randomId)
  //   .then(onPlanetLoaded)
  //   .catch(onError);
  // };

  const onPlanetLoaded = (planet) => {
    setPlanet(planet);
    setLoading(false);
  }

  const onError = (err) => {
    setError(true);
    setLoading(false);
  }

  const hasData = !(loading || error);
  const content = hasData ? <PlanetView planet={planet} /> : null

  return(
    <div className="random-planet jumbotron rounded">
      { error &&  <ErrorIndicator /> }
      { loading &&  <Spinner />}
      { content }
    </div>
  );

};

export default RandomPlanet;

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <React.Fragment>
<img className="planet-image" alt="test"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
        <div>
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{ population }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{ rotationPeriod }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{ diameter }</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  )
};
