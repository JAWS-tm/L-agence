import React from 'react';
import styles from './MesFavoris.module.scss';
import PropertyCard from '../../../views/PropertiesListing/components/PropertyCard/PropertyCard'
import { propertyService } from '../../../services/property.service';
import { useQuery } from 'react-query';

const MesFavoris: React.FC = () => {

  const {
    data: propertiesData,
    isLoading: propertiesLoading,
    isSuccess: propertiesLoaded,
  } = useQuery('properties', propertyService.getUserFavorites);

  const properties = propertiesData?.data || [];

  return (
    <div className={styles.favourites}>
      <h1 className={styles.title}>Mes Favoris</h1>
      <div className={styles.propertiesGrid}>
        {propertiesLoading ? (
          <div className={styles.message}>Chargement...</div>
        ) : propertiesLoaded ? (
          properties && properties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className={styles.message}>
            Erreur lors du chargement des propriétés
          </div>
        )}
      </div>
    </div>
  );
};

export default MesFavoris;
