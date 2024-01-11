import React from 'react';
import styles from './EspaceLocataire.module.css';
import Burger from '../components/Burger/Burger';

const EspaceLocataire: React.FC = () => {
  return (
    <div>
      <div className={styles.burgerTitle}>
        <Burger
          handleBurgerClick={() =>
            document.dispatchEvent(new Event('burgerClicked'))
          }
        />
        <h1 className={styles.title}>Espace Locataire</h1>
      </div>
    </div>
  );
};

export default EspaceLocataire;
