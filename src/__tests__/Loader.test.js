// Loader.spec.ts
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Loader from "../components/Loader.vue"; // Adjust import path as needed

describe("Loader.vue", () => {
  it("renders the loader container and spinner element", () => {
    const wrapper = mount(Loader);

    // Verify outer layout container
    const container = wrapper.find("div");
    expect(container.classes()).toContain("flex");
    expect(container.classes()).toContain("items-center");
    expect(container.classes()).toContain("justify-center");
    expect(container.classes()).toContain("min-h-screen");

    // Verify inner spinner element
    const spinner = wrapper.find(".loader");
    expect(spinner.exists()).toBe(true);
  });
});