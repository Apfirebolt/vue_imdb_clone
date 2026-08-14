// Header.spec.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '../components/HeaderComponent.vue'; // Adjust the import path as needed

describe('Header.vue', () => {
  const expectedLinks = [
    { name: 'Home', href: '/' },
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
    { name: 'About', href: '/about' },
    { name: 'Movies', href: '/movies' },
    { name: 'Shows', href: '/shows' },
    { name: 'Indian Movies', href: '/indian-movies' },
  ];

  beforeEach(() => {
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders branding title and logo correctly', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    expect(wrapper.text()).toContain('IMDB');
    expect(wrapper.text()).toContain('Movies');
  });

  it('renders all navigation router-links with correct target routes', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    });

    const renderedLinks = wrapper.findAll('a');

    expectedLinks.forEach((link) => {
      const match = renderedLinks.find(
        (el) => el.text().trim() === link.name && el.attributes('href') === link.href
      );
      expect(match).toBeDefined();
    });
  });

  it('registers scroll listener on mount and checks initial scroll position', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    mount(Header, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('applies default gradient styling when window is at the top (scrollY <= 100)', () => {
    window.scrollY = 0;

    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    const nav = wrapper.find('nav');
    expect(nav.classes()).toContain('bg-gradient-to-r');
    expect(nav.classes()).not.toContain('shadow-lg');
  });

  it('updates classes dynamically when window is scrolled down (scrollY > 100)', async () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    const nav = wrapper.find('nav');
    expect(nav.classes()).toContain('bg-gradient-to-r');

    // Simulate scrolling past 100px
    window.scrollY = 150;
    window.dispatchEvent(new Event('scroll'));
    await wrapper.vm.$nextTick();

    expect(nav.classes()).toContain('shadow-lg');
    expect(nav.classes()).toContain('bg-dark/95');
    expect(nav.classes()).not.toContain('bg-gradient-to-r');
  });

  it('toggles mobile menu disclosure button state when clicked', async () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);

    // Initial state: menu is closed, screen reader text exists
    expect(wrapper.find('span.sr-only').text()).toBe('Open main menu');

    // Click to open Headless UI Disclosure
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    // Verify panel content is visible/accessible
    const panel = wrapper.findComponent({ name: 'DisclosurePanel' });
    expect(panel.exists()).toBe(true);
  });
});