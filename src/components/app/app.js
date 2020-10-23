import React, { Component } from 'react';
import { SwapiServiceContext } from '../swapi-service-context';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary/error-boundary';
import './app.css';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import SwapiService from '../../services/swapi-service';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';
export default class App extends Component {

  swapi = new SwapiService();

  render() {

    return(
      <ErrorBoundary>
        <SwapiServiceContext.Provider value={this.swapi}>
          <BrowserRouter basename={process.env.PUBLIC_URL + '/#/'}>
          <div className="stardb-app">
            <Header />
            <RandomPlanet/>
            <Route path="/" render={() => <h2>Welcome to StarDB</h2>} exact />
            <Route path="/people/:id?" component={PeoplePage} />
            <Route path="/planets" component={PlanetsPage} />
            <Route path="/starships" component={StarshipsPage} exact />
            <Route path="/starships/:id" render={({ match }) => {
              const { id } = match.params;
              return <StarshipDetails itemId={id}/>
            }} />
            <Redirect to="/" />
          </div>
          </BrowserRouter>
        </SwapiServiceContext.Provider>
      </ErrorBoundary>
    );
  }
};