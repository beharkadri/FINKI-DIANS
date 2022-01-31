import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useContent from '../../hooks/use-content';

import classes from './AdminAuthForm.module.scss';

const AdminAuthForm = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const { admin } = useContent(
    'https://healthmap-auth.herokuapp.com/admin',
    'admin'
  );
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      admin[0].email === emailInputRef.current.value &&
      admin[0].password === passwordInputRef.current.value
    ) {
      localStorage.setItem('isAuthenticated', 'true');
      history.push('hm-admin/dashboard');
    } else {
      alert('Incorrect email or password');
    }
  };
  return (
    <div className={classes.auth}>
      <section className={classes['auth-container']}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button onClick={submitHandler}>Login</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AdminAuthForm;
