import { useRef } from 'react';
import Modal from '../Modal/Modal';
import axios from 'axios';

import classes from './LeaveReview.module.scss';

const LeaveReview = ({ show, title, user, institutionId, close }) => {
  const textRef = useRef();

  const submitHandler = () => {
    const review = {
      institutionId: institutionId,
      user: user,
      content: textRef.current.value,
    };
    axios
      .post('https://healthmap-reviews.herokuapp.com/reviews', {
        ...review,
      })
      .then((response) => {
        if (response.status === 201) {
          alert('Your review has been added successfully!');
        } else {
          alert(`Your review couldn't be added. Try again later!`);
        }
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
