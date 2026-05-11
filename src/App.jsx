import { useEffect, useRef, useState } from "react";
import React from "react";
const cars = [
  {
    id: 1,
    brand: "Mercedes-Benz",
    model: "GLC 300e Coupé AMG Line",
    image: "/images/19231.jpg",
    gallery: Array.from({ length: 20 }, (_, i) => `/images/${19231 + i}.jpg`),
    year: 2022,
    date: "10-01-2022",
    price: "34 790",
    priceType: "HT",
    km: "91 000",
    fuel: "Hybride rechargeable",
    hp: "300e",
    color: "#C9A84C",
    tag: "Occasion",
    desc: "Mercedes-Benz GLC 300e Coupé AMG Line, mise en circulation le 10-01-2022, avec 91 000 km. Finition AMG Line, motorisation hybride rechargeable, présentation premium.",
  },
  {
    id: 2,
    brand: "Renault",
    model: "Clio Alpine TCe 90",
    image: "/images/19212.jpg",

    gallery: Array.from({ length: 17 }, (_, i) => `/images/${19212 + i}.jpg`),

    year: 2025,
    date: "22-05-2025",

    price: "14 790",
    priceType: "HT",

    km: "8 100",

    fuel: "Essence",
    hp: "90 ch",

    color: "#4A90D9",

    tag: "Occasion",

    desc: "Renault Clio Alpine TCe 90 avec seulement 8 100 km. Finition Alpine moderne, faible consommation et excellent état général.",
  },
  {
    id: 3,

    brand: "Mercedes-Benz",

    model: "GLC Coupé 220d AMG Line",

    image: "/images/19251.jpg",

    gallery: Array.from({ length: 21 }, (_, i) => `/images/${19251 + i}.jpg`),

    year: 2024,

    date: "2024",

    price: "49 790",

    priceType: "HT",

    km: "57 350",

    fuel: "Diesel",

    hp: "197 ch",

    color: "#B8B8B8",

    tag: "Occasion",

    desc: "Mercedes-Benz GLC Coupé 220d AMG Line de 197 ch avec 57 350 km. SUV coupé premium avec finition AMG Line, intérieur haut de gamme et excellente motorisation diesel.",
  },
];

const stats = [
  { val: "350+", label: "Véhicules en stock" },
  { val: "18", label: "Années d'expertise" },
  { val: "4 800+", label: "Clients satisfaits" },
  { val: "98%", label: "Taux de satisfaction" },
];

const services = [
  {
    icon: "🔍",
    title: "Recherche sur mesure",
    desc: "Nous trouvons le véhicule de vos rêves selon vos critères exacts.",
  },
  {
    icon: "📄",
    title: "Démarches administratives",
    desc: "Gestion des documents, plaques, formalités douanières et procédures d’export simplifiées pour un achat sans stress.",
  },
  {
    icon: "🚚",
    title: "Livraison internationale",
    desc: "Livraison possible partout en France et à l’international grâce à notre réseau de transporteurs spécialisés.",
  },
  {
    icon: "🛡️",
    title: "Garantie étendue",
    desc: "Garantie constructeur et extension possible sur nos véhicules certifiés.",
  },
];

function useIntersection(ref) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

function CarImage({ src, alt, height = "100%" }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height,
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C9A84C",
          fontSize: 13,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: "'Rajdhani', sans-serif",
          border: "1px solid #1A1A1A",
        }}
      >
        Image manquante
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      style={{
        width: "100%",
        height,
        objectFit: "cover",
        filter: "brightness(0.9)",
        display: "block",
      }}
    />
  );
}

function StatBlock({ val, label, index }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);

  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.8s ease ${index * 0.15}s`,
      }}
    >
      <p className="stat-value">{val}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

function CarCard({ car, index, onOpen }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="car-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.12}s, border 0.3s, box-shadow 0.3s`,
        borderColor: hover ? "#C9A84C" : "#1E1E1E",
        boxShadow: hover ? "0 0 40px rgba(201,168,76,0.15)" : "none",
      }}
    >
      <div className="car-image-wrap">
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: hover ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <CarImage src={car.image} alt={`${car.brand} ${car.model}`} />
        </div>
        <div className="image-gradient" />
        <span className={`tag tag-${car.tag.toLowerCase()}`}>{car.tag}</span>
      </div>

      <div className="car-content">
        <p className="gold-small">{car.brand}</p>
        <h3>{car.model}</h3>
        <p className="car-meta">
          {car.date} · {car.km} km · {car.fuel}
        </p>
        <p className="car-desc">{car.desc}</p>

        <div className="car-footer">
          <div>
            <p className="price-label">Prix</p>
            <p className="price">
              {car.price} € {car.priceType}
            </p>
          </div>
          <button className="outline-btn" onClick={onOpen}>
            Découvrir →
          </button>
        </div>
      </div>
    </div>
  );
}

