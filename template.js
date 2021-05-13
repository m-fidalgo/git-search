const languageSelect = document.querySelector("#language-tags");
const listElement = document.querySelector("#list");
const templateWorker = new Worker("./template-worker.js");

const config = {
  listItems: [],
  languageTag: "en-US",
};

languageSelect.addEventListener("change", changeLanguage);

function changeLanguage() {
  config.languageTag = languageSelect.value;
  render();
}

export function setList(list) {
  config.listItems = list;
  render();
}

function render() {
  templateWorker.postMessage(config);
  templateWorker.onmessage = function ({ data }) {
    listElement.innerHTML = html;
  };
}
