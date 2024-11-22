import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation';
import './EditPodcast.css';

const EditPodcast = () => {
  const [podcastName, setPodcastName] = useState('Tech Talks');
  const [podcastDescription, setPodcastDescription] = useState('A podcast about the latest trends in technology.');
  const [podcastThumbnail, setPodcastThumbnail] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Dodajte logiku za slanje podataka (npr. poziv API-ja)
    alert("Podkast je uspešno izmenjen!");

    // Vraćanje na stranicu podkasta nakon izmene
    navigate.push(`/podkast/${podcastName}`);
  };

  return (
    <div>
      <Navigation role="creator" />
      <div className="edit-podcast-page">
        <h1>Izmeni Podkast</h1>
        <form onSubmit={handleFormSubmit} className="edit-podcast-form">
          <div className="form-group">
            <label htmlFor="podcastName">Naziv Podkasta</label>
            <input 
              type="text" 
              id="podcastName" 
              value={podcastName} 
              onChange={(e) => setPodcastName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="podcastDescription">Opis Podkasta</label>
            <textarea 
              id="podcastDescription" 
              value={podcastDescription} 
              onChange={(e) => setPodcastDescription(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="podcastThumbnail">Thumbnail Slika</label>
            <input 
              type="file" 
              id="podcastThumbnail" 
              onChange={(e) => setPodcastThumbnail(e.target.files[0])} 
            />
          </div>

          <button type="submit" className="btn edit-podcast-btn">Izmeni Podkast</button>
        </form>
      </div>
    </div>
  );
};

export default EditPodcast;
