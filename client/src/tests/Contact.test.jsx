import { render, screen } from '@testing-library/react';
import Contact from '../components/Contact';

describe('Contact Component', () => {
  it('renders the Get in Touch heading', () => {
    render(<Contact />);
    const heading = screen.getByRole('heading', { name: /get in touch/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the github profile link', () => {
    render(<Contact />);
    const link = screen.getByRole('link', { name: /dilyan yanev/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/Dilyannn');
  });
});
