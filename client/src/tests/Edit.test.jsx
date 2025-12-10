import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import Edit from "../components/catalog/crudOperations/Edit";
import { vi } from "vitest";
import useRequest from "../hooks/useRequest";
import { toast } from "react-toastify";

// Mock hooks
vi.mock("../hooks/useRequest", () => ({
  default: vi.fn(),
}));

vi.mock("../components/common/Spinner", () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Edit Component", () => {
  const mockRequest = vi.fn();
  const mockData = {
    _id: "123",
    title: "Existing Song",
    artist: "Existing Artist",
    genre: "Rock",
    duration: "4:00",
    releaseDate: "2022-01-01",
    rating: 4.5,
    imageUrl: "https://example.com/old.jpg",
    description: "Old description",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner initially", () => {
    useRequest.mockReturnValue({
      data: null,
      loading: true,
      request: mockRequest,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/edit/123"]}>
        <Routes>
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders form with initial data", async () => {
    useRequest.mockReturnValue({
      data: mockData,
      loading: false,
      request: mockRequest,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/edit/123"]}>
        <Routes>
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue("Existing Song");
      expect(screen.getByLabelText(/artist/i)).toHaveValue("Existing Artist");
    });
  });

  it("submits updated data", async () => {
    const user = userEvent.setup();

    // Start with loading state
    useRequest.mockReturnValue({
      data: null,
      loading: true,
      request: mockRequest,
      error: null,
    });

    const { rerender } = render(
      <MemoryRouter initialEntries={["/edit/123"]}>
        <Routes>
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    // Switch to loaded state
    useRequest.mockReturnValue({
      data: mockData,
      loading: false,
      request: mockRequest,
      error: null,
    });

    // Force re-render to pick up new hook value
    rerender(
      <MemoryRouter initialEntries={["/edit/123"]}>
        <Routes>
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue("Existing Song");
    });

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Song");

    const submitBtn = screen.getByRole("button", { name: /save changes/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(
        "/data/music/123",
        "PUT",
        expect.objectContaining({
          title: "Updated Song",
          artist: "Existing Artist",
        })
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Music record updated successfully!"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/catalog/123");
    });
  });

  it("redirects to 404 on fetch error", () => {
    useRequest.mockReturnValue({
      data: null,
      loading: false,
      request: mockRequest,
      error: { status: 404 },
    });

    render(
      <MemoryRouter initialEntries={["/edit/123"]}>
        <Routes>
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/404");
  });
});
