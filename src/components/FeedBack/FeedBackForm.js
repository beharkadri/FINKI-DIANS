import { useContext, useRef } from 'react';
import AuthContext from '../../context/auth-context';
import { FirebaseContext } from '../../context/firebase';

import styles from './FeedBackForm.module.scss';

function FeedBackForm() {
  const { firebase } = useContext(FirebaseContext);
  const authCtx = useContext(AuthContext);
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const submitHandler = () => {
    firebase
      .firestore()
      .collection('feedback')
      .add({
        name: nameRef.current.value,
        email: authCtx.email,
        message: messageRef.current.value,
      })
      .then(() => {
        alert('Your feedback is sent successfully!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  return (
    <div className={styles.feedback}>
      <h2>Feedback</h2>
      <form>
        <div>
          <label htmlFor='name'>Name</label> <br />
          <input type='text' id='name' ref={nameRef} />
        </div>

        <div>
          <label htmlFor='email'>Email Address</label> <br />
          <input type='text' id='email' value={authCtx.email} disabled />
        </div>

        <div>
          <label htmlFor='message'>Message</label> <br />
          <textarea id='message' ref={messageRef} />
        </div>
      </form>
      <div>
        <button onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
}

export default FeedBackForm;
