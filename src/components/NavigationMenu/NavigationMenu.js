import { useState } from 'react';

import styles from './NavigationMenu.module.scss';

import map from '../../assets/Icons/19253118171536669843.svg';
import comment from '../../assets/Icons/16558105781580594410.svg';
import team from '../../assets/Icons/14233826931544610471.svg';
import manual from '../../assets/Icons/7945183341586788047.svg';
import hamburger from '../../assets/Icons/hamburger-menu.svg';
import { Link, NavLink } from 'react-router-dom';

const NavigationMenu = () => {
  const [mapSection, setMapSection] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`${styles.menu} ${collapsed === true && styles.collapsed}`}>
      <img
        className={styles.collapse}
        onClick={() => setCollapsed(!collapsed)}
        src={hamburger}
        alt='Hamburger'
      />
      <Link to='/'>
        <img
          src='https://uploads-ssl.webflow.com/61a4d4ec5f3f2821cd44ccba/61a4d62d14defd1f854036fe_mkmap.png'
          alt='Logo'
          className={styles.logo}
        />
        {!collapsed && <h1>HealthMap.mk</h1>}
      </Link>

      {mapSection === false ? (
        <div className={styles.content}>
          <NavLink to='/map' activeClassName={styles.activeElement}>
            <div
              onClick={() => {
                setMapSection(true);
                setCollapsed(false);
              }}
            >
              <img src={map} alt='Map' />
              {!collapsed && <h2>Map</h2>}
            </div>
          </NavLink>

          <NavLink to='/how-to-search' activeClassName={styles.activeElement}>
            <div>
              <img src={manual} alt='Manual' />
              {!collapsed && <h2>How to Search</h2>}
            </div>
          </NavLink>

          <NavLink to='/feedback' activeClassName={styles.activeElement}>
            <div>
              <img src={comment} alt='Feedback' />
              {!collapsed && <h2>Feedback</h2>}
            </div>
          </NavLink>

          <NavLink to='/team' activeClassName={styles.activeElement}>
            <div>
              <img src={team} alt='Team' />
              {!collapsed && <h2>Our Team</h2>}
            </div>
          </NavLink>
        </div>
      ) : (
        <div className={styles.mapMenu}>
          <button
            className={styles.button}
            onClick={() => setMapSection(false)}
          >
            Back to Menu
          </button>
          <div className={styles.checkboxes}>
            <div>
              <input name='Hospitals' type='checkbox' />
              <span>Hospitals</span>
            </div>
            <div>
              <input name='Pharmacies' type='checkbox' />
              <span>Pharmacies</span>
            </div>
            <div>
              <input name='Dentists' type='checkbox' />
              <span>Dentists</span>
            </div>
          </div>
          <h3>Search institution's city</h3>
          <select id='cities'>
            <option>Skopje</option>
            <option>Skopje</option>
            <option>Skopje</option>
          </select>
          <h3>Search by name</h3>
          <input
            className={styles.search}
            type='text'
            placeholder='Search...'
          />
          <br />
          <button className={styles.button}>Search</button>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
