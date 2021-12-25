import styles from './LandingSection.module.scss';

const LandingSection = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.content}>
        <h1>HealthMap.мк</h1>
        <h3>Find your nearest healthcare institution!</h3>
      </div>
    </div>
  );
};

export default LandingSection;
