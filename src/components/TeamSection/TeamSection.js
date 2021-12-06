import styles from './TeamSection.module.scss';

import teamData from '../../Data/team.json';
import Card from '../Card/Card';

const TeamSection = () => {
  return (
    <div className={styles.team}>
      <h2>Our Team</h2>
      <div className={styles.members}>
        {teamData.map((member) => (
          <Card
            picture={member.picture}
            name={member.name}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
