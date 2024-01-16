import React from 'react';
import styles from './TitleCard.module.scss';

interface CardProps {
  name: String;
  location: String;
  beds: number;
  baths: number;
  yearBuilt: number;
  size: number;
}


const TitleCard: React.FC<CardProps> = ({
  name,
  location,
  beds,
  baths,
  size,
  yearBuilt,
}) => {
  return (
    <div className={styles.propertyCard}>
      <div>
        <div className={styles.titleContainer}>
          <h2>{name}</h2>
          <div style={{justifyContent: 'center'}}>
            <h4>A Louer</h4>
          </div>
        </div>
        <div className={styles.propertyCardInfo}>
          <div className={styles.propertyCardInfoRow}>
            <i className="fa-regular fa-map"></i>
            <p>{location}</p>
          </div>
          <div className={styles.propertyCardInfoRow}>
            <i className="fa-regular fa-calendar"></i>
            <p>{yearBuilt}</p>
          </div>
          <div className={styles.propertyCardInfo}>
            <div className={styles.propertyCardInfoRow}>
              <i className="fa-solid fa-bed"></i>
              <p>Beds: {beds}</p>
            </div>
            <div className={styles.propertyCardInfoRow}>
              <i className="fa-solid fa-bath"></i>
              <p>Baths: {baths}</p>
            </div>
          </div>
          <div className={styles.propertyCardInfoRow}>
            <i className="fa-solid fa-maximize"></i>
            <p>Taille: {size} m²</p>
          </div>
        </div>
      </div>
      
        <p className={styles.propertyCardPrice}>$125,400</p>
      
    </div>
  );
};

export default TitleCard;
