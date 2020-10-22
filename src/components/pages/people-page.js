import React from 'react';
import {PersonDetails, PersonList } from '../sw-components';
import Row from '../row/';

const PeoplePage = ({ history, match }) => {
  const { id } = match.params;
    return (
      <Row
      left={<PersonList onItemSelected={(id) => history.push(id)}/>}
      right={<PersonDetails itemId={id}/>}
      />
    )
}

export default PeoplePage;