import { useState, useContext } from 'react';
import useContent from '../../hooks/use-content';

import Institutions from './components/Institutions/Institutions';
import Feedback from './components/Feedback/Feedback';
import Modal from '../../components/Modal/Modal';

import { FirebaseContext } from '../../context/firebase';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { institutions } = useContent('institutions');

  const [show, setShow] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [amenity, setAmenity] = useState('');
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const toggleModal = () => {
    setShow(!show);
  };

  const addHandler = () => {
    if (
      name === '' ||
      city === '' ||
      amenity === '' ||
      lat === '' ||
      long === ''
    ) {
      alert(`Please don't leave any field empty`);
    } else {
      const newInstitution = {
        id: id,
        name: name,
        city: city,
        amenity: amenity,
        latitude: lat,
        longitude: long,
      };

      firebase
        .firestore()
        .collection('institutions')
        .add(newInstitution)
        .then(() => {
          alert(`Institution ${newInstitution.name} successfully added!`);
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  };
  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles['dashboard-left']}>
          <h1 onClick={() => setFeedback(false)}>HealthMap Dashboard</h1>
          <div className={styles['dashboard-menu']}>
            <h2
              onClick={() => setFeedback(false)}
              className={feedback === false ? styles.active : ''}
            >
              Institutions
            </h2>
            <h2
              onClick={() => setFeedback(true)}
              className={feedback === true ? styles.active : ''}
            >
              Feedback
            </h2>
          </div>
        </div>
        <div className={styles['dashboard-right']}>
          {feedback === false ? (
            <>
              <Institutions institutions={institutions} />
              <button className={styles['add-button']} onClick={toggleModal}>
                +
              </button>
            </>
          ) : (
            <Feedback />
          )}
        </div>
      </div>
      {show && feedback === false && (
        <Modal show={show} modalTitle={`Add institution`} close={toggleModal}>
          <form className={styles.form}>
            <div>
              <span>Id: </span>
              <input
                value={id}
                onChange={(e) => setId(e.currentTarget.value)}
              />
            </div>
            <div>
              <span>Name: </span>
              <input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div>
              <span>City: </span>
              <input
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
              />
            </div>
            <div>
              <span>Amenity: </span>
              <input
                value={amenity}
                onChange={(e) => setAmenity(e.currentTarget.value)}
              />
            </div>
            <div>
              <span>Latitude: </span>
              <input
                value={lat}
                onChange={(e) => setLat(e.currentTarget.value)}
              />
            </div>
            <div>
              <span>Longitude: </span>
              <input
                value={long}
                onChange={(e) => setLong(e.currentTarget.value)}
              />
            </div>
          </form>
          <footer>
            <button onClick={toggleModal}>Cancel</button>
            <button onClick={addHandler}>Submit</button>
          </footer>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
