import React, { useState } from 'react';
import Navigation from './Navigation';
import './Creators.css';

const Creators = () => {
  // Hardkodirani podaci o kreatorima i broju podkasta
  const [creators, setCreators] = useState([
    { id: 1, username: 'Marko', podcasts: 5 },
    { id: 2, username: 'Jovana', podcasts: 3 },
    { id: 3, username: 'Nemanja', podcasts: 8 },
    { id: 4, username: 'Ana', podcasts: 2 },
  ]);

  const [selectedCreator, setSelectedCreator] = useState(null);

  const handleRemoveClick = (creator) => {
    setSelectedCreator(creator);
  };

  const confirmRemove = () => {
    setCreators((prev) =>
      prev.filter((creator) => creator.id !== selectedCreator.id)
    );
    setSelectedCreator(null);
  };

  const cancelRemove = () => {
    setSelectedCreator(null);
  };

  return (
    <div className="creators-page">
      {/* Navigacija */}
      <Navigation role="admin" />

      {/* Glavni sadržaj */}
      <div className="creators-container">
        <h2>Kreatori</h2>
        <table className="creators-table">
          <thead>
            <tr>
              <th>Korisničko ime</th>
              <th>Broj podkasta</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator) => (
              <tr key={creator.id}>
                <td>{creator.username}</td>
                <td>{creator.podcasts}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveClick(creator)}
                  >
                    Ukloni Kreatora
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal za potvrdu uklanjanja */}
      {selectedCreator && (
        <div className="modal">
          <div className="modal-content">
            <p>
              Da li ste sigurni da želite da uklonite kreatora{' '}
              <strong>{selectedCreator.username}</strong>?
            </p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={confirmRemove}>
                Da
              </button>
              <button className="cancel-button" onClick={cancelRemove}>
                Ne
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Creators;
