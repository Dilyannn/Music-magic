import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Component', () => {
  it('renders the main heading', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: /music magic/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<About />);
    const description = screen.getByText(/ultimate destination for discovering/i);
    expect(description).toBeInTheDocument();
  });
});
