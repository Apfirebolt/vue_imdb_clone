import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useIndianMoviesStore = defineStore("indianMovies", {
  state: () => ({
    trendingTamil: ref([]),
    trendingTelugu: ref([]),
    topRatedTamil: ref([]),
    topRatedTelugu: ref([]),
    topRatedIndianMovies: ref([]),
    anticipatedMovies: ref([]),
    loading: ref(false),
  }),

  getters: {
    isLoading() {
      return this.loading;
    },
    getTrendingTamil() {
      return this.trendingTamil;
    },
    getTrendingTelugu() {
      return this.trendingTelugu;
    },
    getTopRatedTamil() {
      return this.topRatedTamil;
    },
    getTopRatedTelugu() {
      return this.topRatedTelugu;
    },
    getTopRatedIndianMovies() {
      return this.topRatedIndianMovies;
    },
    getAnticipatedMovies() {
      return this.anticipatedMovies;
    },
  },

  actions: {
    async getTrendingTamilAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get("imdb/india/trending-tamil");
        this.trendingTamil = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTrendingTeluguAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get("imdb/india/trending-telugu");
        this.trendingTelugu = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTopRatedTamilAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get("imdb/india/top-rated-tamil-movies");
        this.topRatedTamil = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTopRatedTeluguAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get("imdb/india/top-rated-telugu-movies");
        this.topRatedTelugu = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTopRatedIndianMoviesAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get("imdb/india/top-rated-indian-movies");
        this.topRatedIndianMovies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getAnticipatedMoviesAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get("imdb/india/upcoming");
        this.anticipatedMovies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetUrlData() {
      this.trendingTamil = ref([]);
      this.trendingTelugu = ref([]);
      this.topRatedTamil = ref([]);
      this.topRatedTelugu = ref([]);
      this.topRatedIndianMovies = ref([]);
      this.anticipatedMovies = ref([]);
      this.loading = ref(false);
    },
  },
});