function CarModal({ car, onClose }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = car.gallery?.length ? car.gallery : [car.image];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setActiveImage((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActiveImage((prev) => (prev - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image-area">
          <CarImage
            src={images[activeImage]}
            alt={`${car.brand} ${car.model}`}
          />
          <div className="modal-image-gradient" />
          <span className="modal-tag">{car.tag}</span>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                className="gallery-arrow left"
                onClick={() =>
                  setActiveImage(
                    (activeImage - 1 + images.length) % images.length,
                  )
                }
              >
                ‹
              </button>
              <button
                className="gallery-arrow right"
                onClick={() =>
                  setActiveImage((activeImage + 1) % images.length)
                }
              >
                ›
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="thumbs">
            {images.map((img, index) => (
              <button
                key={img}
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
              >
                <CarImage
                  src={img}
                  alt={`${car.model} ${index + 1}`}
                  height="74px"
                />
              </button>
            ))}
          </div>
        )}

        <div className="modal-content">
          <p className="gold-small">{car.brand}</p>
          <h2>{car.model}</h2>
          <p className="modal-meta">
            {car.date} · {car.km} km · {car.fuel} · {car.hp}
          </p>

          <div className="spec-grid">
            {[
              ["Kilométrage", `${car.km} km`],
              ["Mise en circulation", car.date],
              ["Carburant", car.fuel],
              ["Version", car.hp],
              ["Statut", car.tag],
              ["Prix", `${car.price} € ${car.priceType}`],
            ].map(([label, value]) => (
              <div key={label} className="spec-card">
                <p>{label}</p>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <p className="modal-desc">{car.desc}</p>

          <div className="modal-footer">
            <div>
              <p className="price-label">Prix</p>
              <p className="modal-price">
                {car.price} € {car.priceType}
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="gold-btn"
                onClick={() => {
                  onClose();
                  setTimeout(
                    () =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" }),
                    100,
                  );
                }}
              >
                Prendre RDV
              </button>
              <button className="dark-btn" onClick={onClose}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [filter, setFilter] = useState("Tous");
  const [selectedCar, setSelectedCar] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filters = ["Tous", "Nouveau", "Occasion", "Exclusif"];
  const filteredCars =
    filter === "Tous" ? cars : cars.filter((car) => car.tag === filter);
  const navBg = scrollY > 60;

  return (
    <div className="app">
      <style>{globalStyles}</style>

      <nav
        className="navbar"
        style={{
          background: navBg ? "rgba(8,8,8,0.97)" : "transparent",
          borderBottom: navBg ? "1px solid #1A1A1A" : "1px solid transparent",
          backdropFilter: navBg ? "blur(20px)" : "none",
        }}
      >
        <div className="brand">
          <div className="brand-logo">CM</div>
          <span>Cartago Motors</span>
        </div>

        <div className="nav-links">
          {[
            ["Collection", "collection"],
            ["Services", "services"],
            ["À propos", "apropos"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() =>
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="nav-cta"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Prendre RDV
        </button>
      </nav>

      <section className="hero">
        <div
          className="hero-bg"
          style={{ transform: `scale(1.04) translateY(${scrollY * 0.2}px)` }}
        >
          <img
            src="/images/hero.jpg"
            alt="Voiture premium"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="hero-fallback" />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="hero-kicker">
            ✦ &nbsp;Concessionnaire premium depuis 2025
          </p>
          <h1>
            L'excellence
            <br />
            <em>automobile</em>
            <br />à portée de main
          </h1>
          <p className="hero-text">
            Une sélection exclusive de véhicules d'exception. Nos experts vous
            accompagnent dans l'acquisition du véhicule qui vous ressemble.
          </p>
          <div className="hero-actions">
            <button
              className="gold-btn"
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explorer la collection
            </button>
            <button
              className="dark-btn"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatBlock key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </section>

      <section id="collection" className="section">
        <div className="section-title">
          <p className="gold-small">Notre sélection</p>
          <h2>
            Véhicules <em>d'exception</em>
          </h2>
          <div className="filters">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="cars-grid">
          {filteredCars.map((car, index) => (
            <CarCard
              key={car.id}
              car={car}
              index={index}
              onOpen={() => setSelectedCar(car)}
            />
          ))}
        </div>
      </section>

      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      <section className="banner">
        <div className="banner-bg">
          <img
            src="/images/banner.jpg"
            alt="Showroom automobile"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="banner-overlay" />
        <div className="banner-content">
          <p className="gold-small">Expertise exclusive</p>
          <h2>Votre véhicule de rêve n'est pas encore en stock ?</h2>
          <p>
            Notre réseau européen de partenaires nous permet de vous sourcer
            n'importe quel véhicule premium selon vos critères.
          </p>
          <button
            className="gold-btn"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Faire une demande sur mesure
          </button>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-title">
          <p className="gold-small">Ce que nous offrons</p>
          <h2>
            Des <em>services</em> sur mesure
          </h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <span>{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* À PROPOS */}
      <div
        id="apropos"
        style={{
          padding: "120px 6vw",
          background: "#080808",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 30%, rgba(201,168,76,0.08), transparent 40%)",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 70,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <p
              style={{
                color: "#C9A84C",
                fontSize: 10,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                margin: "0 0 18px",
              }}
            >
              À PROPOS DE NOUS
            </p>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 5vw, 68px)",
                fontWeight: 300,
                lineHeight: 1.1,
                margin: "0 0 28px",
                color: "#F5F5F0",
              }}
            >
              L’expertise automobile
              <br />
              <em style={{ color: "#C9A84C", fontStyle: "italic" }}>
                sans frontières
              </em>
            </h2>

            <p
              style={{
                color: "#777",
                fontSize: 15,
                lineHeight: 1.9,
                marginBottom: 28,
              }}
            >
              Cartago Motors est spécialisé dans la vente de véhicules neufs et
              d’occasion premium avec export vers la Tunisie, le Maroc et
              l’Algérie.
            </p>

            <p
              style={{
                color: "#666",
                fontSize: 14,
                lineHeight: 1.9,
                marginBottom: 40,
              }}
            >
              Nous accompagnons nos clients dans toutes les étapes : sélection
              du véhicule, démarches administratives, financement et livraison
              internationale. Notre priorité est de proposer des véhicules
              fiables, transparents et soigneusement sélectionnés.
            </p>

            {/* FEATURES */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 18,
              }}
            >
              {[
                "✔ Véhicules certifiés",
                "✔ Export international",
                "✔ Démarches simplifiées",
                "✔ Accompagnement premium",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0F0F0F",
                    border: "1px solid #1A1A1A",
                    padding: "16px 18px",
                    color: "#AAA",
                    fontSize: 13,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{
              position: "relative",
              height: 520,
              overflow: "hidden",
              border: "1px solid #1A1A1A",
            }}
          >
            <img
              src="/images/logo.jpeg"
              alt="Cartago Motors"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75), transparent 50%)",
              }}
            />

            {/* Overlay box */}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: 24,
                right: 24,
                background: "rgba(10,10,10,0.88)",
                border: "1px solid rgba(201,168,76,0.25)",
                padding: "22px",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                style={{
                  color: "#C9A84C",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  margin: "0 0 10px",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                Cartago Motors
              </p>

              <p
                style={{
                  color: "#DDD",
                  fontSize: 15,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Vente de véhicules neufs et d’occasion avec livraison France &
                international.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <div>
            <p className="gold-small">Nous contacter</p>
            <h2>
              Prenez rendez-vous
              <br />
              <em>avec nos experts</em>
            </h2>
            <p>
              Showroom ouvert du lundi au samedi, 9h–19h. Nos conseillers sont à
              votre disposition pour un accompagnement personnalisé.
            </p>
            <div className="contact-list">
              <span>📍 12 Avenue Foch, 75008 Paris</span>
              <span>📞 +33 1 42 00 00 00</span>
              <span>✉️ contact@cartagomotors.fr</span>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="success-box">
                <div>✓</div>
                <h3>Message envoyé</h3>
                <p>Un conseiller vous recontactera dans les 24h.</p>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label>Nom complet</label>
                <input
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  placeholder="Jean Dupont"
                  required
                />
                <label>Adresse email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  placeholder="jean@exemple.fr"
                  required
                />
                <label>Votre message</label>
                <textarea
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Décrivez votre recherche..."
                  required
                />
                <button className="gold-btn" type="submit">
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="brand small">
          <div className="brand-logo">CM</div>
          <span>Cartago Motors © 2026</span>
        </div>
        <div>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">CGV</a>
        </div>
        <p>SIRET 123 456 789 00010</p>
      </footer>
    </div>
  );
}

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Rajdhani:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: #080808; }
button, input, textarea { font-family: inherit; outline: none; }
button { cursor: pointer; }
::selection { background: #C9A84C; color: #000; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #080808; }
::-webkit-scrollbar-thumb { background: #C9A84C; }
.app { background: #080808; min-height: 100vh; font-family: 'Inter', sans-serif; color: #F5F5F0; overflow-x: hidden; }
.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 70px; padding: 0 6vw; display: flex; align-items: center; justify-content: space-between; transition: all 0.4s; }
.brand { display: flex; align-items: center; gap: 10px; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; letter-spacing: 1px; color: #F5F5F0; }
.brand-logo { width: 32px; height: 32px; border: 1.5px solid #C9A84C; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #C9A84C; font-size: 13px; font-weight: 700; }
.nav-links { display: flex; gap: 40px; }
.nav-links button { color: #888; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Rajdhani', sans-serif; font-weight: 600; background: none; border: none; transition: color 0.2s; }
.nav-links button:hover { color: #C9A84C; }
.nav-cta, .outline-btn { background: transparent; border: 1px solid #C9A84C; color: #C9A84C; padding: 8px 20px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Rajdhani', sans-serif; font-weight: 700; transition: all 0.3s; white-space: nowrap; }
.nav-cta:hover, .outline-btn:hover { background: #C9A84C; color: #000; }
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding-top: 70px; }
.hero-bg { position: absolute; inset: 0; overflow: hidden; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.65); }
.hero-fallback { position: absolute; inset: 0; background: radial-gradient(circle at 70% 55%, rgba(201,168,76,0.14), transparent 38%), #060606; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.65) 50%, rgba(8,8,8,0.9) 100%); }
.hero-content { position: relative; width: 100%; max-width: 1400px; margin: 0 auto; padding: 0 6vw; z-index: 2; }
.hero-kicker, .gold-small { color: #C9A84C; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; font-family: 'Rajdhani', sans-serif; font-weight: 600; margin: 0 0 18px; }
.hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(42px, 5vw, 76px); font-weight: 300; line-height: 1.1; margin: 0 0 24px; max-width: 620px; animation: fadeUp 1s ease 0.15s both; }
.hero h1 em, .section-title em, .contact-section em { font-style: italic; color: #C9A84C; }
.hero-text { color: #999; font-size: 16px; line-height: 1.8; max-width: 480px; margin: 0 0 40px; animation: fadeUp 1s ease 0.3s both; }
.hero-actions { display: flex; gap: 16px; flex-wrap: wrap; animation: fadeUp 1s ease 0.45s both; }
.gold-btn, .dark-btn { border: none; padding: 14px 34px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Rajdhani', sans-serif; font-weight: 700; transition: opacity 0.25s, background 0.25s, color 0.25s; }
.gold-btn { background: #C9A84C; color: #000; }
.gold-btn:hover { opacity: 0.85; }
.dark-btn { background: transparent; color: #777; border: 1px solid #262626; }
.dark-btn:hover { color: #C9A84C; border-color: #C9A84C; }
.stats-section { background: #0D0D0D; border-top: 1px solid #1A1A1A; border-bottom: 1px solid #1A1A1A; padding: 60px 8vw; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
.stat-value { font-size: 52px; font-family: 'Cormorant Garamond', serif; font-weight: 700; color: #C9A84C; margin: 0; line-height: 1; }
.stat-label { color: #666; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 8px 0 0; font-family: 'Rajdhani', sans-serif; }
.section { padding: 100px 6vw; }
.section-title { text-align: center; margin-bottom: 60px; }
.section-title h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 58px); font-weight: 300; margin: 0 0 44px; color: #F5F5F0; }
.filters { display: flex; justify-content: center; gap: 4px; flex-wrap: wrap; }
.filters button { background: transparent; border: 1px solid #2A2A2A; color: #666; padding: 8px 24px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Rajdhani', sans-serif; font-weight: 600; transition: all 0.3s; }
.filters button.active, .filters button:hover { background: #C9A84C; border-color: #C9A84C; color: #000; }
.cars-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
.car-card { background: #0D0D0D; border: 1px solid #1E1E1E; overflow: hidden; cursor: pointer; display: flex; flex-direction: column; }
.car-image-wrap { position: relative; overflow: hidden; height: 250px; background: #080808; }
.image-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.78), transparent 65%); }
.tag { position: absolute; top: 16px; left: 16px; font-size: 10px; font-weight: 700; letter-spacing: 2px; padding: 4px 12px; text-transform: uppercase; font-family: 'Rajdhani', sans-serif; }
.tag-nouveau { background: #C9A84C; color: #000; }
.tag-exclusif { background: #8B0000; color: #000; }
.tag-occasion { background: #1E1E1E; color: #888; }
.car-content { padding: 20px 22px 24px; flex: 1; display: flex; flex-direction: column; gap: 10px; }
.car-content h3 { color: #F5F5F0; font-size: 24px; font-family: 'Cormorant Garamond', serif; font-weight: 600; margin: 4px 0; }
.car-meta { color: #555; font-size: 12px; margin: 0; }
.car-desc { color: #888; font-size: 13px; line-height: 1.6; margin: 0; flex: 1; }
.car-footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 8px; gap: 12px; }
.price-label { color: #444; font-size: 10px; letter-spacing: 1px; margin: 0 0 4px; text-transform: uppercase; }
.price { color: #C9A84C; font-size: 26px; font-family: 'Cormorant Garamond', serif; font-weight: 700; margin: 0; }
.banner { position: relative; padding: 100px 8vw; background: #080808; overflow: hidden; }
.banner-bg { position: absolute; inset: 0; }
.banner-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.45); }
.banner-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.58) 60%, rgba(8,8,8,0.85) 100%); }
.banner-content { position: relative; max-width: 600px; }
.banner h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 300; line-height: 1.2; margin: 0 0 24px; }
.banner p { color: #777; line-height: 1.8; margin: 0 0 34px; }
.services-section { background: #0A0A0A; }
.services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; }
.service-card { padding: 48px 36px; background: #0D0D0D; border-top: 1px solid #1A1A1A; border-left: 1px solid #1A1A1A; transition: background 0.3s; }
.service-card:hover { background: #111; }
.service-card span { font-size: 36px; display: block; margin-bottom: 20px; }
.service-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: #F5F5F0; margin: 0 0 14px; }
.service-card p { color: #666; font-size: 14px; line-height: 1.7; margin: 0; }
.testimonial { padding: 100px 8vw; text-align: center; position: relative; background: radial-gradient(ellipse at center, rgba(201,168,76,0.04), transparent 70%); }
.testimonial > p { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px, 3vw, 38px); font-weight: 300; font-style: italic; line-height: 1.6; max-width: 760px; margin: 0 auto 32px; color: #BBB; }
.client { display: flex; align-items: center; justify-content: center; gap: 14px; }
.client div { width: 44px; height: 44px; border-radius: 50%; background: #1A1A1A; border: 1px solid #C9A84C; display: flex; align-items: center; justify-content: center; color: #C9A84C; font-family: 'Cormorant Garamond', serif; font-weight: 700; }
.client span { text-align: left; display: grid; gap: 3px; }
.client strong { color: #F5F5F0; font-size: 14px; }
.client small { color: #555; letter-spacing: 1px; }
.contact-section { padding: 100px 6vw; background: #0D0D0D; border-top: 1px solid #1A1A1A; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; max-width: 1100px; margin: 0 auto; }
.contact-section h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 3vw, 50px); font-weight: 300; margin: 0 0 30px; }
.contact-section p { color: #666; line-height: 1.8; margin: 0 0 40px; font-size: 15px; }
.contact-list { display: flex; flex-direction: column; gap: 20px; color: #888; font-size: 14px; }
.contact-form { display: flex; flex-direction: column; gap: 12px; }
.contact-form label { color: #555; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Rajdhani', sans-serif; margin-top: 4px; }
.contact-form input, .contact-form textarea { width: 100%; padding: 13px 16px; background: #111; border: 1px solid #1E1E1E; color: #F5F5F0; font-size: 14px; resize: vertical; transition: border-color 0.3s; }
.contact-form input:focus, .contact-form textarea:focus { border-color: #C9A84C; }
.success-box { height: 100%; min-height: 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 18px; }
.success-box div { width: 72px; height: 72px; border-radius: 50%; border: 2px solid #C9A84C; display: flex; align-items: center; justify-content: center; font-size: 32px; }
.success-box h3 { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; margin: 0; color: #C9A84C; }
.success-box p { margin: 0; }
.footer { background: #060606; padding: 40px 6vw; border-top: 1px solid #141414; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
.footer .small { font-size: 13px; color: #444; }
.footer .small .brand-logo { width: 26px; height: 26px; font-size: 11px; }
.footer a { color: #333; font-size: 11px; letter-spacing: 1px; text-decoration: none; font-family: 'Rajdhani', sans-serif; margin-right: 28px; }
.footer a:hover { color: #C9A84C; }
.footer p { color: #2A2A2A; font-size: 11px; margin: 0; font-family: 'Rajdhani', sans-serif; letter-spacing: 1px; }
.modal-overlay { position: fixed; inset: 0; z-index: 999; background: rgba(0,0,0,0.88); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.25s ease; }
.modal-card { background: #0D0D0D; border: 1px solid #222; width: 100%; max-width: 960px; max-height: 92vh; overflow-y: auto; animation: slideUp 0.35s cubic-bezier(.22,1,.36,1); }
.modal-image-area { position: relative; height: 430px; overflow: hidden; background: #080808; }
.modal-image-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,13,13,0.9), transparent 58%); pointer-events: none; }
.modal-tag { position: absolute; top: 18px; left: 18px; background: #1E1E1E; color: #888; font-size: 10px; font-weight: 700; letter-spacing: 2px; padding: 4px 12px; text-transform: uppercase; font-family: 'Rajdhani', sans-serif; }
.close-btn { position: absolute; top: 14px; right: 14px; background: rgba(0,0,0,0.7); border: 1px solid #333; color: #777; width: 34px; height: 34px; font-size: 16px; display: flex; align-items: center; justify-content: center; }
.gallery-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; border: 1px solid rgba(201,168,76,0.45); background: rgba(0,0,0,0.55); color: #C9A84C; font-size: 30px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.gallery-arrow:hover { background: rgba(201,168,76,0.18); }
.gallery-arrow.left { left: 14px; }
.gallery-arrow.right { right: 14px; }
.thumbs { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 8px; padding: 12px; background: #080808; border-bottom: 1px solid #1A1A1A; }
.thumbs button { height: 76px; padding: 0; overflow: hidden; background: transparent; border: 1px solid #222; opacity: 0.55; }
.thumbs button.active { border-color: #C9A84C; opacity: 1; }
.modal-content { padding: 28px 30px 34px; }
.modal-content h2 { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 600; color: #F5F5F0; margin: 0 0 6px; }
.modal-meta { color: #555; font-size: 13px; margin: 0 0 22px; }
.spec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 0 0 24px; }
.spec-card { background: #111; padding: 12px 14px; border-left: 2px solid #C9A84C; }
.spec-card p { color: #444; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 5px; font-family: 'Rajdhani', sans-serif; }
.spec-card strong { color: #DDD; font-size: 13px; font-weight: 500; }
.modal-desc { color: #777; font-size: 14px; line-height: 1.8; margin: 0 0 26px; }
.modal-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #1A1A1A; padding-top: 22px; flex-wrap: wrap; gap: 14px; }
.modal-price { color: #C9A84C; font-size: 36px; font-family: 'Cormorant Garamond', serif; font-weight: 700; margin: 0; }
.modal-actions { display: flex; gap: 10px; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 900px) { .nav-links, .nav-cta { display: none; } .hero { min-height: 88vh; } .stats-grid { grid-template-columns: repeat(2, 1fr); } .contact-grid { grid-template-columns: 1fr; gap: 48px; } .spec-grid { grid-template-columns: repeat(2, 1fr); } .modal-image-area { height: 330px; } }
@media (max-width: 560px) { .navbar { padding: 0 5vw; } .brand span { font-size: 17px; } .section, .contact-section { padding: 76px 5vw; } .cars-grid { grid-template-columns: 1fr; } .stats-grid { grid-template-columns: 1fr; } .footer { align-items: flex-start; flex-direction: column; } .modal-footer, .modal-actions { align-items: stretch; flex-direction: column; width: 100%; } .modal-actions button { width: 100%; } .modal-image-area { height: 260px; } .thumbs { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); } }
`;
