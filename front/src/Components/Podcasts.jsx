import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import { Link } from "react-router-dom";
import './Podcasts.css';

const Podkast = () => {
  const [podkasti, setPodkasti] = useState([]);
  const [kreatori, setKreatori] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedKreator, setSelectedKreator] = useState(null); 
  const [role, setRole]=useState(window.sessionStorage.getItem('role') || null);

  // Funkcija za dohvat podataka o podkastima
  const fetchPodkasti = async (page = 1, kreatorId = null) => {
    try {
      const response = await axios.get('http://localhost:8000/api/podcasti', {
        params: {
          page,
          per_page: 10,
          id_autora: kreatorId, // Dodaj kreator_id kao parametar
        },
        headers: {
          'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token'),
        },
      });

      
      setPodkasti(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error("Došlo je do greške prilikom dohvata podataka:", error);
    }
  };

  // Dohvati kreatore
  const fetchKreatori = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: {
          'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token'),
        },
      });
      setKreatori(response.data.data);
    } catch (error) {
      console.error("Došlo je do greške prilikom dohvata kreatora:", error);
    }
  };

  // useEffect za inicijalni dohvat podataka
  useEffect(() => {
    fetchPodkasti(currentPage, selectedKreator);
  }, [currentPage, selectedKreator]);

  useEffect(() => {
    fetchKreatori();
  }, []);

  // Funkcija za rukovanje klikom na kreatora
  const handleKreatorClick = (kreatorId) => {
    setSelectedKreator(kreatorId); // Postavi izabranog kreatora
    setCurrentPage(1); // Vrati na prvu stranicu
  };

  return (
    <div className="home-page">
      <Navigation role={role}/>

      <div className="content">
        <aside className="sidebar">
          <h2>Kreatori</h2>
          <ul>
            {kreatori.map((kreator) => (
              <li
                key={kreator.id}
                className={`kreator-item ${selectedKreator === kreator.id ? 'active' : ''}`}
                onClick={() => handleKreatorClick(kreator.id)} // Poziv funkcije na klik
              >
                {kreator.korisnicko_ime}
              </li>
            ))}
          </ul>
        </aside>

        <main className="main-content">
          {podkasti.map((podkast) => (
            <Link to={`/podkast/${podkast.id}`} className="podcast-link" key={podkast.id}>
              <div className="podcast-card">
                <img
                  src={podkast.logo_putanja}
                  alt={podkast.naslov}
                  className="podcast-thumbnail"
                />
                <div className="podcast-details">
                  <h3>{podkast.naslov}</h3>
                  <p>{podkast.kratak_sadrzaj}</p>
                </div>
              </div>
            </Link>
          ))}

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &laquo; Prethodna
            </button>
            <span>Stranica {currentPage} od {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Sledeća &raquo;
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Podkast;
