const languageSelect = document.querySelector("#language-tags");
const listElement = document.querySelector("#list");
const templateWorker = new Worker("./template-worker.js");

const config = new Proxy(
  {
    listItems: [],
    languageTag: "en-US",
  },
  {
    set: function (target, prop, value, receiver) {
      if (prop === "listItems" || prop === "languageTag") {
        Reflect.set(...arguments);
        render();
        return true;
      }

      return false;
    },
  }
);

languageSelect.addEventListener("change", changeLanguage);

function changeLanguage() {
  config.languageTag = languageSelect.value;
}

export function setList(list) {
  config.listItems = list;
}

function render() {
  //evita problemas por conta do proxy
  const configParam = JSON.parse(JSON.stringify(config));

  templateWorker.postMessage(configParam);
  templateWorker.onmessage = function ({ data }) {
    listElement.innerHTML = html;
  };
}
