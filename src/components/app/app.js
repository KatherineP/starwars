
import React, { Component } from 'react';
import { SwapiServiceProvider } from '../swapi-service-context';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary/error-boundary';
import './app.css';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import SwapiService from '../../services/swapi-service';

export default class App extends Component {

  swapi = new SwapiService();

  render() {

    return(
      <ErrorBoundary>
      <div className="stardb-app">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <SwapiServiceProvider value={this.swapi}>
      <RandomPlanet/>
        <PeoplePage/>
        <PlanetsPage/>
        <StarshipsPage/>
        </SwapiServiceProvider>
      </div>
      </ErrorBoundary>
    );
  }
};