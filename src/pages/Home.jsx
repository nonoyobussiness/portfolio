import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Works from "../components/Works";
import Connect from "../components/Connect";
import Footer from "../components/Footer";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = new URLSearchParams(location.search).get("section");

    if (!sectionId) {
      return;
    }

    const scrollToTarget = () => {
      const target = document.getElementById(sectionId);
      if (!target) {
        return;
      }

      if (window.__lenis) {
        window.__lenis.scrollTo(target);
        return;
      }

      target.scrollIntoView({ behavior: "smooth" });
    };

    const timer = window.setTimeout(scrollToTarget, 50);
    return () => window.clearTimeout(timer);
  }, [location.search]);

  return (
    <>
      <Hero />
      <About />
      <Works preview />
      <Connect />
      <Footer />
    </>
  );
}

export default Home;
