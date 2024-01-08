import { useNavigate } from 'react-router-dom';
import './navbar.scss';

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
        <span className="item">Contact</span>
      </div>
      <div className="user" onClick={() => navigate('/profile')}>
        <i className="fa-regular fa-user"></i>
        <span>Mon compte</span>
      </div>
    </div>
  );
};

export default Navbar;
