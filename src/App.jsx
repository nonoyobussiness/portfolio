import { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    window.__lenis = lenis;

    let rafId = 0;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");

    if (!cursor || !follower) {
      return undefined;
    }

    const handleMove = (event) => {
      gsap.to(cursor, { x: event.clientX - 7, y: event.clientY - 7, duration: 0.1 });
      gsap.to(follower, { x: event.clientX - 20, y: event.clientY - 20, duration: 0.45 });
    };

    const interactiveElements = Array.from(
      document.querySelectorAll("a, button, .work-item, .pill, .love-pill")
    );

    const enterHandlers = interactiveElements.map((element) => {
      const handleEnter = () => gsap.to(cursor, { scale: 2.5, duration: 0.3 });
      const handleLeave = () => gsap.to(cursor, { scale: 1, duration: 0.3 });
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
      return { element, handleEnter, handleLeave };
    });

    document.addEventListener("mousemove", handleMove);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      enterHandlers.forEach(({ element, handleEnter, handleLeave }) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [location.pathname, location.search]);

  useLayoutEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        const loader = document.getElementById("loader");
        if (loader) {
          loader.style.pointerEvents = "none";
        }
        setIsLoaded(true);
      },
    });

    timeline
      .from("#loader-text span", {
        y: 120,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power4.out",
      })
      .from(
        "#loader-sub",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to("#loader", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.6,
      })
      .from(
        "#navbar",
        {
          y: -60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => timeline.kill();
  }, []);

  useLayoutEffect(() => {
    if (!isLoaded) {
      return undefined;
    }

    const existingTriggers = ScrollTrigger.getAll();
    existingTriggers.forEach((trigger) => trigger.kill());

    const ctx = gsap.context(() => {
      gsap.set(".fade-up", { opacity: 0, y: 60 });
      gsap.set(".fade-in", { opacity: 0 });
      gsap.set(".slide-right", { opacity: 0, x: -60 });

      if (document.querySelector("#home .fade-up")) {
        gsap.to("#home .fade-up", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      if (document.querySelector(".bg-word-1")) {
        gsap.to(".bg-word-1", {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (document.querySelector("#about .fade-up")) {
        gsap.to("#about .fade-up", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
          },
        });
      }

      if (document.querySelector("#about .slide-right")) {
        gsap.to("#about .slide-right", {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
          },
        });
      }

      if (document.querySelector("#works .fade-up")) {
        gsap.to("#works .fade-up", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#works",
            start: "top 70%",
          },
        });
      }

      if (document.querySelector("#connect .fade-up")) {
        gsap.to("#connect .fade-up", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#connect",
            start: "top 75%",
          },
        });
      }

      document.querySelectorAll(".work-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    });

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoaded, location.pathname]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const hasSection = new URLSearchParams(location.search).get("section");
    if (location.pathname === "/projects" || !hasSection) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [isLoaded, location.pathname, location.search]);

  return (
    <>
      <Cursor />
      <Loader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
