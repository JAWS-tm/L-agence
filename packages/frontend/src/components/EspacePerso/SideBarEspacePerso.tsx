import React from 'react';
import styles from './SideBarEspacePerso.module.css'

const SideBarEspacePerso: React.FC = () => {
  return (
    <>
        <nav className={styles.sideBarBox}>
            <ul className={styles.listSideBar}>
                <li>Informations personnelles</li>
                <li>Mon espace locataire</li>
                <li>Mes favoris</li>
                <li>Mes demandes en cours</li>
            </ul>
        </nav> 
    </>
  );
};

export default SideBarEspacePerso;