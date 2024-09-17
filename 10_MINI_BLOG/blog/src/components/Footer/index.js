import "./styles.css";
const Footer = () => {
  const dateNow = new Date();
  const currentYear = dateNow.getFullYear();

  return (
    <footer className="footer">
      <h3>Escreve sobre o que você tem interesse...</h3>
      <p>Mini Blog &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
