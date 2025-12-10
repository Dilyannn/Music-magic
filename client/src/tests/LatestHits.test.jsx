import { render, screen } from '@testing-library/react';
import LatestHits from '../components/home/LatestHits';
import { vi } from 'vitest';
import * as RequestHook from '../hooks/useRequest';

// Mock hooks and components
vi.mock('../hooks/useRequest', () => ({
  default: vi.fn(),
}));

vi.mock('../components/common/MusicCard', () => ({
  default: ({ title }) => <div data-testid="music-card">{title}</div>,
}));

vi.mock('../components/common/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('LatestHits Component', () => {
  it('renders loading spinner when loading', () => {
    RequestHook.default.mockReturnValue({
      data: [],
      loading: true,
    });

    render(<LatestHits />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders music cards when data is present', () => {
    const mockMusic = [
      { _id: '1', title: 'Song 1' },
      { _id: '2', title: 'Song 2' },
    ];
    RequestHook.default.mockReturnValue({
      data: mockMusic,
      loading: false,
    });

    render(<LatestHits />);
    expect(screen.getAllByTestId('music-card')).toHaveLength(2);
    expect(screen.getByText('Song 1')).toBeInTheDocument();
  });

  it('renders no hits found message when data is empty', () => {
    RequestHook.default.mockReturnValue({
      data: [],
      loading: false,
    });

    render(<LatestHits />);
    expect(screen.getByText(/no hits found/i)).toBeInTheDocument();
  });
});
