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
            I&apos;m Vatsal - a full-stack developer who obsesses over both the code and how it feels. I build everything from the database up, and I care just as much about the interface at the end of it. 
            <br />
            <br />
            Currently open to exciting freelance projects, collaborations, and full-time
            opportunities.
          </div>
          <div className="about-stats fade-up">
            <div className="stat-box">
              <div className="stat-num">
                2<sup>+</sup>
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
              <div className="stat-text">Full</div>
              <div className="stat-label">Stack ownership</div>
            </div>
            <div className="stat-box">
              <div className="stat-text">Now</div>
              <div className="stat-label">Learning: AI/ML + Python</div>
            </div>
          </div>
          <div className="skill-pills fade-up">
            <div className="pill">React</div>
            <div className="pill">Tailwind</div>
            <div className="pill">MongoDB</div>
            <div className="pill">Figma</div>
            <div className="pill">Next.js</div>
            <div className="pill">UI/UX</div>
            <div className="pill">TypeScript</div>
            <div className="pill">Node.js</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
