import { LitElement, html, css } from 'lit';
import './espe-task-item.js';
import './espe-task-modal-add.js';
import './espe-task-modal-detail.js';

export class EspeTaskList extends LitElement {
  static properties = {
    tasks: { type: Array },
    showAddModal: { type: Boolean, state: true },
    showDetailModal: { type: Boolean, state: true },
    selectedTask: { type: Object, state: true },
  };

  static styles = css`
    :host {
      display: block;
      font-family: Manrope, "Noto Sans", sans-serif;
      background-color: #10231c;
      color: white;
      min-height: 100vh;
      padding: 20px;
    }
    #tasks-container {
      max-width: 960px;
      margin: 0 auto;
    }
    h3 {
      margin-top: 20px;
    }
    button#add-task-btn {
      background-color: #019863;
      border: none;
      padding: 15px 30px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 8px;
      color: white;
      margin-top: 20px;
    }
  `;

  constructor() {
    super();
    this.tasks = [
      { id: 1, name: 'Reunión de Proyecto', notes: 'Preparar presentación para la reunión.', time: '10:00', priority: 'alta', date: 'hoy' },
      { id: 2, name: 'Almuerzo con el equipo', notes: 'Discutir avances del proyecto', time: '13:00', priority: 'media', date: 'hoy' },
    ];
    this.showAddModal = false;
    this.showDetailModal = false;
    this.selectedTask = null;
  }

  _openAddModal() {
    this.showAddModal = true;
  }

  _closeModals() {
    this.showAddModal = false;
    this.showDetailModal = false;
  }

  _onTaskAdded(e) {
    this.tasks = [...this.tasks, e.detail];
    this._closeModals();
  }

  _onTaskSelected(e) {
    this.selectedTask = e.detail;
    this.showDetailModal = true;
  }

  _onTaskCompleted(e) {
    const id = e.detail;
    this.tasks = this.tasks.filter(t => t.id !== id);
    this._closeModals();
  }

  render() {
    return html`
      <div id="tasks-container">
        <h3>Hoy</h3>
        ${this.tasks.map(task => html`
          <espe-task-item
            .task=${task}
            @task-selected=${this._onTaskSelected}
          ></espe-task-item>
        `)}
        <button id="add-task-btn" @click=${this._openAddModal}>Agregar Tarea</button>
      </div>

      <espe-task-modal-add
        ?show=${this.showAddModal}
        @modal-close=${this._closeModals}
        @task-added=${this._onTaskAdded}
      ></espe-task-modal-add>

      <espe-task-modal-detail
        ?show=${this.showDetailModal}
        .task=${this.selectedTask}
        @modal-close=${this._closeModals}
        @task-completed=${this._onTaskCompleted}
      ></espe-task-modal-detail>
    `;
  }
}

customElements.define('espe-task-list', EspeTaskList);
