export default class SwapiService {

  _apiUrl = 'https://swapi.dev/api';
  _imgUrl = 'https://starwars-visualguide.com/assets/img';

  controller = new AbortController();

  abortRequest() {
    this.controller.abort();
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiUrl}/${url}`, { signal: this.controller.signal });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json()
  }

  getAllPeople = async () => {
    const res = await this.getResource(`people/`)
    return res.results.map(this._transformPerson);
  }

  getPerson = async (id) => {
    const person = await this.getResource(`people/${id}/`)
    return this._transformPerson(person);
  }

  getPersonImage = ({ id }) => {
    return `${this._imgUrl}/characters/${id}.jpg`
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`planets/`)
    return res.results.map(this._transformPlanet);
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`planets/${id}/`);
    return this._transformPlanet(planet)
  }

  getPlanetImage = ({ id }) => {
    return `${this._imgUrl}/planets/${id}.jpg`
  }

  getAllStarships = async () => {
    const res = await this.getResource(`starships/`)
    return res.results.map(this._transformStarship);
  }

  getStarshipImage = ({ id }) => {
    return `${this._imgUrl}/starships/${id}.jpg`
  }

  getStarship = async (id) => {
    const starship = await this.getResource(`starships/${id}/`)
    return this._transformStarship(starship);
  }

  _extractId = (item) => {
    const idRegexp = /\/([0-9]+)\/$/;
    return item.url.match(idRegexp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    }
  }

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      height: person.height,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    }
  }

};
