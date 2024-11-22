import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './Rumble.css';

const Rumble = () => {
  // Mock podaci za kanale
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Simulacija API poziva za dohvat kanala
    const mockChannels = [
      {
        id: 1,
        thumbnail: 'https://via.placeholder.com/150',
        name: 'Tech Insider',
        description: 'Latest trends and insights in the tech world.',
      },
      {
        id: 2,
        thumbnail: 'https://via.placeholder.com/150',
        name: 'Fitness Freaks',
        description: 'Workouts, diets, and motivation for fitness enthusiasts.',
      },
      {
        id: 3,
        thumbnail: 'https://via.placeholder.com/150',
        name: 'Travel Diaries',
        description: 'Exploring the world, one destination at a time.',
      },
    ];
    setChannels(mockChannels);
  }, []);

  return (
    <div className="rumble-page">
      {/* Navigacija */}
      <Navigation role="viewer" />

      {/* Glavni sadržaj */}
      <div className="rumble-container">
        <h2>Rumble Kanali</h2>
        <div className="channels-grid">
          {channels.map((channel) => (
            <div key={channel.id} className="channel-card">
              <img src={channel.thumbnail} alt={`${channel.name} thumbnail`} className="channel-thumbnail" />
              <div className="channel-info">
                <h3 className="channel-name">{channel.name}</h3>
                <p className="channel-description">{channel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rumble;
