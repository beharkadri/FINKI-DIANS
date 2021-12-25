import Modal from '../Modal/Modal';
import Review from './Review/Review';
import useReviews from '../../hooks/use-reviews';

import styles from './SeeReviews.module.scss';

const SeeReviews = ({ show, title, institutionId, close }) => {
  const { reviews } = useReviews(institutionId);
  return (
    <Modal show={show} modalTitle={title} close={close}>
      {reviews.length === 0 && <p>No reviews found!</p>}
      <div className={styles.content}>
        {reviews.map((review, index) => (
          <Review key={index} user={review.user} content={review.content} />
        ))}
      </div>
    </Modal>
  );
};

export default SeeReviews;
