// Register.spec.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import Register from "../screens/Register.vue";
import Loader from "../components/Loader.vue";

describe("Register.vue", () => {
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

  it("renders form inputs, labels, and sign-in link properly", () => {
    const wrapper = mount(Register, {
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

    expect(wrapper.find("h1").text()).toBe("Create Account");
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]#password').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]#confirmPassword').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);

    const loginLink = wrapper.find("a[href='/login']");
    expect(loginLink.exists()).toBe(true);
    expect(loginLink.text()).toBe("Sign in");
  });

  it("binds input fields with v-model", async () => {
    const wrapper = mount(Register, {
      global: {
        stubs: {
          RouterLink: true,
          Loader: true,
        },
      },
    });

    const firstNameInput = wrapper.find("#firstName");
    const lastNameInput = wrapper.find("#lastName");
    const usernameInput = wrapper.find("#username");
    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");
    const agreeCheckbox = wrapper.find("#agreeTerms");

    await firstNameInput.setValue("John");
    await lastNameInput.setValue("Doe");
    await usernameInput.setValue("johndoe");
    await emailInput.setValue("john@example.com");
    await passwordInput.setValue("password123");
    await confirmPasswordInput.setValue("password123");
    await agreeCheckbox.setValue(true);

    expect(firstNameInput.element.value).toBe("John");
    expect(lastNameInput.element.value).toBe("Doe");
    expect(usernameInput.element.value).toBe("johndoe");
    expect(emailInput.element.value).toBe("john@example.com");
    expect(passwordInput.element.value).toBe("password123");
    expect(confirmPasswordInput.element.value).toBe("password123");
    expect(agreeCheckbox.element.checked).toBe(true);
  });

  it("shows an error if passwords do not match", async () => {
    const wrapper = mount(Register, {
      global: {
        stubs: {
          RouterLink: true,
          Loader: true,
        },
      },
    });

    await wrapper.find("#firstName").setValue("John");
    await wrapper.find("#lastName").setValue("Doe");
    await wrapper.find("#username").setValue("johndoe");
    await wrapper.find("#email").setValue("john@example.com");
    await wrapper.find("#password").setValue("password123");
    await wrapper.find("#confirmPassword").setValue("mismatch_password");
    await wrapper.find("#agreeTerms").setValue(true);

    await wrapper.find("form").trigger("submit.prevent");

    expect(window.alert).toHaveBeenCalledWith("Passwords do not match!");
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.text()).toBe("Sign Up");
  });

  it("handles successful registration workflow and toggles loading state", async () => {
    const wrapper = mount(Register, {
      global: {
        stubs: {
          RouterLink: true,
          Loader: true,
        },
      },
    });

    await wrapper.find("#firstName").setValue("John");
    await wrapper.find("#lastName").setValue("Doe");
    await wrapper.find("#username").setValue("johndoe");
    await wrapper.find("#email").setValue("john@example.com");
    await wrapper.find("#password").setValue("password123");
    await wrapper.find("#confirmPassword").setValue("password123");
    await wrapper.find("#agreeTerms").setValue(true);

    // Trigger form submit
    await wrapper.find("form").trigger("submit.prevent");

    // During async operation: loading state is active
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes("disabled")).toBeDefined();
    expect(submitButton.text()).toBe("Creating account...");
    expect(wrapper.findComponent(Loader).exists()).toBe(true);

    // Fast-forward simulated API timeout (2000ms)
    await vi.advanceTimersByTimeAsync(2000);

    // After async completion: alerts success and resets loading state
    expect(window.alert).toHaveBeenCalledWith("Registration successful!");
    expect(submitButton.attributes("disabled")).toBeUndefined();
    expect(submitButton.text()).toBe("Sign Up");
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
  });

  it("handles registration failure correctly", async () => {
    // Spy on console.log and make it throw to trigger catch block
    console.log.mockImplementationOnce(() => {
      throw new Error("Simulated registration error");
    });

    const wrapper = mount(Register, {
      global: {
        stubs: {
          RouterLink: true,
          Loader: true,
        },
      },
    });

    await wrapper.find("#firstName").setValue("John");
    await wrapper.find("#lastName").setValue("Doe");
    await wrapper.find("#username").setValue("johndoe");
    await wrapper.find("#email").setValue("john@example.com");
    await wrapper.find("#password").setValue("password123");
    await wrapper.find("#confirmPassword").setValue("password123");
    await wrapper.find("#agreeTerms").setValue(true);

    await wrapper.find("form").trigger("submit.prevent");

    // Check if error is handled in catch block
    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Registration failed. Please try again.");
    
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes("disabled")).toBeUndefined();
    expect(submitButton.text()).toBe("Sign Up");
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
  });
});