import React, { useContext } from 'react';
import { SwapiServiceContext } from '../swapi-service-context';

const withSwapiService = (Wrapped, mapMethodsToProps) => {
  return (props) => {
    const serviceProps = mapMethodsToProps(useContext(SwapiServiceContext));
    return (
      <Wrapped {...props} {...serviceProps} />
    );          
  }
};

export default withSwapiService;