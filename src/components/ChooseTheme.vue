<template>
  <div class="p-4 bg-light text-dark rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-3">Choose Theme</h3>
    <div class="flex space-x-4">
      <button
        v-for="theme in themeNames"
        :key="theme"
        @click="setTheme(theme)"
        :class="[
          'px-4 py-2 rounded-full transition duration-300 ease-in-out capitalize',
          {
            'bg-primary text-white shadow-lg': currentTheme === theme,
            'bg-light border border-dark/20 text-dark hover:bg-light/80': currentTheme !== theme
          }
        ]"
        :style="getThemeButtonStyle(theme)"
      >
        {{ theme }}
      </button>
    </div>
    <p class="mt-3 text-sm">Active Theme: <span class="font-bold text-primary">{{ currentTheme }}</span></p>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme';

const { currentTheme, themeNames, setTheme } = useTheme();

function getThemeButtonStyle(themeName) {
  const themeColors = {
    'crimson': '#fc0362',
    'ocean': '#3498DB',
    'forest': '#27AE60',
  };
  
  if (currentTheme.value === themeName) {
      return {}; // Use Tailwind classes for the active button
  }

  return {
    '--tw-text-opacity': 1,
    'color': themeColors[themeName],
    'border-color': themeColors[themeName],
  };
}
</script>