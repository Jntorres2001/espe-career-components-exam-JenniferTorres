import { LitElement, html, css } from 'lit';

export class EspeTaskModalDetail extends LitElement {
  static properties = {
    show: { type: Boolean, reflect: true },
    task: { type: Object },
  };

  static styles = css`
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
      color: white;
    }
    textarea {
      width: 100%;
      background: #214a3c;
      border-radius: 6px;
      border: none;
      color: white;
      padding: 10px;
      resize: none;
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
    this.task = null;
  }

  _close() {
    this.show = false;
    this.dispatchEvent(new CustomEvent('modal-close'));
  }

  _complete() {
    if (!this.task) return;
    this.dispatchEvent(new CustomEvent('task-completed', { detail: this.task.id }));
    this._close();
  }

  render() {
    if (!this.task) return html``;
    return html`
      <div class="modal-content" @click=${e => e.stopPropagation()}>
        <h2>${this.task.name}</h2>
        <textarea readonly rows="5">${this.task.notes}</textarea>
        <p><strong>Hora:</strong> ${this.task.time}</p>
        <p><strong>Prioridad:</strong> ${this.task.priority}</p>
        <button @click=${this._complete}>Completar tarea</button>
        <button @click=${this._close} style="margin-left: 10px; background:#8ecdb7;">Cerrar</button>
      </div>
    `;
  }
}

customElements.define('espe-task-modal-detail', EspeTaskModalDetail);
