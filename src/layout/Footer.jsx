import '../components/Footer/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="app-footer  p-3">
      <p>&copy; {currentYear} Zion. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
