import React from 'react';
import { useEffect } from 'react';
import '../style/Navbar.css';
import instagram from '../assets/Instagram-Icon.png';

function Navbar() {
  useEffect(() => {}, []);

  return (
    <>
      <header className="menu">
        <div className="menu-wrap">
          <input type="checkbox" id="checkbox"></input>
          <nav>
            <ul>
              <li>
                <a href="/">
                  <h1>Företag namn här</h1>
                </a>
              </li>
              <li className="endpoints">
                <a href="/Boka">Boka Tid</a>
              </li>
              <li className="endpoints">
                <a href="/Om">Om</a>
              </li>
              <li className="socialmedia">
                {' '}
                <a href="https://www.instagram.com/holistisklakning/">
                  <img
                    src={instagram}
                    alt="instagram"
                    width={30}
                    height={30}
                  ></img>
                </a>
              </li>
            </ul>
          </nav>
          <label htmlFor="checkbox">
            <i className="fa fa-bars menu-icon"></i>
          </label>
        </div>
      </header>
    </>
  );
}

export default Navbar;
