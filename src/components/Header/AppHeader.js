import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

export default class AppHeader extends Component {
    render() {
        return (
            <header className="App-header">
              <a href='/'>
                <img src="img/WaldoFace.png" className="App-logo" alt="Waldo" height="100%" />
              </a>
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
