import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Newsfeed from './newsfeed/Newsfeed';
import Profile from './profile/Profile';
import Modal from './Modal';

import { LoadingRoute } from '../util/route_util';

const Main = (props) => (
  <div>
    <Modal />
    <Header />
    <div className='content'>
      <Switch>
        <Route exact path="/" component={Newsfeed} />
        <LoadingRoute path="/profiles/:userId" component={Profile} />
      </Switch>
    </div>
  </div>
);

export default Main;
