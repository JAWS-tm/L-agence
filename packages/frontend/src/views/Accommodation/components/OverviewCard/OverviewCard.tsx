import styles from './OverviewCard.module.scss';
import { Property } from '../../../../services/property.type';

type Props = {
  property: Property;
};

const OverviewCard = (props: Props) => {
  return (
    <div className={styles.cardDetails}>
      <div className={styles.cardDetail}>
        <i className="fa-solid fa-door-open"></i>
        <div>
          <p>Piece</p>
          <span>{props.property.roomsCount}</span>
        </div>
      </div>
      <div className={styles.cardDetail}>
        <i className="fa-solid fa-maximize"></i>
        <div>
          <p>Taille</p>
          <span>{props.property.surface} m²</span>
        </div>
      </div>
      <div className={styles.cardDetail}>
        <i className="fa-solid fa-house"></i>
        <div>
          <p>Type de propriété</p>
          <span>
            {props.property.type === 'apartment' ? 'Appartement' : 'Maison'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
