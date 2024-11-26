import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]); // Kategorije koje se prikazuju
  const [newCategory, setNewCategory] = useState(''); // Nova kategorija koju unosimo
  const [errors, setErrors] = useState({}); // Greške pri unosu
  const [successMessage, setSuccessMessage] = useState(''); // Poruka o uspehu

  // Učitaj postojeće kategorije
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/kategorije', {
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), // Slanje tokena
          },
        });

        setCategories(response.data.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); 

  // Funkcija za dodavanje nove kategorije
  const handleAddCategory = async (e) => {
    e.preventDefault();

    // Proveri da li je naziv kategorije validan
    if (!newCategory.trim()) {
      setErrors({ category: 'Naziv kategorije je obavezan' });
      return;
    }

    const categoryData = { naziv: newCategory };

    try {
      // Pošaljite POST zahtev za dodavanje nove kategorije
      const response = await axios.post('http://localhost:8000/api/kategorije', categoryData, {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), 
        }
      }); 

      // Dodajte novu kategoriju u listu i očistite unos
      setCategories((prevCategories) => [...prevCategories, response.data.data]);
      setNewCategory('');
      setErrors({}); // Očisti greške
      setSuccessMessage('Kategorija uspešno dodata!'); // Postavi poruku o uspehu

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors({ category: 'Naziv kategorije mora biti jedinstven' });
      } else {
        setErrors({ category: 'Došlo je do greške pri dodavanju kategorije' });
      }

      setSuccessMessage(''); // Očisti prethodnu poruku o uspehu
    }
  };

  return (
    <div className="categories-page">
      {/* Navigacija */}
      <Navigation role="administrator" />

      {/* Glavni sadržaj */}
      <div className="categories-container">
        <h2>Kategorije</h2>

        {/* Prikazivanje grešaka i poruka o uspehu */}
        {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

        {/* Forma za dodavanje nove kategorije */}
        
        {/* Lista postojećih kategorija */}
        <ul className="categories-list">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="category-item">
                {category.naziv}
              </li>
            ))
          ) : (
            <p>Nemate kategorija još uvek.</p>
          )}
        </ul>
        <form onSubmit={handleAddCategory}>
          <div>
            <input
              type="text"
              placeholder="Dodajte novu kategoriju"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="add-category-input"
            />
            <button type="submit" className="add-category-button">
              Dodaj
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Categories;
