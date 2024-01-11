import React from 'react';
import styles from './MesFavoris.module.css';
import Burger from '../components/Burger/Burger';

const MesFavoris: React.FC = () => {
  return (
    <div>
      <div className={styles.burgerTitle}>
        <Burger
          handleBurgerClick={() =>
            document.dispatchEvent(new Event('burgerClicked'))
          }
        />
        <h1 className={styles.title}>Mes Favoris</h1>
      </div>
    </div>
  );
};

export default MesFavoris;
