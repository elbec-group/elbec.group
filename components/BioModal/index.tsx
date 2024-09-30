import React from 'react';
import styles from './BioModal.module.css';

type Author = {
  name: string;
  bio?: string | null;
};

type Props = {
  author: Author;
  onClose: () => void;
};

const BioModal: React.FC<Props> = ({author, onClose}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{author.name}</h2>
        <p>{author.bio}</p>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BioModal;
