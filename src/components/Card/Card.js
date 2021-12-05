import styles from './Card.module.scss';

const Card = ({ picture, name, description }) => {
  return (
    <div className={styles.card}>
      <img src={picture} alt='Profile' />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
