import React, { useEffect, useState } from 'react';
import styles from './EspaceLocataire.module.css';
import useUserStore from '../../../user/useUserStore';
import { Property } from '../../../services/property.type';
import Button from '../../../components/Button/Button'
import axios from 'axios';
import toast from 'react-hot-toast';
import { axiosClient } from '../../../services';

const EspaceLocataire: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const loadUser = useUserStore((state) => state.loadUser);
  const property = user?.rentedProperty

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser()
  }, [])

  const informations: { label: string; value: keyof Property }[] = [
    { label: 'Nom', value: 'name' },
    { label: 'Description', value: 'description' },
    { label: 'Adresse', value: 'address' },
    { label: 'Prix', value: 'price' },
    { label: 'Charges', value: 'chargesPrice' },
    { label: 'Surface', value: 'surface' },
    { label: 'Type', value: 'type' },
    { label: 'Nombre de pièces', value: 'roomsCount' }
  ];

  const handleSubmit = async () => {
    try {
      const backendUrl = 'http://localhost:3000/api/user/rental';
      setLoading(true);
      await axiosClient.delete(backendUrl);
      setLoading(false);
      setUser(
        {
          ...user!,
          rentedProperty: undefined
        }
      )
      
      toast.success('Contrat supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête :', error);
      toast.error('Le contrat n\'a pas pu être supprimé');
      setLoading(false);
    }
  };

  if (!property) 
    return(
      <div className={styles.tenantSpace}>
        <h1 className={styles.title}>Espace Locataire</h1>
        <p className={styles.message}>Vous n'êtes pas locataire</p>
      </div>
    )

  return (
    <div className={styles.tenantSpace}>
      <h1 className={styles.title}>Espace Locataire</h1>
      <div className={styles.card}>
        {informations.map((info, i) => (
          <p key={i} className={styles.label}>
            {info.label} :
            <span className={styles.value}>
            {info.value === 'price' || info.value === 'chargesPrice'
              ? `${property[info.value]}€`
              : info.value === 'surface'
              ? `${property[info.value]}m²`
              : info.value === 'type'
              ? property[info.value] === 'house'
                ? 'Maison'
                : property[info.value] === 'apartment'
                ? 'Appartement'
                : property[info.value]
              : property[info.value]}
            </span>
          </p>
        ))}
      </div>
      <div>
        <Button
          className={styles.buttonLocataire}
          type="primary"
          actionType='submit'
          value='Supprimer mon contrat'
          onClick={() => handleSubmit()}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EspaceLocataire;
