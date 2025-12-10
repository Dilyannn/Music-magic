import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Register from '../components/auth/Register';
import { vi } from 'vitest';
import * as UserContextHook from '../hooks/useUserContext';
import { toast } from 'react-toastify';

// Mock hooks
vi.mock('../hooks/useUserContext', () => ({
  useUserContext: vi.fn(),
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

describe('Register Component', () => {
  const mockRegisterHandler = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    UserContextHook.useUserContext.mockReturnValue({
      registerHandler: mockRegisterHandler,
    });
  });

  it('renders register form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('validates password mismatch', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'mismatch' },
    });

    const submitBtn = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/your passwords do no match/i)).toBeInTheDocument();
    });
  });

  it('calls registerHandler on successful submission', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    const submitBtn = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockRegisterHandler).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(toast.success).toHaveBeenCalledWith('Account created successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
