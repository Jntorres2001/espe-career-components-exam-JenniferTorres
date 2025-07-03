
import { LitElement, html, css } from 'lit';

export class EspeTaskModalAdd extends LitElement {
  static properties = {
    show: { type: Boolean, reflect: true },
  };

  static styles = css`
    /* Aquí tus estilos .modal y demás, ajustados para shadow dom */
    :host {
      display: none;
      position: fixed;
      inset: 0;
      background-color: rgba(16, 35, 28, 0.9);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    :host([show]) {
      display: flex;
    }
    .modal-content {
      background-color: #17352b;
      border-radius: 8px;
      padding: 20px;
      max-width: 512px;
      width: 90%;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    }
    input, textarea, select {
      width: 100%;
      margin: 8px 0;
      padding: 10px;
      border-radius: 6px;
      border: none;
      background: #214a3c;
      color: white;
      font-size: 16px;
    }
    button {
      background: #019863;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.show = false;
    this.name = '';
    this.notes = '';
    this.time = '10:00';
    this.priority = 'media';
  }

  _close() {
    this.show = false;
    this.dispatchEvent(new CustomEvent('modal-close'));
  }

  _save() {
    if(!this.name.trim()) {
      alert('Por favor ingrese el nombre de la tarea');
      return;
    }
    const newTask = {
      id: Date.now(),
      name: this.name,
      notes: this.notes,
      time: this.time,
      priority: this.priority,
      date: 'hoy', // ejemplo
    };
    this.dispatchEvent(new CustomEvent('task-added', { detail: newTask }));
    this._close();
  }

  render() {
    return html`
      <div class="modal-content" @click=${e => e.stopPropagation()}>
        <h2>Nueva tarea</h2>
        <input placeholder="Nombre de la tarea" .value=${this.name} @input=${e => this.name = e.target.value} />
        <textarea placeholder="Notas" .value=${this.notes} @input=${e => this.notes = e.target.value}></textarea>
        <input type="time" .value=${this.time} @input=${e => this.time = e.target.value} />
        <select .value=${this.priority} @change=${e => this.priority = e.target.value}>
          <option value="alta">Alta</option>
          <option value="media" selected>Media</option>
          <option value="baja">Baja</option>
        </select>
        <button @click=${this._save}>Agregar</button>
        <button @click=${this._close} style="margin-left: 10px; background:#8ecdb7;">Cancelar</button>
      </div>
    `;
  }
}

customElements.define('espe-task-modal-add', EspeTaskModalAdd);
