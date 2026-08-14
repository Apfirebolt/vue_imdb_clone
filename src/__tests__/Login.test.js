// Login.spec.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import Login from "../screens/Login.vue"; // Adjust the import path as needed
import Loader from "../components/Loader.vue";

describe("Login.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    if (typeof window !== "undefined" && typeof window.alert === "undefined") {
      window.alert = () => {};
    }
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("renders form inputs, labels, and register link properly", () => {
    const wrapper = mount(Login, {
      global: {
        stubs: {
          RouterLink: {
            props: ["to"],
            template: '<a :href="to"><slot /></a>',
          },
          Loader: true,
        },
      },
    });

    expect(wrapper.find("h1").text()).toBe("Welcome Back");
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);

    const registerLink = wrapper.find("a[href='/register']");
    expect(registerLink.exists()).toBe(true);
    expect(registerLink.text()).toBe("Sign up");
  });

  it("binds input fields with v-model", async () => {
    const wrapper = mount(Login, {
      global: {
        stubs: {
          RouterLink: true,
          Loader: true,
        },
      },
    });

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const rememberCheckbox = wrapper.find("#remember");

    await emailInput.setValue("user@example.com");
    await passwordInput.setValue("secret123");
    await rememberCheckbox.setValue(true);

    expect(emailInput.element.value).toBe("user@example.com");
    expect(passwordInput.element.value).toBe("secret123");
    expect(rememberCheckbox.element.checked).toBe(true);
  });

  it("handles login flow successfully and toggles loading state", async () => {
    const wrapper = mount(Login, {
      global: {
        stubs: {
          RouterLink: true,
          Loader: true,
        },
      },
    });

    await wrapper.find("#email").setValue("test@example.com");
    await wrapper.find("#password").setValue("password123");
    await wrapper.find("#remember").setValue(true);

    // Trigger form submit
    await wrapper.find("form").trigger("submit.prevent");

    // During async operation: loading state active
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes("disabled")).toBeDefined();
    expect(submitButton.text()).toBe("Signing in...");
    expect(wrapper.findComponent(Loader).exists()).toBe(true);

    // Fast-forward simulated API timeout (2000ms)
    await vi.advanceTimersByTimeAsync(2000);

    // After async completion: alerts success and resets loading state
    expect(window.alert).toHaveBeenCalledWith("Login successful!");
    expect(submitButton.attributes("disabled")).toBeUndefined();
    expect(submitButton.text()).toBe("Sign In");
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
  });
});