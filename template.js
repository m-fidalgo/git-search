const languageSelect = document.querySelector("#language-tags");
const listElement = document.querySelector("#list");
const templateWorker = new Worker("./template-worker.js");

const config = new Proxy(
  {
    listItems: JSON.parse(sessionStorage.getItem("listItems")) || [],
    languageTag: localStorage.getItem("lang") || "en-US",
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

languageSelect.value = config.languageTag;
languageSelect.addEventListener("change", changeLanguage);

function changeLanguage() {
  const lang = languageSelect.value;
  localStorage.setItem("lang", lang);
  config.languageTag = lang;
}

export function setList(list) {
  sessionStorage.setItem("listItems", JSON.stringify(list));
  config.listItems = list;
}

function render() {
  //evita problemas por conta do proxy
  const configParam = JSON.parse(JSON.stringify(config));

  templateWorker.postMessage(configParam);
  templateWorker.onmessage = function ({ data }) {
    listElement.innerHTML = data;
  };
}

(function start() {
  render();
})();
