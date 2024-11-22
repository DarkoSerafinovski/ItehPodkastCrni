import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [userRole, setUserRole] = useState('viewer');

    const handleRoleChange = (event) => {
      setUserRole(event.target.value);
    };
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="logo">
          <h1>PODKAST PLATFORMA</h1>
        </div>
        <form className="register-form">
          <input
            type="text"
            placeholder="Korisničko Ime"
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
          />
          <input
            type="password"
            placeholder="Lozinka"
            className="register-input"
          />
          <input
            type="password"
            placeholder="Potvrdi Lozinku"
            className="register-input"
          />
          <select
            className="register-select"
            value={userRole}
            onChange={handleRoleChange}
          >
            <option value="creator">Hoću da kreiram podkaste</option>
            <option value="viewer">Hoću samo da gledam podkaste</option>
          </select>
          <button type="submit" className="register-button">
            Registruj se
          </button>
        </form>
        <div className="login-link">
          Već imaš nalog? <Link to="/">Prijavi se ovde</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
