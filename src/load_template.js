import {render, html} from 'https://unpkg.com/lit-html@1.1.1/lit-html?module';

function getDataFromJSONFileAndCallRenderFunction(data_url, renderFunction) {
  return fetch(data_url)
    .then((resp) => resp.json())
    .then((json) => renderFunction(json))
    .catch((error) => console.log(error))
  ;
}

const locoso_template = (data) => html`
  <div class="locoso bordered">
    <div>
      <h3 class="inline">Visit Us</h3>
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
    <div>
      <h3 class="inline">Contact Us</h3>
      <ol class="no-bullet" aria-label="contact-links">
        ${data.contacts.map((c) => html`<li>${c.text} <a href="${c.url}">${c.val}</a></li>`)}
      </ol>
      <h3>Follow Us</h3>
        <ul aria-description="list of social media accounts" class="no-bullet pln flexw">
          ${data.social.map((s) =>
            html`<li><a title="${s.text}" href="${s.url}" target="_blank">
                  <img alt="${s.text} icon" src="https://cdn.jsdelivr.net/npm/bulib-wc@latest/dist/icons/icons8-${s.text}-48.png">
                  </a></li>`
          )}
        </ul>
    </div>
  </div>
`;

getDataFromJSONFileAndCallRenderFunction("../../assets/data/bulib-info.json", renderLocoso);
async function renderLocoso(data){ 
  /* before: grab a particular library */
  let parsed_data = data['mugar-memorial'];

  /* store contacts in a list */
  parsed_data['contacts'] = prepareContacts(parsed_data['contacts']);
  parsed_data['social'] = prepareSocial(parsed_data['social']);
  
  render(locoso_template(parsed_data), document.getElementById("locoso"));
}

/* - helpers - */
function prepareContacts(rawContacts){
  if(Object.keys(rawContacts).length < 1){ return {}; }
    
  let contacts = [];
  if(rawContacts["phone"]){
    contacts.push( {"text":"call", "url":"tel:"+rawContacts["phone"], "val":rawContacts["phone"]} );
  }
  if(rawContacts["email"]){
    contacts.push( {"text":"email", "url":"mailto:"+rawContacts["email"], "val":rawContacts["email"] } );
  }
  if(rawContacts["text"]){
    contacts.push( {"text":"text", "url":"sms:"+rawContacts["text"], "val":rawContacts["text"] } );
  }
  if(rawContacts["fax"]){
    contacts.push( {"text":"fax", "url":"fax:"+rawContacts["fax"], "val":rawContacts["fax"] } );
  }
  console.log(`${contacts.length.toString()} items found for 'contact'.`);
  return contacts;
}

function prepareSocial(rawSocial){
  if(Object.keys(rawSocial).length < 1){ return []; }
    
  let social = [];
  if(rawSocial["twitter"]){
    social.push( {"text":"twitter", "url":"http://twitter.com/"+rawSocial["twitter"]} );
  }
  if(rawSocial["facebook"]){
    social.push( {"text":"facebook", "url":"http://facebook.com/"+rawSocial["facebook"]} );
  }
  if(rawSocial["instagram"]){
    social.push( {"text":"instagram", "url":"https://instagram.com/"+rawSocial["instagram"]} );
  }
  if(rawSocial["flickr"]){
    social.push( {"text":"flickr", "url":"https://www.flickr.com/photos/"+rawSocial["flickr"]} );
  }
  if(rawSocial["tumblr"]){
    social.push( {"text":"tumblr", "url":"http://"+rawSocial["tumblr"]+".tumblr.com/"} );
  }
  console.log(`${social.length.toString()} items found for 'social'.`);
  return social;
}