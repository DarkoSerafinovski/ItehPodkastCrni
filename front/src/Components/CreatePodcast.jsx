import React, { useState } from 'react';
import Navigation from './Navigation';
import './CreatePodcast.css';

const CreatePodcast = () => {
  const [formData, setFormData] = useState({
    naziv: '',
    opis: '',
    kategorija: '',
    thumbnail: null,
    partneri: [],
  });

  // Hardkodirane kategorije i kreatori za demo
  const kategorije = ['Tehnologija', 'Zdravlje', 'Putovanja', 'Sport', 'Muzika'];
  const kreatori = ['Marko', 'Jovana', 'Nemanja', 'Ana'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  const handlePartnerChange = (e) => {
    const { options } = e.target;
    const selectedPartners = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, partneri: selectedPartners });
  };

  const handleSave = () => {
    console.log('Podaci o podkastu:', formData);
    alert('Podkast uspešno sačuvan!');
    // Ovde možeš pozvati API za čuvanje podkasta
  };

  return (
    <div className="create-podcast-page">
      {/* Navigacija */}
      <Navigation role="creator" />

      {/* Glavni sadržaj */}
      <div className="create-podcast-container">
        <h2>Kreiraj Podkast</h2>
        <form className="create-podcast-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Naziv podkasta:
            <input
              type="text"
              name="naziv"
              value={formData.naziv}
              onChange={handleInputChange}
              placeholder="Unesite naziv"
              required
            />
          </label>
          <label>
            Opis:
            <textarea
              name="opis"
              value={formData.opis}
              onChange={handleInputChange}
              placeholder="Unesite opis"
              required
            />
          </label>
          <label>
            Kategorija:
            <select
              name="kategorija"
              value={formData.kategorija}
              onChange={handleInputChange}
              required
            >
              <option value="">Izaberite kategoriju</option>
              {kategorije.map((kategorija, index) => (
                <option key={index} value={kategorija}>
                  {kategorija}
                </option>
              ))}
            </select>
          </label>
          <label>
            Thumbnail:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          <label>
            Partneri:
            <select multiple onChange={handlePartnerChange}>
              {kreatori.map((kreator, index) => (
                <option key={index} value={kreator}>
                  {kreator}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="save-button" onClick={handleSave}>
            Sačuvaj
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePodcast;
