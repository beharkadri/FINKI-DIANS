import styles from './Card.module.scss';

const Card = ({ picture, name, description }) => {
  return (
    <div className={styles.card}>
      <img src={picture} alt='Profile' />
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
