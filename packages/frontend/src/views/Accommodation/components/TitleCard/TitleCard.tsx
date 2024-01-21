import styles from './TitleCard.module.scss';

type Props = {
  name: String;
  location: String;
  beds: number;
  baths: number;
  yearBuilt: number;
  size: number;
};

const TitleCard = (props: Props) => {
  return (
    <div className={styles.titleCard}>
      <h2 className={styles.name}>{props.name}</h2>
      <p className={styles.saleType}>A louer</p>
      <span className={styles.price}>900 €</span>
      <span className={styles.monthly}>/mois</span>

      <div className={styles.propertyInfo}>
        <div className={styles.row}>
          <i className="fa-solid fa-location-dot"></i>
          <p>Adresse: {props.location}</p>
        </div>
        <div className={styles.row}>
          <i className="fa-regular fa-calendar"></i>
          <p>{props.yearBuilt}</p>
        </div>
        <div className={styles.propertyCardInfo}>
          <div className={styles.row}>
            <i className="fa-solid fa-bed"></i>
            <p>Chambre: {props.beds}</p>
          </div>
          <div className={styles.row}>
            <i className="fa-solid fa-bath"></i>
            <p>Salle de bain: {props.baths}</p>
          </div>
        </div>
      </div>
    </div>
    // <div className={styles.propertyCard}>
    //   <div>
    //     <div className={styles.titleContainer}>
    //       <h2>{props.name}</h2>
    //       <div style={{ justifyContent: 'center' }}>
    //         <h4>A Louer</h4>
    //       </div>
    //     </div>
    //     <div className={styles.propertyCardInfo}>
    //       <div className={styles.propertyCardInfoRow}>
    //         <i className="fa-regular fa-map"></i>
    //         <p>{props.location}</p>
    //       </div>
    //       <div className={styles.propertyCardInfoRow}>
    //         <i className="fa-regular fa-calendar"></i>
    //         <p>{props.yearBuilt}</p>
    //       </div>
    //       <div className={styles.propertyCardInfo}>
    //         <div className={styles.propertyCardInfoRow}>
    //           <i className="fa-solid fa-bed"></i>
    //           <p>Chambre: {props.beds}</p>
    //         </div>
    //         <div className={styles.propertyCardInfoRow}>
    //           <i className="fa-solid fa-bath"></i>
    //           <p>Salle de bain: {props.baths}</p>
    //         </div>
    //       </div>
    //       <div className={styles.propertyCardInfoRow}>
    //         <i className="fa-solid fa-maximize"></i>
    //         <p>Taille: {props.size} m²</p>
    //       </div>
    //     </div>
    //   </div>

    //   <p className={styles.propertyCardPrice}>$125,400</p>
    // </div>
  );
};

export default TitleCard;
