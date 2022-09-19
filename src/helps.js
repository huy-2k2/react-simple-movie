const API_KEY = "899b36753f9a56d4155b0f84fa36ad44";

const createApiByType = (query, page = 1) =>
  `https://api.themoviedb.org/3/movie/${query}/?api_key=${API_KEY}&language=en-US&page=${page}`;

const createApiById = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

const createApiActor = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

const createImageUrl = (url, type = "original") =>
  `https://image.tmdb.org/t/p/${type}${url}`;

const createApiVideo = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

const createApiSimilarMovie = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;

const createApiSearchMovie = (query, page = 1) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=true`;

export {
  createApiByType,
  createApiById,
  createApiActor,
  createImageUrl,
  createApiVideo,
  createApiSimilarMovie,
  createApiSearchMovie,
};
