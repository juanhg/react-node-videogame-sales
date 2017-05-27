import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory  } from 'react-router';
import App from './components/app';
import VideogamesPage from './components/tabs/videogamesPage';
import ChartsPage from './components/tabs/chartsPage';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route  path="/" component={App} >
      <IndexRoute component={VideogamesPage}/>
      <Route path="/videogames" component={VideogamesPage} />
      <Route path="/charts"  component={ChartsPage} />
    </Route>
  </Router>

  , document.getElementById('root'));
