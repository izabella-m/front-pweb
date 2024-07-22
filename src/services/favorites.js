export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const addFavorite = (movie) => {
  const favorites = getFavorites();
  favorites.push(movie);
  saveFavorites(favorites);
};

export const removeFavorite = (movieId) => {
  let favorites = getFavorites();
  favorites = favorites.filter(movie => movie.imdbID !== movieId);
  saveFavorites(favorites);
};
