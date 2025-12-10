function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-800 mt-auto">
      <p>&copy; {currentYear} Music Magic. All rights reserved.</p>
    </footer>
  );
}

export default Footer;