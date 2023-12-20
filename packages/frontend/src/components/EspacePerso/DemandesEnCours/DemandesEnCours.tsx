import React from 'react';
import styles from './DemandesEnCours.module.css'
import Burger from '../Burger/Burger'

const DemandesEnCours: React.FC = () => {
  return (
    <div>
      <div className={styles.burgerTitle}>
        <Burger />
        <h1>Demandes en Cours</h1>
      </div>  
    </div>
  );
};

export default DemandesEnCours;