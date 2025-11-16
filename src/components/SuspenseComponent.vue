<script setup>
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

const data = ref(null);

async function fetchData() {
  const response = await httpClient.get("imdb/india/top-rated-telugu-movies");
  return response.data;
}

data.value = await fetchData();
</script>

<template>
  <div class="container">
    <div v-for="movie in data" :key="movie.id" class="movie-card">
      <img
        :src="movie.primaryImage"
        :alt="movie.primaryTitle"
        class="movie-image"
      />
      <div class="movie-content">
        <h2 class="movie-title">{{ movie.primaryTitle }}</h2>
        <p class="movie-description">{{ movie.description }}</p>
        <div class="movie-meta">
          <span class="rating">⭐ {{ movie.averageRating }}/10</span>
          <span class="year">{{ movie.startYear }}</span>
          <span class="runtime">{{ movie.runtimeMinutes }} min</span>
        </div>
        <div class="genres">
          <span v-for="genre in movie.genres" :key="genre" class="genre-tag">
            {{ genre }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.movie-card {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.movie-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.08);
}

.movie-image {
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movie-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.movie-title {
  margin: 0;
  font-size: 24px;
  color: #1a1a1a;
}

.movie-description {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.movie-meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #888;
}

.rating {
  color: #f5c518;
  font-weight: bold;
}

.genres {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.genre-tag {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}
</style>
