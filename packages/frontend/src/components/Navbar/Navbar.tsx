import { useNavigate } from 'react-router-dom';
import './navbar.scss';
import Button from '../Button/Button';
import logo from '../../assets/l-agence_logo.png';

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={logo} alt="" />
        <span className="name">L'agence</span>
      </div>
      <div className="links">
        <span className="item">Nos biens</span>
        <span className="item" onClick={() => navigate('/contact')}>
          Contact
        </span>
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
