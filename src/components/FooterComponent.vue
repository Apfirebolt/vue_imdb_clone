<template>
  <footer class="bg-primary text-slate-100 dark:bg-dark dark:text-slate-400 border-t border-slate-800 transition-colors">
    <div class="max-w-7xl mx-auto px-6 pt-12 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        
        <!-- Brand & Description Column -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center space-x-2">
            <span class="bg-amber-500 text-slate-100 font-black px-2 py-1 rounded text-xs tracking-wider">
              VUE
            </span>
            <span class="text-xl font-bold tracking-tight text-white">
              MovieDB
            </span>
          </div>
          <p class="text-sm text-white leading-relaxed max-w-sm">
            Discover trending movies, top-rated TV shows, and regional cinema. Your ultimate lightweight entertainment guide built with Vue 3 and Tailwind CSS.
          </p>
        </div>

        <!-- Navigation Columns -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            Movies
          </h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-amber-400 transition-colors">Popular Movies</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">Top Rated</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">Upcoming Releases</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">Now Playing</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            TV Shows
          </h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-amber-400 transition-colors">Popular Shows</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">Top Rated</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">Currently Airing</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">TV Schedule</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            Indian Cinema
          </h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-amber-400 transition-colors">Bollywood Hits</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">South Indian</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">Regional Releases</a></li>
            <li><a href="#" class="hover:text-amber-400 transition-colors">Trending Dubbed</a></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p>
          &copy; {{ currentYear }} Vue MovieDB. All rights reserved. Data provided for personal media discovery.
        </p>
        <div class="flex space-x-6">
          <a href="#" class="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-slate-300 transition-colors">API Status</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>