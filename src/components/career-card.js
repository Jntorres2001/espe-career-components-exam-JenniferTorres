import { LitElement, html, css } from 'lit';
import { themes } from '../styles/themes.js';

export class CareerCard extends LitElement {
  static properties = {
    career: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      width: 300px;
      font-family: sans-serif;
    }
    .header {
      background-color: var(--header-bg);
      color: white;
      padding: 12px;
      font-weight: bold;
      text-align: center;
    }
    .content {
      padding: 10px;
    }
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  `;

  constructor() {
    super();
    this.career = null;
  }

  updated() {
    // Tu cédula termina en 4 → rojo
    const theme = themes.rojo;
    this.style.setProperty('--border-color', theme.borderColor);
    this.style.setProperty('--header-bg', theme.headerBg);
  }

  render() {
    if (!this.career) {
      return html`<p style="text-align:center;">Selecciona una carrera para ver detalles</p>`;
    }

    return html`
      <div class="header">${this.career.nombre}</div>
      <div class="content">
        <img src="${this.career.imagen}" alt="${this.career.nombre}" />
        <p><strong>Facultad:</strong> ${this.career.facultad}</p>
        <p>${this.career.descripcion}</p>
      </div>
    `;
  }
}

customElements.define('career-card', CareerCard);
