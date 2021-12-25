import { useRef, useContext } from 'react';
import Modal from '../Modal/Modal';
import { FirebaseContext } from '../../context/firebase';

import classes from './LeaveReview.module.scss';

const LeaveReview = ({ show, title, user, institutionId, close }) => {
  const { firebase } = useContext(FirebaseContext);
  const textRef = useRef();

  const submitHandler = () => {
    // Add a new document in collection "reviews"
    firebase
      .firestore()
      .collection('reviews')
      .add({
        institutionId: institutionId,
        user: user,
        content: textRef.current.value,
      })
      .then(() => {
        console.log('Document successfully written!');
        alert('Your review has been added successfully!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  return (
    <Modal show={show} modalTitle={title} close={close}>
      <div className={classes.content}>
        <textarea
          placeholder='Tell us about your experiences in this institution...'
          ref={textRef}
        ></textarea>
        <footer>
          <button onClick={close}>Cancel</button>
          <button onClick={() => submitHandler()}>Submit</button>
        </footer>
      </div>
    </Modal>
  );
};

export default LeaveReview;
