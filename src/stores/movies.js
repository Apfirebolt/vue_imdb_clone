import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    topRatedMovies: ref([]),
    lowestRatedMovies: ref([]),
    top250Movies: ref([]),
    mostPopularMovies: ref([]),
    topRatedEnglishMovies: ref([]),
    loading: ref(false),
  }),

  getters: {
    getTopRatedMovies() {
      return this.topRatedMovies;
    },
    getLowestRatedMovies() {
      return this.lowestRatedMovies;
    },
    getTop250Movies() {
      return this.top250Movies;
    },
    getMostPopularMovies() {
      return this.mostPopularMovies;
    },
    getTopRatedEnglishMovies() {
      return this.topRatedEnglishMovies;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getTopRatedAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/top-rated-english-movies');
        this.topRatedMovies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getLowestRatedAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/lowest-rated-movies');
        this.lowestRatedMovies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTop250Action() {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/top250-movies');
        console.log(response.data);
        this.top250Movies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getMostPopularAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get('imdb/most-popular-movies');
        this.mostPopularMovies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetMovieData() {
      this.topRatedMovies = [];
      this.lowestRatedMovies = [];
      this.top250Movies = [];
      this.mostPopularMovies = [];
      this.topRatedEnglishMovies = [];
    },
  },
});
