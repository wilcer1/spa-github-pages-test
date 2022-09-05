import React from 'react';
import InteractiveLink from './InteractiveLink';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ExampleComponent from './ExampleComponent';
import ExampleTwoDeepComponent from './ExampleTwoDeepComponent';
import SitemapLinkGenerator from './SitemapLinkGenerator';
import PageNotFound from './PageNotFound';
import Breadcrumbs from './Breadcrumbs';
import NavBar from './Navbar';

const titleStyle = {
  fontSize: '20px',
  marginBottom: '0.5vh',
};

const repoLinkStyle = {
  fontSize: '14px',
};

const breadcrumbsStyle = {
  margin: '3vh 0',
};

export default function App() {
  return (
    <div>
      <NavBar />
      <h1 style={titleStyle}>Single Page Apps for GitHub Pages</h1>
      <InteractiveLink
        href="https://github.com/rafgraph/spa-github-pages"
        style={repoLinkStyle}
      >
        https://github.com/rafgraph/spa-github-pages
      </InteractiveLink>

      <nav style={breadcrumbsStyle}>
        <Breadcrumbs />
      </nav>

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
