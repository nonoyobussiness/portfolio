import { useRef, useState } from "react";
import gsap from "gsap";

const WORKS_DATA = [
  {
    number: "01",
    title: "PRTU TS - Teachers Portal",
    tags: ["UI/UX", "Figma", "2025"],
    live: "https://play.google.com/store/apps/details?id=com.tjkreddy.prtutsmanagement"
  },
  {
    number: "02",
    title: "University Auction System",
    tags: ["React", "Tailwind", "Node.js", "Redis", "Socket.io", "2026"],
    github: "https://github.com/nonoyobussiness/uni-bid-exchange"
  },
  {
    number: "03",
    title: "Candidate resume ranker",
    tags: ["Python", "Embeddings filtering", "FAISS", "Recommender system", "2026"],
    github: "https://github.com/nonoyobussiness/redrob-candidate-ranker"
  },
  {
    number: "04",
    title: "Sentinal1 Flood detection pipeline",
    tags: ["Python", "Data Analysis"],
    github:"https://github.com/nonoyobussiness/sentinal1-flood-detection-pipeline"
  },
  {
    number: "05",
    title: "Human annotator disagreement predictor",
    tags: ["ML", "Python"],
    github:"https://github.com/nonoyobussiness/human_annotator_disagreement_predictor"
  },
];

const PAGE_SIZE = 3;

function Works({ preview = false }) {
  const [page, setPage] = useState(0);
  const [gsapItems, setGsapItems] = useState(WORKS_DATA);
  const listRef = useRef(null);

  const items = preview
  ? WORKS_DATA.slice(
      page * PAGE_SIZE,
      page * PAGE_SIZE + PAGE_SIZE
    )
  : gsapItems;

  const shiftWork = (direction) => {
    if (preview) {
      setPage((prev) => {
        const totalPages = Math.ceil(WORKS_DATA.length / PAGE_SIZE);

        let next = prev + direction;

        if (next < 0) next = 0;
        if (next >= totalPages) next = totalPages - 1;

        return next;
      });
      return;
    }

    if (!listRef.current || gsapItems.length < 2) return;

    gsap.to(listRef.current, {
      y: direction * -20,
      opacity: 0.6,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setGsapItems((current) => {
          if (direction > 0) return [...current.slice(1), current[0]];
          return [current[current.length - 1], ...current.slice(0, -1)];
        });

        requestAnimationFrame(() => {
          if (!listRef.current) return;

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
            <button
              className="works-nav-btn"
              onClick={() => shiftWork(-1)}
            >
              ←
            </button>
            <button
              className="works-nav-btn"
              onClick={() => shiftWork(1)}
            >
              →
            </button>
          </div>
        </div>

        <div className="works-list" ref={listRef}>
          {items.map((item) => {
            const hasLink = item.live || item.github;

            return (
              <a
                href={hasLink ? item.live || item.github : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="work-item fade-up"
                key={`${item.number}-${item.title}`}
                style={{
                  pointerEvents:"auto",
                  opacity: 1,
                }}
              >
                <div className="work-num">{item.number}</div>

                <div className="work-info">
                  <div className="work-title">{item.title}</div>

                  <div className="work-tags">
                    {item.tags.map((tag) => (
                      <span
                        className="work-tag"
                        key={`${item.title}-${tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Works;
