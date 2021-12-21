import Modal from '../Modal/Modal';
import Review from './Review/Review';
import useReviews from '../../hooks/use-reviews';

const SeeReviews = ({ show, title, institutionId, close }) => {
  const { reviews } = useReviews(institutionId);
  return (
    <Modal show={show} modalTitle={title} close={close}>
      {reviews.map((review, index) => (
        <Review key={index} user={review.user} content={review.content} />
      ))}
    </Modal>
  );
};

export default SeeReviews;
