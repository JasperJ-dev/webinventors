import { useEffect, useState } from "react";

const initialInvalidFields = {
  name: false,
  email: false,
  message: false,
};

const navItems = [
  { href: "#werk", label: "Werk" },
  { href: "#diensten", label: "Diensten" },
  { href: "#over-ons", label: "Over ons" },
  { href: "#contact", label: "Contact" },
];

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const storedTheme = window.localStorage.getItem("webinventors-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function BrandLogo({ compact = false }) {
  return (
    <span className={compact ? "brand-wordmark is-compact" : "brand-wordmark"} aria-label="Webinventors">
      <span className="brand-wordmark-web">web</span>
      <span className="brand-wordmark-bang">!</span>
      <span className="brand-wordmark-name">inventors</span>
      <span className="brand-wordmark-dot">.</span>
    </span>
  );
}

function Monogram() {
  return (
    <span className="monogram" aria-hidden="true">
      <img className="monogram-img monogram-img--light" src="/icons/icon_light.png" alt="" />
      <img className="monogram-img monogram-img--dark" src="/icons/icon_dark.png" alt="" />
    </span>
  );
}

function Header({ menuOpen, onMenuToggle }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Webinventors home">
          <BrandLogo compact />
        </a>

        <nav className="site-nav" aria-label="Hoofdnavigatie">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="button button-primary header-cta" href="#contact">
            Start een project
          </a>

          <button
            className={menuOpen ? "menu-button is-open" : "menu-button"}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-drawer"
            aria-label={menuOpen ? "Sluit menu" : "Open menu"}
            onClick={onMenuToggle}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function SideMenu({ isOpen, onClose, theme, setTheme }) {
  const isDark = theme === "dark";

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen ? <button className="drawer-scrim" type="button" aria-label="Sluit menu" onClick={onClose}></button> : null}

      <aside className={isOpen ? "menu-drawer is-open" : "menu-drawer"} id="menu-drawer" aria-hidden={!isOpen}>
        <div className="drawer-brand">
          <BrandLogo compact />
          <button className="drawer-close" type="button" aria-label="Sluit menu" onClick={onClose}>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Menu">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={onClose}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="drawer-bottom">
          <div className="drawer-card">
            <Monogram />
            <div>
              <p>web!inventors</p>
              <span>Digital products, clean UI.</span>
            </div>
          </div>

          <button
            className="theme-toggle"
            type="button"
            role="switch"
            aria-checked={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <span>
              <strong>Dark mode</strong>
              <small>{isDark ? "Donkere huisstijl actief" : "Lichte huisstijl actief"}</small>
            </span>
            <span className="theme-switch" aria-hidden="true">
              <span></span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-badge">WEB &bull; APP &bull; SOFTWARE &bull; E-COMMERCE &bull; AUTOMATION</p>
          <h1>
            Digitale producten die <span>werken.</span>
          </h1>
          <p className="hero-text">
            Webinventors bouwt websites, apps en software op maat voor startups en ambitieus MKB. Van
            eerste schets tot oplevering, inclusief doorontwikkeling daarna.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Plan een kennismaking
            </a>
            <a className="button button-secondary" href="#werk">
              Bekijk ons werk
            </a>
          </div>

          <ul className="hero-stats" aria-label="Bedrijfsstatistieken">
            <li>
              <strong>12+</strong>
              <span>Jaar ervaring</span>
            </li>
            <li>
              <strong>60+</strong>
              <span>Projecten</span>
            </li>
            <li>
              <strong>NL</strong>
              <span>Based team</span>
            </li>
          </ul>
        </div>

        <div className="hero-panel" aria-label="Overzicht van diensten">
          <div className="panel-shell">
            <div className="panel-header">
              <Monogram />
              <BrandLogo compact />
            </div>

            <div className="code-block" aria-hidden="true">
              <p><span className="token-blue">function</span> buildProduct() {"{"}</p>
              <p className="token-muted">&nbsp;&nbsp;// wat heb je nodig?</p>
              <p>
                &nbsp;&nbsp;<span className="token-blue">const</span> idea = await listen();
              </p>
              <p>
                &nbsp;&nbsp;<span className="token-blue">const</span> mvp = design(idea);
              </p>
              <p>
                &nbsp;&nbsp;<span className="token-blue">return</span> ship(mvp);
              </p>
              <p>{"}"}</p>
            </div>

            <div className="service-list">
              <article className="service-card is-active">
                <div className="service-card-header">
                  <span className="service-index">01</span>
                  <h2>Webdevelopment</h2>
                </div>
                <p>Next.js &bull; Remix &bull; Headless</p>
              </article>

              <article className="service-card">
                <div className="service-card-header">
                  <span className="service-index">02</span>
                  <h2>App development</h2>
                </div>
                <p>iOS &bull; Android &bull; React Native</p>
              </article>

              <article className="service-card">
                <div className="service-card-header">
                  <span className="service-index">03</span>
                  <h2>Software op maat</h2>
                </div>
                <p>SaaS &bull; Interne tools &bull; API's</p>
              </article>

              <article className="service-card">
                <div className="service-card-header">
                  <span className="service-index">04</span>
                  <h2>Onderhoud</h2>
                </div>
                <p>SLA &bull; Doorontwikkeling</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section className="section" id="werk">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Werk</p>
          <h2>Projecten die van idee naar resultaat gingen</h2>
          <p>Kleine teams, korte lijnen en een duidelijke focus op conversie, performance en beheerbaarheid.</p>
        </div>

        <div className="work-grid">
          <article className="work-card">
            <span>Platform</span>
            <h3>Klantportaal voor een logistieke scale-up</h3>
            <p>Realtime tracking, documentbeheer en een dashboard waarmee supporttickets halveerde.</p>
          </article>
          <article className="work-card">
            <span>Webshop</span>
            <h3>Headless commerce voor een nichemerk</h3>
            <p>Snellere laadtijden, hogere mobiele conversie en een contentflow zonder technische bottlenecks.</p>
          </article>
          <article className="work-card">
            <span>App</span>
            <h3>Operations app voor een serviceteam</h3>
            <p>Planning, foto-uploads en offline sync in een app die monteurs dagelijks gebruiken.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section section-alt" id="diensten">
      <div className="container services-grid">
        <div className="section-heading">
          <p className="eyebrow">Diensten</p>
          <h2>Van strategie tot stabiele oplevering</h2>
          <p>We combineren ontwerp, development en technische keuzes die passen bij je team en groeifase.</p>
        </div>

        <div className="service-columns">
          <article>
            <Monogram />
            <h3>Discovery &amp; UX</h3>
            <p>Workshops, flows, wireframes en duidelijke keuzes voordat er gebouwd wordt.</p>
          </article>
          <article>
            <Monogram />
            <h3>Build &amp; Launch</h3>
            <p>Moderne frontends, solide backends en deployments die niet fragiel aanvoelen.</p>
          </article>
          <article>
            <Monogram />
            <h3>Support &amp; Groei</h3>
            <p>Monitoring, iteraties en doorontwikkeling op basis van echte gebruikerssignalen.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section" id="over-ons">
      <div className="container about-grid">
        <div className="section-heading">
          <p className="eyebrow">Over ons</p>
          <h2>Een klein team dat technische vaart belangrijker vindt dan overhead</h2>
        </div>
        <div className="about-copy">
          <p>
            Webinventors werkt direct met oprichters, marketingteams en operationele stakeholders. Geen lagen
            ertussen, wel duidelijke keuzes en transparante voortgang.
          </p>
          <p>
            We helpen bij nieuwe proposities, redesigns en interne software die processen sneller en
            overzichtelijker maakt.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [invalidFields, setInvalidFields] = useState(initialInvalidFields);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name") || "").trim();
    const email = String(fields.get("email") || "").trim();
    const message = String(fields.get("message") || "").trim();
    const isInvalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const nextInvalidFields = {
      name: !name,
      email: !email || isInvalidEmail,
      message: !message,
    };
    const hasErrors = Object.values(nextInvalidFields).some(Boolean);

    setInvalidFields(nextInvalidFields);

    if (hasErrors) {
      setStatus({
        type: "error",
        message: "Vul alle velden correct in voordat je verstuurt.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: `Bedankt ${name}, je aanvraag staat klaar om verder opgepakt te worden.`,
    });
    setInvalidFields(initialInvalidFields);
    form.reset();
  };

  return (
    <section className="section section-contact" id="contact">
      <div className="container contact-grid">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Vertel kort wat je wilt bouwen</h2>
          <p>
            Laat een korte briefing achter. De pagina valideert je invoer direct en toont een bevestiging
            zonder backend.
          </p>
          <a className="text-link" href="mailto:hello@webinventors.nl">
            hello@webinventors.nl
          </a>
        </div>

        <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit}>
          <label>
            Naam
            <input
              className={invalidFields.name ? "is-invalid" : ""}
              type="text"
              name="name"
              placeholder="Je naam"
              required
            />
          </label>
          <label>
            E-mail
            <input
              className={invalidFields.email ? "is-invalid" : ""}
              type="email"
              name="email"
              placeholder="naam@bedrijf.nl"
              required
            />
          </label>
          <label>
            Project
            <textarea
              className={invalidFields.message ? "is-invalid" : ""}
              name="message"
              rows="5"
              placeholder="Wat wil je laten bouwen?"
              required
            ></textarea>
          </label>
          <button className="button button-primary" type="submit">
            Verstuur aanvraag
          </button>
          <p
            className={status.type ? `form-status is-${status.type}` : "form-status"}
            id="form-status"
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem("webinventors-theme", theme);
    } catch {
      // Persisting the preference is a progressive enhancement.
    }
  }, [theme]);

  return (
    <>
      <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((current) => !current)} />

      <main id="top">
        <Hero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>&copy; {new Date().getFullYear()} Webinventors</p>
          <a href="mailto:hello@webinventors.nl">hello@webinventors.nl</a>
        </div>
      </footer>

      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        theme={theme}
        setTheme={setTheme}
      />
    </>
  );
}
