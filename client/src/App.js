import React from "react";
import 'bootstrap'
import {Main} from "./routes";
import {Creator} from "./components/Creator"
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
      <Router>
          <div className="container">
              <Main/>
              <Creator/>
          </div>
      </Router>
  )
}
export default App
