import React from 'react';
import styles from './InformationsPerso.module.css'
import Burger from '../Burger/Burger'

const InformationsPerso: React.FC = () => {
  return (
    <div>
        <div className={styles.burgerTitle}>
          <Burger handleBurgerClick={() => document.dispatchEvent(new Event('burgerClicked'))} />
          <h1 className={styles.title}>Informations personnelles</h1>
        </div>
    </div>
  );
};

export default InformationsPerso;