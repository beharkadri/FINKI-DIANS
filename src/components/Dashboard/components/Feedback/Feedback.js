import useContent from '../../../../hooks/use-content';

import styles from './Feedback.module.scss';

const Feedback = () => {
  const { feedback } = useContent(
    'https://healthmap-auth.herokuapp.com/feedback',
    'feedback'
  );

  return feedback.map((feedback, index) => (
    <div key={index} className={styles.feedback}>
      <h2>Email: {feedback.email}</h2>
      <h2>Name: {feedback.name}</h2>
      <p>Message: {feedback.message}</p>
    </div>
  ));
};

export default Feedback;
