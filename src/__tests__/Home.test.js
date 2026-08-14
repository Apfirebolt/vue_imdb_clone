// Home.spec.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Home from "../screens/Home.vue";
import Loader from "../components/Loader.vue";
import ChooseTheme from "../components/ChooseTheme.vue";
import { useConfigStore } from "../stores/config";

// Mock Vue Router
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock useTheme composable if used by ChooseTheme / Home
vi.mock("../composables/useTheme", () => ({
  useTheme: () => ({
    theme: { value: "light" },
    setTheme: vi.fn(),
  }),
}));

describe("Home.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls configStore actions upon mounting", () => {
    mount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
          }),
        ],
        stubs: {
          ChooseTheme: true,
          Loader: true,
          RouterLink: true,
        },
      },
    });

    const configStore = useConfigStore();

    expect(configStore.getTypesAction).toHaveBeenCalledTimes(1);
    expect(configStore.getGenresAction).toHaveBeenCalledTimes(1);
    expect(configStore.getCountriesAction).toHaveBeenCalledTimes(1);
    expect(configStore.getLanguagesAction).toHaveBeenCalledTimes(1);
    expect(configStore.getCountryCodesAction).toHaveBeenCalledTimes(1);
  });

  it("renders heading and intro text correctly", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
          }),
        ],
        stubs: {
          ChooseTheme: true,
          Loader: true,
          RouterLink: true,
        },
      },
    });

    expect(wrapper.find("h1").text()).toBe("Welcome to IMDB Movies");
    expect(wrapper.text()).toContain("Discover a wide range of movies");
  });

  it("renders lists derived from configStore state correctly", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: {
              config: {
                types: ["Movie", "TV Show", "Short"],
                genres: ["Action", "Sci-Fi", "Romance"],
                countries: [
                  { id: 1, name: "United States" },
                  { id: 2, name: "India" },
                ],
                languages: [
                  { id: 10, name: "English" },
                  { id: 20, name: "Hindi" },
                ],
                countryCodes: ["US", "IN", "GB"],
                loading: false,
              },
            },
          }),
        ],
        stubs: {
          ChooseTheme: true,
          Loader: true,
          RouterLink: true,
        },
      },
    });

    // Validate Types
    expect(wrapper.text()).toContain("Movie");
    expect(wrapper.text()).toContain("TV Show");
    expect(wrapper.text()).toContain("Short");

    // Validate Genres
    expect(wrapper.text()).toContain("Action");
    expect(wrapper.text()).toContain("Sci-Fi");
    expect(wrapper.text()).toContain("Romance");

    // Validate Countries
    expect(wrapper.text()).toContain("United States");
    expect(wrapper.text()).toContain("India");

    // Validate Languages
    expect(wrapper.text()).toContain("English");
    expect(wrapper.text()).toContain("Hindi");

    // Validate Country Codes
    expect(wrapper.text()).toContain("US");
    expect(wrapper.text()).toContain("IN");
    expect(wrapper.text()).toContain("GB");
  });

  it("shows Loader when store isLoading is true", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: {
              config: {
                loading: true,
              },
            },
          }),
        ],
        stubs: {
          ChooseTheme: true,
          RouterLink: true,
        },
      },
    });

    expect(wrapper.findComponent(Loader).exists()).toBe(true);
  });

  it("hides Loader when store isLoading is false", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: {
              config: {
                loading: false,
              },
            },
          }),
        ],
        stubs: {
          ChooseTheme: true,
          RouterLink: true,
        },
      },
    });

    expect(wrapper.findComponent(Loader).exists()).toBe(false);
  });

  it("renders ChooseTheme child component in Home", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
          }),
        ],
        stubs: {
          ChooseTheme: true,
          Loader: true,
          RouterLink: true,
        },
      },
    });

    const chooseTheme = wrapper.findComponent(ChooseTheme);
    expect(chooseTheme.exists()).toBe(true);
  });
});