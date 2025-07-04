import { LitElement, html, css } from 'lit-element';

class EspeForm extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      task: { type: Object },
      theme: { type: String }
    };
  }

  static get styles() {
    return css`
      .modal {
        display: flex;
        position: fixed;
        z-index: 1000;
        left: 0; top: 0;
        width: 100vw; height: 100vh;
        background: rgba(16,35,28,0.9);
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s;
      }
      .modal[hidden] { display: none; }
      .form-container {
        background: var(--form-bg, #17352b);
        border-radius: 8px;
        border: 1px solid #2f6a55;
        width: 100%;
        max-width: 420px;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.25);
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        position: relative;
      }
      .close-btn {
        position: absolute;
        top: 1rem; right: 1rem;
        color: #8ecdb7;
        background: none;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
      }
      .close-btn:hover { color: #019863; }
      .form-title {
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
      }
      label {
        display: block;
        color: #8ecdb7;
        margin-bottom: 0.25rem;
        font-size: 1rem;
        font-weight: 500;
      }
      input, textarea, select {
        width: 100%;
        border: none;
        border-radius: 8px;
        padding: 0.75rem;
        margin-bottom: 1rem;
        background: #214a3c;
        color: white;
        font-size: 1rem;
        box-sizing: border-box;
      }
      textarea { min-height: 80px; }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
      .save-btn {
        background: #019863;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
      }
      .save-btn:hover { background: #017f56; }
    `;
  }

  constructor() {
    super();
    this.open = false;
    this.task = null; // Si es null, es "nueva tarea"
    this.theme = 'dark';
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  _handleSubmit(e) {
    e.preventDefault();
    const name = this.shadowRoot.getElementById('name').value.trim();
    const notes = this.shadowRoot.getElementById('notes').value.trim();
    const time = this.shadowRoot.getElementById('time').value;
    const priority = this.shadowRoot.getElementById('priority').value;

    if (!name) {
      alert('Por favor, ingresa un nombre para la tarea.');
      return;
    }

    const detail = {
      id: this.task?.id || null,
      name,
      notes,
      time,
      priority,
      date: this.task?.date || 'hoy'
    };

    this.dispatchEvent(new CustomEvent('save-task', {
      detail,
      bubbles: true,
      composed: true
    }));
    this._close();
  }

  render() {
    if (!this.open) return html``;
    const t = this.task || {};
    return html`
      <div class="modal" @click="${e => { if (e.target.classList.contains('modal')) this._close(); }}">
        <form class="form-container" @submit="${this._handleSubmit}">
          <button type="button" class="close-btn" @click="${this._close}">&times;</button>
          <div class="form-title">${t.id ? 'Editar tarea' : 'Nueva tarea'}</div>
          <label for="name">Nombre</label>
          <input id="name" type="text" .value="${t.name || ''}" placeholder="Nombre de la tarea" required />
          <label for="notes">Notas</label>
          <textarea id="notes" placeholder="Notas">${t.notes || ''}</textarea>
          <label for="time">Hora</label>
          <input id="time" type="time" .value="${t.time || '10:00'}" required />
          <label for="priority">Prioridad</label>
          <select id="priority">
            <option value="alta" ?selected="${t.priority === 'alta'}">Alta</option>
            <option value="media" ?selected="${!t.priority || t.priority === 'media'}">Media</option>
            <option value="baja" ?selected="${t.priority === 'baja'}">Baja</option>
          </select>
          <div class="actions">
            <button type="submit" class="save-btn">${t.id ? 'Guardar' : 'Agregar'}</button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('espe-form', EspeForm);