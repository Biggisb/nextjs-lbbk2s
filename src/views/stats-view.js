import { html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { statsSelector } from '../redux/reducer.js';
import '@vaadin/vaadin-charts';
import { BaseView } from './base-view.js';

class StatsView extends connect(store)(BaseView) {
  static get properties() {
    return {
      chartConfig: { type: Object },
    };
  }

  stateChanged(state) {
    const stats = statsSelector(state);
    this.chartConfig = [
      { name: 'Fertig', y: stats.completed },
      { name: 'To-Do', y: stats.active },
    ];

    this.hasTodos = state.todos.length > 0;
  }

  render() {
    return html`
      <style>
        stats-view {
          display: block;
        }
      </style>
      ${this.getChart()}
    `;
  }

  getChart() {
    if (this.hasTodos) {
      return html`
        <vaadin-chart type="pie" data="${this.chartConfig}">
          <vaadin-chart-series .values="${this.chartConfig}">
          </vaadin-chart-series>
        </vaadin-chart>
      `;
    } else {
      return html`
        <p>Keine offenen Aufgaben!</p>
        <img src=https://c.tenor.com/A-ozELwp694AAAAC/thumbs-thumbs-up-kid.gif></img>
      `;
    }
  }
}

customElements.define('stats-view', StatsView);
