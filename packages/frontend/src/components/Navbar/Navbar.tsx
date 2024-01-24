import { Link } from 'react-router-dom';
import logo from '../../assets/l-agence_logo.png';
import Button from '../Button/Button';
import './navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={'/'} className="logo">
        <img src={logo} alt="" />

        <span className="name">L'agence</span>
      </Link>
      <div className="links">
        <Link to={'/properties'} className="item">
          Nos biens
        </Link>
        <Link to={'/contact'} className="item">
          Contact
        </Link>
      </div>

      <Link to={'/my-account'} className="item">
        <Button
          value="Mon compte"
          type="primary"
          icon={<i className="fa-solid fa-user" />}
        />
      </Link>
    </div>
  );
};

export default Navbar;
