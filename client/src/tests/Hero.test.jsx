import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Hero from '../components/home/Hero';
import { vi } from 'vitest';
import scrollToLatest from '../utils/scrollUtil';

// Mock the utility
vi.mock('../utils/scrollUtil', () => ({
  default: vi.fn(),
}));

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.getByText(/discover & share/i)).toBeInTheDocument();
  });

  it('renders the Discover Now link', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /discover now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/catalog');
  });

  it('calls scrollToLatest when Latest Hits button is clicked', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /latest hits/i });
    fireEvent.click(button);
    expect(scrollToLatest).toHaveBeenCalledWith('latest-hits');
  });
});
