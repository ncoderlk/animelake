const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const searchResultDiv = document.getElementById("search-result");
const loadingIco = document.getElementById("loading");
const main = document.getElementById("main");
async function searchById(val) {
  if (val !== "") {
    const res = await fetch(
      `https://gogoanime.consumet.org/anime-details/${val}`
    );
    const data = await res.json();
    console.log(data);
    main.innerHTML = `
    <div style="background-image: url('${data.animeImg}')"></div>
    <h1>${data.animeTitle}</h1>
    <h2>${data.otherNames}</h2>
    <p>${data.synopsis}</p>
    <ul>
    <!--Generes-->
    </ul>
    <span>Total episodes: ${data.totalEpisodes}</span><br>
    <span>Released Year: ${data.realeasedDear}</span><br>
    <span>Type: ${data.type}</span>
    `;
  }
}

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
    if (data.length < 0 || data === []) {
      searchResultDiv.innerText = "No Results Found";
    } else {
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
          searchById(li.getAttribute("id"));
          searchResultDiv.style.display = "none";
          main.style.display = "flex";
        });
      }
    }
  }, 1400);
}
searchBox.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    if (searchBox.value !== "") {
      searchResultDiv.innerHTML = "";
      getAnimeId(searchBox.value);
      searchResultDiv.style.display = "flex";
      main.style.display = "none";
    }
  }
});
searchButton.addEventListener("click", () => {
  if (searchBox.value != "") {
    searchResultDiv.innerHTML = "";
    getAnimeId(searchBox.value);
    searchResultDiv.style.display = "flex";
    main.style.display = "none";
  }
});
