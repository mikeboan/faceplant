import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Newsfeed from './Newsfeed';
import Profile from './profile/Profile';

const Main = (props) => (
  <div>
    <Header />
    <div className='content'>
      <Switch>
        <Route exact path="/" component={Newsfeed} />
        <Route path="/profiles/:userId" component={Profile} />
      </Switch>
    </div>
  </div>
);

export default Main;
