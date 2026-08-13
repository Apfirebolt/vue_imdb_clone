<template>
  <div class="relative min-h-screen flex items-center justify-center bg-secondary text-slate-100 overflow-hidden px-6 py-12 selection:bg-amber-500 selection:text-slate-950">
    
    <!-- Ambient Background Glows -->
    <div class="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Main Container -->
    <div class="relative z-10 max-w-xl w-full text-center">
      
      <!-- Subtle Floating Badge -->
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
        <span>Error 404</span>
      </div>

      <!-- Large Display Number -->
      <h1 class="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 select-none">
        404
      </h1>

      <!-- Heading & Description -->
      <h2 class="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
        Lost in the Cut?
      </h2>
      <p class="text-white text-base sm:text-lg mt-3 leading-relaxed max-w-md mx-auto">
        The scene or page you’re searching for isn’t in our database. It might have been moved or removed entirely.
      </p>

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <router-link
          to="/"
          class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 focus:ring-2 focus:ring-amber-400/50 transition-all duration-200 shadow-lg shadow-amber-500/20"
        >
          <svg class="w-4 h-4 mr-2 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </router-link>

        <button
          @click="goBack"
          class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium text-sm hover:bg-slate-800 hover:text-white transition-all duration-200"
        >
          Previous Page
        </button>
      </div>

      <!-- Helpful Suggestions Grid -->
      <div class="mt-12 pt-8 border-t border-slate-800/80">
        <p class="text-xs font-semibold text-white uppercase tracking-wider mb-4">
          Quick Links
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <router-link 
            to="/movies" 
            class="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 hover:text-amber-400 hover:border-slate-700 transition-colors"
          >
            Movies
          </router-link>
          <router-link 
            to="/tv" 
            class="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 hover:text-amber-400 hover:border-slate-700 transition-colors"
          >
            TV Shows
          </router-link>
          <router-link 
            to="/trending" 
            class="col-span-2 sm:col-span-1 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 hover:text-amber-400 hover:border-slate-700 transition-colors"
          >
            Trending
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>