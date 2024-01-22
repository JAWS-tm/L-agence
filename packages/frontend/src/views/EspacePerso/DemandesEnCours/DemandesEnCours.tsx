import React from 'react';
import styles from './DemandesEnCours.module.scss';
import { propertyService } from '../../../services/property.service';
import { useQuery } from 'react-query';
import PropertyCard from '../../PropertiesListing/components/PropertyCard/PropertyCard';

const DemandesEnCours: React.FC = () => {

  const {
    data: propertiesData,
    isLoading: propertiesLoading,
    isSuccess: propertiesLoaded,
  } = useQuery('propertiesApp', propertyService.getUserApplications);

  const propertiesApp = propertiesData?.data || [];
  console.log(propertiesApp);
  

  return (
    <div className={styles.ongoingRequests}>
      <h1 className={styles.title}>Demandes en Cours</h1>
      <div className={styles.propertiesGrid}>
        {propertiesLoading ? (
          <div className={styles.message}>Chargement...</div>
        ) : propertiesLoaded ? (
          propertiesApp!.length > 0 ? (
            propertiesApp && propertiesApp.map((application: any) => (
              <PropertyCard key={application.property.id} property={application.property} redirectTo={`/ongoingapplication/${application.id}`}/>
            ))
          ) : (
            <div className={styles.message}>
              Vous n'avez pas de demandes en cours
            </div>
          )
        ) : (
          <div className={styles.message}>
            Erreur lors des demandes
          </div>
        )}
      </div>
    </div>
  );
};

export default DemandesEnCours;
