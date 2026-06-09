import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, MapPin, Search, Calendar, Wifi, Utensils, Music, Wine, ArrowRight, Video, Image as ImageIcon } from 'lucide-react';
import { SITE, HERO_SLIDES } from '../data/site';
import { media } from '../data/media';
import { ROOMS } from '../data/rooms';
import { HOME_GALLERY } from '../data/galleries';
import './HomePage.scss';

export function HomePage() {
  const [slide, setSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const featuredRoomTypes = [
    {
      label: 'Individual',
      title: 'Habitaciónes individuales',
      description: 'Ideal para viajes de negocios o relajación en solitario.',
      room: ROOMS[0],
    },
    {
      label: 'Pareja',
      title: 'Habitaciónes para parejas',
      description: 'Espacio íntimo con mayor comodidad y vistas al jardín.',
      room: ROOMS[1],
    },
    {
      label: 'Superior',
      title: 'Habitaciónes Familiares',
      description: 'Mayor amplitud, mejores detalles y una experiencia más exclusiva.',
      room: ROOMS[2],
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [isPlaying]);

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero__bg">
          {HERO_SLIDES.map((src, i) => (
            <div
              key={src}
              className={`home-hero__slide ${i === slide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${media(src, 1920, 1080)})` }}
            />
          ))}
          <div className="home-hero__overlay"></div>
        </div>

        <div className="home-hero__content container">
          <span className="home-hero__eyebrow">BIENVENIDO A {SITE.name.toUpperCase()}</span>
          <h1 className="home-hero__title">
            UN PARAÍSO ESCONDIDO<br />ENTRE LA BRISA Y EL LLANO
          </h1>
          <button 
            className="home-hero__play-pause"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pausar slider" : "Reproducir slider"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        <div className="home-hero__booking-bar container">
          <div className="booking-tabs">
            <Link to="/reservar" className="booking-tab">
              <Calendar size={18} />
              <span>Reservar Ahora</span>
            </Link>
            <div className="booking-divider"></div>
            <a href="https://maps.google.com/?q=Casa+Baquero" target="_blank" rel="noreferrer" className="booking-tab">
              <MapPin size={18} />
              <span>¿Cómo llegar a Casa Baquero?</span>
            </a>
            <div className="booking-divider"></div>
            <Link to="/actividades" className="booking-tab">
              <Search size={18} />
              <span>¿Qué hay para hacer?</span>
            </Link>
          </div>
        </div>

        <div className="home-hero__wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* ROOMS SECTION */}
      <section className="home-rooms">
        <div className="container">
          <div className="home-rooms__header">
            <div className="home-rooms__title-area">
              <div className="home-rooms__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4v16M22 4v16M2 8h20M2 12h20M6 8v4M10 8v4M14 8v4M18 8v4" />
                  <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
                  <path d="M12 4v4" />
                  <circle cx="12" cy="2" r="1" />
                  <circle cx="4" cy="2" r="1" />
                  <circle cx="20" cy="2" r="1" />
                </svg>
              </div>
              <div>
                <span className="home-rooms__eyebrow">Conoce nuestras</span>
                <h2 className="home-rooms__title">Habitaciones</h2>
              </div>
            </div>
            <Link to="/habitaciones" className="home-rooms__more">
              <span className="icon-circle"><ArrowRight size={14} /></span> Saber más
            </Link>
          </div>

          <div className="home-rooms__grid">
            {featuredRoomTypes.map((item) => (
              <Link to={`/habitaciones/${item.room.slug}`} key={item.label} className="room-card-v2">
                <img src={media(item.room.images[0], 600, 800)} alt={item.room.name} loading="lazy" />
                <div className="room-card-v2__inner-border"></div>
                <div className="room-card-v2__overlay">
                  <div className="room-card-v2__content">
                    <span className="room-card-v2__category">{item.label}</span>
                    <h3 className="room-card-v2__name">{item.title}</h3>
                    <p className="room-card-v2__description">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="home-services">
        <div className="container">
          <span className="home-services__eyebrow">Servicios diseñados para</span>
          <h2 className="home-services__title">Tu Comodidad y Disfrute</h2>
          
          <div className="home-services__carousel">
            {/* CARDS */}
            <div className="service-card">
              <div className="service-card__icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div>
              <h3 className="service-card__label">Piscina</h3>
            </div>
            <div className="service-card">
              <Wifi size={40} strokeWidth={1.5} className="service-card__icon" />
              <h3 className="service-card__label">WiFi gratis</h3>
            </div>
            <div className="service-card">
              <Utensils size={40} strokeWidth={1.5} className="service-card__icon" />
              <h3 className="service-card__label">Restaurante</h3>
            </div>
            <div className="service-card">
              <Wine size={40} strokeWidth={1.5} className="service-card__icon" />
              <h3 className="service-card__label">Bar & Cócteles</h3>
            </div>
            <div className="service-card">
              <Music size={40} strokeWidth={1.5} className="service-card__icon" />
              <h3 className="service-card__label">Eventos</h3>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCES SECTION */}
      <section className="home-experiences">
        <div className="container">
          <motion.div
            className="home-experiences__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="home-experiences__eyebrow">¿Qué hay para hacer?</span>
            <h2 className="home-experiences__title">Experiencias Inolvidables</h2>
          </motion.div>
          
          <div className="home-experiences__carousel">
            <motion.div
              className="home-experiences__track"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
              }}
            >
              {[
                { title: 'Piscina & Relax', img: HOME_GALLERY[1]?.src || '/images/hotel/piscina.jpg' },
                { title: 'Naturaleza', img: HOME_GALLERY[2]?.src || '/images/hero/hero-1.jpg' },
                { title: 'Zonas BBQ', img: HOME_GALLERY[3]?.src || '/images/hero/hero-2.jpg' },
                { title: 'Deportes', img: HOME_GALLERY[4]?.src || '/images/hotel/piscina.jpg' },
                { title: 'Eventos', img: HOME_GALLERY[5]?.src || '/images/hero/hero-1.jpg' }
              ].map((exp, i) => (
                <motion.div
                  key={i}
                  className="experience-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.22 } }}
                >
                  <img src={media(exp.img, 400, 600)} alt={exp.title} loading="lazy" />
                  <div className="experience-card__overlay">
                    <h3>{exp.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ABOUT SPLIT SECTION */}
      <section className="home-about">
        <div className="home-about__image">
          <img src={media(HOME_GALLERY[2]?.src || '/images/hero/hero-1.jpg', 600, 800)} alt="Casa Baquero de noche" loading="lazy" />
        </div>
        <div className="home-about__content">
          <span className="home-about__eyebrow">Sobre nosotros</span>
          <h2 className="home-about__title">
            Descubre cómo nació este rincón llanero entre familia y tradición
          </h2>
          <Link to="/nosotros" className="home-about__more">
            <span className="icon-circle"><ArrowRight size={14} /></span> Saber más
          </Link>
        </div>
        <div className="home-about__image">
          <img src={media(HOME_GALLERY[5]?.src || '/images/hotel/piscina.jpg', 600, 800)} alt="Restaurante Casa Baquero" loading="lazy" />
        </div>
      </section>

      {/* MAP & INSTAGRAM SECTION */}
      <section className="home-social-map">
        <div className="home-social-map__grid">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4918.1579251056955!2d-73.62187310890273!3d4.178655975401907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2da7e7a8808d%3A0x80b436edd2b61adf!2sFinca%20Hotel%20Casa%20Baquero!5e0!3m2!1ses-419!2sco!4v1780985767044!5m2!1ses-419!2sco" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Casa Baquero"
            ></iframe>
            <div className="map-overlay-card">
              <h3>Finca Hotel Casa Baquero</h3>
              <p>Villavicencio, Meta, Colombia</p>
            </div>
          </div>
          
          <div className="instagram-container">
            <div className="instagram-header">
              <div className="instagram-profile">
                <img src={media('/media/28995/logo-hotel-casa-baquero.png', 80)} alt="Casa Baquero" className="instagram-avatar" />
                <div className="instagram-profile__info">
                  <span className="instagram-handle">@CASABAQUERO</span>
                  <p className="instagram-caption">Sigue el viaje y descubre el Llano desde Casa Baquero.</p>
                </div>
              </div>
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="instagram-follow">
                <ArrowRight size={16} /> SEGUIR
              </a>
            </div>
            <div className="instagram-grid">
              {HOME_GALLERY.slice(0, 8).map((img, i) => (
                <a
                  key={i}
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="instagram-post"
                  aria-label={`Ver más en Instagram ${i + 1}`}
                >
                  <img src={media(img.src, 300, 300)} alt={`Instagram post ${i}`} loading="lazy" />
                  <div className="instagram-post-icon">
                    {i % 3 === 0 ? <Video size={16} /> : (i % 2 === 0 ? <ImageIcon size={16} /> : null)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
