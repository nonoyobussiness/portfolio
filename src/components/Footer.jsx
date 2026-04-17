import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackToTop = (event) => {
    event.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="logo">V/</div>
      <div className="copy">© 2024 Vatsal. Crafted with obsession.</div>
      <NavLink to="/" className="back-top" onClick={handleBackToTop}>
        Back to top ↑
      </NavLink>
    </footer>
  );
}

export default Footer;
