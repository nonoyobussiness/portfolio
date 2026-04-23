import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SECTION_TARGETS = {
  about: "about",
  projects: "works",
  connect: "connect",
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(() => {
    const section = new URLSearchParams(window.location.search).get("section");
    return section ?? null;
  });

  const isHomeRoute = location.pathname === "/";

  const locationSection = useMemo(
    () => new URLSearchParams(location.search).get("section"),
    [location.search]
  );

  useEffect(() => {
    setActiveSection(locationSection ?? null);
  }, [locationSection, location.pathname]);

  useEffect(() => {
  if (!isHomeRoute) return;

  const sectionIds = ["home", "about", "works", "connect"];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        // map real section id back to nav section key
        const sectionKey =
          Object.entries(SECTION_TARGETS).find(([, val]) => val === id)?.[0] ?? id;

        setActiveSection(sectionKey === "home" ? null : sectionKey);

        // update URL too
        if (sectionKey === "home") {
          window.history.replaceState({}, "", "/");
        } else {
          const params = new URLSearchParams(window.location.search);
          params.set("section", sectionKey);
          window.history.replaceState({}, "", `/?${params.toString()}`);
        }
      });
    },
    {
      threshold: 0.4, // section must be 40% visible to trigger
    }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, [isHomeRoute]);

  useEffect(() => {
    const syncFromUrl = () => {
      const section = new URLSearchParams(window.location.search).get("section");
      setActiveSection(section ?? null);
    };

    const handleSectionChange = (event) => {
      setActiveSection(event.detail?.section ?? null);
    };

    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("portfolio:sectionchange", handleSectionChange);

    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("portfolio:sectionchange", handleSectionChange);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(SECTION_TARGETS[sectionId] ?? sectionId);
    if (!target) {
      return;
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(target);
      return;
    }

    target.scrollIntoView({ behavior: "smooth" });
  };

  const handleSectionNav = (event, sectionId) => {
    event.preventDefault();

    if (!isHomeRoute) {
      navigate(`/?section=${sectionId}`);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("section", sectionId);
    const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;

    window.history.replaceState(window.history.state, "", nextUrl);
    setActiveSection(sectionId);
    window.dispatchEvent(
      new CustomEvent("portfolio:sectionchange", {
        detail: { section: sectionId },
      })
    );

    requestAnimationFrame(() => scrollToSection(sectionId));
  };

  const isSectionActive = (sectionId) => {
    if (!isHomeRoute) return false;
    if (sectionId === "home") return !activeSection;
    return activeSection === sectionId;
  };

  return (
    <nav id="navbar">
      <NavLink to="/" className="nav-logo">
        V/
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={() => (isSectionActive("home") ? "active" : "")}
            onClick={(event) => {
              event.preventDefault();

              // clear section from URL
              window.history.pushState({}, "", "/");

              // reset your state
              setActiveSection(null);

              // scroll to top
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/?section=about"
            className={() => (isSectionActive("about") ? "active" : "")}
            onClick={(event) => handleSectionNav(event, "about")}
          >
            About Me
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/?section=projects"
            className={() => (isSectionActive("projects") ? "active" : "")}
            onClick={(event) => handleSectionNav(event, "projects")}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/?section=connect"
            className={() => (isSectionActive("connect") ? "active" : "")}
            onClick={(event) => handleSectionNav(event, "connect")}
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="nav-status">
        <div className="dot"></div>
        Available for work
      </div>
    </nav>
  );
}

export default Navbar;
