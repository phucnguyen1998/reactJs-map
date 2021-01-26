import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Map from './Component/Map';

function App() {
  return (
    <>
      <Router>
        <Route path="/map" exact component={Map} />
        <Route path={'/map?lat=:lat&lng=:lng&zoom=:zoom'} component={Map} />
      </Router>
    </>
  );
}

export default App;
