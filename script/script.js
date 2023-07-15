const apiKey = "b8ace792";
let movieDetails;

let fetchAPI = async () => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&t=mother`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const getMovieDetails = async () => {
  movieDetails = await fetchAPI();
};
