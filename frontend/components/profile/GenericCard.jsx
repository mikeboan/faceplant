import React from 'react';

const GenericCard = ({ cardIcon, cardName, listItems }) => (
  <section className={ `${cardName.toLowerCase()}-card card shadow` }>
    <header>
      <img src={ cardIcon }></img>
      <h2>{ cardName }</h2>
    </header>
    <ul>
      { listItems }
    </ul>
  </section>
);

export default GenericCard;
