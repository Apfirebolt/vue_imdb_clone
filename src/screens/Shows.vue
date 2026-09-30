<template>
  <Loader v-if="loading" />

  <div v-else class="min-h-screen bg-info py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-7xl w-full bg-white shadow-xl rounded-2xl p-6 sm:p-10">
      
      <!-- Header Section -->
      <div class="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
        <h1 class="text-4xl font-extrabold text-primary tracking-tight mb-2">
          Shows Hub
        </h1>
        <p class="text-dark leading-relaxed max-w-3xl text-base sm:text-lg">
          Welcome to the Shows section! Here, you can explore a wide variety of series from different genres and eras. Whether you're a fan of action, drama, comedy, or documentaries, there's something for everyone.
        </p>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex overflow-x-auto space-x-2 border-b border-gray-200 pb-3 mb-8 scrollbar-none">
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

      <!-- Content Grid Section -->
      <div>
        <div v-if="currentShows.length === 0" class="text-center py-16">
          <p class="text-gray-500 text-lg">No shows found in this category.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="show in currentShows"
            :key="show.id"
            class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group"
          >
            <!-- Image Poster Container -->
            <div class="relative h-64 overflow-hidden bg-gray-200">
              <img
                v-if="show.primaryImage"
                :src="show.primaryImage"
                :alt="show.primaryTitle || show.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">
                No Image Available
              </div>
            </div>

            <!-- Content Details -->
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                {{ show.primaryTitle || show.name }}
              </h3>
              
              <p class="text-xs font-medium text-gray-500 mb-3">
                {{ show.releaseDate || show.first_air_date || 'Release date TBA' }}
              </p>
              
              <p v-if="show.description" class="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {{ show.description }}
              </p>

              <!-- Footer Badges -->
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 text-xs">
                <span
                  v-if="show.averageRating"
                  class="bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1"
                >
                  ⭐ {{ show.averageRating }}
                </span>
                <span v-else class="text-gray-400">Unrated</span>

                <span
                  v-if="show.contentRating"
                  class="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md"
                >
                  {{ show.contentRating }}
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
import { useShowStore } from "../stores/shows";
import Loader from "../components/Loader.vue";

const showStore = useShowStore();
const loading = computed(() => showStore.isLoading);
const selectedTab = ref("popular");

const tabs = [
  { id: 'popular', label: 'Popular Shows' },
  { id: 'topRated', label: 'Top Rated Shows' }
];

const currentShows = computed(() => {
  switch (selectedTab.value) {
    case 'popular': return showStore.getPopularShows;
    case 'topRated': return showStore.getTopRatedShows;
    default: return [];
  }
});

onMounted(() => {
  showStore.getTopRatedShowsAction();
  showStore.getPopularShowsAction();
});
</script>