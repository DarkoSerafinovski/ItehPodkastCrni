import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from './Navigation';
import "./PodcastDetails.css";

const PodcastDetails = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();

  // Simulacija podataka za podkast i njegove epizode
  const podcast = {
    id: podcastId,
    name: "Tech Talks",
    description: "A podcast about the latest trends in technology.",
    thumbnail: "https://via.placeholder.com/800x400",
    creatorId: 1,  // ID kreatora koji je napravio ovaj podkast
    episodes: [
      { id: 1, title: "Introduction to AI", duration: "25:30" },
      { id: 2, title: "Cloud Computing Basics", duration: "30:15" },
      { id: 3, title: "Future of Quantum Computing", duration: "20:45" },
    ],
  };

  // Simulacija trenutno ulogovanog korisnika (može biti kreator ili admin)
  const currentUser = {
    id: 1, // ID trenutno ulogovanog korisnika
    role: "creator", // Može biti "creator" ili "admin"
  };

  // Funkcija za brisanje podkasta (simulacija)
  const handleDeletePodcast = () => {
    // Ovdje možeš dodati logiku za brisanje podkasta iz baze podataka
    alert(`Podkast "${podcast.name}" je obrisan.`);
    navigate("/"); // Preusmeravamo na početnu stranicu
  };

  // Funkcija za navigaciju na stranicu za dodavanje nove epizode
  const handleAddEpisode = () => {
    navigate(`/podkast/${podcast.id}/add-episode`); // Preusmeravamo na stranicu za dodavanje epizode
  };

  // Funkcija za navigaciju na stranicu za izmenu podkasta
  const handleEditPodcast = () => {
    navigate(`/podkast/${podcast.id}/edit`); // Preusmeravamo na stranicu za izmenu podkasta
  };

  // Funkcija za navigaciju na stranicu detalja epizode
  const handleEpisodeClick = (episodeId) => {
    navigate(`/podkast/${podcast.id}/episode/${episodeId}`); // Preusmeravamo na stranicu detalja epizode
  };

  return (
    <div>
      <Navigation role={currentUser.role} />
      <div className="podcast-details-page">
        
        <div className="podcast-details-header">
          <img
            src={podcast.thumbnail}
            alt={podcast.name}
            className="podcast-details-thumbnail"
          />
          <div className="podcast-details-info">
            <h1 className="podcast-details-title">{podcast.name}</h1>
            <p className="podcast-details-description">{podcast.description}</p>
          </div>
        </div>

        <div className="podcast-episodes">
          <h2>Episodes</h2>
          <ul className="episode-list">
            {podcast.episodes.map((episode) => (
              <li
                key={episode.id}
                className="episode-item"
                onClick={() => handleEpisodeClick(episode.id)} // Dodaj onClick za preusmeravanje
              >
                <span className="episode-number">Ep {episode.id}:</span>
                <span className="episode-title">{episode.title}</span>
                <span className="episode-duration">{episode.duration}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prikazivanje dugmadi za kreatora ili admina */}
        {(currentUser.id === podcast.creatorId || currentUser.role === "admin") && (
          <div className="podcast-actions">
            {currentUser.role === "creator" || currentUser.role === "admin" ? (
              <>
                <button onClick={handleAddEpisode} className="btn add-episode">Dodaj Epizodu</button>
                <button onClick={handleEditPodcast} className="btn edit-podcast">Izmeni Podkast</button>
              </>
            ) : null}
            {(currentUser.id === podcast.creatorId || currentUser.role === "admin") && (
              <button onClick={handleDeletePodcast} className="btn delete-podcast">Obriši Podkast</button>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default PodcastDetails;
