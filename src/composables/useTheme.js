// src/composables/useTheme.js (Vue 3 Composable)
import { ref, computed } from 'vue';

// 1. Define available themes
const themeNames = ['crimson', 'ocean', 'forest'];
const currentTheme = ref('crimson');

export function useTheme() {
  const setTheme = (theme) => {
    if (themeNames.includes(theme)) {
      currentTheme.value = theme;
      document.body.className = '';
      document.body.classList.add(`theme-${theme}`);
      
      localStorage.setItem('user-theme', theme);
    }
  };

  // 3. Initialize theme from local storage on load
  const storedTheme = localStorage.getItem('user-theme');
  if (storedTheme) {
      setTheme(storedTheme);
  } else {
      setTheme(currentTheme.value);
  }

  return {
    currentTheme: computed(() => currentTheme.value),
    themeNames,
    setTheme
  };
}