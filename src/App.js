import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/main';
import Guide from '../src/pages/Guide';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </Router>
  );
};

export default App;
