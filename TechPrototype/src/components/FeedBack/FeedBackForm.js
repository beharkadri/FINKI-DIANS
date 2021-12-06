import styles from './FeedBackForm.module.scss';

function FeedBackForm() {
  return (
    <div className={styles.feedback}>
      <h2>Feedback</h2>
      <form>
        <div>
          <label htmlFor='name'>Name</label> <br />
          <input type='text' id='name' />
        </div>

        <div>
          <label htmlFor='email'>Email Address</label> <br />
          <input type='text' id='email' />
        </div>

        <div>
          <label htmlFor='message'>Message</label> <br />
          <textarea id='message' />
        </div>
      </form>
    </div>
  );
}

export default FeedBackForm;
