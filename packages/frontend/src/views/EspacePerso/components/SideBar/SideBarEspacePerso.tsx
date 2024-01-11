import React, { useEffect, useState } from 'react';
import styles from './SideBarEspacePerso.module.css';
import cross from '../../../../assets/cross.svg';
import Button from '../../../../components/Button/Button';
import useUserStore from '../../../../user/useUserStore';
import { useNavigate } from 'react-router-dom';

interface SideBarEspacePersoProps {
  selectedItem: number | 0;
  onItemSelected: (index: number) => void;
}

const SideBarEspacePerso: React.FC<SideBarEspacePersoProps> = ({
  selectedItem,
  onItemSelected,
}) => {
  const [isPhoneView, setIsPhoneView] = useState<boolean>(
    window.innerWidth <= 768
  );
  const { logout } = useUserStore();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <>
      <nav className={isPhoneView ? styles.sideBarBoxPhone : styles.sideBarBox}>
        <img
          src={cross}
          className={styles.imgCross}
          onClick={handleCrossClick}></img>
        <ul className={styles.listSideBar}>
          {[
            'Informations personnelles',
            'Mon espace locataire',
            'Mes favoris',
            'Mes demandes en cours',
          ].map((item, index) => (
            <li
              key={index}
              className={index === selectedItem ? styles.listSideBarPerm : ''}
              onClick={() => handleItemClick(index)}>
              {item}
            </li>
          ))}
        </ul>
        <Button
          type="secondary"
          value="Se déconnecter"
          icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
          className={styles.logoutButton}
          onClick={handleLogout}
        />
      </nav>
    </>
  );
};

export default SideBarEspacePerso;
