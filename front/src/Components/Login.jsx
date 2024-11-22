import React , {useState}from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo">
          <h1>PODKAST PLATFORMA</h1>
        </div>
        <form className="login-form">
          <input
            type="text"
            placeholder="Email"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Lozinka"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Prijavi se
          </button>
        </form>
        <div className="register-link">
          Nemaš nalog? <Link to="/register">Registruj se ovde</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
