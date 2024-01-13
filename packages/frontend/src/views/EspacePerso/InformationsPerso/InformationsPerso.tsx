import React from 'react';
import styles from './InformationsPerso.module.css';

const InformationsPerso: React.FC = () => {
  return (
    <div className={styles.persoInfo}>
      <h1 className={styles.title}>Informations personnelles</h1>
    </div>
  );
};

export default InformationsPerso;
