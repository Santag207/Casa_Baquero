import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, MapPin, Search, Calendar, Wifi, Utensils, Music, Wine, ArrowRight, Video, Image as ImageIcon } from 'lucide-react';
import { SITE, HERO_SLIDES } from '../data/site';
import { media } from '../data/media';
import { ROOMS } from '../data/rooms';
import { HOME_GALLERY } from '../data/galleries';
import { useLanguage } from '../context/LanguageContext';
import './HomePage.scss';

const EXPERIENCES = [
  { title: 'Piscina & Relax', img: HOME_GALLERY[1]?.src || '/images/hotel/piscina.jpg' },
  { title: 'Naturaleza', img: HOME_GALLERY[2]?.src || '/images/hero/hero-1.jpg' },
  { title: 'Zonas BBQ', img: HOME_GALLERY[3]?.src || '/images/hero/hero-2.jpg' },
  { title: 'Deportes', img: HOME_GALLERY[4]?.src || '/images/hotel/piscina.jpg' },
  { title: 'Eventos', img: HOME_GALLERY[5]?.src || '/images/hero/hero-1.jpg' },
];

export function HomePage() {
  const { t } = useLanguage();
  const [slide, setSlide] = useState(0);
  const [expIndex, setExpIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const featuredRoomTypes = [
    {
      label: t.home.featuredCategory1,
      title: t.home.featuredTitle1,
      description: t.home.featuredDesc1,
      room: ROOMS[0],
    },
    {
      label: t.home.featuredCategory2,
      title: t.home.featuredTitle2,
      description: t.home.featuredDesc2,
      room: ROOMS[1],
    },
    {
      label: t.home.featuredCategory3,
      title: t.home.featuredTitle3,
      description: t.home.featuredDesc3,
      room: ROOMS[2],
    },
  ];

  const heroLines = t.home.heroTitle.split('\n');

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [isPlaying]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;
    const t = setInterval(() => setExpIndex((i) => (i + 1) % EXPERIENCES.length), 4500);
    return () => clearInterval(t);
  }, []);

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
          <span className="home-hero__eyebrow">{t.home.welcome.replace(/\{name\}/g, SITE.name.toUpperCase())}</span>
          <h1 className="home-hero__title">
            {heroLines.map((line, i, arr) => (
              <Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </Fragment>
            ))}
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
              <span>{t.home.bookNow}</span>
            </Link>
            <div className="booking-divider"></div>
            <a href="https://maps.app.goo.gl/8fEbNjr9zU2dLRAYA" target="_blank" rel="noreferrer" className="booking-tab">
              <MapPin size={18} />
              <span>{t.home.howToGet}</span>
            </a>
            <div className="booking-divider"></div>
            <Link to="/actividades" className="booking-tab">
              <Search size={18} />
              <span>{t.home.whatToDo}</span>
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
                <span className="home-rooms__eyebrow">{t.home.roomsEyebrow}</span>
                <h2 className="home-rooms__title">{t.home.roomsTitle}</h2>
              </div>
            </div>
            <Link to="/habitaciones" className="home-rooms__more">
              <span className="icon-circle"><ArrowRight size={14} /></span> {t.home.knowMore}
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
          <span className="home-services__eyebrow">{t.home.servicesEyebrow}</span>
          <h2 className="home-services__title">{t.home.servicesTitle}</h2>
          
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
            <span className="home-experiences__eyebrow">{t.home.experiencesEyebrow}</span>
            <h2 className="home-experiences__title">{t.home.experiencesTitle}</h2>
          </motion.div>

          <div className="home-experiences__carousel">
            <div className="home-experiences__viewport">
              <div
                className="home-experiences__track"
                style={{ transform: `translateX(-${expIndex * 100}%)` }}
              >
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className="experience-card">
                    <img src={media(exp.img, 400, 600)} alt={exp.title} loading="lazy" />
                    <div className="experience-card__overlay">
                      <h3>{exp.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="home-experiences__btn home-experiences__btn--prev"
              aria-label={t.common.previous}
              onClick={() => setExpIndex((i) => (i === 0 ? EXPERIENCES.length - 1 : i - 1))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              type="button"
              className="home-experiences__btn home-experiences__btn--next"
              aria-label={t.common.next}
              onClick={() => setExpIndex((i) => (i === EXPERIENCES.length - 1 ? 0 : i + 1))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>

            <div className="home-experiences__dots">
              {EXPERIENCES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`home-experiences__dot${i === expIndex ? ' home-experiences__dot--active' : ''}`}
                  aria-label={t.common.goTo.replace('{n}', String(i + 1))}
                  onClick={() => setExpIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SPLIT SECTION */}
      <section className="home-about">
        <div className="home-about__image">
          <img src={media(HOME_GALLERY[2]?.src || '/images/hero/hero-1.jpg', 600, 800)} alt={SITE.name} loading="lazy" />
        </div>
        <div className="home-about__content">
          <span className="home-about__eyebrow">{t.home.aboutEyebrow}</span>
          <h2 className="home-about__title">
            {t.home.aboutTitle}
          </h2>
          <Link to="/nosotros" className="home-about__more">
            <span className="icon-circle"><ArrowRight size={14} /></span> {t.home.aboutLink}
          </Link>
        </div>
        <div className="home-about__image">
          <img src={media(HOME_GALLERY[5]?.src || '/images/hotel/piscina.jpg', 600, 800)} alt={SITE.name} loading="lazy" />
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
              title={t.home.mapTitle}
            ></iframe>
            <div className="map-overlay-card">
              <h3>{t.home.mapTitle}</h3>
              <p>{t.home.mapLocation}</p>
            </div>
          </div>
          
          <div className="instagram-container">
            <div className="instagram-header">
              <div className="instagram-profile">
                <img src={media('/media/28995/logo-hotel-casa-baquero.png', 80)} alt={SITE.name} className="instagram-avatar" />
                <div className="instagram-profile__info">
                  <span className="instagram-handle">{t.home.instagramHandle}</span>
                  <p className="instagram-caption">{t.home.instagramCaption}</p>
                </div>
              </div>
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="instagram-follow">
                <ArrowRight size={16} /> {t.home.instagramFollow}
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

      {/* VIRTUAL TOUR SECTION */}
      <section className="home-virtual-tour">
        <div className="container">
          <div id="informacion" className="informacion-block">
            <p>
              <iframe
                className="paniframe"
                name="_pano"
                src="https://webmastersac.com/Tour360fincahotelbaquero/index.html?tour_soundson=false&tour_soundsvolume=0"
                frameBorder="0"
                scrolling="no"
                height="500"
                width="100%"
                allowFullScreen
                allow="autoplay 'none'; microphone 'none'"
              />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
