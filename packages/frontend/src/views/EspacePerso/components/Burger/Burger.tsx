import React from 'react';
import styles from './Burger.module.css';
import menu from '../../../../assets/menu.svg';

interface BurgerProps {
  handleBurgerClick: () => void;
}

const Burger: React.FC<BurgerProps> = ({ handleBurgerClick }) => {
  return (
    <>
      <img
        src={menu}
        className={styles.burger}
        onClick={handleBurgerClick}></img>
    </>
  );
};

export default Burger;
