<template>
  <Loader #movies v-if="loading">
    <p class="text-info text-3xl mt-6 font-semibold">Fetching Movies...</p>
  </Loader>
  
  <div v-else class="min-h-screen bg-info py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-7xl w-full bg-white shadow-xl rounded-2xl p-6 sm:p-10">
      
      <!-- Header Section -->
      <div class="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
        <h1 class="text-4xl font-extrabold text-primary tracking-tight mb-2">
          Global Cinema Library
        </h1>
        <p class="text-dark leading-relaxed max-w-3xl text-base sm:text-lg">
          Explore a wide variety of films from around the world. Discover top-rated blockbusters, popular hits, and critically acclaimed cinema.
        </p>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex overflow-x-auto space-x-2 border-b border-gray-200 pb-3 mb-8 scrollbar-none">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="changeTab(tab.id)"
          :class="[
            'whitespace-nowrap px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm',
            selectedTab === tab.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Content Area -->
      <div>
        
        <!-- Search Tab Special View -->
        <div v-if="selectedTab === 'searchMovie'" class="space-y-6">
          <div class="flex gap-2 max-w-xl">
            <input
              v-model="searchQuery"
              @keyup.enter="searchMovies"
              type="text"
              placeholder="Search for movies..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
            />
            <button
              @click="searchMovies"
              :disabled="!searchQuery.trim() || loading"
              class="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Search
            </button>
          </div>

          <div v-if="movieResults && movieResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="movie in movieResults"
              :key="movie.id"
              class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group"
            >
              <div class="relative h-64 overflow-hidden bg-gray-200">
                <img
                  v-if="movie.primaryImage"
                  :src="movie.primaryImage"
                  :alt="movie.primaryTitle || movie.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">No Image Available</div>
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{{ movie.primaryTitle || movie.title }}</h3>
                <p class="text-xs font-medium text-gray-500 mb-3">{{ movie.releaseDate || movie.release_date || 'Release date TBA' }}</p>
                <p v-if="movie.description" class="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">{{ movie.description }}</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 text-xs">
                  <span v-if="movie.averageRating" class="bg-blue-50 text-blue-800 font-semibold px-2.5 py-1 rounded-md">⭐ {{ movie.averageRating }}</span>
                  <span v-else class="text-gray-400">Unrated</span>
                  <span v-if="movie.contentRating" class="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md">{{ movie.contentRating }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="searchQuery && !loading" class="text-center py-12 text-gray-500">
            No movies found for "{{ searchQuery }}"
          </div>
        </div>

        <!-- Upcoming Movies Special View -->
        <div v-else-if="selectedTab === 'upcomingMovies'" class="space-y-6">
          <div class="flex gap-2 max-w-xl">
            <input
              v-model="countryCode"
              @keyup.enter="getUpcomingMovies"
              type="text"
              placeholder="Enter country code (e.g., US, UK, IN)..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
            />
            <button
              @click="getUpcomingMovies"
              :disabled="!countryCode.trim() || loading"
              class="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Get Movies
            </button>
          </div>

          <div v-if="upComingMovies && upComingMovies.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="movie in upComingMovies"
              :key="movie.id"
              class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group"
            >
              <div class="relative h-64 overflow-hidden bg-gray-200">
                <img
                  v-if="movie.titles[0].primaryImage"
                  :src="movie.titles[0].primaryImage"
                  :alt="movie.titles[0].primaryImage || movie.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">No Image Available</div>
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{{ movie.titles[0].description || movie.title }}</h3>
                <p class="text-xs font-medium text-gray-500 mb-3">{{ movie.titles[0].releaseDate || 'Release date TBA' }}</p>
                <p v-if="movie.titles[0].description" class="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">{{ movie.titles[0].description }}</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 text-xs">
                  <span v-if="movie.titles[0].averageRating" class="bg-purple-50 text-purple-800 font-semibold px-2.5 py-1 rounded-md">⭐ {{ movie.titles[0].averageRating }}</span>
                  <span v-else class="text-gray-400">Unrated</span>
                  <span v-if="movie.titles[0].contentRating" class="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md">{{ movie.titles[0].contentRating }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="countryCode && !loading" class="text-center py-12 text-gray-500">
            No upcoming movies found for country code "{{ countryCode }}"
          </div>
        </div>

        <!-- Dynamic Standard Grids (Top Rated, Lowest Rated, Top 250, Most Popular, Box Office, Top Rated English) -->
        <div v-else>
          <div v-if="currentMovies.length === 0" class="text-center py-16">
            <p class="text-gray-500 text-lg">No movies found in this category.</p>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="movie in currentMovies"
              :key="movie.id"
              class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group"
            >
              <div class="relative h-64 overflow-hidden bg-gray-200">
                <img
                  v-if="movie.primaryImage"
                  :src="movie.primaryImage"
                  :alt="movie.primaryTitle || movie.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">No Image Available</div>
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{{ movie.primaryTitle || movie.title }}</h3>
                <p class="text-xs font-medium text-gray-500 mb-3">{{ movie.releaseDate || movie.release_date || 'Release date TBA' }}</p>
                <p v-if="movie.description" class="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">{{ movie.description }}</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 text-xs">
                  <span v-if="movie.averageRating" :class="['font-semibold px-2.5 py-1 rounded-md', ratingBadgeClass]">⭐ {{ movie.averageRating }}</span>
                  <span v-else class="text-gray-400">Unrated</span>
                  <span v-if="movie.contentRating" class="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md">{{ movie.contentRating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useMovieStore } from "../stores/movies";
import Loader from "../components/Loader.vue";

const movieStore = useMovieStore();
const searchQuery = ref("");
const countryCode = ref("US");
const selectedTab = ref("topRated");

const tabs = [
  { id: 'topRated', label: 'Top Rated' },
  { id: 'upcomingMovies', label: 'Upcoming' },
  { id: 'lowestRated', label: 'Lowest Rated' },
  { id: 'top250', label: 'Top 250' },
  { id: 'mostPopular', label: 'Most Popular' },
  { id: 'topBoxOffice', label: 'Box Office' },
  { id: 'topRatedEnglish', label: 'English Top Rated' },
  { id: 'searchMovie', label: 'Search' }
];

const movieResults = computed(() => movieStore.getSearchMovies || []);
const upComingMovies = computed(() => movieStore.getUpcomingMovies || []);
const loading = computed(() => movieStore.isLoading);

const currentMovies = computed(() => {
  switch (selectedTab.value) {
    case 'topRated': return movieStore.getTopRatedMovies || [];
    case 'lowestRated': return movieStore.getLowestRatedMovies || [];
    case 'top250': return movieStore.getTop250Movies || [];
    case 'mostPopular': return movieStore.getMostPopularMovies || [];
    case 'topBoxOffice': return movieStore.getTopBoxOfficeMovies || [];
    case 'topRatedEnglish': return movieStore.getTopRatedEnglishMovies || [];
    default: return [];
  }
});

const ratingBadgeClass = computed(() => {
  if (selectedTab.value === 'lowestRated') return 'bg-red-50 text-red-800';
  if (selectedTab.value === 'topBoxOffice') return 'bg-green-50 text-green-800';
  return 'bg-amber-50 text-amber-800';
});

const changeTab = async (tab) => {
  selectedTab.value = tab;
  // If user clicks the upcoming tab and data is empty, trigger fetch
  if (tab === 'upcomingMovies' && upComingMovies.value.length === 0) {
    await getUpcomingMovies();
  }
};

const searchMovies = async () => {
  if (searchQuery.value.trim()) {
    await movieStore.getSearchMoviesAction(searchQuery.value);
  }
};

const getUpcomingMovies = async () => {
  const code = countryCode.value.trim() || 'US';
  await movieStore.getUpcomingMoviesByCountryAction(code);
};

onMounted(() => {
  movieStore.getTopRatedAction();
  movieStore.getLowestRatedAction();
  movieStore.getTop250Action();
  movieStore.getMostPopularAction();
  movieStore.getTopBoxOfficeMoviesAction();
  movieStore.getTopRatedEnglishAction();
  movieStore.getUpcomingMoviesByCountryAction('US');
});
</script>