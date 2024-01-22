import React, { useState } from 'react';
import styles from './OnGoingApplication.module.scss';
import { propertyService } from '../../../services/property.service';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { CONFIG } from '../../../utils/config';
import Button from '../../../components/Button/Button';
import toast from 'react-hot-toast';
import { axiosClient } from '../../../services';

const OnGoingApplication: React.FC = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { data: application } = useQuery({
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
        try {
          const backendUrl = 'http://localhost:3000/api/user/rental';
          setLoading(true);
          await axiosClient.post(backendUrl, { id: application?.data[0].id });
          setLoading(false);
          
          toast.success('Vous êtes maintenant locataire de logement');
        } catch (error) {
          console.error('Erreur lors de l\'envoi de la requête :', error);
          toast.error('Erreur vous n\'êtes pas loacataire');
          setLoading(false);
        }
      };
      console.log(application?.data[0].property.state)

    return(
        <div className={styles.test}>
            <h1 className={styles.title}>{ application?.data[0].property.name }</h1>
            <div className={styles.card}>
                <p className={styles.label}>
                    Message de présentation :
                    <span className={styles.value}>{ application?.data[0].motivationText }</span>
                </p>
                <p className={styles.label}>
                    Etat du dossier
                    <span className={styles.value}>
                        {application?.data[0].state === "pending" ? "En cours" : application?.data[0].state === "accepted" ? "Acceptée" : null}
                    </span>
                </p>
                <div>
                    <a target='_blank' href={CONFIG.PUBLIC_CONTENT_URL + '/' + application?.data[0].idCardPath} ><i className={`fa-regular fa-address-card ${styles.icon}`}></i></a>
                </div>
                <div>
                    <a target='_blank' href={CONFIG.PUBLIC_CONTENT_URL + '/' + application?.data[0].proofOfAddressPath} ><i className={`fa-regular fa-address-book ${styles.icon}`}></i></a>
                </div>
            </div>
            <div>
                
                    <Button
                    type="primary"
                    actionType='submit'
                    value='Accepter le logement'
                    onClick={() => handleSubmit()}
                    loading={loading}
                    className={styles.buttonApplication}
                  />

            </div>
        </div>
    );
};

export default OnGoingApplication;