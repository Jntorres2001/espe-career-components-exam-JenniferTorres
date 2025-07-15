// src/index.js
import './components/career-selector.js';
import './components/career-card.js';

window.addEventListener('DOMContentLoaded', () => {
  const selector = document.querySelector('career-selector');
  const card = document.querySelector('career-card');

  selector.addEventListener('career-selected', (e) => {
    card.career = e.detail;
  });
});
