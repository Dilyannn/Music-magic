import { render, screen } from '@testing-library/react';
import Contact from '../components/Contact';

describe('Contact Component', () => {
  it('renders the Contact Us heading', () => {
    render(<Contact />);
    const heading = screen.getByRole('heading', { name: /contact us/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the email address', () => {
    render(<Contact />);
    const email = screen.getByText(/support@musicmagic.com/i);
    expect(email).toBeInTheDocument();
  });
});
