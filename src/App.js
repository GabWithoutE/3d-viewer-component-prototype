import React from 'react';
import './styles/App.scss';
import PhoneAdvertisement from "./pages/PhoneAdvertisement";
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/phone-ad">
          <PhoneAdvertisement testing="hello" />
        </Route>
      </Switch>

      <header className="App-header">
        <Link to="/phone-ad">
          <img src="/images/logo.svg" className="App-logo" alt="logo" />
        </Link>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

