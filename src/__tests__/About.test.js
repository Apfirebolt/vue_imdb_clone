// About.spec.ts
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import About from "../screens/About.vue"; // Adjust import path as needed

describe("About.vue", () => {
  it("renders the component container with proper CSS classes", () => {
    const wrapper = mount(About);

    const rootDiv = wrapper.find("div");
    expect(rootDiv.classes()).toContain("min-h-screen");
    expect(rootDiv.classes()).toContain("flex");
  });

  it("renders the main heading correctly", () => {
    const wrapper = mount(About);

    const heading = wrapper.find("h1");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("About Us");
  });

  it("renders the about description paragraphs", () => {
    const wrapper = mount(About);

    const paragraphs = wrapper.findAll("p");
    expect(paragraphs.length).toBe(2);

    expect(paragraphs[0].text()).toContain(
      "Welcome to our IMDB Movies application! This project is designed to provide users with an easy way to explore and discover movies from the IMDB database."
    );

    expect(paragraphs[1].text()).toContain(
      "Our application allows you to browse through a wide range of movies"
    );
  });
});