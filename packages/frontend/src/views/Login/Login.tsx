import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCredentials, authService } from '../../services';
import { Navigate, useNavigate } from 'react-router-dom';
import useUserStore from '../../user/useUserStore';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type Props = {};

const loginValidation = z.object({
  email: z
    .string()
    .min(1, { message: `L'email est requis.` })
    .email({ message: `L'email n'est pas valide.` }),
  password: z.string().min(1, { message: `Le mot de passe est requis.` }),
});

type LoginForm = z.infer<typeof loginValidation>;

const Login = (props: Props) => {
  const navigate = useNavigate();
  const { setUser: login, isAuthenticated ,loadUser, requestedPath, setRequestedPath} = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginValidation),
  });

  const onSubmit = handleSubmit(async (credentials: UserCredentials) => {
    const user = await authService.login(credentials);

    if (user) {
      login(user);
    } else {
      toast.error('Identifiants incorrects.');
    }
  });

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (requestedPath) {
        navigate(requestedPath);
        setRequestedPath(null);
      } else navigate('/my-account');
    }
  }, [isAuthenticated, isSubmitting]);

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Connexion</h1>

      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          errorMsg={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          {...register('password')}
          errorMsg={errors.password?.message}
        />
        <Button
          type="primary"
          actionType="submit"
          value="Se connecter"
          loading={isSubmitting}
        />
        <p className={styles.alreadyAccount}>
          Pas de compte ?{' '}
          <span className={styles.link} onClick={() => navigate('/register')}>
            Créer mon compte
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
