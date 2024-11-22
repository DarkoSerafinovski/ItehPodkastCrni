import React from 'react';
import Navigation from './Navigation'; // Pretpostavljamo da je već urađena
import './Favorites.css';

const Favorites = () => {
  // Hardkodirani podaci za sada
  const omiljeniPodkasti = [
    {
      id: 1,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'Deep Dive into AI',
      opis: 'Razgovori o veštačkoj inteligenciji i njenom uticaju na svet.'
    },
    {
      id: 2,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'Mystery Chronicles',
      opis: 'Najmisteriozniji događaji iz istorije i savremenog doba.'
    },
    {
      id: 3,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'Fitness for Life',
      opis: 'Inspiracija i saveti za zdraviji životni stil.'
    },
  ];

  const kreatori = [
    { id: 1, ime: 'Stefan Marković' },
    { id: 2, ime: 'Jelena Kostić' },
    { id: 3, ime: 'Nikola Đorđević' },
    { id: 4, ime: 'Milica Ristić' },
  ];

  return (
    <div className="favorites-page">
      {/* Navigacija */}
      <Navigation role="viewer" />

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
          {omiljeniPodkasti.map((podkast) => (
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
          ))}
        </main>
      </div>
    </div>
  );
};

export default Favorites;
