import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';

import { Store, create } from 'microstates';
import AppModel, { State } from './state';

import 'bulma/css/bulma.css';
import Financial from './financial';
import Importing from './importing';
import Taxes from './taxes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
    this.state = {
      hamburgerActive: false,
      model: Store(create(AppModel, AppModel), nextState =>
        this.setState({ model: nextState })
      )
    };
  }

  toggleHamburgerMenu() {
    this.setState(prevState => {
      return { hamburgerActive: !prevState.hamburgerActive };
    });
  }

  render() {
    return (
      <State.Provider value={this.state.model}>
        <nav
          className="navbar is-fixed-top is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              finatr
            </a>
            {/* eslint-disable-next-line */}
            <a
              role="button"
              className={
                this.state.hamburgerActive
                  ? 'navbar-burger is-active'
                  : 'navbar-burger'
              }
              aria-label="menu"
              aria-expanded={this.state.hamburgerActive ? 'true' : 'false'}
              onClick={this.toggleHamburgerMenu}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div
            className={
              this.state.hamburgerActive
                ? 'navbar-menu is-active'
                : 'navbar-menu'
            }
          >
            <div className="navbar-end">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="import" className="navbar-item">
                Import
              </Link>
              <Link to="taxes" className="navbar-item">
                Taxes
              </Link>
            </div>
          </div>
        </nav>
        <section className="section">
          <Router>
            <Financial path="/" />
            <Importing path="import" />
            <Taxes path="taxes" />
          </Router>
        </section>
      </State.Provider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
