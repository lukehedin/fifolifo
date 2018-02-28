import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Nav from './Nav/Nav'
import Edit from './Edit/Edit'
import Stats from './Stats/Stats'
import Game from './Game/Game'

const App = () => (
  <Router>
    <div>
      <Nav />
      <Route exact path="/" component={Game} />
      <Route path="/edit" component={Edit} />
      <Route path="/stats" component={Stats} />
    </div>
  </Router>
);

export default App;