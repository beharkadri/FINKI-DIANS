import styles from './Review.module.scss';

const Review = ({ user, content }) => (
  <div className={styles.review}>
    <h3>{user}</h3>
    <p>{content}</p>
    <hr />
  </div>
);

export default Review;
