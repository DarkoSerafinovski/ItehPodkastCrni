import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import './Creators.css';

const Creators = () => {
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role,setRole]=useState('administrator')

  // Dohvatanje kreatora sa servera
  const fetchCreators = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/users/autori', {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem('auth_token'),
        },
      });
      setCreators(response.data.data);
    } catch (error) {
      console.error('Došlo je do greške prilikom dohvata kreatora:', error);
    } finally {
      setLoading(false);
    }
  };

  // Brisanje kreatora sa servera
  const deleteCreator = async (creatorId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${creatorId}`, {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem('auth_token'),
        },
      });
      setCreators((prev) => prev.filter((creator) => creator.id !== creatorId));
    } catch (error) {
      console.error('Došlo je do greške prilikom brisanja kreatora:', error);
    }
  };

  // Pozivanje fetch funkcije prilikom učitavanja komponente
  useEffect(() => {
    fetchCreators();
  }, []);

  const handleRemoveClick = (creator) => {
    setSelectedCreator(creator);
  };

  const confirmRemove = () => {
    if (selectedCreator) {
      deleteCreator(selectedCreator.id);
      setSelectedCreator(null);
    }
  };

  const cancelRemove = () => {
    setSelectedCreator(null);
  };

  return (
    <div className="creators-page">
      {/* Navigacija */}
      <Navigation role={role} />

      {/* Glavni sadržaj */}
      <div className="creators-container">
        <h2>Autori</h2>

        {loading ? (
          <p>Učitavanje...</p>
        ) : (
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
                  <td>{creator.korisnicko_ime}</td>
                  <td>{creator.broj_podkasta}</td>
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
        )}
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
