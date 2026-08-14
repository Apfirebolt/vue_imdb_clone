// MoviesView.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import MoviesView from "../screens/Movies.vue"; // Adjust the import path as needed
import { useMovieStore } from "../stores/movies";
import Loader from "../components/Loader.vue";

describe("MoviesView.vue", () => {
  const mockMovie = (id, title, rating = "8.5") => ({
    id,
    primaryTitle: title,
    primaryImage: "https://example.com/poster.jpg",
    releaseDate: "2026-01-01",
    description: `Description for ${title}`,
    averageRating: rating,
    contentRating: "PG-13",
  });

  const baseInitialState = {
    movie: {
      topRatedMovies: [mockMovie(1, "The Shawshank Redemption", "9.3")],
      lowestRatedMovies: [mockMovie(2, "Disaster Movie", "1.9")],
      top250Movies: [mockMovie(3, "The Godfather", "9.2")],
      mostPopularMovies: [mockMovie(4, "Dune Part Two", "8.6")],
      topBoxOfficeMovies: [mockMovie(5, "Avatar", "7.9")],
      upcomingMovies: [mockMovie(6, "Upcoming Blockbuster", "N/A")],
      searchMovies: [mockMovie(7, "Inception", "8.8")],
      loading: false,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("triggers initial fetch actions on mount", () => {
    mount(MoviesView, {
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

    const store = useMovieStore();

    expect(store.getTopRatedAction).toHaveBeenCalledTimes(1);
    expect(store.getLowestRatedAction).toHaveBeenCalledTimes(1);
    expect(store.getTop250Action).toHaveBeenCalledTimes(1);
    expect(store.getMostPopularAction).toHaveBeenCalledTimes(1);
    expect(store.getTopBoxOfficeMoviesAction).toHaveBeenCalledTimes(1);
    expect(store.getUpcomingMoviesByCountryAction).toHaveBeenCalledWith("US");
  });

  it("renders top rated movies by default on active topRated tab", () => {
    const wrapper = mount(MoviesView, {
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

    expect(wrapper.text()).toContain("The Shawshank Redemption");
    expect(wrapper.text()).toContain("⭐ 9.3");
    expect(wrapper.find('img[src="https://example.com/poster.jpg"]').exists()).toBe(true);
  });

  it("switches tabs and displays corresponding category movie cards", async () => {
    const wrapper = mount(MoviesView, {
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

    // Switch to Lowest Rated Tab
    const lowestRatedTabBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Lowest Rated");
    await lowestRatedTabBtn?.trigger("click");
    expect(wrapper.text()).toContain("Disaster Movie");
    expect(wrapper.text()).toContain("⭐ 1.9");

    // Switch to Top 250 Tab
    const top250TabBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Top 250");
    await top250TabBtn?.trigger("click");
    expect(wrapper.text()).toContain("The Godfather");

    // Switch to Most Popular Tab
    const mostPopularTabBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Most Popular");
    await mostPopularTabBtn?.trigger("click");
    expect(wrapper.text()).toContain("Dune Part Two");

    // Switch to Top Box Office Tab
    const boxOfficeTabBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Top Box Office");
    await boxOfficeTabBtn?.trigger("click");
    expect(wrapper.text()).toContain("Avatar");
  });

  it("dispatches search action when submitting a movie search", async () => {
    const wrapper = mount(MoviesView, {
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

    const store = useMovieStore();

    // Switch to Search Tab
    const searchTabBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Search Movie");
    await searchTabBtn?.trigger("click");

    const searchInput = wrapper.find('input[placeholder="Search for movies..."]');
    await searchInput.setValue("Inception");

    // Click search button
    const searchSubmitBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Search");
    await searchSubmitBtn?.trigger("click");

    expect(store.getSearchMoviesAction).toHaveBeenCalledWith("Inception");
    expect(wrapper.text()).toContain("Inception");
  });

  it("dispatches upcoming movies action when querying by country code", async () => {
    const wrapper = mount(MoviesView, {
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

    const store = useMovieStore();

    // Switch to Upcoming Movies Tab
    const upcomingTabBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Upcoming Movies");
    await upcomingTabBtn?.trigger("click");

    const countryInput = wrapper.find(
      'input[placeholder="Enter country code (e.g., US, UK, IN)..."]'
    );
    await countryInput.setValue("GB");

    const getMoviesBtn = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Get Movies");
    await getMoviesBtn?.trigger("click");

    expect(store.getUpcomingMoviesByCountryAction).toHaveBeenCalledWith("GB");
    expect(wrapper.text()).toContain("Upcoming Blockbuster");
  });

  it("handles loading overlay visibility correctly", () => {
    const wrapper = mount(MoviesView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: {
              movie: {
                ...baseInitialState.movie,
                loading: true,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.findComponent(Loader).exists()).toBe(true);
  });
});