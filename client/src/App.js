import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import CreateRsvp from "./components/create-rsvp";
import DeleteRsvp from "./components/delete-rsvp";
import EditRsvp from "./components/edit-rsvp";
import ListRsvp from "./components/list-rsvp";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="container">
            <h1>RSVP Manager</h1>
            <ul>
              <li>
                <Link to="/create">CREATE</Link>
              </li>
              {/*<li>*/}
              {/*  <Link to="/delete">DELETE</Link>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*  <Link to="/edit">EDIT</Link>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*  <Link to="/">LIST</Link>*/}
              {/*</li>*/}
            </ul>
            <Route path="/create" component={CreateRsvp}/>
            <Route path="/delete/:id" component={DeleteRsvp}/>
            <Route path="/edit/:id" component={EditRsvp}/>
            <Route path="/" exact component={ListRsvp}/>
          </div>
        </Router>
    );
  }
}

export default App;
