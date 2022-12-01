const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const searchResultDiv = document.getElementById("search-result");
async function getAnimeId(value) {
  //Fetching AnimeIds On Submit
  const res = await fetch(
    `https://gogoanime.consumet.org/Search?keyw=${value}`
  );
  const data = await res.json();
  console.log(data);
  //Displaying Search Results
  for (let i = 0; i < data.length; i++) {
    //Creating a li element for Each
    const li = document.createElement("li");
    li.innerHTML = `<div><span>${data[i].animeTitle}</span></div>`;
    let img = data[i].animeImg;
    img.split(" ").join("-");
    img.toLowerCase();
    li.style.backgroundImage = `url(${img})`;
    li.setAttribute("id", data[i].animeId);
    document.getElementById("search-result").appendChild(li);
    li.addEventListener("click", () => {
      console.log(li.getAttribute("id"));
    });
  }
}

getAnimeId("naruto");
