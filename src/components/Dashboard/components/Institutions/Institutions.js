import Institution from '../Institution/Institution';

const Institutions = ({ institutions }) => {
  return (
    <div>
      {institutions.map((institution) => (
        <Institution key={institution.id} {...institution} />
      ))}
    </div>
  );
};

export default Institutions;
