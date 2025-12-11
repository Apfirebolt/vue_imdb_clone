<template>
  <Disclosure :class="['border-b border-gray-200/10 backdrop-blur-md fixed top-0 z-20 w-full transition-all duration-300', isScrolledDown ? 'bg-dark/95 dark:bg-slate-900/95 shadow-lg' : 'bg-gradient-to-r from-primary to-dark dark:from-slate-800 dark:to-slate-700']" as="nav" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-20">
        <div class="flex items-center w-full justify-between">
          <div class="justify-between flex items-center">
            <h2 class="text-3xl text-white font-extrabold tracking-tight flex items-center gap-2">
              <span class="bg-yellow-400 text-gray-900 px-2 py-1 rounded">IMDB</span>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Movies</span>
            </h2>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-2">
              <router-link
                v-for="link in links"
                :key="link.name"
                :to="link.href"
                class="text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 px-4 py-2 rounded-lg font-medium text-sm hover:scale-105 transform"
              >
                {{ link.name }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="-mr-2 flex sm:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden bg-dark/95 backdrop-blur-md">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          class="text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 block px-4 py-3 rounded-lg text-base font-medium"
        >
          {{ link.name }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

const isScrolledDown = ref(false);
const links = [
  { name: 'Home', href: '/' },
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
  { name: 'About', href: '/about' },
  { name: 'Movies', href: '/movies' },
  { name: 'Shows', href: '/shows' },
  { name: 'Indian Movies', href: '/indian-movies' },
];

const checkScroll = () => {
  isScrolledDown.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});
</script>
