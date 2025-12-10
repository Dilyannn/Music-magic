import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NavBar from '../components/common/NavBar';
import { vi } from 'vitest';
import * as UserContextHook from '../hooks/useUserContext';

// Mock the hook
vi.mock('../hooks/useUserContext', () => ({
  useUserContext: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NavBar Component', () => {
  const mockLogoutHandler = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders public links correctly', () => {
    UserContextHook.useUserContext.mockReturnValue({
      isAuthenticated: false,
      logoutHandler: mockLogoutHandler,
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/create/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  it('renders authenticated links correctly', () => {
    UserContextHook.useUserContext.mockReturnValue({
      isAuthenticated: true,
      logoutHandler: mockLogoutHandler,
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText(/create/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  });

  it('calls logoutHandler and navigates on logout', async () => {
    UserContextHook.useUserContext.mockReturnValue({
      isAuthenticated: true,
      logoutHandler: mockLogoutHandler,
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByText(/logout/i);
    fireEvent.click(logoutBtn);

    expect(mockLogoutHandler).toHaveBeenCalled();
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
