import { LitElement, html, css } from 'lit';

export class CareerSelector extends LitElement {
  static styles = css`
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 8px;
      margin: 6px 0;
      background-color: #eeeeee;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s;
    }
    li:hover {
      background-color: #d1d5db;
    }
  `;

  constructor() {
    super();
    this.careers = [
      {
        nombre: 'Ingeniería en Software',
        facultad: 'FISEI',
        descripcion: 'Formación en desarrollo, análisis y arquitectura de software.',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SoftwareIcon.png/480px-SoftwareIcon.png',
      },
      {
        nombre: 'Ingeniería Mecatrónica',
        facultad: 'FIM',
        descripcion: 'Integración de sistemas mecánicos, eléctricos y de control.',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Mechatronics.png/480px-Mechatronics.png',
      },
      {
        nombre: 'Biotecnología',
        facultad: 'FACI',
        descripcion: 'Aplicaciones de la biología para la agricultura, salud e industria.',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/DNA_icon.svg/480px-DNA_icon.svg.png',
      },
      {
        nombre: 'Petroquímica',
        facultad: 'FICM',
        descripcion: 'Procesos químicos en la industria petrolera y energética.',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Industry_icon.svg/480px-Industry_icon.svg.png',
      }
    ];
  }

  render() {
    return html`
      <ul>
        ${this.careers.map(
          (career) => html`
            <li @click="${() => this._selectCareer(career)}">${career.nombre}</li>
          `
        )}
      </ul>
    `;
  }

  _selectCareer(career) {
    this.dispatchEvent(new CustomEvent('career-selected', {
      detail: career,
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('career-selector', CareerSelector);
