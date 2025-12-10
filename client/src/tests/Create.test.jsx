import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Create from '../components/catalog/crudOperations/Create';
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

describe('Create Component', () => {
  const mockRequest = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    RequestHook.default.mockReturnValue({
      request: mockRequest,
    });
  });

  it('renders create form', () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/artist/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create record/i })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/title/i), { target: { value: 'New Song' } });
    fireEvent.input(screen.getByLabelText(/artist/i), { target: { value: 'New Artist' } });
    fireEvent.input(screen.getByLabelText(/genre/i), { target: { value: 'Pop' } });
    fireEvent.input(screen.getByLabelText(/duration/i), { target: { value: '3:30' } });
    fireEvent.input(screen.getByLabelText(/release date/i), { target: { value: '2023-01-01' } });
    fireEvent.input(screen.getByLabelText(/rating/i), { target: { value: '5' } });
    fireEvent.input(screen.getByLabelText(/image url/i), { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.input(screen.getByLabelText(/description/i), { target: { value: 'Great song' } });

    const submitBtn = screen.getByRole('button', { name: /create record/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith('/data/music', 'POST', expect.objectContaining({
        title: 'New Song',
        artist: 'New Artist',
      }));
      expect(toast.success).toHaveBeenCalledWith('Music record created successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('/catalog');
    });
  });

  it('handles submission error', async () => {
    mockRequest.mockRejectedValue(new Error('Creation failed'));

    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    // Fill required fields to bypass validation
    fireEvent.input(screen.getByLabelText(/title/i), { target: { value: 'New Song' } });
    fireEvent.input(screen.getByLabelText(/artist/i), { target: { value: 'New Artist' } });
    fireEvent.input(screen.getByLabelText(/genre/i), { target: { value: 'Pop' } });
    fireEvent.input(screen.getByLabelText(/duration/i), { target: { value: '3:30' } });
    fireEvent.input(screen.getByLabelText(/release date/i), { target: { value: '2023-01-01' } });
    fireEvent.input(screen.getByLabelText(/rating/i), { target: { value: '5' } });
    fireEvent.input(screen.getByLabelText(/image url/i), { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.input(screen.getByLabelText(/description/i), { target: { value: 'Great song' } });

    const submitBtn = screen.getByRole('button', { name: /create record/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Creation failed');
    });
  });
});
