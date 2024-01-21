import { Property } from '../../../../services/property.type';
import styles from './TitleCard.module.scss';

type Props = {
  property: Property;
};

const TitleCard = (props: Props) => {
  return (
    <div className={styles.titleCard}>
      <h2 className={styles.name}>{props.property.name}</h2>
      <p className={styles.saleType}>A louer</p>
      <span className={styles.price}>{props.property.price} €</span>
      <span className={styles.monthly}>/mois</span>

      <div className={styles.propertyInfo}>
        <div className={styles.row}>
          <i className="fa-solid fa-location-dot"></i>
          <p>Adresse: {props.property.address}</p>
        </div>
        <div className={styles.propertyCardInfo}>
          <div className={styles.row}>
            <i className="fa-solid fa-bed"></i>
            <p>Chambre: {props.property.roomsCount}</p>
          </div>
        </div>
        <div className={styles.propertyCardInfo}>
          <div className={styles.row}>
            <i className="fa-solid fa-expand" />
            <p>Surface: {props.property.surface} m²</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
