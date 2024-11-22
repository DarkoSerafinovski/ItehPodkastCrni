import React, { useState } from 'react';
import Navigation from './Navigation';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([
    'Tehnologija',
    'Muzika',
    'Sport',
    'Kultura',
    'Zdravlje',
  ]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    if (categories.includes(newCategory)) {
      alert('Kategorija već postoji!');
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory('');
  };

  return (
    <div className="categories-page">
      {/* Navigacija */}
      <Navigation role="admin" />

      {/* Glavni sadržaj */}
      <div className="categories-container">
        <h2>Kategorije</h2>
        <ul className="categories-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              {category}
            </li>
          ))}
        </ul>

        <div className="add-category">
          <input
            type="text"
            placeholder="Dodajte novu kategoriju"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="add-category-input"
          />
          <button onClick={handleAddCategory} className="add-category-button">
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
