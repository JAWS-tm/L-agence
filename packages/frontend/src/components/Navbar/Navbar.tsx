import { useNavigate } from 'react-router-dom';
import './navbar.scss';
import Button from '../Button/Button';

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        L'agence
      </div>
      <div className="links">
        <span className="item">Nos biens</span>
        <span className="item" onClick={() => navigate('/contact')}>Contact</span>
      </div>
      <Button
        value="Mon compte"
        type="primary"
        onClick={() => navigate('/my-account')}
      />
    </div>
  );
};

export default Navbar;
