<template>
  <Loader #default v-if="loading">
    <p class="text-primary text-3xl mt-6 font-semibold">Fetching Indian movies...</p>
  </Loader>
  
  <div v-else class="min-h-screen bg-info py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8">
      
      <!-- Header Section -->
      <div class="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
        <h1 class="text-4xl font-extrabold text-primary tracking-tight mb-2">
          Indian Cinema Hub
        </h1>
        <p class="text-dark leading-relaxed max-w-3xl text-base sm:text-lg">
          Explore a wide variety of cinematic gems from Tamil and Telugu film industries. Discover trending blockbusters, critically acclaimed classics, and anticipated upcoming releases.
        </p>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex overflow-x-auto space-x-2 border-b border-gray-200 pb-2 mb-8 scrollbar-none">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectedTab = tab.id"
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

      <!-- Movies Grid Display -->
      <div class="transition-all duration-300">
        <div v-if="currentMovies.length === 0" class="text-center py-16">
          <p class="text-gray-500 text-lg">No movies found in this category.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="movie in currentMovies"
            :key="movie.id"
            class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group"
          >
            <!-- Image Poster Container -->
            <div class="relative h-64 overflow-hidden bg-gray-200">
              <img
                v-if="movie.primaryImage"
                :src="movie.primaryImage"
                :alt="movie.primaryTitle || movie.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">
                No Image Available
              </div>
            </div>

            <!-- Content Details -->
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                {{ movie.primaryTitle || movie.title }}
              </h3>
              
              <p class="text-xs font-medium text-gray-500 mb-3">
                {{ movie.releaseDate || movie.release_date || 'Release date TBA' }}
              </p>
              
              <p v-if="movie.description" class="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {{ movie.description }}
              </p>

              <!-- Footer Badges -->
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 text-xs">
                <span
                  v-if="movie.averageRating"
                  class="bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1"
                >
                  ⭐ {{ movie.averageRating }}
                </span>
                <span v-else class="text-gray-400">Unrated</span>

                <span
                  v-if="movie.contentRating"
                  class="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md"
                >
                  {{ movie.contentRating }}
                </span>
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
import { useIndianMoviesStore } from "../stores/indian-movies";
import Loader from "../components/Loader.vue";

const movieStore = useIndianMoviesStore();
const loading = computed(() => movieStore.isLoading);
const selectedTab = ref("trendingTamil");

const tabs = [
  { id: 'trendingTamil', label: 'Trending Tamil' },
  { id: 'trendingTelugu', label: 'Trending Telugu' },
  { id: 'topRatedTamil', label: 'Top Rated Tamil' },
  { id: 'topRatedTelugu', label: 'Top Rated Telugu' },
  { id: 'topRated', label: 'Top Rated Global' },
  { id: 'anticipated', label: 'Anticipated' }
];

// Dynamic computed selector for current active tab's dataset
const currentMovies = computed(() => {
  switch (selectedTab.value) {
    case 'trendingTamil': return movieStore.getTrendingTamil;
    case 'trendingTelugu': return movieStore.getTrendingTelugu;
    case 'topRatedTamil': return movieStore.getTopRatedTamil;
    case 'topRatedTelugu': return movieStore.getTopRatedTelugu;
    case 'topRated': return movieStore.getTopRatedIndianMovies;
    case 'anticipated': return movieStore.getAnticipatedMovies;
    default: return [];
  }
});

onMounted(() => {
  movieStore.getTrendingTamilAction();
  movieStore.getTrendingTeluguAction();
  movieStore.getTopRatedTamilAction();
  movieStore.getTopRatedTeluguAction();
  movieStore.getTopRatedIndianMoviesAction();
  movieStore.getAnticipatedMoviesAction();
});
</script>