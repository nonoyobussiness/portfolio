import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORKS_DATA = [
  {
    number: "01",
    title: "Brand Identity System",
    tags: ["Branding", "Figma", "2024"],
  },
  {
    number: "02",
    title: "E-Commerce Web App",
    tags: ["React", "Tailwind", "Node.js"],
  },
  {
    number: "03",
    title: "Motion-Rich Landing Page",
    tags: ["GSAP", "Lenis", "Three.js"],
  },
  {
    number: "04",
    title: "SaaS Dashboard UI",
    tags: ["UI/UX", "Design System", "Figma"],
  },
  {
    number: "05",
    title: "Personal Dev Tool",
    tags: ["Next.js", "Github", "Open Source"],
  },
];

function Works({ preview = false }) {
  const sourceItems = preview ? WORKS_DATA.slice(0, 3) : WORKS_DATA;
  const [items, setItems] = useState(sourceItems);
  const listRef = useRef(null);

  useEffect(() => {
    setItems(sourceItems);
  }, [preview]);

  const shiftWork = (direction) => {
    if (!listRef.current || items.length < 2) {
      return;
    }

    gsap.to(listRef.current, {
      y: direction * -20,
      opacity: 0.6,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setItems((current) => {
          if (direction > 0) {
            return [...current.slice(1), current[0]];
          }
          return [current[current.length - 1], ...current.slice(0, -1)];
        });

        requestAnimationFrame(() => {
          if (!listRef.current) {
            return;
          }

          gsap.fromTo(
            listRef.current,
            { y: direction * 20, opacity: 0.6 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
          );
        });
      },
    });
  };

  return (
    <>
      <div className="marquee-divider">
        <div className="marquee-inner">
          <div className="marquee-item">
            My Works <span className="sep">✦</span> Selected Projects <span className="sep">✦</span>{" "}
            Case Studies <span className="sep">✦</span> My Works <span className="sep">✦</span>{" "}
            Selected Projects <span className="sep">✦</span>
          </div>
          <div className="marquee-item">
            My Works <span className="sep">✦</span> Selected Projects <span className="sep">✦</span>{" "}
            Case Studies <span className="sep">✦</span> My Works <span className="sep">✦</span>{" "}
            Selected Projects <span className="sep">✦</span>
          </div>
        </div>
      </div>

      <section id="works">
        <div className="works-header">
          <div>
            <div className="section-label">My Works</div>
            <div className="works-heading fade-up">
              Selected
              <br />
              <em>Projects</em>
            </div>
          </div>
          <div className="works-nav">
            <button className="works-nav-btn" onClick={() => shiftWork(-1)}>
              ←
            </button>
            <button className="works-nav-btn" onClick={() => shiftWork(1)}>
              →
            </button>
          </div>
        </div>

        <div className="works-list" id="worksList" ref={listRef}>
          {items.map((item) => (
            <div className="work-item fade-up" key={`${item.number}-${item.title}`}>
              <div className="work-num">{item.number}</div>
              <div className="work-info">
                <div className="work-title">{item.title}</div>
                <div className="work-tags">
                  {item.tags.map((tag) => (
                    <span className="work-tag" key={`${item.title}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="work-arrow">↗</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Works;
