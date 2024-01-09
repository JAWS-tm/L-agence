import React, { useState } from 'react';
import styles from './Contact.module.css'
import axios from 'axios';

interface FormData {
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const backendUrl = 'http://localhost:3000/api/contact/post';
      
      // Envoi des données au backend
      await axios.post(backendUrl, formData);

      // Réinitialiser le formulaire après l'envoi réussi
      setFormData({
        email: '',
        subject: '',
        message: '',
      });

      console.log('Formulaire soumis avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
    }
  };

  return (
    <div className={styles.contact}>
        <h1 className={styles.titleContact}>Contact</h1>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div>
            <label className={styles.labelForm} htmlFor="email">Mail :</label>
            <input
            className={styles.inputForm}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor="subject">Objet :</label>
            <input
            className={styles.inputForm}
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor="message">Message :</label>
            <textarea
            className={styles.textareaForm}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            />
        </div>
        <button className={styles.buttonForm} type="submit">Envoyer</button>
        </form>
    </div>
  );
};

export default Contact;