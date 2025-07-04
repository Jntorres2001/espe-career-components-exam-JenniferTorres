import { LitElement, html, css } from 'lit-element';

class EspeDetail extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      task: { type: Object },
      theme: { type: String }
    };
  }

  static get styles() {
    return css`
      /* Puedes agregar la animación fadeIn si quieres */
      /* @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      } */

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
      .detail-container {
        background: var(--form-bg, #17352b);
        border-radius: 8px;
        border: 1px solid #2f6a55;
        width: 100%;
        max-width: 500px;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.25);
        padding: 2rem;
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
      .detail-title {
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }
      .detail-row {
        margin-bottom: 1rem;
      }
      .detail-label {
        color: #8ecdb7;
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
        display: block;
      }
      .detail-value {
        color: white;
        font-size: 1rem;
      }
      .priority-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: bold;
      }
      .priority-alta { background-color: #ef4444; }
      .priority-media { background-color: #f59e0b; }
      .priority-baja { background-color: #10b981; }
      .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
      }
      .complete-btn, .edit-btn {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        border: none;
      }
      .complete-btn {
        background: #019863;
        color: white;
      }
      .complete-btn:hover {
        background: #017f56;
      }
      .edit-btn {
        background: none;
        color: #8ecdb7;
        border: 1px solid #2f6a55;
      }
      .edit-btn:hover {
        color: white;
        border-color: #8ecdb7;
      }
    `;
  }

  constructor() {
    super();
    this.open = false;
    this.task = null;
    this.theme = 'dark';
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  _completeTask() {
    this.dispatchEvent(new CustomEvent('task-completed', {
      detail: { task: this.task },
      bubbles: true,
      composed: true
    }));
    this._close();
  }

  _editTask() {
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: { task: this.task },
      bubbles: true,
      composed: true
    }));
    this._close();
  }

  render() {
    if (!this.open || !this.task) return html``;

    const priorityClass = this.task.priority ? `priority-${this.task.priority}` : '';
    const priorityText = this.task.priority ? this.task.priority.toUpperCase() : 'N/A';

    return html`
      <div class="modal" tabindex="0" @click="${e => { if (e.target.classList.contains('modal')) this._close(); }}">
        <div class="detail-container" role="dialog" aria-modal="true" aria-labelledby="detail-title">
          <button type="button" class="close-btn" @click="${this._close}" aria-label="Cerrar">&times;</button>
          <h2 id="detail-title" class="detail-title">${this.task.name}</h2>
          
          <div class="detail-row">
            <span class="detail-label">Hora</span>
            <span class="detail-value">${this.task.time}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Fecha</span>
            <span class="detail-value">${this.task.date}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Prioridad</span>
            <span class="detail-value">
              <span class="priority-badge ${priorityClass}">
                ${priorityText}
              </span>
            </span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Notas</span>
            <div class="detail-value">${this.task.notes || 'Sin notas'}</div>
          </div>
          
          <div class="actions">
            <button class="edit-btn" @click="${this._editTask}">Editar</button>
            <button class="complete-btn" @click="${this._completeTask}">Marcar como completada</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('espe-detail', EspeDetail);
