import {render, html} from 'https://unpkg.com/lit-html@1.1.1/lit-html?module';

const locoso_template = (data) => html`
  <div class="locoso-wrapper">
    <div class="locoso-left">
      <div class="txtv">
        <h3 class="inline">Visit Us</h3>&nbsp;
      </div>
      <ul class="no-bullet" aria-label="address">
        <li>${data.lib_name}</li>
        ${data.address.map((l) => html`<li>${l}</li>`)}
        <li>
          <small>
            <a title="${data.lib_name} website" aria-label="Open library site" href="${data.website}">website</a>
            <a title="get directions" target="_blank" aria-label="Directions to the Library"
              href="${'https://google.com/maps/search/' + encodeURI("Boston University " + data.lib_name)}" 
            >directions &raquo;</a>
          </small>
        </li>
      </ul>
    </div>
    <div class="locoso-right">
      <h3 class="inline">Contact Us</h3>
      <ol class="no-bullet" aria-label="contact-links">
        ${data.contacts.map((c) => html`<li>${c.text} <a href="${c.url}">${c.val}</a></li>`)}
      </ol>
    </div>
  </div>
`;

getDataFromJSONFileAndCallRenderFunction("/assets/data/bulib-info.json", renderLocoso);
async function renderLocoso(data){ return data['mugar-memorial']; }
render(locoso_template(parsed_data), document.getElementById("locoso"));