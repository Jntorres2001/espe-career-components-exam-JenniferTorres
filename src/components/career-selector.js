import { LitElement, html, css } from 'lit';

export class CareerSelector extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 400px;
    }

    h3 {
      text-align: center;
      margin-bottom: 1rem;
      color: #333;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      background-color: #f3f4f6;
      margin-bottom: 12px;
      padding: 14px 16px;
      border-radius: 12px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;
      box-shadow: 0 2px 5px rgba(0,0,0,0.08);
    }

    li:hover {
      background-color: #e0e7ff;
      transform: translateX(5px);
    }

    li::before {
      content: "▶"; 
      margin-right: 8px;
    }
  `;

  constructor() {
    super();
    this.careers = [
      {
        nombre: 'Ingeniería en Software',
        facultad: 'FISEI',
        descripcion: 'Formación en desarrollo, análisis y arquitectura de software.',
        imagen: 'https://tse1.mm.bing.net/th/id/OIP.4gxZAatp_ZIpvtsn8bmkAAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      },
      {
        nombre: 'Ingeniería Mecatrónica',
        facultad: 'FIM',
        descripcion: 'Integración de sistemas mecánicos, eléctricos y de control.',
        imagen: 'https://www.uag.mx/contenido/S3K29mU7rt/que-es-la-ingenieria-mecatronica_QkL.jpg',
      },
      {
        nombre: 'Biotecnología',
        facultad: 'FACI',
        descripcion: 'Aplicaciones de la biología para la agricultura, salud e industria.',
        imagen: 'https://th.bing.com/th/id/R.b4a8a3409bc284383e77a405ebcd6fe9?rik=Rc05gVCHr6WVwA&riu=http%3a%2f%2fblogs.udla.edu.ec%2fbiotecnologia%2ffiles%2f2017%2f08%2fiStock-502940392-y0auzo-1024x683.jpg&ehk=xCmn4GnCYSVpohwmSi7D34XwYAtJ3TUPa%2ffcVR0OLLE%3d&risl=&pid=ImgRaw&r=0',
      },
      {
        nombre: 'Petroquímica',
        facultad: 'FICM',
        descripcion: 'Procesos químicos en la industria petrolera y energética.',
        imagen: 'https://tse1.mm.bing.net/th/id/OIP.ATQgilkIRjoneHo1G0Ki6AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      }
    ];
  }

  render() {
    return html`
      <h3>Selecciona una carrera</h3>
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
