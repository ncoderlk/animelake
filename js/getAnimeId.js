const getAnimeId = async (value) => {
  const res = await fetch(
    `https://gogoanime.consumet.org/Search?keyw=${value}`
  );
  const data = await res.json();
  return data;
};

export default getAnimeId;
