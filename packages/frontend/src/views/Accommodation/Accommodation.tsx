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

type Props = {};

const images = [
  'https://picsum.photos/id/1015/1000/600',
  'https://picsum.photos/id/1016/1000/600',
  'https://picsum.photos/id/1018/1000/600',
  'https://picsum.photos/id/1019/1000/600',
];

const Accommodation: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    console.log('extracted id from param : ', params);

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
    <div className={styles.container}>
      <div className={styles.firstView}>
        <TitleCard
          name={property.name}
          location={property.address}
          beds={property.roomsCount}
          baths={300}
          size={property.surface}
          yearBuilt={4000}
        />
        {/* <ImageCard images={property.imagesPaths ?? defaultImg} /> */}
        <ImageCard images={images} />
      </div>

      <div className={styles.secondView}>
        <div style={{ flex: 3 }}>
          <InfoCardLayout title="Apperçu">
            <OverviewCard
              beds={property.roomsCount}
              baths={300}
              size={property.surface}
              rooms={property.roomsCount}
              garages={300}
              yearBuilt={4000}
              propertyType={
                property.type === 'apartment' ? 'Appartement' : 'Maison'
              }
            />
          </InfoCardLayout>
          <InfoCardLayout title="Détails">
            <PropertyDetailsCard
              price={property.price}
              size={property.surface}
              chargesPrice={property.chargesPrice}
              roomsCount={property.roomsCount}
              description={property.description}
              propertyType={
                property.type === 'apartment' ? 'Appartement' : 'Maison'
              }
            />
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
  );
};

export default Accommodation;
