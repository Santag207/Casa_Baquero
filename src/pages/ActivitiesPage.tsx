import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Waves,
  Flame,
  Dumbbell,
  Music2,
  TreePine,
  Fish,
  Bike,
  Star,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { media } from '../data/media';
import { HOME_GALLERY, GALLERY_GROUPS } from '../data/galleries';
import './ActivitiesPage.scss';

/* ─── DATOS DE ACTIVIDADES ─── */
const activities = [
  {
    icon: <Waves size={32} strokeWidth={1.5} />,
    title: 'Piscina & Relax',
    description:
      'Sumérgete en nuestra piscina rodeada de zonas verdes. El lugar perfecto para refrescarte y descansar bajo el sol del piedemonte llanero.',
    image: '/media/23214/finca-hotel-casa-baquero-villavicencio-piscina-2.jpeg',
    tag: 'Acuático',
  },
  {
    icon: <Flame size={32} strokeWidth={1.5} />,
    title: 'Zona BBQ',
    description:
      'Disfruta de asados y parrilladas en nuestras zonas BBQ equipadas. Una experiencia gastronómica al aire libre con sabores auténticos del llano.',
    image: '/media/29466/a-hotel-villavicencio-casa-baquero-9bb.jpg',
    tag: 'Gastronomía',
  },
  {
    icon: <Dumbbell size={32} strokeWidth={1.5} />,
    title: 'Deportes & Juegos',
    description:
      'Billar, ping-pong, mini-tejo, voleibol y mucho más. Actividades para todas las edades que llenan de alegría las reuniones familiares y grupales.',
    image: '/media/29464/a-hotel-villavicencio-casa-baquero-7bb.jpg',
    tag: 'Deporte',
  },
  {
    icon: <TreePine size={32} strokeWidth={1.5} />,
    title: 'Naturaleza & Senderos',
    description:
      'Explora los jardines y zonas verdes de la finca. La fauna y flora del piedemonte llanero te sorprenderán a cada paso.',
    image: '/media/29243/finca-hotel-casa-baquero-villavicencio-b2.jpg',
    tag: 'Naturaleza',
  },
  {
    icon: <Fish size={32} strokeWidth={1.5} />,
    title: 'Turismo en el Llano',
    description:
      'Visita cascadas, llanuras y ríos cristalinos. Los paisajes del Meta y los Llanos Orientales son únicos en el mundo.',
    image: '/media/29245/finca-hotel-casa-baquero-cascadas-villavicencio-b1.jpg',
    tag: 'Turismo',
  },
  {
    icon: <Bike size={32} strokeWidth={1.5} />,
    title: 'Aventura & Ecorrutas',
    description:
      'Desde Casa Baquero accede a rutas ecológicas, avistamiento de aves y recorridos por el fascinante ecosistema del piedemonte.',
    image: '/media/29247/finca-hotel-casa-baquero-villavicencio-b5.jpg',
    tag: 'Aventura',
  },
];

const nearbyAttractions = [
  { name: 'Bioparque Los Ocarros', distance: '5 min', icon: '🦜' },
  { name: 'Cascadas de Villavicencio', distance: '20 min', icon: '💧' },
  { name: 'Centro de Villavicencio', distance: '10 min', icon: '🏙️' },
  { name: 'Aeropuerto La Vanguardia', distance: '8 min', icon: '✈️' },
  { name: 'Piscinas Naturales', distance: '15 min', icon: '🏊' },
  { name: 'Estadero El Llano', distance: '12 min', icon: '🌅' },
];

