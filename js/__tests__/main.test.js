import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Search Functionality', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="search-input" type="text">
      <div class="category-card">
        <h3>Test Card 1</h3>
        <p>Description 1</p>
      </div>
      <div class="category-card">
        <h3>Test Card 2</h3>
        <p>Description 2</p>
      </div>
    `;
    require('../main.js');
  });

  test('should filter cards based on search input', () => {
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.category-card');

    fireEvent.input(searchInput, { target: { value: 'card 1' } });

    expect(cards[0].style.display).toBe('block');
    expect(cards[1].style.display).toBe('none');
  });
});

describe('Time Estimates', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="time-estimate" data-minutes="30"></div>
      <div class="time-estimate" data-minutes="90"></div>
    `;
    require('../main.js');
  });

  test('should format time estimates correctly', () => {
    const timeElements = document.querySelectorAll('.time-estimate');
    
    expect(timeElements[0].textContent).toBe('30 minutes');
    expect(timeElements[1].textContent).toBe('1 hour 30 minutes');
  });
});

describe('Mobile Menu', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="mobile-menu-btn" aria-expanded="false"></button>
      <div class="mobile-menu"></div>
    `;
    require('../main.js');
  });

  test('should toggle mobile menu on button click', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    fireEvent.click(menuBtn);

    expect(mobileMenu.classList.contains('active')).toBe(true);
    expect(menuBtn.getAttribute('aria-expanded')).toBe('true');
  });

  test('should close menu when clicking outside', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Open menu first
    fireEvent.click(menuBtn);
    
    // Click outside
    fireEvent.click(document.body);

    expect(mobileMenu.classList.contains('active')).toBe(false);
    expect(menuBtn.getAttribute('aria-expanded')).toBe('false');
  });
});

describe('Favorites Functionality', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <div data-repair-id="repair1">
        <button class="favorite-button" aria-label="Add to favorites">
          <i class="far fa-heart"></i>
        </button>
      </div>
    `;
    require('../main.js');
  });

  test('should add repair to favorites', () => {
    localStorage.getItem.mockReturnValue('[]');
    
    window.addToFavorites('repair1');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'fixbuddy-favorites',
      JSON.stringify(['repair1'])
    );

    const button = document.querySelector('.favorite-button');
    expect(button.innerHTML).toContain('fas fa-heart');
  });

  test('should remove repair from favorites', () => {
    localStorage.getItem.mockReturnValue('["repair1"]');
    
    window.removeFromFavorites('repair1');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'fixbuddy-favorites',
      JSON.stringify([])
    );

    const button = document.querySelector('.favorite-button');
    expect(button.innerHTML).toContain('far fa-heart');
  });
});
