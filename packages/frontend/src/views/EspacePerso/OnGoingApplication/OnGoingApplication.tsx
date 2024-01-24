import { AxiosError } from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Button from '../../../components/Button/Button';
import { propertyService } from '../../../services/property.service';
import { CONFIG } from '../../../utils/config';
import styles from './OnGoingApplication.module.scss';

const OnGoingApplication: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [acceptLoading, setAcceptLoading] = useState(false);

  const { data: application, isLoading: applicationLoading } = useQuery({
    enabled: !!params.id,
    queryKey: ['application', params.id],
    queryFn: () => propertyService.getUserApplicationById(params.id! || ''),
    onError: (err: AxiosError) => {
      if (err.response?.status === 404) {
        navigate('/my-account');
      }
    },
  });

  const handleSubmit = async () => {
    if (!application) return;
    try {
      setAcceptLoading(true);
      await propertyService.acceptProperty(application.id);
      setAcceptLoading(false);

      toast.success(
        `Vous êtes maintenant locataire du logement : ${application.property.name}`
      );
      navigate('/my-account');
    } catch (error) {
      toast.error("Votre acceptation n'a pas pu être prise en compte");
      setAcceptLoading(false);
    }
  };

  if (applicationLoading) return <p>Chargement...</p>;

  if (!application) return <Navigate to={'/'} />;

  const breadcrumbLinks = [
    { name: 'Mes candidatures', path: '/my-account' },
    { name: application.property.name },
  ];

  return (
    <div className={styles.content}>
      <Breadcrumb paths={breadcrumbLinks} />
      <h1 className={styles.title}>{application.property.name}</h1>
      <div className={styles.card}>
        <p className={styles.label}>
          Message de présentation :
          <span className={styles.value}>{application.motivationText}</span>
        </p>
        <p className={styles.label}>
          Etat du dossier
          <span className={styles.value}>
            {application.state === 'pending'
              ? 'En cours'
              : application.state === 'accepted'
                ? 'Acceptée'
                : null}
          </span>
        </p>

        <p className={styles.label}>Fichiers joints</p>
        <div className={styles.filesContainer}>
          <div>
            <a
              target="_blank"
              href={CONFIG.PUBLIC_CONTENT_URL + '/' + application.idCardPath}>
              <i className={`fa-regular fa-address-card ${styles.icon}`}></i>
              <p>Carte d'identité</p>
            </a>
          </div>
          <div>
            <a
              target="_blank"
              href={
                CONFIG.PUBLIC_CONTENT_URL + '/' + application.proofOfAddressPath
              }>
              <i className={`fa-regular fa-address-book ${styles.icon}`}></i>
              <p>Justificatif de domicile</p>
            </a>
          </div>
        </div>
      </div>
      <div>
        {application.state === 'accepted' && (
          <Button
            type="primary"
            actionType="submit"
            value="Accepter le logement"
            onClick={() => handleSubmit()}
            loading={acceptLoading}
            className={styles.buttonApplication}
          />
        )}
      </div>
    </div>
  );
};

export default OnGoingApplication;
