import styles from './Review.module.scss';

const Review = ({ user, content }) => (
  <div className={styles.review}>
    <h2>{user}</h2>
    <p>{content}</p>
  </div>
);

export default Review;
