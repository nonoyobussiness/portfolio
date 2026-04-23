function Connect() {
  return (
    <section id="connect">
      <div className="section-label">Contact Me</div>
      <div className="connect-heading fade-up">
        Let&apos;s
        <br />
        <em>Connect</em>
      </div>

      <div className="connect-loves fade-up">
        <div className="connect-loves-label">I love to work in</div>
        <div className="loves-pills">
          <div className="love-pill">React</div>
          <div className="love-pill">Tailwind</div>
          <div className="love-pill">Motion design</div>
          <div className="love-pill">Figma/Framer</div>
          <div className="love-pill">AI/ML</div>
          <div className="love-pill">Python</div>
          <div className="love-pill">UI/UX</div>
          <div className="love-pill">Next.js/Node.js</div>
          <div className="love-pill">C/C++</div>
        </div>
      </div>

      <div className="connect-links fade-up">
        <a
          href="mailto:sreevathsal2006@gmail.com?subject=Let's%20Work%20Together&body=Hi%20Vatsal%2C%20I%20came%20across%20your%20portfolio..."
          className="connect-link primary"
          title="Send me an email"
        >
          ✉ Mail Me
        </a>
        <a href="https://github.com/nonoyobussiness" target="_blank" rel="noreferrer" className="connect-link" title="plss plss plss dont click ;b">
          ⌥ GitHub
        </a>
        <a
          href="https://linkedin.com/in/sree-vathsal-067838327"
          target="_blank"
          rel="noreferrer"
          className="connect-link"
          title="i dont use it much but you can still connect"
        >
          ↗ LinkedIn
        </a>
        <a
          href={`${import.meta.env.BASE_URL}/Sreevathsal-se23ucse081-Resume.pdf`}
          target="_blank"
          rel="noreferrer"
          className="connect-link"
        >
          Resume
        </a>
      </div>

      <div className="connect-location fade-up">📍 Hyderabad, India - Open to Remote</div>
    </section>
  );
}

export default Connect;
