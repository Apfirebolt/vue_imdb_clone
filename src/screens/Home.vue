<template>
    <div class="min-h-screen bg-info container mx-auto px-4 py-8">
        <div class="max-w-2xl bg-white shadow-lg mx-auto rounded-lg p-8">
            <h1 class="text-3xl font-bold text-primary mb-4 mt-16">
                Welcome to IMDB Movies
            </h1>
            <p class="text-dark leading-relaxed mb-4">
                Discover a wide range of movies from different genres and eras. Whether
                you're a fan of action, drama, comedy, or documentaries, there's
                something for everyone.
            </p>
            <p class="text-dark leading-relaxed mb-4">
                Explore our top-rated movies, search for your favorites, and enjoy
                detailed information about each film. Happy watching!
            </p>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-semibold text-primary mb-4">Types</h3>
                <ul class="space-y-2">
                    <li v-for="type in types" :key="type" class="text-dark">
                        {{ type }}
                    </li>
                </ul>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-semibold text-primary mb-4">Genres</h3>
                <div class="max-h-48 overflow-y-auto pr-2">
                    <div class="grid grid-cols-2 gap-1">
                        <span
                            v-for="genre in genres"
                            :key="genre"
                            class="text-xs bg-gray-100 text-dark px-2 py-1 rounded-md"
                        >
                            {{ genre }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-semibold text-primary mb-4">Languages</h3>
                <div class="max-h-48 overflow-y-auto pr-2">
                    <div class="grid grid-cols-2 gap-1">
                        <span
                            v-for="language in languages"
                            :key="language.id"
                            class="text-xs bg-gray-100 text-dark px-2 py-1 rounded-md"
                        >
                            {{ language.name }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-semibold text-primary mb-4">Countries</h3>
                <div class="max-h-48 overflow-y-auto pr-2">
                    <div class="grid grid-cols-2 gap-1">
                        <span
                            v-for="country in countries"
                            :key="country.id"
                            class="text-xs bg-gray-100 text-dark px-2 py-1 rounded-md"
                        >
                            {{ country.name }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-semibold text-primary mb-4">Country Codes</h3>
                <div class="max-h-48 overflow-y-auto pr-2">
                    <div class="grid grid-cols-2 gap-1">
                        <span
                            v-for="code in countryCodes"
                            :key="code"
                            class="text-xs bg-gray-100 text-dark px-2 py-1 rounded-md"
                        >
                            {{ code }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <Loader v-if="isLoading" />
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useConfigStore } from "../stores/config";
import { useRouter } from "vue-router";
import Loader from "../components/Loader.vue";

const configStore = useConfigStore();
const router = useRouter();
const searchText = ref("");

const isLoading = computed(() => configStore.isLoading);
const types = computed(() => configStore.getTypes);
const genres = computed(() => configStore.getGenres);
const countries = computed(() => configStore.getCountries);
const languages = computed(() => configStore.getLanguages);
const countryCodes = computed(() => configStore.getCountryCodes);

onMounted(() => {
    configStore.getTypesAction();
    configStore.getGenresAction();
    configStore.getCountriesAction();
    configStore.getLanguagesAction();
    configStore.getCountryCodesAction();
});
</script>
