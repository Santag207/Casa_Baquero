import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { HERO_SLIDES, HOME_BLOCKS, FACILITIES_TEXT } from '../data/site';
import { media } from '../data/media';
import { ROOMS } from '../data/rooms';
import { RoomCard } from '../components/rooms/RoomCard';
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            TU PARAÍSO EN EL LLANO COLOMBIANO
          </motion.h1>
          <motion.p
            className="home-hero__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Experimenta la tranquilidad y la belleza de Villavicencio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="home-hero__actions"
          >
            <Link to="/habitaciones" className="btn btn--outline-light">
              RESERVAR AHORA
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
          <motion.h2
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={fadeUpTransition}
          >
            BIENVENIDO A CASA BAQUERO
          </motion.h2>
          <motion.p
            className="home-intro__text"
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={fadeUpTransition}
          >
            "Ubicado a solo 10 minutos de Villavicencio, nuestro hotel ofrece la paz del campo con la comodidad que mereces."
          </motion.p>
          <motion.p
            className="home-intro__text home-intro__text--muted"
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ ...fadeUpTransition, delay: 0.2 }}
          >
            {FACILITIES_TEXT[0]}
          </motion.p>
        </div>
      </section>

      <section id="habitaciones" className="section-pad home-rooms">
        <div className="container">
          <div className="section-header section-header--center">
             <h2 className="section-header__title">Nuestras Habitaciones</h2>
             <p className="section-header__subtitle">Espacios diseñados para tu descanso y confort.</p>
          </div>
          <div className="home-rooms__grid">
            {ROOMS.slice(0, 3).map((r, i) => (
              <RoomCard key={r.slug} room={r} index={i} />
            ))}
          </div>
          <div className="home-rooms__footer">
            <Link to="/habitaciones" className="btn btn--outline">
              VER TODAS LAS HABITACIONES
            </Link>
          </div>
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </div>
          <motion.div
            className="home-editorial__copy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>{block.subtitle}</h3>
            <p>{block.text}</p>
            <Link to={block.cta.to} className="btn btn--outline">
              {block.cta.label}
            </Link>
          </motion.div>
        </section>
      ))}
    </div>
  );
}
