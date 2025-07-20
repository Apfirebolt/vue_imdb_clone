<template>
  <div class="min-h-screen bg-info flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-4 mt-16">
        Top Shows
      </h1>
      <p class="text-dark leading-relaxed mb-4">
        Welcome to the Top Shows section! Here, you can explore the
        highest-rated TV shows from different genres and eras. Whether you're a
        fan of drama, comedy, thriller, or documentaries, there's something for
        everyone.
      </p>

      <Loader v-if="loading" />
      <div
        v-if="topShows && topShows.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        <div
          v-for="show in topShows"
          :key="show.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="show.primaryImage"
            :alt="show.primaryTitle"
            class="w-full h-64 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{{ show.primaryTitle }}</h3>
            <p class="text-gray-600 text-sm mb-2">
              {{ show.startYear }} • {{ show.runtimeMinutes }} min
            </p>
            <p class="text-gray-800 text-sm mb-3 line-clamp-3">
              {{ show.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-yellow-500 font-bold"
                >⭐ {{ show.averageRating }}/10</span
              >
              <span class="text-gray-500 text-sm"
                >{{ show.numVotes.toLocaleString() }} votes</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Loader from "../components/Loader.vue";

const props = defineProps({
  topShows: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
