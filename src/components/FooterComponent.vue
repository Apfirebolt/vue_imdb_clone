<template>
  <footer class="py-10 px-8 bg-secondary text-light dark:bg-slate-700 dark:text-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div class="text-center md:text-left">
          <h3 class="font-semibold text-lg mb-4">Movies</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-primary">Popular Movies</a></li>
            <li><a href="#" class="hover:text-primary">Top Rated</a></li>
            <li><a href="#" class="hover:text-primary">Upcoming</a></li>
          </ul>
        </div>
        <div class="text-center md:text-left">
          <h3 class="font-semibold text-lg mb-4">TV Shows</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-primary">Popular TV Shows</a></li>
            <li><a href="#" class="hover:text-primary">Top Rated</a></li>
            <li><a href="#" class="hover:text-primary">On Air</a></li>
          </ul>
        </div>
        <div class="text-center md:text-left">
          <h3 class="font-semibold text-lg mb-4">Indian Movies</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-primary">Bollywood</a></li>
            <li><a href="#" class="hover:text-primary">South Indian</a></li>
            <li><a href="#" class="hover:text-primary">Regional</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-600 pt-6">
        <p class="text-center text-sm">
          &copy; {{ currentYear }} Vue IMDB Built with Vue 3 and Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear,
    }
  },
})
</script>