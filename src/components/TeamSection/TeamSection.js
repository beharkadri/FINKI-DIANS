import styles from './TeamSection.module.scss';

import teamData from '../../Data/team.json';
import Card from '../Card/Card';

const TeamSection = () => {
  return (
    <div className={styles.team}>
      {teamData.map((member) => (
        <Card
          picture={member.picture}
          name={member.name}
          description={member.description}
        />
      ))}
    </div>
  );
};

export default TeamSection;
