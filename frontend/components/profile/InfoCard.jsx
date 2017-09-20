import React from 'react';
import { connect } from 'react-redux';

import { selectProfileInfo } from '../../selectors/selectors';
import GenericCard from './GenericCard';
import InfoItem from './InfoItem';
import { selectProfile, generateContent } from '../../selectors/selectors';

const mapStateToProps = (state, { user }) => {
  const profile = selectProfile(state, user.id);

  const listItems = ['workplace', 'school', 'location', 'hometown']
    .filter( field => Boolean(profile[field]) )
    .map( field =>
      <InfoItem
        iconUrl={ window.staticImages[field] }
        content={ generateContent(field, profile) }
      />
    );

  return {
    cardName: "Intro",
    cardIcon: window.staticImages.globeBubble,
    listItems
  };
};

export default connect(mapStateToProps)(GenericCard);
