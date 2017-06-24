import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Newsfeed from './Newsfeed';
import Profile from './Profile';

const Main = (props) => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Newsfeed} />
      <Route path="/profile/:userId" component={Profile} />
    </Switch>
  </div>
);

export default Main;
