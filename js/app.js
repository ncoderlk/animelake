const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const searchResultDiv = document.getElementById("search-result");
const loadingIco = document.getElementById("loading");
async function getAnimeId(value) {
  //Fetching AnimeIds On Submit
  const res = await fetch(
    `https://gogoanime.consumet.org/Search?keyw=${value}`
  );
  const data = await res.json();
  console.log(data);
  //Displaying Search Results
  loadingIco.classList.toggle("hidden");
  setTimeout(() => {
    loadingIco.classList.toggle("hidden");
    for (let i = 0; i < data.length; i++) {
      //Creating a li element for Each
      const li = document.createElement("li");
      li.innerHTML = `<div><span>${data[i].animeTitle}</span></div>`;
      let img = data[i].animeImg;
      img.split(" ").join("-");
      img.toLowerCase();
      li.style.backgroundImage = `url(${img})`;
      li.setAttribute("id", data[i].animeId);
      searchResultDiv.appendChild(li);
      li.addEventListener("click", () => {
        console.log(li.getAttribute("id"));
      });
    }
  }, 1400);
}
searchBox.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    if (searchBox.value !== "") {
      searchResultDiv.innerHTML = "";
      getAnimeId(searchBox.value);
    }
  }
});
searchButton.addEventListener("click", () => {
  if (searchBox.value != "") {
    searchResultDiv.innerHTML = "";
    getAnimeId(searchBox.value);
  }
});
