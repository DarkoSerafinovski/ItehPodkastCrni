import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from './Navigation';
import axios from 'axios';
import "./PodcastDetails.css";


const PodcastDetails = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const [role,setRole] = useState(window.sessionStorage.getItem('role') || null);
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
const [userId,setUserId]=useState(window.sessionStorage.getItem('user_id')|| null);

 


  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/podcasti/${podcastId}`, {
          headers: {
            'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token'),
        },});

        setPodcast(response.data.data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchPodcast();
  }, [podcastId]); 


  const handleDeletePodcast = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/podcasti/${podcast.id}`, {
        headers: {
          'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token'),
      },});
      alert(`Podkast "${podcast.naslov}" je obrisan.`);
      navigate("/podkasti"); 
    } catch (err) {
      alert(err.message);
    }
  };

 
  const handleAddEpisode = () => {
    navigate(`/podkast/${podcast.id}/add-episode`);
  };

 
  const handleEditPodcast = () => {
    navigate(`/podkast/${podcast.id}/edit`);
  };


  const handleEpisodeClick = (episodeId) => {
    navigate(`/podkast/${podcast.id}/episode/${episodeId}`);
  };


  
  const handleFavoriteClick = async (id, isFavorite,event) => {
    try {
      event.stopPropagation();
      const config = {
        method: isFavorite ? 'delete' : 'post',
        url: `http://localhost:8000/api/users/favorites/${id}`,
        headers: { 
          'Authorization': "Bearer " + window.sessionStorage.getItem('auth_token')
        },
      };
      await axios.request(config);
      setPodcast((prevPodcast) => ({
        ...prevPodcast,
        omiljeni: !prevPodcast.omiljeni,
      }));
     
    } catch (error) {
      console.error("There was an error updating the favorite status!", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Pretvori string u Date objekat
    const options = {
      weekday: 'long', // Ime dana u nedelji
      year: 'numeric', // Godina
      month: '2-digit', // Mesec u formatu MM
      day: '2-digit', // Dan u formatu DD
     
    };
    return new Intl.DateTimeFormat('sr-RS', options).format(date); // Formatiraj datum na srpskom
  };

  if (loading) {
    return <div>Učitavanje...</div>;
  }


  if (error) {
    return <div>Greška: {error}</div>;
  }

  return (
    <div>
      <Navigation role={role} />
      <div className="podcast-details-page">
        <div className="podcast-details-header">
          <img
            src={podcast.logo_putanja}
            alt={podcast.naslov}
            className="podcast-details-thumbnail"
          />
          <span 
              className={`favorite-star ${podcast.omiljeni ? 'favorite' : ''}`} 
              onClick={(event) => handleFavoriteClick(podcast.id, podcast.omiljeni, event)}
            >
              &#9733;
            </span>
          <div className="podcast-details-info">
            <h1 className="podcast-details-title">{podcast.naslov}</h1>
            <p className="podcast-details-description">{podcast.kratak_sadrzaj}</p>
          </div>
        </div>

        <div className="podcast-episodes">
          <h2>Epizode</h2>
          <ul className="episode-list">
            {podcast.emisije.map((episode,number) => (
              <li
                key={episode.id}
                className="episode-item"
                onClick={() => handleEpisodeClick(episode.id)}
              >
                <span className="episode-number">Ep {podcast.emisije.length-number}:</span>
                <span className="episode-title">{episode.naslov}</span>
                <span className="episode-duration">{formatDate(episode.datum)}</span>
              </li>
            ))}
          </ul>
        </div>


        <div className="podcast-actions">
          {role === "administrator" || (role === "autor" && podcast.autori.some(author => author.id === parseInt(userId))) ? (
            <>
              
              <button onClick={handleDeletePodcast} className="btn delete-podcast">Obriši Podkast</button>
              <button onClick={handleEditPodcast} className="btn edit-podcast">Izmeni Podkast</button>
            </>
          ) : null}

          {(role === "autor" && podcast.autori.some(author => author.id === parseInt(userId))) && (
            <button onClick={handleAddEpisode} className="btn add-episode">Dodaj Epizodu</button>
          )}
        </div>

        
        
      </div>
    </div>
  );
};

export default PodcastDetails;
