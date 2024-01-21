import styles from './PropertyDetailsCard.module.scss';
import { Property } from '../../../../services/property.type';

type Props = {
  property: Property;
};

const PropertyDetailsCard = (props: Props) => {
  return (
    <div className={styles.cardDetails}>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Surface</p>
        <p className={styles.contentDetail}>{props.property.surface} m²</p>
      </div>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Prix</p>
        <p className={styles.contentDetail}>{props.property.price} €</p>
      </div>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Charges</p>
        <p className={styles.contentDetail}>{props.property.chargesPrice} €</p>
      </div>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Type</p>
        <p className={styles.contentDetail}>
          {props.property.type === 'apartment' ? 'Appartement' : 'Maison'}
        </p>
      </div>
      <div className={styles.cardDetail}>
        <p className={styles.nameDetail}>Nombre de pièces</p>
        <p className={styles.contentDetail}>{props.property.roomsCount}</p>
      </div>
      <div className={styles.cardDetailDescription}>
        <p className={styles.nameDetail}>Description</p>
        <p className={styles.contentDetail}>{props.property.description}</p>
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
