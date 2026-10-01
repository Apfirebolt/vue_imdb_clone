import { defineStore } from "pinia";
import httpClient from "../plugins/interceptor";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    searchMovies: [],
    upcomingMovies: [],
    topRatedMovies: [],
    lowestRatedMovies: [],
    top250Movies: [],
    mostPopularMovies: [],
    topRatedEnglishMovies: [],
    topBoxOfficeMovies: [],
    loading: false,
  }),

  getters: {
    getSearchMovies: (state) => state.searchMovies,
    getUpcomingMovies: (state) => state.upcomingMovies,
    getTopRatedMovies: (state) => state.topRatedMovies,
    getLowestRatedMovies: (state) => state.lowestRatedMovies,
    getTop250Movies: (state) => state.top250Movies,
    getMostPopularMovies: (state) => state.mostPopularMovies,
    getTopRatedEnglishMovies: (state) => state.topRatedEnglishMovies,
    getTopBoxOfficeMovies: (state) => state.topBoxOfficeMovies,
    isLoading: (state) => state.loading,
  },

  actions: {
    async getSearchMoviesAction(query) {
      try {
        this.loading = true;
        const response = await httpClient.get(`imdb/autocomplete?query=${query}`);
        this.searchMovies = Array.isArray(response.data) ? response.data : (response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getTopRatedAction() {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/top-rated-english-movies');
        this.topRatedMovies = Array.isArray(response.data) ? response.data : (response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getTopRatedEnglishAction() {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/top-rated-english-movies');
        this.topRatedEnglishMovies = Array.isArray(response.data) ? response.data : (response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getLowestRatedAction() {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/lowest-rated-movies');
        this.lowestRatedMovies = Array.isArray(response.data) ? response.data : (response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getTop250Action() {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/top250-movies');
        this.top250Movies = Array.isArray(response.data) ? response.data : (response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getMostPopularAction() {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/most-popular-movies');
        this.mostPopularMovies = Array.isArray(response.data) ? response.data : (response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getTopBoxOfficeMoviesAction() {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/top-box-office');
        this.topBoxOfficeMovies = Array.isArray(response.data) ? response.data : (response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getUpcomingMoviesByCountryAction(countryCode) {
      try {
        this.loading = true;
        const response = await httpClient.get(`imdb/upcoming-releases?countryCode=${countryCode}&type=MOVIE`);
        // Safely extract array regardless of whether API returns direct array or wrapped object
        const raw = response.data;
        this.upcomingMovies = Array.isArray(raw) ? raw : (raw.results || raw.movies || []);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});