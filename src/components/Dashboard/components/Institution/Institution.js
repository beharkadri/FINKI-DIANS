import styles from './Institution.module.scss';
import Modal from '../../../Modal/Modal';
import { useState, useContext } from 'react';
import { FirebaseContext } from '../../../../context/firebase';

const Institution = (props) => {
  const [show, setShow] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  const [name, setName] = useState(props.name);
  const [amenity, setAmenity] = useState(props.amenity);
  const [city, setCity] = useState(props.city);
  const [lat, setLat] = useState(props.latitude);
  const [long, setLong] = useState(props.longitude);

  const toggleModal = () => {
    setShow(!show);
  };

  const id = props.id;
  const docId = props.docId;

  const editHandler = (props) => {
    if (
      name === '' ||
      city === '' ||
      amenity === '' ||
      lat === '' ||
      long === ''
    ) {
      alert(`Please don't leave any field empty`);
    } else {
      const editedInstitution = {
        id: id,
        name: name,
        city: city,
        amenity: amenity,
        latitude: lat,
        longitude: long,
        docId: docId,
      };
      firebase
        .firestore()
        .collection('institutions')
        .doc(docId)
        .set(editedInstitution)
        .then(() => {
          alert('Edited successfully');
          props = editedInstitution;
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  };

  const deleteHandler = () => {
    if (
      window.confirm(`Are you sure you want to delete ${props.name}`) === true
    )
      firebase.firestore().collection('institutions').doc(docId).delete();
  };

  return (
    <>
      <div className={styles.institution}>
        <div className={styles.information}>
          <span>{props.name}</span> - <span>{props.city}</span> -{' '}
          <span>{props.amenity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={toggleModal}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
      {show && (
        <Modal
          show={show}
          modalTitle={`Edit ${props.name}`}
          close={toggleModal}
        >
          <form className={styles.form}>
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
            <button onClick={() => editHandler()}>Submit</button>
          </footer>
        </Modal>
      )}
    </>
  );
};

export default Institution;
