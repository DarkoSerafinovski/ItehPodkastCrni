import React, { useState, useEffect } from 'react';
import {useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import './CreatePodcast.css';

const CreatePodcast = () => {
  const [formData, setFormData] = useState({
    naslov: '', 
    kratak_sadrzaj: '', 
    kategorija_id: '', 
    logo_putanja: null, 
    kreatori: [],
  });
  const [kategorije, setKategorije] = useState([]);
  const [korisnici, setKorisnici] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    // Učitavanje kategorija
    axios
      .get('http://localhost:8000/api/kategorije', {
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('auth_token'),
        },
      })
      .then((response) => {
        setKategorije(response.data.data);
      })
      .catch((error) => {
        console.error('Greška pri učitavanju kategorija:', error);
      });

    // Učitavanje korisnika
    axios
    .get('http://localhost:8000/api/users', {
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      },
    })
    .then((response) => {
      const korisnici = response.data.data;
      setKorisnici(korisnici);

      // Automatsko pronalaženje ulogovanog korisnika
      const loggedInUserId = sessionStorage.getItem('user_id');
      if (loggedInUserId) {
        const loggedInUser = korisnici.find((user) => user.id.toString() === loggedInUserId);
        if (loggedInUser) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            kreatori: [{ id: loggedInUser.id, korisnicko_ime: loggedInUser.korisnicko_ime }],
          }));
        }
      }
    })
    .catch((error) => {
      console.error('Greška pri učitavanju korisnika:', error);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo_putanja: e.target.files[0] });
  };

  const handleDodajKreatora = (korisnik) => {
    if (!formData.kreatori.some((k) => k.id === korisnik.id)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        kreatori: [...prevFormData.kreatori, korisnik],
      }));
    }
  };

  const handleUkloniKreatora = (id) => {
    const loggedInUserId = sessionStorage.getItem('user_id');  // Učitaj ID ulogovanog korisnika
  if (id == loggedInUserId) {
    // Ako je ID korisnika koji se pokušava ukloniti isti kao ID ulogovanog korisnika, ne dozvoljavaj brisanje
    alert('Ne možete ukloniti sebe kao kreatora.');
    return;  // Prekida dalje izvršavanje funkcije
  }
    setFormData((prevFormData) => ({
      ...prevFormData,
      kreatori: prevFormData.kreatori.filter((k) => k.id !== id),
    }));
  };

  const handleSave = () => {
    const dataToSend = new FormData();
    dataToSend.append('naslov', formData.naslov);
    dataToSend.append('kratak_sadrzaj', formData.kratak_sadrzaj);
    dataToSend.append('kategorija_id', formData.kategorija_id);
    dataToSend.append('logo_putanja', formData.logo_putanja);

    formData.kreatori.forEach((kreator, index) => {
      dataToSend.append(`kreatori[${index}][id]`, kreator.id);
    });

    axios
      .post('http://localhost:8000/api/podcasti', dataToSend, {
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('auth_token'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert('Podkast uspešno sačuvan!');
        navigate('/my-podcasts');
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Greška pri čuvanju podkasta:', error);
      });
  };

  return (
    <div className="create-podcast-page">
      {/* Navigacija */}
      <Navigation role="autor" />

      {/* Glavni sadržaj */}
      <div className="create-podcast-container">
        <h2>Kreiraj Podkast</h2>
        <form className="create-podcast-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Naslov podkasta:
            <input
              type="text"
              name="naslov"
              value={formData.naslov}
              onChange={handleInputChange}
              placeholder="Unesite naslov"
              required
            />
          </label>
          <label>
            Kratak sadržaj:
            <textarea
              name="kratak_sadrzaj"
              value={formData.kratak_sadrzaj}
              onChange={handleInputChange}
              placeholder="Unesite kratak sadržaj"
              required
            />
          </label>
          <label>
            Kategorija:
            <select
              name="kategorija_id"
              value={formData.kategorija_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Izaberite kategoriju</option>
              {kategorije.map((kategorija) => (
                <option key={kategorija.id} value={kategorija.id}>
                  {kategorija.naziv}
                </option>
              ))}
            </select>
          </label>
          <label>
            Logo putanja:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {/* Lista svih korisnika */}
          <label>
            Dodaj kreatore:
            <div className="korisnici-lista">
              {korisnici.map((korisnik) => (
                <button
                  type="button"
                  key={korisnik.id}
                  onClick={() => handleDodajKreatora(korisnik)}
                  className="korisnik-dugme"
                >
                  {korisnik.korisnicko_ime}
                </button>
              ))}
            </div>
          </label>

          {/* Lista odabranih kreatora */}
          <div className="odabrani-kreatori">
            <h4>Odabrani kreatori:</h4>
            <ul>
              {formData.kreatori.map((kreator) => (
                <li key={kreator.id}>
                  {kreator.korisnicko_ime}
                  <button type="button" onClick={() => handleUkloniKreatora(kreator.id)}>
                    Ukloni
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button type="button" className="save-button" onClick={handleSave}>
            Sačuvaj
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePodcast;
