import { useState } from 'react';
import { UserCredentials, authService } from '../../services';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../user/useUserStore';

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const [credentials, setCredentials] = useState<UserCredentials | null>(null);

  const handleValuesChange = (field: keyof UserCredentials, value: string) => {
    setCredentials((prevValues) => ({
      ...prevValues!,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    if (credentials) {
      const user = await authService.login(credentials);
      if (user) {
        login();
        navigate('/profile');
      } else {
        // handle wron credentials
      }
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
      Login
      <input
        type="email"
        autoComplete="email"
        placeholder="email"
        onChange={(e) => handleValuesChange('email', e.target.value)}
        value={credentials?.email}
      />
      <input
        type="password"
        placeholder="mot de passe"
        onChange={(e) => handleValuesChange('password', e.target.value)}
        value={credentials?.password}
      />
      <button onClick={handleLogin}>Connexion</button>
      <button onClick={() => navigate('/register')}>S'inscrire</button>
    </div>
  );
};

export default Login;
