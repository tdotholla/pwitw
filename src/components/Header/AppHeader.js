import React, { Component } from 'react'

import logo from '../../logo.svg';

export default class AppHeader extends Component {
    render() {
        return (
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <a
                className="App-link"
                href="https://www.perkinswill.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perkins+Will
              </a>
            </header>
        )
    }
}
