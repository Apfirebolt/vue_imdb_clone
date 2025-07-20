<template>
  <div class="min-h-screen bg-info flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-4 mt-16">Movies</h1>
      <p class="text-dark leading-relaxed mb-4">
        Welcome to the Movies section! Here, you can explore a wide variety of
        films from different genres and eras. Whether you're a fan of action,
        drama, comedy, or documentaries, there's something for everyone.
      </p>

      <Loader v-if="loading" />
      <div
        v-if="moviesData && moviesData.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        <div
          v-for="movie in moviesData"
          :key="movie.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="movie.primaryImage"
            :alt="movie.primaryTitle"
            class="w-full h-64 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{{ movie.primaryTitle }}</h3>
            <p class="text-gray-600 text-sm mb-2">
              {{ movie.startYear }} • {{ movie.runtimeMinutes }} min
            </p>
            <p class="text-gray-800 text-sm mb-3 line-clamp-3">
              {{ movie.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-yellow-500 font-bold"
                >⭐ {{ movie.averageRating }}/10</span
              >
              <span class="text-gray-500 text-sm"
                >{{ movie.numVotes.toLocaleString() }} votes</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import httpClient from "../plugins/interceptor";
import axios from "axios";
import Loader from "../components/Loader.vue";

const moviesData = ref(null);
const loading = ref(false);

const getTop250Movies = async () => {
  try {
    loading.value = true;
    const response = await httpClient.get("imdb/top250-movies");

    moviesData.value = response.data;
  } catch (error) {
    console.error("Error fetching dinosaur data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getTop250Movies();
});
</script>
