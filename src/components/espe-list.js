import { LitElement, html, css } from 'lit-element';
import './espe-item.js';

class EspeList extends LitElement {
  static get properties() {
    return {
      tasks: { type: Array },
      theme: { type: String },
      view: { type: String },
      _groupedTasks: { type: Object, attribute: false }
    };
  }

  static get styles() {
    return css`
      /* Tus estilos aquí, los dejaste bien */
      :host {
                display: block;
                width: 100%;
            }

            .task-list-container {
                width: 100%;
            }

            .date-section {
                margin-bottom: 1.5rem;
            }

            .date-heading {
                color: var(--text-primary, white);
                font-size: 1.125rem;
                font-weight: 700;
                margin: 0 0 0.5rem 0.75rem;
                padding: 1rem 0 0.5rem 0;
                border-bottom: 1px solid var(--border-color, #214a3c);
            }

            .tasks-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .empty-state {
                text-align: center;
                color: var(--text-secondary, #8ecdb7);
                padding: 2rem;
                font-size: 1.125rem;
            }

            .empty-icon {
                width: 64px;
                height: 64px;
                margin: 0 auto 1rem;
                opacity: 0.5;
            }

            .add-task-button {
                position: fixed;
                bottom: 5rem;
                right: 5rem;
                background: var(--primary-color, #019863);
                color: white;
                border: none;
                border-radius: 20%;
                width: 106px;
                height: 100px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
                transition: all 0.2s;
                display: center;
                align-items: center;
                justify-content: center;
                z-index: 100;
            }

            .add-task-button:hover {
                background: var(--primary-hover, #017f56);
                transform: scale(1.05);
            }

            .filter-tabs {
                display: flex;
                border-bottom: 1px solid var(--border-color, #2f6a55);
                margin-bottom: 1rem;
            }

            .filter-tab {
                background: none;
                border: none;
                color: var(--text-secondary, #8ecdb7);
                padding: 0.75rem 1rem;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.875rem;
                border-bottom: 3px solid transparent;
                transition: all 0.2s;
            }

            .filter-tab.active {
                color: var(--text-primary, white);
                border-bottom-color: var(--primary-color, #019863);
            }

            .filter-tab:hover {
                color: var(--text-primary, white);
            }

            /* Tema oscuro */
            :host([theme="dark"]) {
                --text-primary: white;
                --text-secondary: #8ecdb7;
                --border-color: #2f6a55;
                --primary-color: #019863;
                --primary-hover: #017f56;
            }

            /* Tema claro */
            :host([theme="light"]) {
                --text-primary: #1f2937;
                --text-secondary: #6b7280;
                --border-color: #d1d5db;
                --primary-color: #059669;
                --primary-hover: #047857;
            }

            /* Animaciones */
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .date-section {
                animation: slideIn 0.3s ease-out;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .add-task-button {
                bottom: 1rem;
                right: 1rem;
                width: 48px;
                height: 48px;
                }
            }
    `;
  }

  constructor() {
    super();
    this.tasks = [];
    this.theme = 'dark';
    this.view = 'fecha';
    this._groupedTasks = {};
  }

  updated(changedProperties) {
    if (changedProperties.has('tasks') || changedProperties.has('view')) {
      this._groupTasks();
    }
  }

  _groupTasks() {
    if (this.view === 'prioridad') {
      this._groupedTasks = this.tasks.reduce((acc, task) => {
        const priority = task.priority || 'media';
        if (!acc[priority]) {
          acc[priority] = [];
        }
        acc[priority].push(task);
        return acc;
      }, {});
    } else {
      this._groupedTasks = this.tasks.reduce((acc, task) => {
        const date = task.date || 'hoy';
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(task);
        return acc;
      }, {});
    }
  }

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _onAddTask() {
    this.dispatchEvent(new CustomEvent('add-task-requested', {
      bubbles: true,
      composed: true
    }));
  }

  _onTaskSelected(e) {
    this.dispatchEvent(new CustomEvent('task-selected', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  _onTaskEdit(e) {
    this.dispatchEvent(new CustomEvent('task-edit', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  _onTaskDeleted(e) {
    this.dispatchEvent(new CustomEvent('task-deleted', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  _renderEmptyState() {
    return html`
      <div class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
          </svg>
        </div>
        <p>No hay tareas para mostrar</p>
        <p>¡Agrega tu primera tarea!</p>
      </div>
    `;
  }

  _renderTasksByDate() {
    const groups = Object.keys(this._groupedTasks);

    if (groups.length === 0) {
      return this._renderEmptyState();
    }

    return groups.map(group => html`
      <div class="date-section">
        <h3 class="date-heading">${this._capitalizeFirstLetter(group)}</h3>
        <div class="tasks-group">
          ${this._groupedTasks[group].map(task => html`
            <espe-item
              .task=${task}
              .theme=${this.theme}
              @task-selected=${this._onTaskSelected}
              @task-edit=${this._onTaskEdit}
              @task-deleted=${this._onTaskDeleted}>
            </espe-item>
          `)}
        </div>
      </div>
    `);
  }

  render() {
    return html`
      <div class="task-list-container">
        ${this._renderTasksByDate()}

        <button class="add-task-button" @click=${this._onAddTask} title="Agregar nueva tarea">
          Agregar tarea
        </button>
      </div>
    `;
  }
}

customElements.define('espe-list', EspeList);
