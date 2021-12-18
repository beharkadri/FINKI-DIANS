import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import styles from './FeedBackForm.module.scss';

function FeedBackForm() {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.feedback}>
      <h2>Feedback</h2>
      <form>
        <div>
          <label htmlFor='name'>Name</label> <br />
          <input type='text' id='name' />
        </div>

        <div>
          <label htmlFor='email'>Email Address</label> <br />
          <input type='text' id='email' value={authCtx.email} disabled />
        </div>

        <div>
          <label htmlFor='message'>Message</label> <br />
          <textarea id='message' />
        </div>
      </form>
    </div>
  );
}

export default FeedBackForm;
