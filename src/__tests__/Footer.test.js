// Footer.spec.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "../components/FooterComponent.vue";

describe("Footer.vue", () => {
  beforeEach(() => {
    // Lock the system clock to a fixed year to make date assertions deterministic
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-15"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the branding and description correctly", () => {
    const wrapper = mount(Footer);

    expect(wrapper.text()).toContain("VUE");
    expect(wrapper.text()).toContain("MovieDB");
    expect(wrapper.text()).toContain(
      "Discover trending movies, top-rated TV shows, and regional cinema."
    );
  });

  it("renders all major navigation column headers", () => {
    const wrapper = mount(Footer);

    const headers = wrapper.findAll("h3").map((h) => h.text().trim());
    expect(headers).toEqual(["Movies", "TV Shows", "Indian Cinema"]);
  });

  it("renders expected navigation links", () => {
    const wrapper = mount(Footer);

    const expectedLinks = [
      "Popular Movies",
      "Top Rated",
      "Upcoming Releases",
      "Now Playing",
      "Popular Shows",
      "Currently Airing",
      "TV Schedule",
      "Bollywood Hits",
      "South Indian",
      "Regional Releases",
      "Trending Dubbed",
      "Privacy Policy",
      "Terms of Service",
      "API Status",
    ];

    const links = wrapper.findAll("a").map((a) => a.text().trim());

    expectedLinks.forEach((linkText) => {
      expect(links).toContain(linkText);
    });
  });

  it("computes and displays the dynamic current year in the copyright notice", () => {
    const wrapper = mount(Footer);

    const currentYear = new Date().getFullYear().toString();
    expect(wrapper.text()).toContain(`© ${currentYear} Vue MovieDB. All rights reserved.`);
  });
});