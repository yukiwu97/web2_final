import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import Record from "./components/record.component";
import AddRecord from "./components/add-record.component";
import UpdateRecord from "./components/update-record.component";

function App() {
  return (
    <Router>
          <Navbar />
          <Route path="/" exact component={Record} />
          <Route path="/create" exact component={AddRecord} />
          <Route path="/update" exact component={UpdateRecord} />
    </Router>
  );
}

export default App;
