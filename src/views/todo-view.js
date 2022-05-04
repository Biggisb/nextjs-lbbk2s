import { html } from 'lit-element';
import '@assecosolutions/fox-app-bar';
import '@assecosolutions/fox-button';
import '@assecosolutions/fox-checkbox';
import '@assecosolutions/fox-radio';
import '@assecosolutions/fox-textfield';
import '@assecosolutions/fox-formfield';
import '@assecosolutions/fox-select';
import {
  VisibilityFilters,
  getVisibleTodosSelector,
} from '../redux/reducer.js';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import {
  addTodo,
  updateTodoStatus,
  updateFilter,
  clearCompleted,
} from '../redux/actions.js';
import { BaseView } from './base-view.js';

class TodoView extends connect(store)(BaseView) {
  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String },
    };
  }

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.filter;
  }

  render() {
    return html`
      <style>
        todo-view {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }
        todo-view .input-layout {
          width: 100%;
          display: flex;
        }
        todo-view .input-layout fox-textfield {
          flex: 1;
          margin-right: var(--spacing);
        }
        todo-view .todos-list {
          margin-top: var(--spacing);
        }
        todo-view .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
        #styled {
          --fox-client-base-color: var(--asseco-blue);
          --fox-button-primary-color-rgb: var(--asseco-blue);
          --mdc-text-field-idle-line-color: var(--asseco-blue);
        }
      </style>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <fox-textfield
          id="styled"
          label="Aufgabe..."
          value="${this.task || ''}"
          @change="${this.updateTask}"
        ></fox-textfield>
        <fox-button
          label="Hinzufügen"
          outlined=""
          icon="add"
          @click="${this.addTodo}"
        ></fox-button>
      </div>
      <div class="todos-list">
        ${this.todos.map(
          (todo) => html`
              <div class="todo-item">
              <fox-formfield label=${todo.task}>
                <fox-checkbox
                  id="styled"
                  ?checked="${todo.complete}"
                  @change="${(e) =>
                    this.updateTodoStatus(todo, e.target.checked)}"
                >${todo.task}</fox-checkbox>
              </fox-formfield>
              </div>
            `
        )}
      </div>            
      ${Object.values(VisibilityFilters).map(
        (filter) => html`
        <fox-formfield label="${filter}">
          <fox-radio
            id="styled"
            name="filter"
            value="${filter}"
            @change="${this.filterChanged}"
            ?checked="${this.filter === filter}">
          </fox-radio>
        </fox-formfield>
          `
      )}
      <fox-button
        label="Fertige Aufgaben löschen"
        outlined=""
        icon="delete"
        @click="${this.clearCompleted}"
      ></fox-button>
    `;
  }

  addTodo() {
    if (this.task) {
      store.dispatch(addTodo(this.task));
      this.task = '';
    }
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(updateTodoStatus(updatedTodo, complete));
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.target.value));
  }

  clearCompleted() {
    let answer = confirm('Willst du die fertigen Aufgaben wirklich löschen?');
    if (answer == true) store.dispatch(clearCompleted());
  }
}

customElements.define('todo-view', TodoView);
