import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PlaceholderImg from '../../assets/placeholder_image.jpg';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Button from '../../components/Button/Button';
import Lotties from '../../components/Lotties/Lotties';
import { propertyService } from '../../services';
import { Property } from '../../services/property.type';
import { CONFIG } from '../../utils/config';
import styles from './Accommodation.module.scss';
import ImageCard from './components/ImagesCard/ImagesCard';
import InfoCardLayout from './components/InfoCardLayout/InfoCardLayout';
import OverviewCard from './components/OverviewCard/OverviewCard';
import PropertyDetailsCard from './components/PropertyDetailsCard/PropertyDetailsCard';
import TitleCard from './components/TitleCard/TitleCard';

const Accommodation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (params.id) {
      propertyService
        .getById(params.id)
        .then((property) => {
          setProperty(property);
        })
        .catch((err) => {
          if (err.response.data.status === 404) {
            navigate('/properties');
          }
        })
        .finally(() => {});
    } else {
      navigate('/properties');
    }
  }, []);

  if (!property) return <Lotties type="loading" width="60px" />;

  const breadcrumbPaths = [
    { name: 'Accueil', path: '/' },
    { name: 'Locations', path: '/properties' },
    { name: property?.name, path: '' },
  ];

  const images =
    property.imagesPaths.length > 0
      ? property.imagesPaths.map((image) => {
          return CONFIG.PUBLIC_CONTENT_URL + '/' + image;
        })
      : [PlaceholderImg];

  return (
    <>
      <Breadcrumb paths={breadcrumbPaths} />
      <div className={styles.container}>
        <div className={styles.firstView}>
          <TitleCard property={property} />
          {/* <ImageCard images={property.imagesPaths ?? defaultImg} /> */}
          <ImageCard images={images} />
        </div>

        <div className={styles.secondView}>
          <div className={styles.overviewWrapper}>
            <InfoCardLayout title="Aperçu">
              <OverviewCard property={property} />
            </InfoCardLayout>

            <InfoCardLayout title="Détails">
              <PropertyDetailsCard property={property} />
            </InfoCardLayout>
          </div>
          <div className={styles.applyWrapper}>
            <InfoCardLayout title="Intéressé(e) ?">
              <div className={styles.interested}>
                <p className={styles.message}>
                  Si vous êtes conquis par ce bien, vous pouvez déposer votre
                  dossier en cliquant sur le bouton suivant.
                </p>
                <Link to={`/property/${property.id}/apply`}>
                  <Button type="primary" value="Déposer un dossier" />
                </Link>
              </div>
            </InfoCardLayout>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accommodation;
