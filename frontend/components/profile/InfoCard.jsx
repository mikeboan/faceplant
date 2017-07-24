import React from 'react';
import { connect } from 'react-redux';

import { selectProfileInfo } from '../../selectors/selectors';
import GenericCard from './GenericCard';

const mapStateToProps = (state, { user }) => {

  return {
    cardName: "Intro",
    cardIcon: window.staticImages.globeBubble,
    // additionalHeaderContent: friends.length,
    // listItems:
  };
};

const InfoItem = ({category, info}) => (
  <li>

  </li>
);

export default connect(mapStateToProps)(GenericCard);
