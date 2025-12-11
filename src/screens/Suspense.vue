<template>
  <div
    class="min-h-screen bg-info flex flex-col items-center justify-center p-4"
  >
    <div class="bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl mb-8">
      <h1 class="text-4xl font-bold text-primary text-center mb-4 mt-4">
        Suspense Component - Indian Movies
      </h1>
      <p class="text-dark leading-relaxed">
        This is for testing suspense with multiple API calls and tabs to display
        data.
      </p>
    </div>

    <Suspense>
      <template #default>
        <SuspenseComponent />
      </template>

      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Loader from "../components/Loader.vue";
import { useIndianMoviesStore } from "../stores/indian-movies";
import httpClient from "../plugins/interceptor";
import SuspenseComponent from "../components/SuspenseComponent.vue";
</script>
