import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navigation from './Navigation';
import './AddEpisode.css';

const AddEpisode = () => {
  const { podcastId } = useParams(); // Dobijanje podcastId iz URL-a
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeFile, setEpisodeFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validacija ako je potrebno
    if (!episodeTitle || !episodeFile) {
      setMessage('Naziv emisije i fajl su obavezni.');
      return;
    }

    const formData = new FormData();
    formData.append('naslov', episodeTitle);
    formData.append('file', episodeFile);
    formData.append('podcast_id', podcastId); // Koristi podcastId iz URL-a

    try {
      const response = await axios.post('http://localhost:8000/api/emisije', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${window.sessionStorage.getItem('auth_token')}`,
        },
      });

      setMessage('Emisija uspešno kreirana!');
      setEpisodeTitle('');
      setEpisodeFile(null);

      // Možete se preusmeriti nazad na stranicu podkasta nakon uspešnog dodavanja
      navigate(`/podkast/${podcastId}`);
    } catch (error) {
      console.error('Greška prilikom kreiranja emisije:', error);
      setMessage('Greška pri kreiranju emisije.');
    }
  };

  return (
    <div>
      <Navigation role="autor" />
      <div className="add-episode-page">
        <h1>Dodaj Emisiju</h1>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="add-episode-form">
          <div className="form-group">
            <label htmlFor="episodeTitle">Naziv Emisije</label>
            <input 
              type="text" 
              id="episodeTitle" 
              value={episodeTitle} 
              onChange={(e) => setEpisodeTitle(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="episodeFile">Ucitaj Fajl</label>
            <input 
              type="file"
              accept=".mp4, .mp3"
              id="episodeFile" 
              onChange={(e) => setEpisodeFile(e.target.files[0])} 
              required 
            />
          </div>

          <button type="submit" className="btn add-episode-btn">Dodaj Emisiju</button>
        </form>
      </div>
    </div>
  );
};

export default AddEpisode;
