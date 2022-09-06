import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';

import NavBar from './Navbar';
import Booking from './Booking';
import Admin from './Admin';

export default function App() {
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/admin" component={Admin} /> */}

        <Route exact path="/boka" component={Booking} />
      </Switch>
    </div>
  );
}
