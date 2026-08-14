// IndianMovies.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import IndianMovies from "../screens/IndianMovies.vue";
import { useIndianMoviesStore } from "../stores/indian-movies";
import Loader from "../components/Loader.vue";

describe("IndianMovies.vue", () => {
  const createMockMovie = (id, title, rating = "8.5") => ({
    id,
    primaryTitle: title,
    primaryImage: "https://example.com/poster.jpg",
    releaseDate: "2024-05-10",
    description: `A story about ${title}`,
    averageRating: rating,
    contentRating: "UA",
  });

  const baseInitialState = {
    indianMovies: {
      trendingTamil: [createMockMovie(1, "Leo", "7.8")],
      trendingTelugu: [createMockMovie(2, "Salaar", "7.2")],
      topRatedTamil: [createMockMovie(3, "Vikram Vedha", "8.6")],
      topRatedTelugu: [createMockMovie(4, "RRR", "8.8")],
      topRatedIndianMovies: [createMockMovie(5, "3 Idiots", "8.4")],
      anticipatedMovies: [createMockMovie(6, "Kalki 2898 AD", "N/A")],
      loading: false,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls all 6 store actions on mount", () => {
    mount(IndianMovies, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: baseInitialState,
          }),
        ],
        stubs: { Loader: true },
      },
    });

    const store = useIndianMoviesStore();

    expect(store.getTrendingTamilAction).toHaveBeenCalledTimes(1);
    expect(store.getTrendingTeluguAction).toHaveBeenCalledTimes(1);
    expect(store.getTopRatedTamilAction).toHaveBeenCalledTimes(1);
    expect(store.getTopRatedTeluguAction).toHaveBeenCalledTimes(1);
    expect(store.getTopRatedIndianMoviesAction).toHaveBeenCalledTimes(1);
    expect(store.getAnticipatedMoviesAction).toHaveBeenCalledTimes(1);
  });

  it("renders page header and Trending Tamil movies by default", () => {
    const wrapper = mount(IndianMovies, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: baseInitialState,
          }),
        ],
        stubs: { Loader: true },
      },
    });

    expect(wrapper.find("h1").text()).toBe("Indian Movies");
    expect(wrapper.text()).toContain("Leo");
    expect(wrapper.text()).toContain("⭐ 7.8");
    expect(wrapper.find('img[src="https://example.com/poster.jpg"]').exists()).toBe(true);
  });

  it("switches tabs and updates the rendered movie cards correctly", async () => {
    const wrapper = mount(IndianMovies, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: baseInitialState,
          }),
        ],
        stubs: { Loader: true },
      },
    });

    // Switch to Trending Telugu
    const teluguTabBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Trending Telugu");
    await teluguTabBtn?.trigger("click");
    expect(wrapper.text()).toContain("Salaar");
    expect(wrapper.text()).not.toContain("Leo");

    // Switch to Top Rated Tamil
    const topRatedTamilBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Top Rated Tamil");
    await topRatedTamilBtn?.trigger("click");
    expect(wrapper.text()).toContain("Vikram Vedha");

    // Switch to Top Rated Telugu
    const topRatedTeluguBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Top Rated Telugu");
    await topRatedTeluguBtn?.trigger("click");
    expect(wrapper.text()).toContain("RRR");

    // Switch to Top Rated (All Indian)
    const topRatedBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Top Rated");
    await topRatedBtn?.trigger("click");
    expect(wrapper.text()).toContain("3 Idiots");

    // Switch to Anticipated
    const anticipatedBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Anticipated");
    await anticipatedBtn?.trigger("click");
    expect(wrapper.text()).toContain("Kalki 2898 AD");
  });

  it("renders fallback properties (title and release_date) when primary fields are absent", () => {
    const fallbackState = {
      indianMovies: {
        trendingTamil: [
          {
            id: 99,
            title: "Super Deluxe",
            release_date: "2019-03-29",
            description: "An anthology film.",
            averageRating: "8.3",
            contentRating: "A",
          },
        ],
        trendingTelugu: [],
        topRatedTamil: [],
        topRatedTelugu: [],
        topRatedIndianMovies: [],
        anticipatedMovies: [],
        loading: false,
      },
    };

    const wrapper = mount(IndianMovies, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: fallbackState,
          }),
        ],
        stubs: { Loader: true },
      },
    });

    expect(wrapper.text()).toContain("Super Deluxe");
    expect(wrapper.text()).toContain("2019-03-29");
  });

  it("shows Loader when store isLoading is true", () => {
    const wrapper = mount(IndianMovies, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: {
              indianMovies: {
                ...baseInitialState.indianMovies,
                loading: true,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.findComponent(Loader).exists()).toBe(true);
  });

  it("hides Loader when store isLoading is false", () => {
    const wrapper = mount(IndianMovies, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: baseInitialState,
          }),
        ],
      },
    });

    expect(wrapper.findComponent(Loader).exists()).toBe(false);
  });
});