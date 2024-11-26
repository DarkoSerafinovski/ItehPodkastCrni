import React from 'react';
import { useNavigate } from 'react-router-dom';  // Potrebno za preusmeravanje na stranicu odjave
import './Navigation.css';

const Navigation = ({ role }) => {
  const navigate = useNavigate();

  // Funkcija za odjavu
  const handleLogout = () => {
   
    alert("Uspešno ste se odjavili!");
    window.sessionStorage.clear();
    navigate("/"); 
  };

  let navItems;

  // Provera uloge i postavljanje navigacionih elemenata
  if (role === 'administrator') {
    navItems = (
      <ul className="nav-list">
        <li className="nav-item"><a href="/podkasti" className="nav-link">Podkasti</a></li>
        <li className="nav-item"><a href="/creators" className="nav-link">Kreatori</a></li>
        <li className="nav-item"><a href="/categories" className="nav-link">Kategorije</a></li>
      </ul>
    );
  } else if (role === 'autor') {
    navItems = (
      <ul className="nav-list">
        <li className="nav-item"><a href="/podkasti" className="nav-link">Podkasti</a></li>
        <li className="nav-item"><a href="/create-podcast" className="nav-link">Kreiraj Podkast</a></li>
        <li className="nav-item"><a href="/my-podcasts" className="nav-link">Moji Podkasti</a></li>
        <li className="nav-item"><a href="/rumble" className="nav-link">Rumble</a></li>
      </ul>
    );
  } else if (role === 'gledalac') {
    navItems = (
      <ul className="nav-list">
        <li className="nav-item"><a href="/podkasti" className="nav-link">Podkasti</a></li>
        <li className="nav-item"><a href="/rumble" className="nav-link">Rumble</a></li>
        <li className="nav-item"><a href="/favorites" className="nav-link">Omiljeni Podkasti</a></li>
      </ul>
    );
  } else {
    navItems = (
      <p className="nav-error">Uloga nije prepoznata</p>
    );
  }

  return (
    <nav className="navigation">
      {navItems}
      {/* Dugme za odjavu postavljeno u desni gornji kut */}
      <button onClick={handleLogout} className="logout-btn">Odjavi se</button>
    </nav>
  );
};

export default Navigation;
