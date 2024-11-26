import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import "./EpisodeDetails.css";

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role,setRole]=useState(window.sessionStorage.getItem('role'));
  const [tip, setTip]=useState(null);

  useEffect(() => {
    // Učitaj podatke sa servera prema episodeId
    const fetchEpisodeData = async () => {
      try {
        const token = window.sessionStorage.getItem('auth_token'); // Preuzimanje tokena iz sessionStorage
        let response = await axios.get(`http://localhost:8000/api/emisije/${episodeId}`, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        const episodeData = response.data.data;

       
          response = await axios.get(episodeData.file, {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
            },
            responseType: "blob", // Preuzmi kao Blob za podršku Range zaglavljima
          });
  
          const file = URL.createObjectURL(response.data);
          setUrl(file);
          setTip(episodeData.tip);
          setEpisode(episodeData);
      
        setLoading(false);
      } catch (error) {
        console.error('Error fetching episode data:', error);
        setLoading(false);
      }
    };

    fetchEpisodeData();
  }, [episodeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!episode) {
    return <div>Error loading episode details.</div>;
  }

  return (
    <div>
      <Navigation role={role} />
      <div className="episode-details-page">
        <h1>{episode.naslov}</h1>
        <p>Datum: {new Date(episode.datum).toLocaleDateString()}</p>

        {/* Prikazivanje video playera */}
        {tip==='video/mp4' && (
          <video controls>
            <source src={url} type={tip} />
            Vaš pretraživač ne podržava element video.
          </video>
        )}

        {tip==='audio/mpeg' &&  (
          <div>
            <audio controls >
              <source src={url} type={tip} />
              Tvoj pretrazivac ne podrzava audio player.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeDetails;
