import React, { useState } from 'react';
import styles from './ContactProperty.module.scss';

const ContactProperty: React.FC = ({}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (

      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.cardTitle}>Faire une demande</div>
        <div className={styles.cardLine}/>
        <label htmlFor="message">Votre Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Envoyer</button>
      </form>

  );
};

export default ContactProperty;
