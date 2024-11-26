import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import { Link } from "react-router-dom";
import './MyPodcasts.css';

const MyPodcasts = () => {
  const [podkasti, setPodkasti] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole]=useState(window.sessionStorage.getItem('role') || null);

  // Funkcija za dohvat podataka o podkastima
  const fetchPodkasti = async (page = 1) => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/podcasti', {
        params: {
          page,
          per_page: 10,
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
 

  // useEffect za inicijalni dohvat podataka
  useEffect(() => {
    fetchPodkasti(currentPage);
  }, [currentPage]);



 

  return (
    <div className="my-podcasts-page">
      <Navigation role={role}/>

    

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
  );
};

export default MyPodcasts;
