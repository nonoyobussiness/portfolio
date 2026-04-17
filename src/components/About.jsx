function About() {
  return (
    <section id="about">
      <div className="section-label">About Me</div>
      <div className="about-grid">
        <div className="about-heading slide-right">
          I build things
          <br />
          you don’t
          <br />
          want to <em>leave</em>
        </div>
        <div className="about-right">
          <div className="about-bio fade-up">
            I&apos;m Vatsal — a designer and developer with an eye for detail and a love for things
            that feel <strong>alive on screen</strong>. I blend design intuition with engineering
            precision to build interfaces people actually enjoy using.
            <br />
            <br />
            Currently open to exciting freelance projects, collaborations, and full-time
            opportunities.
          </div>
          <div className="about-stats fade-up">
            <div className="stat-box">
              <div className="stat-num">
                10<sup>+</sup>
              </div>
              <div className="stat-label">Projects shipped</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">
                2<sup>+</sup>
              </div>
              <div className="stat-label">Years experience</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">∞</div>
              <div className="stat-label">Coffee consumed</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">1</div>
              <div className="stat-label">Vision: impact</div>
            </div>
          </div>
          <div className="skill-pills fade-up">
            <div className="pill">React</div>
            <div className="pill">Tailwind</div>
            <div className="pill">GSAP</div>
            <div className="pill">Figma</div>
            <div className="pill">Next.js</div>
            <div className="pill">UI/UX</div>
            <div className="pill">Branding</div>
            <div className="pill">Node.js</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
