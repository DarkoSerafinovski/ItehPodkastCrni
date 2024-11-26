import React, {useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('gledalac'); // Podrazumevana uloga
  const [error, setError] = useState('');
  const navigate = useNavigate();
    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const handleRegister = async (e) => {
      e.preventDefault();
  
      // Provera da li se lozinke poklapaju
      if (password !== passwordConfirmation) {
        setError('Lozinke se ne poklapaju.');
        return;
      }
  
      console.log('Slanje registracije za:', username, email, role);
  
      try {
        // Slanje POST zahteva za registraciju
        const response = await axios.post('http://localhost:8000/api/register', {
          username: username,
          email: email,
          password: password,
          role: role,
        });
  
        // Ako je registracija uspešna
        if (response.data.success) {
          console.log('Registracija uspešna');
          localStorage.setItem('auth_token', response.data.access_token); // Čuvanje tokena
          navigate('/'); // Redirekcija na početnu stranicu
        } else {
          setError('Greška pri registraciji: ' + JSON.stringify(response.data.data)); // Prikaz greške
        }
      } catch (error) {
        console.error('Greška pri registraciji:', error);
        setError('Došlo je do greške prilikom registracije. Pokušajte ponovo.'); // Generička greška
      }
    };




  return (
    <div className="register-page">
      <div className="register-container">
        <div className="logo">
          <h1>PODKAST PLATFORMA</h1>
        </div>
        {error && <p className="register-error">{error}</p>}
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Korisničko Ime"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Lozinka"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Potvrdi Lozinku"
            className="register-input"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <select
            className="register-select"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="autor">Hoću da kreiram podkaste</option>
            <option value="gledalac">Hoću samo da gledam podkaste</option>
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
