import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {

  render(){
    return(
      <div className="header d-flex">
        <h3>
          <a href="#/">Star DB</a>
        </h3>
        <div className="categories">
          <button type="button" className="btn btn-link">People</button>
          <button type="button" className="btn btn-link">Planets</button>
          <button type="button" className="btn btn-link">Starships</button>
        </div>
      </div>

    );
  };

};

