import React from 'react';
import { User } from '../../../user/type';
import useUserStore from '../../../user/useUserStore';
import styles from './InformationsPerso.module.css';

const InformationsPerso: React.FC = () => {
  const user = useUserStore((state) => state.user);

  const dataStr = user?.createdAt.toString().substring(0, 10);

  const informations = [
    { label: 'Prénom', value: 'firstName' },
    { label: 'Nom', value: 'lastName' },
    { label: 'Email', value: 'email' },
    { label: 'Compte créé le', value: 'createdAt' },
  ] satisfies { label: string; value: keyof User }[];

  if (!user) return <div>Pas d'informations.</div>;

  return (
    <div className={styles.persoInfo}>
      <h1 className={styles.title}>Informations personnelles</h1>
      <div className={styles.card}>
        {informations.map((info, i) => (
          <p key={i} className={styles.label}>
            {info.label} :
            <span className={styles.value}>
              {info.value === 'createdAt' ? dataStr : user[info.value]}
            </span>
          </p>
        ))}
        {user?.role === 'admin' && (
          <p className={styles.label}>
            {' '}
            Rôle :<span className={styles.value}>Vous êtes Administrateur</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default InformationsPerso;
