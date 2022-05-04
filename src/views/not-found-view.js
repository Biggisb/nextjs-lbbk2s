import { html } from 'lit-element';
import { BaseView } from './base-view.js';

class NotFoundView extends BaseView {
  render() {
    return html`
      <h1>Ooops...</h1>
      <p>Irgendwas ist schief gelaufen. Die Seite wurde nicht gefunden.</p>
    `;
  }
}

customElements.define('not-found-view', NotFoundView);
