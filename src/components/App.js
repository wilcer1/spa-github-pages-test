import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ExampleComponent from './ExampleComponent';
import ExampleTwoDeepComponent from './ExampleTwoDeepComponent';
import SitemapLinkGenerator from './SitemapLinkGenerator';
import PageNotFound from './PageNotFound';
import NavBar from './Navbar';

export default function App() {
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/example" component={ExampleComponent} />
        <Route
          exact
          path="/example/two-deep"
          component={ExampleTwoDeepComponent}
        />
        <Route
          exact
          path="/sitemap-link-generator"
          component={SitemapLinkGenerator}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}
