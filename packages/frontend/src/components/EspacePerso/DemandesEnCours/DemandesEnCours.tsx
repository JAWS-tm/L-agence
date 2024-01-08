import React from 'react';
import styles from './DemandesEnCours.module.css'
import Burger from '../Burger/Burger'

const DemandesEnCours: React.FC = () => {
  return (
    <div>
      <div className={styles.burgerTitle}>
        <Burger handleBurgerClick={() => document.dispatchEvent(new Event('burgerClicked'))} />
        <h1 className={styles.title}>Demandes en Cours</h1>
      </div>  
    </div>
  );
};

export default DemandesEnCours;