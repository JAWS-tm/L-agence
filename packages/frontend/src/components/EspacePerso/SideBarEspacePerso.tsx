import React, {useEffect, useState} from 'react';
import styles from './SideBarEspacePerso.module.css'
import cross from '../../assets/cross.svg'

interface SideBarEspacePersoProps {
  selectedItem: number | 0;
  onItemSelected: (index: number) => void;
}

const SideBarEspacePerso: React.FC<SideBarEspacePersoProps> = ({ selectedItem, onItemSelected }) => {
  const [isPhoneView, setIsPhoneView] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneView(window.innerWidth <= 768);
    };

    const handleBurgerClick = () => {
      setIsPhoneView(!isPhoneView);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('burgerClicked', handleBurgerClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('burgerClicked', handleBurgerClick);
    };
  }, [isPhoneView]);

  const handleItemClick = (index: number) => {
    if (isPhoneView) {
      setIsPhoneView(false);
    }
    onItemSelected(index);
  };

  const handleCrossClick = () => {
    setIsPhoneView(false);
  };

  return (
    <>
        <nav className={isPhoneView ? styles.sideBarBoxPhone : styles.sideBarBox}>
          <img src={cross} className={styles.imgCross} onClick={handleCrossClick}></img>
          <ul className={styles.listSideBar}>
              {["Informations personnelles", "Mon espace locataire", "Mes favoris", "Mes demandes en cours"].map((item, index) => (
                <li
                  key={index}
                  className={index === selectedItem ? styles.listSideBarPerm : ''}
                  onClick={() => handleItemClick(index)}
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