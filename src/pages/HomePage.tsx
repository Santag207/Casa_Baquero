import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { SITE, HERO_SLIDES, HOME_BLOCKS, FACILITIES_TEXT } from '../data/site';
import { media } from '../data/media';
import { ROOMS } from '../data/rooms';
import { HOME_GALLERY } from '../data/galleries';
import { RoomCard } from '../components/rooms/RoomCard';
import { PhotoGallery } from '../components/gallery/PhotoGallery';
import { SectionHeader } from '../components/ui/SectionHeader';
import { HeroSearch } from '../components/ui/HeroSearch';
import './HomePage.scss';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

const fadeUpTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
};

export function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="home">
      <section className="home-hero" aria-label="Bienvenida">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={src}
            className={`home-hero__slide ${i === slide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${media(src, 1920, 1080)})` }}
          />
        ))}
        <div className="home-hero__content container">
          <motion.span
            className="home-hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Finca Hotel · Villavicencio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            El refugio perfecto en el corazón del Llano
          </motion.h1>
          <motion.p
            className="home-hero__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Naturaleza, confort y tradición se encuentran en Casa Baquero.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="home-hero__actions"
          >
            <HeroSearch />
            <Link to="/habitaciones" className="btn btn--outline-light">
              Descubrir habitaciones
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="home-hero__search-container container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HeroSearch />
        </motion.div>
      </section>

      <section className="home-intro section-pad">
        <div className="container home-intro__grid">
          <motion.p
            className="home-intro__text"
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeUpTransition}
          >
            "Ubicado a solo 10 minutos de Villavicencio, nuestro hotel ofrece la paz del campo con la comodidad que mereces."
          </motion.p>
          <motion.p
            className="home-intro__text"
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...fadeUpTransition, delay: 0.2 }}
          >
            {FACILITIES_TEXT[0]}
          </motion.p>
        </div>
      </section>

      {HOME_BLOCKS.map((block, i) => (
        <section
          key={block.subtitle}
          className={`home-editorial ${i % 2 ? 'home-editorial--reverse' : ''}`}
        >
          <div className="home-editorial__media">
            <motion.img
              src={media(block.image, 1200, 1200)}
              alt=""
              loading="lazy"
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
          </div>
          <motion.div
            className="home-editorial__copy"
            initial={{ opacity: 0, x: i % 2 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="section-header__eyebrow">{block.title}</span>
            <h2>{block.subtitle}</h2>
            <p>{block.text}</p>
            <Link to={block.cta.to} className="home-editorial__link">
              Explorar más
            </Link>
          </motion.div>
        </section>
      ))}

      <section id="habitaciones" className="section-pad home-rooms">
        <div className="container">
          <SectionHeader
            eyebrow="Alojamiento"
            title="Habitaciones & Suites"
            subtitle="Espacios diseñados para fundirse con el paisaje llanero."
            align="center"
          />
          <div className="home-rooms__scroll">
            {ROOMS.slice(0, 3).map((r, i) => (
              <RoomCard key={r.slug} room={r} index={i} />
            ))}
          </div>
          <motion.div
            className="home-rooms__footer"
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeUpTransition}
          >
            <Link to="/habitaciones" className="btn btn--outline">
              Ver todas las opciones
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="home-tour">
        <div className="home-tour__frame">
          <iframe
            title="Tour virtual"
            src={SITE.kuulaTour}
            allow="xr-spatial-tracking; gyroscope; accelerometer"
            allowFullScreen
          />
        </div>
      </section>

      <section className="section-pad home-story">
        <div className="container home-story__grid">
          <motion.div
            className="home-story__copy"
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeUpTransition}
          >
            <SectionHeader
              eyebrow="Nuestra Finca"
              title="Tradición y Hospitalidad"
            />
            <p>{FACILITIES_TEXT[1]}</p>
            <p>{FACILITIES_TEXT[2]}</p>
            <div style={{ marginTop: '3rem' }}>
              <Link to="/eventos" className="btn btn--primary">
                Eventos y Celebraciones
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="home-story__gallery"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <PhotoGallery photos={HOME_GALLERY.slice(0, 4)} columns={2} />
          </motion.div>
        </div>
      </section>

      <section className="section-pad home-pet">
        <div className="container home-pet__inner">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeUpTransition}
          >
            <span className="badge">Pet Friendly</span>
            <h2>Toda la familia es bienvenida</h2>
            <p>Tus mascotas son parte esencial del viaje. Contamos con amplias zonas verdes para su disfrute.</p>
            <Link to="/mascotas" className="btn btn--outline">
              Ver reglamento de mascotas
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-pad home-social">
        <div className="container section-header section-header--center">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeUpTransition}
          >
            <span className="section-header__eyebrow">Social</span>
            <h2 className="section-header__title">Vive la experiencia Baquero</h2>
            <div className="home-social__links">
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="link-underline">
                Instagram
              </a>
              <a href={SITE.social.tripadvisor} target="_blank" rel="noreferrer" className="link-underline">
                TripAdvisor
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
