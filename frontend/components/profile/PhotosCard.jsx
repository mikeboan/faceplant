import React from 'react';
import { connect } from 'react-redux';

import GenericCard from './GenericCard';

const mapStateToProps = (state, { user }) => ({
  cardName: "Photos",
  cardIcon: window.staticImages.photoBubble,
  listItems: <li key={1}>Coming Soon!</li>
});

export default connect(mapStateToProps)(GenericCard);
