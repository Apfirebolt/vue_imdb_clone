<template>
  <div class="min-h-screen bg-info flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-4 mt-16">
        Movies
      </h1>
      <p class="text-dark leading-relaxed mb-4">
        Welcome to the Movies section! Here, you can explore a wide variety of
        films from around the world. Discover top-rated blockbusters, popular
        hits, and critically acclaimed cinema.
      </p>

      <div class="mb-6">
        <div class="flex flex-wrap border-b border-gray-200">
          <button
            @click="changeTab('topRated')"
            :class="[
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              selectedTab === 'topRated'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Top Rated
          </button>
          <button
            @click="changeTab('lowestRated')"
            :class="[
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              selectedTab === 'lowestRated'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Lowest Rated
          </button>
          <button
            @click="changeTab('top250')"
            :class="[
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              selectedTab === 'top250'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Top 250
          </button>
          <button
            @click="changeTab('mostPopular')"
            :class="[
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              selectedTab === 'mostPopular'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Most Popular
          </button>
          <button
            @click="changeTab('topRatedEnglish')"
            :class="[
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              selectedTab === 'topRatedEnglish'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Top Rated English
          </button>
        </div>

        <div class="mt-4">
          <div
            v-if="selectedTab === 'topRated'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="movie in topRatedMovies"
              :key="movie.id"
              class="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <img
                v-if="movie.primaryImage"
                :src="movie.primaryImage"
                :alt="movie.primaryTitle"
                class="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 class="font-semibold text-lg mb-2">
                {{ movie.primaryTitle || movie.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                {{ movie.releaseDate || movie.release_date }}
              </p>
              <p
                v-if="movie.description"
                class="text-sm text-gray-700 mb-2 line-clamp-3"
              >
                {{ movie.description }}
              </p>
              <div class="flex justify-between items-center">
                <span
                  v-if="movie.averageRating"
                  class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
                >
                  ⭐ {{ movie.averageRating }}
                </span>
                <span
                  v-if="movie.contentRating"
                  class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {{ movie.contentRating }}
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="selectedTab === 'lowestRated'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="movie in lowestRatedMovies"
              :key="movie.id"
              class="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <img
                v-if="movie.primaryImage"
                :src="movie.primaryImage"
                :alt="movie.primaryTitle"
                class="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 class="font-semibold text-lg mb-2">
                {{ movie.primaryTitle || movie.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                {{ movie.releaseDate || movie.release_date }}
              </p>
              <p
                v-if="movie.description"
                class="text-sm text-gray-700 mb-2 line-clamp-3"
              >
                {{ movie.description }}
              </p>
              <div class="flex justify-between items-center">
                <span
                  v-if="movie.averageRating"
                  class="bg-red-100 text-red-800 px-2 py-1 rounded text-sm"
                >
                  ⭐ {{ movie.averageRating }}
                </span>
                <span
                  v-if="movie.contentRating"
                  class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {{ movie.contentRating }}
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="selectedTab === 'top250'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="movie in top250Movies"
              :key="movie.id"
              class="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <img
                v-if="movie.primaryImage"
                :src="movie.primaryImage"
                :alt="movie.primaryTitle"
                class="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 class="font-semibold text-lg mb-2">
                {{ movie.primaryTitle || movie.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                {{ movie.releaseDate || movie.release_date }}
              </p>
              <p
                v-if="movie.description"
                class="text-sm text-gray-700 mb-2 line-clamp-3"
              >
                {{ movie.description }}
              </p>
              <div class="flex justify-between items-center">
                <span
                  v-if="movie.averageRating"
                  class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
                >
                  ⭐ {{ movie.averageRating }}
                </span>
                <span
                  v-if="movie.contentRating"
                  class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {{ movie.contentRating }}
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="selectedTab === 'mostPopular'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="movie in mostPopularMovies"
              :key="movie.id"
              class="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <img
                v-if="movie.primaryImage"
                :src="movie.primaryImage"
                :alt="movie.primaryTitle"
                class="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 class="font-semibold text-lg mb-2">
                {{ movie.primaryTitle || movie.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                {{ movie.releaseDate || movie.release_date }}
              </p>
              <p
                v-if="movie.description"
                class="text-sm text-gray-700 mb-2 line-clamp-3"
              >
                {{ movie.description }}
              </p>
              <div class="flex justify-between items-center">
                <span
                  v-if="movie.averageRating"
                  class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
                >
                  ⭐ {{ movie.averageRating }}
                </span>
                <span
                  v-if="movie.contentRating"
                  class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {{ movie.contentRating }}
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="selectedTab === 'topRatedEnglish'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="movie in topRatedEnglishMovies"
              :key="movie.id"
              class="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <img
                v-if="movie.primaryImage"
                :src="movie.primaryImage"
                :alt="movie.primaryTitle"
                class="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 class="font-semibold text-lg mb-2">
                {{ movie.primaryTitle || movie.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                {{ movie.releaseDate || movie.release_date }}
              </p>
              <p
                v-if="movie.description"
                class="text-sm text-gray-700 mb-2 line-clamp-3"
              >
                {{ movie.description }}
              </p>
              <div class="flex justify-between items-center">
                <span
                  v-if="movie.averageRating"
                  class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
                >
                  ⭐ {{ movie.averageRating }}
                </span>
                <span
                  v-if="movie.contentRating"
                  class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {{ movie.contentRating }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useMoviesStore } from "../stores/movies";
import httpClient from "../plugins/interceptor";
import axios from "axios";
import Loader from "../components/Loader.vue";

const movieStore = useMoviesStore();
const topRatedMovies = computed(() => movieStore.getTopRated);
const lowestRatedMovies = computed(() => movieStore.getLowestRated);
const top250Movies = computed(() => movieStore.getTop250);
const mostPopularMovies = computed(() => movieStore.getMostPopular);
const topRatedEnglishMovies = computed(() => movieStore.getTopRatedEnglish);
const loading = computed(() => movieStore.isLoading);
const selectedTab = ref("topRated");

const changeTab = (tab) => {
  selectedTab.value = tab;
};

onMounted(() => {
  movieStore.getTopRatedAction();
  movieStore.getLowestRatedAction();
  movieStore.getTop250Action();
  movieStore.getMostPopularAction();
  movieStore.getTopRatedEnglishAction();
});
</script>
