import React from 'react';
import styles from './MesFavoris.module.css'
import Burger from '../Burger/Burger'

const MesFavoris: React.FC = () => {
  return (
    <div>
      <div className={styles.burgerTitle}>
        <Burger />
        <h1>Mes Favoris</h1>
      </div>  
    </div>
  );
};

export default MesFavoris;