// Shows.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Shows from "../screens/Shows.vue";
import { useShowStore } from "../stores/shows";
import Loader from "../components/Loader.vue";

describe("Shows.vue", () => {
  const mockShow = (id, title, rating = "8.9") => ({
    id,
    primaryTitle: title,
    primaryImage: "https://example.com/show-poster.jpg",
    releaseDate: "2024-01-01",
    description: `A gripping story in ${title}`,
    averageRating: rating,
    contentRating: "TV-MA",
  });

  const baseInitialState = {
    show: {
      popularShows: [mockShow(1, "Stranger Things", "8.7")],
      topRatedShows: [mockShow(2, "Breaking Bad", "9.5")],
      loading: false,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls showStore fetch actions on mount", () => {
    mount(Shows, {
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

    const store = useShowStore();

    expect(store.getTopRatedShowsAction).toHaveBeenCalledTimes(1);
    expect(store.getPopularShowsAction).toHaveBeenCalledTimes(1);
  });

  it("renders page header and popular shows by default on the active popular tab", () => {
    const wrapper = mount(Shows, {
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

    expect(wrapper.find("h1").text()).toBe("Shows");
    expect(wrapper.text()).toContain("Stranger Things");
    expect(wrapper.text()).toContain("⭐ 8.7");
    expect(wrapper.text()).toContain("TV-MA");
    expect(
      wrapper.find('img[src="https://example.com/show-poster.jpg"]').exists()
    ).toBe(true);
  });

  it("switches to Top Rated Shows tab and updates displayed list", async () => {
    const wrapper = mount(Shows, {
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

    // Verify initial popular show is shown and top-rated is hidden
    expect(wrapper.text()).toContain("Stranger Things");
    expect(wrapper.text()).not.toContain("Breaking Bad");

    // Click Top Rated Shows tab button
    const topRatedTabBtn = wrapper
      .findAll("button")
      .find((btn) => btn.text().trim() === "Top Rated Shows");
    await topRatedTabBtn?.trigger("click");

    // Verify view swapped to top rated shows
    expect(wrapper.text()).toContain("Breaking Bad");
    expect(wrapper.text()).toContain("⭐ 9.5");
    expect(wrapper.text()).not.toContain("Stranger Things");
  });

  it("displays fallback fields (name and first_air_date) when primary fields are absent", () => {
    const fallbackState = {
      show: {
        popularShows: [
          {
            id: 101,
            name: "Game of Thrones",
            first_air_date: "2011-04-17",
            description: "Winter is coming.",
            averageRating: "9.2",
            contentRating: "TV-MA",
          },
        ],
        topRatedShows: [],
        loading: false,
      },
    };

    const wrapper = mount(Shows, {
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

    expect(wrapper.text()).toContain("Game of Thrones");
    expect(wrapper.text()).toContain("2011-04-17");
  });

  it("shows Loader when store isLoading is true", () => {
    const wrapper = mount(Shows, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true,
            initialState: {
              show: {
                ...baseInitialState.show,
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
    const wrapper = mount(Shows, {
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