import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DetailsHeader from '../components/catalog/SongDetails/DetailsHeader';
import { vi } from 'vitest';
import * as RequestHook from '../hooks/useRequest';
import { toast } from 'react-toastify';

// Mock hooks
vi.mock('../hooks/useRequest', () => ({
  default: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('DetailsHeader Component', () => {
  const mockRequest = vi.fn();
  const mockMusic = {
    title: 'Test Song',
    artist: 'Test Artist',
    genre: 'Pop',
    releaseDate: '2023-01-01',
    duration: '3:30',
    rating: 5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    RequestHook.default.mockReturnValue({
      request: mockRequest,
    });
  });

  it('renders delete button for owner', () => {
    render(
      <MemoryRouter>
        <DetailsHeader music={mockMusic} isOwner={true} id="123" />
      </MemoryRouter>
    );

    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
  });

  it('does not render delete button for non-owner', () => {
    render(
      <MemoryRouter>
        <DetailsHeader music={mockMusic} isOwner={false} id="123" />
      </MemoryRouter>
    );

    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/edit/i)).not.toBeInTheDocument();
  });

  it('handles delete confirmation and success', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(
      <MemoryRouter>
        <DetailsHeader music={mockMusic} isOwner={true} id="123" />
      </MemoryRouter>
    );

    const deleteBtn = screen.getByText(/delete/i);
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('Are you sure'));
    
    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith('/data/music/123', 'DELETE');
      expect(toast.success).toHaveBeenCalledWith('Music record deleted successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('/catalog');
    });
  });

  it('cancels delete when not confirmed', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    render(
      <MemoryRouter>
        <DetailsHeader music={mockMusic} isOwner={true} id="123" />
      </MemoryRouter>
    );

    const deleteBtn = screen.getByText(/delete/i);
    fireEvent.click(deleteBtn);

    expect(mockRequest).not.toHaveBeenCalled();
  });
});
