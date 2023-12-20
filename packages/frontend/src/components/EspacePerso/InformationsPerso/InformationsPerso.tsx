import React from 'react';
import styles from './InformationsPerso.module.css'
import Burger from '../Burger/Burger'

const InformationsPerso: React.FC = () => {
  return (
    <div>
        <div className={styles.burgerTitle}>
          <Burger />
          <h1>Informations personnelles</h1>
        </div>
    </div>
  );
};

export default InformationsPerso;