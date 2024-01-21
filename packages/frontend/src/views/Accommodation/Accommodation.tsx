import React, { useEffect, useState } from 'react';
import TitleCard from './components/TitleCard/TitleCard';
import OverviewCard from './components/OverviewCard/OverviewCard';
import PropertyDetailsCard from './components/PropertyDetailsCard/PropertyDetailsCard';
import ImageCard from './components/ImagesCard/ImagesCard';
import styles from './Accommodation.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Property } from '../../services/property.type';
import { propertyService } from '../../services';
import Lotties from '../../components/Lotties/Lotties';
import defaultImg from '../../assets/no_image_available.png';
import InfoCardLayout from './components/InfoCardLayout/InfoCardLayout';
import Button from '../../components/Button/Button';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

type Props = {};

const images = [
  'https://picsum.photos/id/1015/1000/600',
  'https://picsum.photos/id/1016/1000/600',
  'https://picsum.photos/id/1018/1000/600',
  'https://picsum.photos/id/1019/1000/600',
];

const breadcrumbPaths = [
  { name: 'Accueil', path: '/' },
  { name: 'Locations', path: '/properties' },
  { name: 'Appartement', path: '/property' },
];

const Accommodation: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    console.log('extracted id from params : ', params);
    if (params.id) {
      propertyService
        .getById(params.id)
        .then((property) => {
          console.log('property : ', property);
          setProperty(property);
        })
        .catch((err) => {
          if (err.response.data.status === 404) {
            navigate('/properties');
          }
        })
        .finally(() => {});
    }
  }, []);

  if (!property) return <Lotties type="loading" width="60px" />;

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
          <div style={{ flex: 3 }}>
            <InfoCardLayout title="Apperçu">
              <OverviewCard property={property} />
            </InfoCardLayout>

            <InfoCardLayout title="Détails">
              <PropertyDetailsCard property={property} />
            </InfoCardLayout>
          </div>
          <div style={{ flex: 1 }}>
            <InfoCardLayout title="Intéressé(e) ?">
              <div className={styles.interested}>
                <p className={styles.message}>
                  Si vous êtes conquis par ce bien, vous pouvez déposer votre
                  dossier en cliquant sur le bouton suivant.{' '}
                </p>
                <Button type="primary" value="Déposer un dossier" />
              </div>
            </InfoCardLayout>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accommodation;
