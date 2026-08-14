// ChooseTheme.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ChooseTheme from '../components/ChooseTheme.vue';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = String(value);
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

describe('ChooseTheme.vue', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('renders heading and all available theme buttons', () => {
    const wrapper = mount(ChooseTheme);

    expect(wrapper.find('h3').text()).toBe('Choose Theme');

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(3);

    const buttonLabels = buttons.map((btn) => btn.text().trim());
    expect(buttonLabels).toEqual(['crimson', 'ocean', 'forest']);
  });

  it('displays the default active theme and applies active styling', () => {
    const wrapper = mount(ChooseTheme);

    expect(wrapper.find('p').text()).toContain('Active Theme: crimson');

    const crimsonBtn = wrapper.findAll('button').find((btn) => btn.text().trim() === 'crimson');
    const oceanBtn = wrapper.findAll('button').find((btn) => btn.text().trim() === 'ocean');

    expect(crimsonBtn?.classes()).toContain('bg-primary');
    expect(crimsonBtn?.classes()).toContain('text-white');
    expect(oceanBtn?.classes()).not.toContain('bg-primary');
  });

  it('applies custom inline color styles for inactive theme buttons', () => {
    const wrapper = mount(ChooseTheme);

    const oceanBtn = wrapper.findAll('button').find((btn) => btn.text().trim() === 'ocean');
    const forestBtn = wrapper.findAll('button').find((btn) => btn.text().trim() === 'forest');

    expect(oceanBtn?.attributes('style')).toMatch(/color:\s*(rgb\(52,\s*152,\s*219\)|\#3498db)/i); // #3498DB
    expect(forestBtn?.attributes('style')).toMatch(/color:\s*(rgb\(39,\s*174,\s*96\)|\#27ae60)/i); // #27AE60
  });

  it('updates the theme, active indicator, and document classes when clicked', async () => {
    const wrapper = mount(ChooseTheme);

    const oceanBtn = wrapper.findAll('button').find((btn) => btn.text().trim() === 'ocean');
    await oceanBtn?.trigger('click');

    // Updates active theme text
    expect(wrapper.find('p').text()).toContain('Active Theme: ocean');

    // Updates button styling
    expect(oceanBtn?.classes()).toContain('bg-primary');
    expect(oceanBtn?.classes()).toContain('text-white');

    // Syncs with localStorage and DOM body class
    expect(localStorage.getItem('user-theme')).toBe('ocean');
    expect(document.body.classList.contains('theme-ocean')).toBe(true);
  });

  it('restores theme preference from localStorage on mount', () => {
    localStorage.setItem('user-theme', 'forest');

    const wrapper = mount(ChooseTheme);

    expect(wrapper.find('p').text()).toContain('Active Theme: forest');
    expect(document.body.classList.contains('theme-forest')).toBe(true);
  });
});