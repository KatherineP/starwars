import React from 'react';
import ItemList from '../item-list';
import withData from '../hoc-helpers';
import { withSwapiService } from '../hoc-helpers';

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  }
}

const mapPersonMethodsProps = (swapi) => {
  return {
    getData: swapi.getAllPeople,
  }
};

const mapPlanetMethodsProps = (swapi) => {
  return {
    getData: swapi.getAllPlanets,
  }
};

const mapStarshipMethodsProps = (swapi) => {
  return {
    getData: swapi.getAllStarShips,
  }
};

const renderName = ({name}) => <span>{name}</span>;

const PersonList = withSwapiService(
                  withData(withChildFunction(ItemList, renderName)),
                  mapPersonMethodsProps);

const PlanetList = withSwapiService(
                  withData(withChildFunction(ItemList, renderName)), 
                  mapPlanetMethodsProps);

const StarshipList = withSwapiService(
                      withData(withChildFunction(ItemList, renderName)),
                      mapStarshipMethodsProps);

export {
  PersonList,
  PlanetList,
  StarshipList
}