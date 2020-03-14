import {LitElement, html} from 'https://unpkg.com/lit-element@2.2.1/lit-element.js?module';

/**
 * display a single concept (heading, description, cta, icon) in a small UI element
 */
export default class LibreCard extends LitElement {

  // rendering the content into the light DOM enables it to be styled by the default css
  createRenderRoot(){ return this; }

  static get properties() {
    return {
      /** name and primary interactable link in the card */
      title: {type: String},
      /** short bit of text describing the main action/concept */
      description: {type: String},
      /** material icon displayed to the left of the  */
      icon: {type: String},
      /** optional link for the href/window.open() action */
      link: {type: String},
      /** add 'small' class to card */
      small: {type: Boolean},
      /** enable logging (click tracking) */
      debug: {type: Boolean}
    };
  }

  render() {
    return html`
      <div class="card">
        <i class="material-icons">${this.icon}</i>
        <div class="inline">
          <h3><a href="${this.link}">${this.title}</a></h3>
          <p>${this.description}</p>
        </div>
      </div>
    `;
  }
}

/* connect our object to the tagname */
window.customElements.define('libre-card', LibreCard);
