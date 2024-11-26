import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navigation from './Navigation';
import './EditPodcast.css';

const EditPodcast = () => {
  const { podcastId } = useParams();  // Uzimamo ID podkasta iz parametara URL-a
  const [podcastName, setPodcastName] = useState('');
  const [podcastDescription, setPodcastDescription] = useState('');
  const [podcastThumbnail, setPodcastThumbnail] = useState(null);  // URL slike
  const [thumbnailPreview, setThumbnailPreview] = useState(null);  // Za prikaz slike
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/podcasti/${podcastId}`, {
          headers: {
            'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token'),
          },
        });

        // Postavljanje podataka o podkastu u stanje
        setPodcastName(response.data.data.naslov);
        setPodcastDescription(response.data.data.kratak_sadrzaj);

        // Kreiraj objekat URL za prikaz slike
        if (response.data.data.logo_putanja) {
          setThumbnailPreview(response.data.data.logo_putanja);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [podcastId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('naslov', podcastName);
    formData.append('kratak_sadrzaj', podcastDescription);
    formData.append('kategorija_id', 1);  // Pretpostavljamo da je kategorija_id 1, prilagodi prema potrebama
    if (podcastThumbnail) {
      formData.append('logo_putanja', podcastThumbnail);  // Dodajemo fajl ako je postavljen
    }
    formData.append('_method', 'put'); // Simuliramo PUT metodom

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    try {
      await axios.post(`http://localhost:8000/api/podcasti/${podcastId}`, formData, {
        headers: {
          'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token'),
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Podkast je uspešno izmenjen!");
      navigate(`/podkast/${podcastId}`); // Vraćanje na stranicu podkasta nakon izmene
    } catch (err) {
      setError(err.message);
      alert("Došlo je do greške prilikom ažuriranja podkasta.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPodcastThumbnail(file); // Postavljanje fajla
    setThumbnailPreview(URL.createObjectURL(file)); // Prikazivanje fajla kao slike
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navigation role="autor" />
      <div className="edit-podcast-page">
        <h1>Izmeni Podkast</h1>
        <form onSubmit={handleFormSubmit} className="edit-podcast-form" encType="multipart/form-data">
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
              onChange={handleFileChange} 
            />
            {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ marginTop: "10px", maxWidth: "200px" }} />}
          </div>

          <button type="submit" className="btn edit-podcast-btn">Izmeni Podkast</button>
        </form>
      </div>
    </div>
  );
};

export default EditPodcast;
