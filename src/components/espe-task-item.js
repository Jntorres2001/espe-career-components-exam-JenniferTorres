import { LitElement, html, css } from 'lit';

export class EspeTaskItem extends LitElement {
  static properties = {
    task: { type: Object },
  };

  static styles = css`
    .task-item {
      cursor: pointer;
      padding: 10px;
      border-bottom: 1px solid #2f6a55;
      color: white;
      transition: background-color 0.2s;
    }
    .task-item:hover {
      background-color: #17352b;
    }
  `;

  render() {
    return html`
      <div class="task-item" @click=${() => this.dispatchEvent(new CustomEvent('task-selected', { detail: this.task, bubbles: true, composed: true }))}>
        <strong>${this.task.name}</strong> — <small>${this.task.time}</small>
      </div>
    `;
  }
}

customElements.define('espe-task-item', EspeTaskItem);
