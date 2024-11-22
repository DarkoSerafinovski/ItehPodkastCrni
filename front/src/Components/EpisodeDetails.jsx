import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import "./EpisodeDetails.css";

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();

  // Simulacija podataka za epizodu
  const episode = {
    id: episodeId,
    title: "Introduction to AI",
    duration: "25:30",
    audioUrl: "https://www.example.com/audio.mp3", // Zameni sa stvarnim URL-om audio fajla
  };

  return (
    <div>
      <Navigation role="viewer" />
      <div className="episode-details-page">
        <h1>{episode.title}</h1>
        <p>Duration: {episode.duration}</p>
        <audio controls>
          <source src={episode.audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default EpisodeDetails;
