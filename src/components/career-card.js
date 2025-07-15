import { LitElement, html, css } from 'lit';
import { themes } from '../styles/themes.js';

export class CareerCard extends LitElement {
  static properties = {
    career: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      width: 320px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .card {
      border: 2px solid var(--border-color);
      border-radius: 16px;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .header {
      background-color: var(--header-bg);
      color: white;
      padding: 16px;
      font-size: 1.2em;
      font-weight: bold;
      text-align: center;
      letter-spacing: 0.5px;
    }

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    .content {
      padding: 16px;
      color: #333;
      font-size: 0.95em;
      line-height: 1.5;
    }

    .content p {
      margin: 0.5em 0;
    }

    .placeholder {
      text-align: center;
      font-style: italic;
      color: #777;
      padding: 24px;
    }
  `;

  constructor() {
    super();
    this.career = null;
  }

  updated() {
    const theme = themes.rojo; // según tu cédula (termina en 4)
    this.style.setProperty('--border-color', theme.borderColor);
    this.style.setProperty('--header-bg', theme.headerBg);
  }

  render() {
    if (!this.career) {
      return html`<div class="placeholder">Selecciona una carrera para ver detalles</div>`;
    }

    return html`
      <div class="card">
        <div class="header">${this.career.nombre}</div>
        <img src="${this.career.imagen}" alt="${this.career.nombre}" />
        <div class="content">
          <p><strong>Facultad:</strong> ${this.career.facultad}</p>
          <p>${this.career.descripcion}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('career-card', CareerCard);
