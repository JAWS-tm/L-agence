import React from 'react';
import styles from './PropertyDetailsCard.module.scss';

interface CardProps {
  price: number;
  size: number;
  chargesPrice: number;
  propertyType: string;
  roomsCount: number;
  description: string;
}

const PropertyDetailsCard: React.FC<CardProps> = ({
  price,
  size,
  chargesPrice,
  propertyType,
  roomsCount,
  description,
}) => {
  return (
    <div className={styles.cardDetails}>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Surface</p>
        <p className={styles.contentDetail}>{size} m²</p>
      </div>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Prix</p>
        <p className={styles.contentDetail}>{price} €</p>
      </div>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Charges</p>
        <p className={styles.contentDetail}>{chargesPrice} €</p>
      </div>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Type</p>
        <p className={styles.contentDetail}>{propertyType}</p>
      </div>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Nombre de pieces</p>
        <p className={styles.contentDetail}>{roomsCount}</p>
      </div>
      <div className={styles.cardDetailDescription}>
        <p className={styles.nameDetail}>Description</p>
        <p className={styles.contentDetail}>{description}</p>
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
