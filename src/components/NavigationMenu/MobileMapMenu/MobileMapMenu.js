import { useContext, useRef } from 'react';
import { MenuContext } from '../../../context/menu';

import cities from '../../../Data/cities';

import styles from './MobileMapMenu.module.scss';

const MobileMapMenu = () => {
  const [searchParams, setSearchParams] = useContext(MenuContext);
  const searchRef = useRef(null);
  const selectRef = useRef(null);

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
  };

  const searchClickHandler = () => {
    setSearchParams({
      categories: { ...categories },
      searchTerm: searchRef.current.value,
      city: selectRef.current.value,
    });
  };

  return (
    <>
      <div className={styles.mobileMapMenu}>
        <div className={styles['mobileMapMenu-top']}>
          <input
            className={styles.search}
            type='text'
            placeholder='Search by name...'
            ref={searchRef}
          />
          <button className={styles.button} onClick={searchClickHandler}>
            Search
          </button>
        </div>

        <div className={styles['mobileMapMenu-bottom']}>
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
          <select id='cities' ref={selectRef}>
            <option value={null}>City</option>
            {cities.map((city, index) => (
              <option key={city + index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default MobileMapMenu;
