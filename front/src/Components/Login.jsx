import React , {useState}from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Rukovanje unosom
  const handleInput = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  // Rukovanje prijavom
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/login', userData)
      .then((response) => {
        if (response.data.success === true) {
          window.sessionStorage.setItem('auth_token', response.data.access_token);
          window.sessionStorage.setItem('role', response.data.role);
          window.sessionStorage.setItem('user_id', response.data.data.id);

          navigate('/podkasti');
        } else {
          setErrorMessage('Pogrešan email ili lozinka.');
        }
      })
      .catch((error) => {
        console.error('Greška pri prijavi:', error);
        setErrorMessage('Došlo je do greške. Molimo pokušajte ponovo.');
      });
  };





  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo">
          <h1>PODKAST PLATFORMA</h1>
        </div>
        {errorMessage && <p className="login-error">{errorMessage}</p>} {/* Prikazivanje greške */}
        <form className="login-form" onSubmit={handleLogin} >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="login-input"
            value={userData.email}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Lozinka"
            className="login-input"
            value={userData.password}
            onChange={handleInput}
            required
          />
          <button type="submit" className="login-button" >
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
