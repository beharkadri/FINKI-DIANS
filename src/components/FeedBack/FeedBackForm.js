import { useContext, useRef } from 'react';
import AuthContext from '../../context/auth-context';
import axios from 'axios';

import styles from './FeedBackForm.module.scss';

function FeedBackForm() {
  const authCtx = useContext(AuthContext);
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const submitHandler = () => {
    const feedback = {
      name: nameRef.current.value,
      email: authCtx.email,
      message: messageRef.current.value,
    };

    axios
      .post('https://healthmap-auth.herokuapp.com/feedback', {
        ...feedback,
      })
      .then((response) => {
        if (response.status === 201) {
          alert('Your feedback has been sent.');
        } else {
          alert("Your feedback couldn't be sent. Try later");
        }
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
