import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import Close from '../../assets/Icons/close.svg';

const Modal = ({ show, close, title, children }) => {
  return ReactDOM.createPortal(
    <>
      {show ? (
        <div className={styles.modalContainer} onClick={() => close()}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <header className={styles.modal_header}>
              <h2 className={styles.modal_header - title}> {title} </h2>
              <button className={styles.close} onClick={() => close()}>
                <img src={Close} alt='close' />
              </button>
            </header>
            <main className={styles.modal_content}>
              <textarea placeholder='Tell us about your experiences in this institution...'></textarea>
            </main>
            <footer className={styles.modal_footer}>
              <button className={styles.modal - close} onClick={() => close()}>
                Cancel
              </button>

              <button className={styles.submit} onClick={() => close()}>
                Submit
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
