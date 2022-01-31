import Modal from '../Modal/Modal';
import Review from './Review/Review';
import useContent from '../../hooks/use-content';

import styles from './SeeReviews.module.scss';

const SeeReviews = ({ show, title, institutionId, close }) => {
  const { reviews } = useContent(
    'https://healthmap-reviews.herokuapp.com/reviews/' + institutionId,
    'reviews'
  );
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
