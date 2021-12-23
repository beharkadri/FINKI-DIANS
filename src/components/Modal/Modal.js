import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import Close from '../../assets/Icons/cancel.png';
//import { waitFor } from '@testing-library/react';

const Modal = ({ show, modalTitle, close, children }) => {
  console.log('Modal props', show, modalTitle, close);
  return ReactDOM.createPortal(
    <>
      {show ? (
        <div className={styles.modalContainer} onClick={() => close()}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <header className={styles.modal_header}>
              <h2 className={styles.title}>{modalTitle}</h2>
              <button className={styles.close} onClick={close}>
                <img src={Close} alt='close' />
              </button>
            </header>
            <hr />
            <main className={styles.modal_content}>{children}</main>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
