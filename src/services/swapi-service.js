export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';

  async getResource(url){
    const res = await fetch(`${this._apiBase}${url}`);
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    const responseBody = await res.json();
    return responseBody;
  };

  getPersonImage = ({ id }) => {
    return `${this._imageBase}/characters/${id}.jpg`;
  }

  getStarshipImage = ({ id }) => {
    return `${this._imageBase}/starships/${id}.jpg`;
  }

  getPlanetImage = ({ id }) => {
    return `${this._imageBase}/planets/${id}.jpg`;
  }

  getAllPeople = async () => {
    const people = await this.getResource(`/people/`);
    return people.results.map(this._transformPerson);
  }

  getPerson = async (id) =>  {
    const person = await this.getResource(`/people/${id}`);
    return this._transformPerson(person);
  }

  getAllPlanets= async () => {
    const planets = await this.getResource(`/planets/`);
    return planets.results.map(this._transformPlanet);
  }

  getPlanet = async (id) =>  {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  }

  getAllStarShips= async () => {
    const planets = await this.getResource(`/starships/`);
    return planets.results.map(this._transformStarship);
  }

  getStarShip = async (id) =>  {
    const starship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(starship);
  }

  _extractId(el) {
    const idRegExp = /\/([0-9]*)\/$/;
    return el.url.match(idRegExp)[1];
    
  }

  _transformPlanet = (planet) => {
  return {
    id: this._extractId(planet),
    name: planet.name,
    population: planet.population,
    rotationPeriod: planet.rotation_period,
    diameter: planet.diameter
  };
}

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
    }};

    _transformPerson = (person) => {
      return {
        id: this._extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birthYear,
        eyeColor: person.eyeColor,
      }};

};
