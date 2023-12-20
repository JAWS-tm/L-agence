import React from 'react';
import styles from './Burger.module.css'
import menu from '../../../assets/menu.svg'

const Burger: React.FC = () => {
  return (
    <>
        <img src={menu} className={styles.burger}></img>
    </>
  );
};

export default Burger;