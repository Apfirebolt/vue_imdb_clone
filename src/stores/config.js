import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useConfigStore = defineStore("config", {
  state: () => ({
    types: ref([]),
    genres: ref([]),
    countries: ref([]),
    languages: ref([]),
    countryCodes: ref([]),
    loading: ref(false),
  }),

  getters: {
    getTypes() {
      return this.types;
    },
    getGenres() {
      return this.genres;
    },
    getCountries() {
      return this.countries;
    },
    getLanguages() {
      return this.languages;
    },
    getCountryCodes() {
      return this.countryCodes;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getTypesAction() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `imdb/types`
        );
        this.types = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getGenresAction() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `imdb/genres`
        );
        this.genres = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getCountriesAction() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          'imdb/countries'
        );
        this.countries = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getLanguagesAction() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          'imdb/languages'
        );
        this.languages = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getCountryCodesAction() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          'imdb/upcoming-releases-country-codes'
        );
        this.countryCodes = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetConfigData() {
      this.types = [];
      this.genres = [];
      this.countries = [];
      this.languages = [];
      this.countryCodes = [];
    },
  },
});
