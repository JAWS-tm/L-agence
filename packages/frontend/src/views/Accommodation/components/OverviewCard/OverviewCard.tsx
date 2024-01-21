import React from 'react';
import styles from './OverviewCard.module.scss';

interface CardProps {
  rooms: number;
  beds: number;
  baths: number;
  yearBuilt: number;
  propertyType: string;
  size: number;
  garages: number;
}

const OverviewCard: React.FC<CardProps> = ({
  rooms,
  size,
  garages,
  yearBuilt,
  propertyType,
}) => {
  return (
    <div className={styles.cardDetails}>
      <div className={styles.cardDetail}>
        <i className="fa-solid fa-door-open"></i>
        <div>
          <p>Piece</p>
          <span>{rooms}</span>
        </div>
      </div>
      <div className={styles.cardDetail}>
        <i className="fa-solid fa-maximize"></i>
        <div>
          <p>Taille</p>
          <span>{size} m²</span>
        </div>
      </div>
      <div className={styles.cardDetail}>
        <i className="fa-solid fa-warehouse"></i>
        <div>
          <p>Garage</p>
          <span>{garages}</span>
        </div>
      </div>
      <div className={styles.cardDetail}>
        <i className="fa-regular fa-calendar"></i>
        <div>
          <p>Année de construction</p>
          <span>{yearBuilt}</span>
        </div>
      </div>
      <div className={styles.cardDetail}>
        <i className="fa-solid fa-house"></i>
        <div>
          <p>Type de propriété</p>
          <span>{propertyType}</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
