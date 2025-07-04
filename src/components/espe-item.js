import { LitElement, html, css } from 'lit-element';

class EspeItem extends LitElement {
    static get properties() {
        return {
            task: { type: Object },
            theme: { type: String }
        };
    }

    static get styles() {
        return css`
            .task-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                background-color: var(--task-bg, #10231c);
                min-height: 72px;
                cursor: pointer;
                transition: background-color 0.2s;
                border-radius: 8px;
                margin-bottom: 0.5rem;
            }

            .task-item:hover {
                background-color: var(--task-hover-bg, #17352b);
            }

            .task-icon {
                color: var(--text-primary, white);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                background-color: var(--accent-bg, #214a3c);
                width: 48px;
                height: 48px;
            }

            .task-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .task-name {
                color: var(--text-primary, white);
                font-size: 1rem;
                font-weight: 500;
                margin: 0 0 0.25rem 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .task-time {
                color: var(--text-secondary, #8ecdb7);
                font-size: 0.875rem;
                margin: 0;
            }

            .task-actions {
                display: flex;
                gap: 0.5rem;
                opacity: 0;
                transition: opacity 0.2s;
                margin-right: 0.75rem;
            }

            .task-item:hover .task-actions {
                opacity: 1;
            }

            .action-btn {
                color: var(--text-secondary, #8ecdb7);
                background: none;
                border: none;
                padding: 0.5rem;
                cursor: pointer;
                border-radius: 4px;
                transition: color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .action-btn:hover {
                color: var(--text-primary, white);
            }

            .action-btn.delete:hover {
                color: #ef4444;
            }

            .priority-indicator {
                width: 4px;
                height: 100%;
                border-radius: 2px;
                margin-right: 0.5rem;
            }

            .priority-alta { background-color: #ef4444; }
            .priority-media { background-color: #f59e0b; }
            .priority-baja { background-color: #10b981; }

            /* Tema oscuro */
            :host([theme="dark"]) {
                --task-bg: #10231c;
                --task-hover-bg: #17352b;
                --text-primary: white;
                --text-secondary: #8ecdb7;
                --accent-bg: #214a3c;
            }

            /* Tema claro */
            :host([theme="light"]) {
                --task-bg: #f8f9fa;
                --task-hover-bg: #e9ecef;
                --text-primary: #1f2937;
                --text-secondary: #6b7280;
                --accent-bg: #e5e7eb;
            }
            
            .task-item.completed {
                opacity: 0.7;
            }
            
            .task-item.completed .task-name {
                text-decoration: line-through;
            }
            
            .task-item.completed .task-icon {
                color: #019863;
            }
        `;
    }

    constructor() {
        super();
        this.task = {};
        this.theme = 'dark';
    }

    _onTaskClick(e) {
        if (!e.target.closest('.task-actions')) {
            this.dispatchEvent(new CustomEvent('task-selected', {
                detail: { task: this.task },
                bubbles: true,
                composed: true
            }));
        }
    }

    _onEditClick(e) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('task-edit', {
            detail: { task: this.task },
            bubbles: true,
            composed: true
        }));
    }

    _onDeleteClick(e) {
        e.stopPropagation();
        if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${this.task.name}"?`)) {
            this.dispatchEvent(new CustomEvent('task-deleted', {
                detail: { task: this.task },
                bubbles: true,
                composed: true
            }));
        }
    }

    render() {
        if (!this.task.id) return html``;

        return html`
            <div class="task-item ${this.task.completed ? 'completed' : ''}" @click="${this._onTaskClick}">
                <div class="priority-indicator priority-${this.task.priority}"></div>
                <div class="task-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
                    </svg>
                </div>
                <div class="task-content">
                    <p class="task-name">${this.task.name}</p>
                    <p class="task-time">${this.task.time}</p>
                </div>
                <div class="task-actions">
                    <button class="action-btn edit" @click="${this._onEditClick}" title="Editar tarea">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                        </svg>
                    </button>
                    <button class="action-btn delete" @click="${this._onDeleteClick}" title="Eliminar tarea">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('espe-item', EspeItem);