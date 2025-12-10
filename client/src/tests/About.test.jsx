import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Component', () => {
  it('renders the About Us heading', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: /about us/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<About />);
    const description = screen.getByText(/passionate about music/i);
    expect(description).toBeInTheDocument();
  });
});
