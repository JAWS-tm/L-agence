import { useNavigate } from 'react-router-dom';
import useUserStore from '../../user/useUserStore';
import { useState } from 'react';
import { UserRegisteration, authService } from '../../services';

type Props = {};

const Register = (props: Props) => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const [user, setUser] = useState<UserRegisteration | null>(null);

  const handleValuesChange = (
    field: keyof UserRegisteration,
    value: string
  ) => {
    setUser((prevValues) => ({
      ...prevValues!,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    if (!user) {
      console.log('some fields are empty');
    } else if (user.password !== user.confirmPassword) {
      console.log("passwords don't macth");
    } else {
      const isLogged = await authService.register(user);
      if (isLogged) {
        login();
        navigate('/profile');
      } else {
        // handle wrong registeration
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
      Register
      <input
        type="text"
        placeholder="Nom"
        onChange={(e) => handleValuesChange('firstName', e.target.value)}
        value={user?.firstName}
      />
      <input
        type="text"
        placeholder="Prénom"
        onChange={(e) => handleValuesChange('lastName', e.target.value)}
        value={user?.lastName}
      />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => handleValuesChange('email', e.target.value)}
        value={user?.email}
      />
      <input
        type="password"
        placeholder="mot de passe"
        onChange={(e) => handleValuesChange('password', e.target.value)}
        value={user?.password}
      />
      <input
        type="password"
        placeholder="mot de passe"
        onChange={(e) => handleValuesChange('confirmPassword', e.target.value)}
        value={user?.confirmPassword}
      />
      <button onClick={handleRegister}>S'incrire</button>
      <button onClick={() => navigate('/login')}>Déjà un compte </button>
    </div>
  );
};

export default Register;
