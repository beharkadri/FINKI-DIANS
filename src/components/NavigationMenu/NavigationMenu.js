import { useState, useContext, useRef } from 'react';

import styles from './NavigationMenu.module.scss';

import map from '../../assets/Icons/19253118171536669843.svg';
import comment from '../../assets/Icons/16558105781580594410.svg';
import team from '../../assets/Icons/14233826931544610471.svg';
import hamburger from '../../assets/Icons/hamburger-menu.svg';
import login from '../../assets/Icons/login.svg';
import { Link, NavLink } from 'react-router-dom';
import { MenuContext } from '../../context/menu';

import cities from '../../Data/cities';
import AuthContext from '../../context/auth-context';
import { useHistory } from 'react-router-dom';

const NavigationMenu = () => {
  const [mapSection, setMapSection] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchParams, setSearchParams] = useContext(MenuContext);
  const searchRef = useRef(null);
  const selectRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const isLoggedIn = authCtx.isLoggedIn;

  let categories =
    searchParams == null
      ? {
          hospital: false,
          dentist: false,
          pharmacy: false,
        }
      : searchParams.categories;

  const checkboxChangeHandler = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;
    categories[name] = checked;
    console.log(categories);
  };

  const searchClickHandler = () => {
    console.log(selectRef.current.value);
    setSearchParams({
      categories: { ...categories },
      searchTerm: searchRef.current.value,
      city: selectRef.current.value,
    });
  };

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/');
  };

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
        {!collapsed && <h1>HealthMap.мк</h1>}
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

          {isLoggedIn && (
            <NavLink to='/feedback' activeClassName={styles.activeElement}>
              <div>
                <img src={comment} alt='Feedback' />
                {!collapsed && <h2>Feedback</h2>}
              </div>
            </NavLink>
          )}

          <NavLink to='/team' activeClassName={styles.activeElement}>
            <div>
              <img src={team} alt='Team' />
              {!collapsed && <h2>Our Team</h2>}
            </div>
          </NavLink>

          {!isLoggedIn && (
            <NavLink to='/auth' activeClassName={styles.activeElement}>
              <div>
                <img src={login} alt='Login' />
                {!collapsed && <h2>Login</h2>}
              </div>
            </NavLink>
          )}

          {isLoggedIn && (
            <div onClick={logoutHandler}>
              <img src={login} alt='Logout' />
              {!collapsed && <h2>Logout</h2>}
            </div>
          )}
        </div>
      ) : (
        !collapsed && (
          <div className={styles.mapMenu}>
            <button
              className={styles.button}
              onClick={() => setMapSection(false)}
            >
              Back to Menu
            </button>
            <div className={styles.checkboxes}>
              <div>
                <input
                  name='hospital'
                  type='checkbox'
                  onChange={checkboxChangeHandler}
                />
                <span>Hospitals</span>
              </div>
              <div>
                <input
                  name='pharmacy'
                  type='checkbox'
                  onChange={checkboxChangeHandler}
                />
                <span>Pharmacies</span>
              </div>
              <div>
                <input
                  name='dentist'
                  type='checkbox'
                  onChange={checkboxChangeHandler}
                />
                <span>Dentists</span>
              </div>
            </div>
            <h3>Search institution's city</h3>
            <select id='cities' ref={selectRef}>
              <option value={null}>---</option>
              {cities.map((city, index) => (
                <option key={city + index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <h3>Search by name</h3>
            <input
              className={styles.search}
              type='text'
              placeholder='Search...'
              ref={searchRef}
            />
            <br />
            <button className={styles.button} onClick={searchClickHandler}>
              Search
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default NavigationMenu;
