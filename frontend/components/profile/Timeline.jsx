import React from 'react';

import InfoCard from './InfoCard';
import FriendsCard from './FriendsCard';
import PhotosCard from './PhotosCard';
import PostFormCreateModal from '../shared/PostFormCreateModal';
import PostsIndex from './PostsIndex';

const Timeline = ({ user }) => (
  <div className='timeline'>
    <div className='left'>
      <InfoCard user={user} />
      <FriendsCard user={user} />
      <PhotosCard />
    </div>
    <div className='right'>
      <PostFormCreateModal />
      <PostsIndex />
    </div>
  </div>
);


export default Timeline;
