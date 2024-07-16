import axios from 'axios';

const apiGenre = axios.create({
    baseURL: 'https://api.themoviedb.org/3/discover/movie?language=pt-BR&page=1&sort_by=popularity.desc',
    params: {language: 'pt-BR', page: '1', sort_by: 'created_at.asc'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmNiZjU3YzVlNGI1NGFmNDU0OWJhYTJlYzkxNTUyNCIsIm5iZiI6MTcyMDkyMjcxOC44MDkzNywic3ViIjoiNjY3NjA5ZjFlY2I1YmM4OGU3ZjFlNWNjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.2p2E5zeCTymTNZa7uiR_GHmmPQh9I8wxT35_kAUcwSY'
    }
  });
  export default apiGenre;