import * as $ from "./template.js";

const searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup", search);

export default async function search(event) {
  if (event && event.keyCode === 13) {
    const searchQuery = searchInput.value;
    let response = await fetch(
      `https://api.github.com/search/repositories?q=${searchQuery}`
    );
    response = await response.json();
    $.setList(response.items);
  }
}
