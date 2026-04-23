import { NavLink, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleScrollLink = (event, sectionId) => {
    event.preventDefault();

    navigate(`/?section=${sectionId}`);

    // ⏳ wait a bit for DOM to update
    setTimeout(() => {
      const target = document.getElementById(sectionId);

      if (!target) return;

      if (window.__lenis) {
        window.__lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // small delay fixes it
  };

  return (
    <>
      <section id="home">
        <div className="bg-word bg-word-1">VATSAL</div>

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-role-row fade-up">
              <div className="role-badge">
                <div className="badge-dot"></div>
                FULL STACK DEVELOPER
              </div>
              <div className="role-badge">
                <div className="badge-dot"></div>
                UI/UX designer
              </div>
            </div>

            <div className="hero-title fade-up">
              <div className="hero-title-line">
                <span>HELLO,</span>
              </div>
              <div className="hero-title-line">
                <span>
                  I AM <span className="serif-it">Vatsal</span>
                </span>
              </div>
            </div>

            <div className="hero-desc fade-up">
              <strong>This started with curiosity. </strong>
              Now it’s a mix of design, code, and a lot of “what if I try this?”
              Somewhere in between, <strong>shit got interesting.</strong>
            </div>  

            <div className="hero-cta-col fade-up">
              <a
                href="#"
                className="btn-primary"
                onClick={(event) => handleScrollLink(event, "connect")}
              >
                <span>Contact Me</span>
                <div className="btn-arrow">↗</div>
              </a>
              <a
                href="#"
                className="btn-primary"
                onClick={(event) => handleScrollLink(event, "works")}
                style={{
                  background: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  color: "var(--white)",
                }}
              >
                <span>View Works</span>
                <div className="btn-arrow">↓</div>
              </a>
            </div>
          </div>

          <div className="hero-visual fade-up">
            <div className="hero-img-wrap fade-up">
              <div className="hero-img-box">
                <img src={`${import.meta.env.BASE_URL}/public/hero-image.png`} />
              </div>
              <div className="hero-doodle doodle-note">that&apos;s me →</div>
              <div className="hero-doodle doodle-arrow">↘</div>
              <div className="hero-doodle doodle-pill doodle-pill-react">Not debugging the hair</div>
              <div className="hero-doodle doodle-pill doodle-pill-design">Centered with feelings</div>
              <div className="hero-doodle doodle-pill doodle-pill-build">This is not AI at all </div>
              <div className="hero-doodle doodle-star doodle-star-one">✦</div>
              <div className="hero-doodle doodle-star doodle-star-two">✦</div>
              <div className="hero-doodle doodle-star doodle-star-three">✧</div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <div className="scroll-text">Scroll</div>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker-track">
          <div className="ticker-item">
            <span className="star">✦</span> React <span className="star">✦</span> Tailwind{" "}
            <span className="star">✦</span> GSAP <span className="star">✦</span> Figma{" "}
            <span className="star">✦</span> UI Design <span className="star">✦</span> Lenis{" "}
            <span className="star">✦</span> Three.js <span className="star">✦</span> Framer{" "}
            <span className="star">✦</span> Branding <span className="star">✦</span>
          </div>
          <div className="ticker-item">
            <span className="star">✦</span> React <span className="star">✦</span> Tailwind{" "}
            <span className="star">✦</span> GSAP <span className="star">✦</span> Figma{" "}
            <span className="star">✦</span> UI Design <span className="star">✦</span> Lenis{" "}
            <span className="star">✦</span> Three.js <span className="star">✦</span> Framer{" "}
            <span className="star">✦</span> Branding <span className="star">✦</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
