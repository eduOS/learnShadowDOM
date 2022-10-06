const marker_url_icon = chrome.runtime.getURL('./imgs/marker.svg');

const template = `
    <div id="my__select_tools" class="my__select_tools">
        <div id="my__select_tools__container">
            <button class="my__icon my__icon_marker" id="my__icon_marker" title='marker'></button>
        </div>
    </div>
  `;

const my_styled = ({
    display = "none", left = 0, top = 0, width=0}) => `

    #my__select_tools {
      position: fixed;
      padding-bottom: 8px;
      z-index: 9999;
      top: ${top}px;
      left: ${left}px;
      display: ${display};
    }
    #my__select_tools__container {
      position: relative;
      border-radius: 5px;
      padding: 1px 0;
      background-color: #f0f0f0;
      width: ${width}px;
      height: 37px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      filter: drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.25));
    }
    .my__icon {
        display: inline-block;
        width: 25px;
        height: 25px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        margin: 0 4px;
        border: none;
        outline: none;
        z-index: 10000;
        opacity: 0.9;
    }
      .my__icon:hover {
        opacity: 1;
    }

    .my__icon_marker {
      display: ${display};
      background-image:url(${marker_url_icon});
    }
  `;

function procesClickEvent(){
  alert('procesClickEvent');
  return;
}

function processMouseDownEvent(){
  alert('processMouseDownEvent');
  return;
}

class MyExtension extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({ mode: "open" });
    document.addEventListener('mousedown', () => processMouseDownEvent());
    this.renderIt();
  }
  renderIt() {
    const myStyle = document.createElement("style");
    myStyle.textContent = my_styled({display: "flex", left: 217, top: 299, width: 72});
    this.shadowRoot.appendChild(myStyle);
    this.shadowRoot.innerHTML += template;
    this.shadowRoot        
      .getElementById("my__icon_marker")
      .addEventListener("click", () => procesClickEvent());
  }
}

window.customElements.define("my-extension", MyExtension);
window.onload = function () {
  const myExtension = document.createElement("my-extension");
  document.body.appendChild(myExtension);
}
