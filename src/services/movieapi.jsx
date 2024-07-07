import axios from "axios";

const getTrendingVideos = () => axios.get("http://127.0.0.1:3000/trending");
const getMovieByGenreId = (id) => axios.get(`http://127.0.0.1:3000/genre/${id}`);

export default {
    getTrendingVideos,
    getMovieByGenreId
};
