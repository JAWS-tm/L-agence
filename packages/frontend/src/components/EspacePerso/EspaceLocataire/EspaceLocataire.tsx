import React from 'react';
import styles from './EspaceLocataire.module.css'
import Burger from '../Burger/Burger'

const EspaceLocataire: React.FC = () => {
  return (
    <div>
      <div className={styles.burgerTitle}>
        <Burger />
        <h1>Espace Locataire</h1>
      </div>
    </div>
  );
};

export default EspaceLocataire;