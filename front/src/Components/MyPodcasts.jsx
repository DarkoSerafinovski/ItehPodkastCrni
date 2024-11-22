import React from 'react';
import Navigation from './Navigation'; // Pretpostavljamo da je već urađena
import './MyPodcasts.css';

const MyPodcasts = () => {
  // Hardkodirani podaci za sada
  const mojiPodkasti = [
    {
      id: 1,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'Tech Talks',
      opis: 'Razgovori o najnovijim tehnologijama i inovacijama.'
    },
    {
      id: 2,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'Health & Wellness',
      opis: 'Saveti za zdrav i srećan život.'
    },
    {
      id: 3,
      thumbnail: 'https://via.placeholder.com/150',
      naziv: 'Travel Diaries',
      opis: 'Uzbudljive priče i iskustva sa putovanja širom sveta.'
    },
  ];

  return (
    <div className="my-podcasts-page">
      {/* Navigacija */}
      <Navigation role="creator" />

      {/* Glavni sadržaj */}
      <main className="main-content">
        {mojiPodkasti.map((podkast) => (
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
  );
};

export default MyPodcasts;
