<template>
  <div class="min-h-screen bg-info flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-4 mt-16">
        Shows
      </h1>
      <p class="text-dark leading-relaxed mb-4">
        Welcome to the Movies section! Here, you can explore a wide variety of
        films from different genres and eras. Whether you're a fan of action,
        drama, comedy, or documentaries, there's something for everyone.
      </p>

      <div class="mb-6">
        <div class="flex border-b border-gray-200">
          <button
            @click="changeTab('popular')"
            :class="[
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              selectedTab === 'popular'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Popular Shows
          </button>
          <button
            @click="changeTab('topRated')"
            :class="[
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              selectedTab === 'topRated'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Top Rated Shows
          </button>
        </div>

        <div class="mt-4">
          <div
            v-if="selectedTab === 'popular'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="show in popularShows"
              :key="show.id"
              class="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <img
                v-if="show.primaryImage"
                :src="show.primaryImage"
                :alt="show.primaryTitle"
                class="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 class="font-semibold text-lg mb-2">
                {{ show.primaryTitle || show.name }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                {{ show.releaseDate || show.first_air_date }}
              </p>
              <p
                v-if="show.description"
                class="text-sm text-gray-700 mb-2 line-clamp-3"
              >
                {{ show.description }}
              </p>
              <div class="flex justify-between items-center">
                <span
                  v-if="show.averageRating"
                  class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
                >
                  ⭐ {{ show.averageRating }}
                </span>
                <span
                  v-if="show.contentRating"
                  class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {{ show.contentRating }}
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="selectedTab === 'topRated'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="show in topRatedShows"
              :key="show.id"
              class="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <img
                v-if="show.primaryImage"
                :src="show.primaryImage"
                :alt="show.primaryTitle"
                class="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 class="font-semibold text-lg mb-2">
                {{ show.primaryTitle || show.name }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                {{ show.releaseDate || show.first_air_date }}
              </p>
              <p
                v-if="show.description"
                class="text-sm text-gray-700 mb-2 line-clamp-3"
              >
                {{ show.description }}
              </p>
              <div class="flex justify-between items-center">
                <span
                  v-if="show.averageRating"
                  class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
                >
                  ⭐ {{ show.averageRating }}
                </span>
                <span
                  v-if="show.contentRating"
                  class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {{ show.contentRating }}
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
import { useShowStore } from "../stores/shows";
import httpClient from "../plugins/interceptor";
import axios from "axios";
import Loader from "../components/Loader.vue";

const showStore = useShowStore();
const popularShows = computed(() => showStore.getPopularShows);
const topRatedShows = computed(() => showStore.getTopRatedShows);
const loading = computed(() => showStore.isLoading);
const selectedTab = ref("popular");

const changeTab = (tab) => {
  selectedTab.value = tab;
};

onMounted(() => {
  showStore.getTopRatedShowsAction();
  showStore.getPopularShowsAction();
});
</script>
