import React from 'react';
import styles from './SideBarEspacePerso.module.css'

interface SideBarEspacePersoProps {
  selectedItem: number | null;
  onItemSelected: (index: number) => void;
}

const SideBarEspacePerso: React.FC<SideBarEspacePersoProps> = ({ selectedItem, onItemSelected }) => {
  return (
    <>
        <nav className={styles.sideBarBox}>
            <ul className={styles.listSideBar}>
                {["Informations personnelles", "Mon espace locataire", "Mes favoris", "Mes demandes en cours"].map((item, index) => (
                  <li
                    key={index}
                    className={index === selectedItem ? styles.listSideBarPerm : ''}
                    onClick={() => onItemSelected(index)}
                  >
                    {item}
                  </li>
                ))}
            </ul>
        </nav> 
    </>
  );
};

export default SideBarEspacePerso;