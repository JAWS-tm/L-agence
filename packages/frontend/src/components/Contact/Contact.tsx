import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { authService } from '../../services';
import TextArea from '../TextArea/TextArea';
import styles from './Contact.module.css';

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

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      // Envoi des données au backend
      await authService.contact(
        formData.email,
        formData.subject,
        formData.message
      );
      setLoading(false);
      // Réinitialiser le formulaire après l'envoi réussi
      setFormData({
        email: '',
        subject: '',
        message: '',
      });
      toast.success('Formulaire envoyé avec succès !');
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      toast.error('Formulaire incorrect');
    }
  };

  return (
    <div className={styles.contact}>
      <h1 className={styles.titleContact}>Contact</h1>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          id="subject"
          name="subject"
          placeholder="Objet"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <TextArea
          id="message"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button
          className={styles.buttonForm}
          type="primary"
          actionType="submit"
          value="Envoyer"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default Contact;
