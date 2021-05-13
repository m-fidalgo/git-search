const listElement = document.querySelector("#list");
const searchInput = document.querySelector("#search");
const languageSelect = document.querySelector("#language-tags");

let languageTag = "en-US";

let listItems = [
  {
    name: "Nome",
    created_at: "2021-01-23T20:10:50Z",
    forks: 10,
  },
];

languageSelect.addEventListener("change", changeLanguage);

function changeLanguage() {
  languageTag = languageSelect.value;
  render();
}

function render() {
  let html = "";
  const numberFormatter = new Intl.NumberFormat(languageTag);
  const dateFormatter = new Intl.DateTimeFormat(languageTag, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  listItems.forEach((item) => {
    html += `
      <li>
        <div><b>Name: </b> ${item.name}</div>
        <div><b>Created at: </b> ${dateFormatter.format(new Date(item.created_at))}</div>
        <div><b>Forks: </b> ${numberFormatter.format(item.forks)}</div>
      </li>`;
  });

  listElement.innerHTML = html;
}

render();
