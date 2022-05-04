import { html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { BaseView } from './base-view.js';
import {
  addTask,
  clearSelected,
  updateSelectStatus,
  copyTasks,
} from '../redux/actions.js';
import { listSelector } from '../redux/reducer.js';
import '@assecosolutions/fox-button';
import '@assecosolutions/fox-textfield';
import '@assecosolutions/fox-accordion';
import '@assecosolutions/fox-list';

class TasksView extends connect(store)(BaseView) {
  static get properties() {
    return {
      list: { type: Array },
      task: { type: String },
    };
  }

  stateChanged(state) {
    this.list = listSelector(state);
  }

  render() {
    return html`
    <style>
      tasks-view {
        display: block;
        max-width: 800px;
        margin: 0 auto;
        --mdc-text-field-idle-line-color: #4e3c7e;
      }
      tasks-view .input-layout-tasks {
        width: 100%;
        display: flex;
        --mdc-text-field-idle-line-color: #4e3c7e;
      }
      tasks-view .input-layout fox-textfield {
        flex: 1;
        margin-right: var(--spacing);
        --mdc-text-field-idle-line-color: #4e3c7e;
      }
      tasks-view .task-list {
        margin-top: var(--spacing);
      }
      #styled {
        --fox-client-base-color: var(--asseco-blue);
        --fox-button-primary-color-rgb: var(--asseco-blue);
        --fox-button-text-on-primary-color-rgb: var(--asseco-blue);
      }
    </style>
    
      <div class="input-layout-tasks" @keyup="${this.shortcutListener}">
        <style>
          #styled {
            --mdc-text-field-idle-line-color: var(--asseco-blue);
          }
        </style>
        <fox-textfield
          id="styled"
          label="Aufgabe..."
          value="${this.task || ''}"
          @change="${this.updateTask}"
        ></fox-textfield>
        <fox-button
          label="Speichern"
          outlined=""
          icon="save"
          @click="${this.addTask}"
        ></fox-button>
      </div>
      <div class="task-list">
        <h3>Gespeicherte Aufgaben</h3>
          <fox-list
            id="styled"
            multi=""
          >
          ${this.list.map(
            (task) => html`
            <fox-list-item
              ?activated="${task.selected}"
              ?selected="${task.selected}"
              @click="${() => this.updateSelectStatus(task)}">
                ${task.task}
            </fox-list-item>
            <li divider="" padded="" role="separator"></li>
          `
          )}
          </fox-list>
          <a href="/" id="copy-button">
            <fox-button
              label="Übernehmen"
              outlined=""
              icon="add"
              @click="${this.copyTasks}"
            ></fox-button>
          </a>
          <fox-button
            label="Löschen"
            outlined=""
            icon="delete"
            @click="${this.clearSelected}"
          ></fox-button>
      </div>
    `;
  }

  updateSelectStatus(selectedTask) {
    store.dispatch(updateSelectStatus(selectedTask));
  }

  clearSelected() {
    let answer = confirm(
      'Willst du die ausgewählten Aufgaben wirklich aus deiner Sammlung entfernen?'
    );
    if (answer == true) store.dispatch(clearSelected());
  }

  copyTasks() {
    store.dispatch(copyTasks());
  }

  addTask() {
    if (this.task) {
      store.dispatch(addTask(this.task));
      this.task = '';
    }
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.addTask();
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }
}

customElements.define('tasks-view', TasksView);
