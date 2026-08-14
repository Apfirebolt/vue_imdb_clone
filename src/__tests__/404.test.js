// NotFound.spec.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import NotFound from "../screens/404.vue"; // Adjust the import path as needed

const mockPush = vi.fn();
const mockBack = vi.fn();

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

describe("NotFound.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the 404 error badge, heading, and description", () => {
    const wrapper = mount(NotFound, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    expect(wrapper.text()).toContain("Error 404");
    expect(wrapper.find("h1").text()).toBe("404");
    expect(wrapper.find("h2").text()).toBe("Lost in the Cut?");
    expect(wrapper.text()).toContain(
      "The scene or page you’re searching for isn’t in our database."
    );
  });

  it("renders all router links with their expected destinations", () => {
    const wrapper = mount(NotFound, {
      global: {
        stubs: {
          RouterLink: {
            props: ["to"],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    });

    const expectedLinks = [
      { text: "Back to Home", href: "/" },
      { text: "Movies", href: "/movies" },
      { text: "TV Shows", href: "/tv" },
      { text: "Trending", href: "/trending" },
    ];

    const renderedLinks = wrapper.findAll("a");

    expectedLinks.forEach(({ text, href }) => {
      const match = renderedLinks.find(
        (link) => link.text().includes(text) && link.attributes("href") === href
      );
      expect(match).toBeDefined();
    });
  });

  it("navigates back with router.back() when history length is greater than 1", async () => {
    Object.defineProperty(window, "history", {
      value: { length: 3 },
      writable: true,
    });

    const wrapper = mount(NotFound, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    const backButton = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Previous Page"));

    await backButton?.trigger("click");

    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("redirects to home with router.push('/') when history length is 1 or less", async () => {
    Object.defineProperty(window, "history", {
      value: { length: 1 },
      writable: true,
    });

    const wrapper = mount(NotFound, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    const backButton = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Previous Page"));

    await backButton?.trigger("click");

    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockBack).not.toHaveBeenCalled();
  });
});