/* ─── COMPONENTE ─── */
export function ActivitiesPage() {
  const galleryImages = [
    ...HOME_GALLERY.slice(0, 4),
    ...GALLERY_GROUPS[1].images.slice(0, 4),
  ];

  return (
    <div className="activities-page">
      {/* ── HERO ── */}
      <header
        className="activities-hero page-hero"
        style={{
          backgroundImage: `url(${media(
            '/media/29246/finca-hotel-casa-baquero-villavicencio-b4.jpg',
            1920,
            1080
          )})`,
        }}
      >
        <div className="activities-hero__wave-top" />
        <div className="container activities-hero__content">
          <motion.span
            className="activities-hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            ¿Qué hay para hacer?
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            Actividades &amp; Experiencias
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            En Casa Baquero cada momento se convierte en un recuerdo. Piscina,
            deportes, BBQ, naturaleza y los mejores paisajes del Llano colombiano.
          </motion.p>
          <motion.div
            className="activities-hero__ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <Link to="/reservar" className="btn btn--primary btn--lg">
              Reservar Ahora
            </Link>
            <Link to="/contacto" className="btn btn--outline-light btn--lg">
              Consultar
            </Link>
          </motion.div>
        </div>
        <div className="activities-hero__wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </header>

      {/* ── ACTIVITIES GRID ── */}
      <section className="activities-grid-section">
        <div className="container">
          <motion.div
            className="activities-grid-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="activities-grid-section__eyebrow">
              Descubre todo lo que puedes hacer
            </span>
            <h2 className="activities-grid-section__title">
              Experiencias Inolvidables
            </h2>
          </motion.div>

          <motion.div
            className="activities-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
          >
            {activities.map((act, i) => (
              <motion.div
                key={act.title}
                className="activity-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
              >
                <div className="activity-card__img-wrap">
                  <img
                    src={media(act.image, 700, 480)}
                    alt={act.title}
                    loading="lazy"
                  />
                  <span className="activity-card__tag">{act.tag}</span>
                </div>
                <div className="activity-card__body">
                  <div className="activity-card__icon">{act.icon}</div>
                  <h3 className="activity-card__title">{act.title}</h3>
                  <p className="activity-card__desc">{act.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES TEAL BAR ── */}
      <section className="activities-highlights">
        <div className="container">
          <span className="activities-highlights__eyebrow">
            Todo incluido en tu estadía
          </span>
          <h2 className="activities-highlights__title">
            Tu Descanso, Nuestro Compromiso
          </h2>
          <div className="activities-highlights__grid">
            {[
              { icon: <Waves size={36} strokeWidth={1.3} />, label: 'Piscina' },
              { icon: <Flame size={36} strokeWidth={1.3} />, label: 'Zona BBQ' },
              { icon: <Dumbbell size={36} strokeWidth={1.3} />, label: 'Deportes' },
              { icon: <TreePine size={36} strokeWidth={1.3} />, label: 'Naturaleza' },
              { icon: <Music2 size={36} strokeWidth={1.3} />, label: 'Música & Ocio' },
            ].map((item) => (
              <div key={item.label} className="highlight-card">
                <div className="highlight-card__icon">{item.icon}</div>
                <h3 className="highlight-card__label">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO MOSAIC ── */}
      <section className="activities-mosaic">
        <div className="activities-mosaic__header container">
          <span className="activities-mosaic__eyebrow">Galería</span>
          <h2 className="activities-mosaic__title">Momentos en Casa Baquero</h2>
        </div>
        <div className="activities-mosaic__grid container">
          {galleryImages.slice(0, 6).map((img, i) => (
            <motion.div
              key={img.src}
              className={`mosaic-item mosaic-item--${i + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <img src={media(img.src, 800, 600)} alt={img.alt} loading="lazy" />
            </motion.div>
          ))}
        </div>
        <div className="activities-mosaic__cta container">
          <Link to="/galerias" className="btn btn--outline">
            <span className="icon-circle">
              <ArrowRight size={14} />
            </span>
            Ver galería completa
          </Link>
        </div>
      </section>

      {/* ── NEARBY ATTRACTIONS ── */}
      <section className="activities-nearby">
        <div className="container">
          <div className="activities-nearby__inner">
            <div className="activities-nearby__text">
              <span className="activities-nearby__eyebrow">
                <MapPin size={14} /> Ubicación privilegiada
              </span>
              <h2 className="activities-nearby__title">
                Lo mejor del Llano, a pocos minutos
              </h2>
              <p className="activities-nearby__desc">
                Casa Baquero está ubicado en la antigua vía a Restrepo, a tan
                solo 10 minutos de Villavicencio, cerca del Aeropuerto La
                Vanguardia y el Bioparque Los Ocarros. El punto de partida ideal
                para explorar todo lo que el Meta tiene para ofrecer.
              </p>
              <a
                href="https://maps.google.com/?q=Casa+Baquero+Villavicencio"
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                Cómo llegar
              </a>
            </div>
            <div className="activities-nearby__attractions">
              {nearbyAttractions.map((attr) => (
                <div key={attr.name} className="attraction-chip">
                  <span className="attraction-chip__emoji">{attr.icon}</span>
                  <div>
                    <p className="attraction-chip__name">{attr.name}</p>
                    <p className="attraction-chip__dist">{attr.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPLIT CTA ── */}
      <section className="activities-split-cta">
        <div
          className="activities-split-cta__image"
          style={{
            backgroundImage: `url(${media(
              '/media/2266/noche-romantica-finca-hotel-casa-baquero-villavicencio.jpg',
              900,
              700
            )})`,
          }}
        />
        <div className="activities-split-cta__content">
          <span className="activities-split-cta__eyebrow">
            <Star size={14} /> Experiencia premium
          </span>
          <h2 className="activities-split-cta__title">
            ¿Listo para vivir el Llano?
          </h2>
          <p className="activities-split-cta__desc">
            Reserva ahora y disfruta de todas las actividades incluidas en tu
            estadía. Piscina, deportes, BBQ y la naturaleza llanera te esperan.
          </p>
          <div className="activities-split-cta__actions">
            <Link to="/reservar" className="btn btn--primary btn--lg">
              Reservar Habitación
            </Link>
            <Link to="/plan-romantico" className="activities-split-cta__link">
              Ver Plan Romántico <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
