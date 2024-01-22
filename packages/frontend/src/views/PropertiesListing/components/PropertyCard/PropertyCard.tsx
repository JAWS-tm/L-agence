import styles from './PropertyCard.module.scss';
import PlaceholderImg from '../../../../assets/placeholder_image.jpg';
import { Property, PropertyType } from '../../../../services/property.type';
import { propertyService } from '../../../../services/property.service';
import { CONFIG } from '../../../../utils/config';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  property: Property;
  redirectTo: string;
};

const typeTranslation: {
  [K in PropertyType]: string;
} = {
  apartment: 'Appartement',
  house: 'Maison',
};

const PropertyCard = ({ property, redirectTo }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      const response = await propertyService.getUserFavorites();

      if (Array.isArray(response.data)) {
        const isPropertyFavorite = response.data.some(
          (favorite: { id: string }) => {
            return favorite.id === property.id;
          }
        );

        setIsFavorite(isPropertyFavorite);
      }
    };
    fetchUserFavorites();

    if (!property.imagesPaths.length) {
      setImage(PlaceholderImg);
      return;
    }
    setImage(CONFIG.PUBLIC_CONTENT_URL + '/' + property.imagesPaths[0]);
  }, [property.imagesPaths]);

  const handleFavoriteClick = async () => {
    const response = await propertyService.toggleFavorite(
      property.id,
      isFavorite
    );
    if (response.success) {
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <Link to={redirectTo} className={styles.card}>
      <div className={styles.imageLayout}>
        <div className={styles.image}>
          <img
            src={image ?? PlaceholderImg}
            alt="Home preview"
            onError={() => {
              console.log('failed to load image', image);
              setImage(PlaceholderImg);
            }}
          />
        </div>

        <div className={styles.imageBottomSection}>
          <span className={styles.price}>{property.price}€</span>

          <div className={styles.favoriteIcon} onClick={handleFavoriteClick}>
            <i
              className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart`}
            />
          </div>
        </div>
      </div>

      <h1 className={styles.name}>{property.name}</h1>
      <div className={styles.location}>
        <i className="fa-solid fa-location-dot"></i>

        <span>{property.address}</span>
      </div>

      <div className={styles.infoGroup}>
        <div className={styles.info}>
          <i className="fa-solid fa-house" />
          <span>
            {property.roomsCount} chambre{property.roomsCount > 1 ? 's' : ''}
          </span>
        </div>

        <div className={styles.info}>
          <i className="fa-solid fa-building" />
          <span>{typeTranslation[property.type]}</span>
        </div>

        <div className={styles.info}>
          <i className="fa-solid fa-expand" />
          <span>{property.surface}m²</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
