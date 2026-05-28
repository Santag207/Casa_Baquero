import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SITE, HERO_SLIDES, HOME_BLOCKS, FACILITIES_TEXT } from '../data/site';
import { media } from '../data/media';
import { ROOMS } from '../data/rooms';
import { HOME_GALLERY } from '../data/galleries';
import { RoomCard } from '../components/rooms/RoomCard';
import { PhotoGallery } from '../components/gallery/PhotoGallery';
import { SectionHeader } from '../components/ui/SectionHeader';
import { HeroSearch } from '../components/ui/HeroSearch';
import './HomePage.scss';

export function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 7000);
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Villavicencio, Meta · Piedemonte llanero
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {SITE.name}
          </motion.h1>
          <motion.p
            className="home-hero__tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {SITE.tagline}
          </motion.p>
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

      <section className="home-intro section-pad--tight">
        <div className="container home-intro__grid">
          {FACILITIES_TEXT.slice(0, 2).map((text) => (
            <p key={text.slice(0, 30)} className="home-intro__text">
              {text}
            </p>
          ))}
        </div>
      </section>

      {HOME_BLOCKS.map((block, i) => (
        <section
          key={block.subtitle}
          className={`home-editorial ${i % 2 ? 'home-editorial--reverse' : ''}`}
        >
          <motion.div
            className="home-editorial__media"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <img src={media(block.image, 1000, 700)} alt="" loading="lazy" />
          </motion.div>
          <motion.div
            className="home-editorial__copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="section-header__eyebrow">{block.title}</span>
            <h2>{block.subtitle}</h2>
            <p>{block.text}</p>
            <Link to={block.cta.to} className="home-editorial__link">
              {block.cta.label}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </motion.div>
        </section>
      ))}

      <section id="habitaciones" className="section-pad home-rooms">
        <div className="container">
          <SectionHeader
            eyebrow="Alojamiento"
            title="Habitaciones pensadas para descansar"
            subtitle="Nueve opciones con vista a jardines y piscina. Tarifas desde temporada baja."
            note="Mejor tarifa garantizada al reservar directo"
            align="center"
          />
          <div className="home-rooms__scroll">
            {ROOMS.map((r, i) => (
              <RoomCard key={r.slug} room={r} index={i} variant="compact" />
            ))}
          </div>
          <div className="home-rooms__footer">
            <Link to="/habitaciones" className="btn btn--outline">
              Ver todas las habitaciones
            </Link>
          </div>
        </div>
      </section>

      <section className="home-tour section-pad--tight">
        <div className="container">
          <SectionHeader
            eyebrow="Experiencia"
            title="Recorrido virtual 360°"
            subtitle="Recorre habitaciones, piscina y zonas comunes antes de llegar."
          />
        </div>
        <div className="home-tour__frame">
          <iframe
            title="Tour virtual Kuula Casa Baquero"
            src={SITE.kuulaTour}
            allow="xr-spatial-tracking; gyroscope; accelerometer"
            allowFullScreen
          />
        </div>
        <div className="container home-tour__cta">
          <Link to="/recorrido-virtual" className="link-underline">
            Abrir en pantalla completa
          </Link>
        </div>
      </section>

      <section className="section-pad home-story">
        <div className="container home-story__grid">
          <div className="home-story__copy">
            <SectionHeader
              eyebrow="La finca"
              title="Vacaciones en pareja y en familia"
              subtitle="Piscina, zonas verdes, BBQ y juegos al aire libre a 10 minutos de Villavicencio."
            />
            {FACILITIES_TEXT.slice(2).map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
            <Link to="/eventos" className="btn btn--outline">
              Celebraciones y eventos
            </Link>
          </div>
          <div className="home-story__gallery">
            <PhotoGallery photos={HOME_GALLERY.slice(0, 6)} columns={2} />
          </div>
        </div>
      </section>

      <section className="home-pet">
        <div className="container home-pet__inner surface">
          <div>
            <span className="badge badge--accent">Pet friendly</span>
            <h2>Mascotas bienvenidas</h2>
            <p>Consulta nuestras políticas y viaja con tu compañero.</p>
          </div>
          <Link to="/mascotas" className="btn btn--accent">
            Ver política
          </Link>
        </div>
      </section>

      <section className="section-pad--tight home-social">
        <div className="container section-header section-header--center">
          <span className="section-header__eyebrow">Comunidad</span>
          <h2 className="section-header__title">Comparte tu experiencia</h2>
          <p className="section-header__subtitle">{SITE.hashtags.join(' · ')}</p>
          <div className="home-social__links">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="btn btn--outline btn--sm">
              Instagram
            </a>
            <a href={SITE.social.tripadvisor} target="_blank" rel="noreferrer" className="btn btn--outline btn--sm">
              TripAdvisor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
