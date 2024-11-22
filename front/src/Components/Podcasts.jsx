import React from 'react';
import Navigation from './Navigation'; // Pretpostavljamo da je već urađena
import { Link } from "react-router-dom";
import './Podcasts.css';

const Podkast = () => {
  // Hardkodirani podaci za sada
  const podkasti = [
    {
      id: 1,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'Tech Talks',
      opis: 'Diskusije o najnovijim tehnologijama i inovacijama.'
    },
    {
      id: 2,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'History Unfolded',
      opis: 'Priče iz prošlosti koje oblikuju sadašnjost.'
    },
    {
      id: 3,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'Health & Wellness',
      opis: 'Saveti i diskusije o zdravlju i blagostanju.'
    },
  ];

  const kreatori = [
    { id: 1, ime: 'Marko Jovanović' },
    { id: 2, ime: 'Ana Petrović' },
    { id: 3, ime: 'Milan Nikolić' },
    { id: 4, ime: 'Ivana Ilić' },
  ];

  return (
    <div className="home-page">
      {/* Navigacija */}
      <Navigation role="admin" />

      <div className="content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Kreatori</h2>
          <ul>
            {kreatori.map((kreator) => (
              <li key={kreator.id}>{kreator.ime}</li>
            ))}
          </ul>
        </aside>

        {/* Glavni sadržaj */}
        <main className="main-content">
          {podkasti.map((podkast) => (
             <Link to={`/podkast/${podkast.id}`} className="podcast-link">
            <div key={podkast.id} className="podcast-card">
              <img
                src={podkast.thumbnail}
                alt={podkast.naziv}
                className="podcast-thumbnail"
              />
              <div className="podcast-details">
                <h3>{podkast.naziv}</h3>
                <p>{podkast.opis}</p>
              </div>
            </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Podkast;
