import styles from './PropertyCard.module.scss';
import HomeImg from '../../../../assets/DreamHome.webp';

type Props = {};

const PropertyCard = (props: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageLayout}>
        <div className={styles.image}>
          <img src={HomeImg} alt="Home" />
        </div>
        <div className={styles.imageBottomSection}>
          <span className={styles.price}>680€</span>

          <div className={styles.favoriteIcon}>
            <i className="fa-regular fa-heart"></i>
          </div>
        </div>
      </div>

      <h1 className={styles.name}>T2 - La Doutre</h1>
      <div className={styles.location}>
        <i className="fa-solid fa-location-dot"></i>

        <span>5 rue Saint-Jacques, Angers</span>
      </div>

      <div className={styles.infoGroup}>
        <div className={styles.info}>
          <i className="fa-solid fa-house" />
          <span>1 chambre</span>
        </div>

        <div className={styles.info}>
          <i className="fa-solid fa-building" />
          <span>Maison</span>
        </div>

        <div className={styles.info}>
          <i className="fa-solid fa-expand" />
          <span>60m²</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
