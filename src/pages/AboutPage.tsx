import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Users,
  Leaf,
  Star,
  Award,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { SITE } from '../data/site';
import { media } from '../data/media';
import { HOME_GALLERY, GALLERY_GROUPS } from '../data/galleries';
import './AboutPage.scss';

/* ─── DATOS ─── */
const values = [
  {
    icon: <Heart size={32} strokeWidth={1.5} />,
    title: 'Hospitalidad Genuina',
    description:
      'Cada huésped es tratado como parte de la familia Baquero. Nuestra calidez llanera es el sello que nos define.',
  },
  {
    icon: <Leaf size={32} strokeWidth={1.5} />,
    title: 'Amor por la Naturaleza',
    description:
      'Cuidamos y preservamos el entorno del piedemonte llanero. Nuestros jardines, piscina y zonas verdes son el resultado de ese compromiso.',
  },
  {
    icon: <Users size={32} strokeWidth={1.5} />,
    title: 'Experiencia Familiar',
    description:
      'Fundado como proyecto de familia, Casa Baquero nació del deseo de compartir lo mejor del Meta con quienes nos visitan.',
  },
  {
    icon: <Star size={32} strokeWidth={1.5} />,
    title: 'Excelencia en Servicio',
    description:
      'Cada detalle importa. Desde la limpieza impecable hasta la atención personalizada, buscamos superar las expectativas.',
  },
];

const milestones = [
  { year: '1995', label: 'Fundación', desc: 'La familia Baquero adquiere la finca y comienza el sueño de un hotel.' },
  { year: '2002', label: 'Primera expansión', desc: 'Se construyen las primeras habitaciones y la piscina principal.' },
  { year: '2010', label: 'Reconocimiento', desc: 'Primeros premios de turismo en el Meta por calidad y servicio.' },
  { year: '2018', label: 'Renovación total', desc: 'Se remodelaron todas las habitaciones y se amplió la zona de eventos.' },
  { year: '2024', label: 'Hoy', desc: 'Más de 25 años siendo el hogar favorito de visitantes del Llano colombiano.' },
];

const team = [
  {
    name: 'Familia Baquero',
    role: 'Fundadores',
    image: '/media/2273/tranquilidad-finca-hotel-casa-baquero-villavicencio.jpg',
    quote: 'Abrimos las puertas con el corazón para que el Llano te enamore.',
  },
  {
    name: 'Equipo de Servicio',
    role: 'Atención al huésped',
    image: '/media/2248/celebracion-finca-hotel-casa-baquero-villavicencio.jpg',
    quote: 'Cada sonrisa de nuestros huéspedes es nuestra mayor recompensa.',
  },
  {
    name: 'Cocina & Gastronomía',
    role: 'Experiencias culinarias',
    image: '/media/29226/finca-hotel-casa-baquero-villavicencio-eventos-7.jpg',
    quote: 'Los sabores del Llano en cada plato, preparados con amor.',
  },
];

/* ─── COMPONENTE ─── */
export function AboutPage() {
  return (
    <div className="about-page">
      {/* ── HERO ── */}
      <header
        className="about-hero page-hero"
        style={{
          backgroundImage: `url(${media(
            '/media/29461/a-hotel-villavicencio-casa-baquero-4bb.jpg',
            1920,
            1080
          )})`,
        }}
      >
        <div className="container about-hero__content">
          <motion.span
            className="about-hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Nuestra Historia
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            Un rincón llanero nacido del amor familiar, la tradición y el deseo
            de compartir la magia del Meta con el mundo.
          </motion.p>
        </div>
        <div className="about-hero__wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </header>

      {/* ── SPLIT INTRO ── */}
      <section className="about-intro">
        <div className="container about-intro__inner">
          <motion.div
            className="about-intro__images"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="about-intro__img-primary">
              <img
                src={media(HOME_GALLERY[2]?.src || '/media/29464/a-hotel-villavicencio-casa-baquero-7bb.jpg', 700, 900)}
                alt="Casa Baquero, finca hotel en Villavicencio"
                loading="lazy"
              />
            </div>
            <div className="about-intro__img-secondary">
              <img
                src={media(HOME_GALLERY[3]?.src || '/media/29461/a-hotel-villavicencio-casa-baquero-4bb.jpg', 400, 500)}
                alt="Jardines de Casa Baquero"
                loading="lazy"
              />
              <div className="about-intro__badge">
                <Award size={20} />
                <span>+25 años</span>
                <span className="about-intro__badge-sub">de hospitalidad llanera</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-intro__text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="about-intro__eyebrow">Quiénes somos</span>
            <h2 className="about-intro__title">
              Un paraíso escondido entre la brisa y el Llano
            </h2>
            <p className="about-intro__desc">
              Finca Hotel Casa Baquero nació de un sueño familiar: crear un
              espacio donde los visitantes pudieran conectar con la auténtica
              esencia del Llano colombiano. Desde 1995, hemos abierto nuestras
              puertas a miles de familias, parejas y grupos que han encontrado en
              esta finca su segundo hogar.
            </p>
            <p className="about-intro__desc">
              Ubicados a tan solo 10 minutos de Villavicencio, en la antigua vía
              a Restrepo, ofrecemos 9 habitaciones cómodas, piscina, zonas BBQ,
              deportes y los paisajes más hermosos del piedemonte llanero. Cada
              rincón de Casa Baquero está diseñado con amor y dedicación para que
              tu descanso sea perfecto.
            </p>
            <Link to="/reservar" className="btn btn--primary">
              <span>Reservar mi estadía</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TEAL STATS BAR ── */}
      <section className="about-stats">
        <div className="container about-stats__grid">
          {[
            { value: '+25', label: 'Años de experiencia' },
            { value: '9', label: 'Habitaciones únicas' },
            { value: '+10K', label: 'Huéspedes felices' },
            { value: '4.8★', label: 'Calificación promedio' },
          ].map((stat) => (
            <div key={stat.label} className="about-stat">
              <span className="about-stat__value">{stat.value}</span>
              <span className="about-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="about-values">
        <div className="container">
          <motion.div
            className="about-values__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="about-values__eyebrow">Lo que nos mueve</span>
            <h2 className="about-values__title">Nuestros Valores</h2>
          </motion.div>

          <motion.div
            className="about-values__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                className="value-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
              >
                <div className="value-card__icon">{val.icon}</div>
                <h3 className="value-card__title">{val.title}</h3>
                <p className="value-card__desc">{val.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="about-timeline">
        <div className="container">
          <div className="about-timeline__header">
            <span className="about-timeline__eyebrow">Nuestra trayectoria</span>
            <h2 className="about-timeline__title">Historia de Casa Baquero</h2>
          </div>
          <div className="about-timeline__track">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="timeline-item__content">
                  <span className="timeline-item__year">{m.year}</span>
                  <h3 className="timeline-item__label">{m.label}</h3>
                  <p className="timeline-item__desc">{m.desc}</p>
                </div>
                <div className="timeline-item__dot" />
              </motion.div>
            ))}
            <div className="about-timeline__line" />
          </div>
        </div>
      </section>

      {/* ── TEAM / FAMILY ── */}
      <section className="about-team">
        <div className="container">
          <div className="about-team__header">
            <span className="about-team__eyebrow">Las personas detrás</span>
            <h2 className="about-team__title">La Familia Casa Baquero</h2>
          </div>
          <div className="about-team__grid">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="team-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
              >
                <div className="team-card__img">
                  <img
                    src={media(member.image, 500, 600)}
                    alt={member.name}
                    loading="lazy"
                  />
                  <div className="team-card__overlay">
                    <p className="team-card__quote">"{member.quote}"</p>
                  </div>
                </div>
                <div className="team-card__body">
                  <h3 className="team-card__name">{member.name}</h3>
                  <span className="team-card__role">{member.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY MOSAIC ── */}
      <section className="about-gallery">
        <div className="container">
          <div className="about-gallery__header">
            <span className="about-gallery__eyebrow">Galería</span>
            <h2 className="about-gallery__title">Imágenes de nuestra finca</h2>
          </div>
          <div className="about-gallery__grid">
            {[...HOME_GALLERY.slice(0, 3), ...GALLERY_GROUPS[2].images.slice(0, 3)].map(
              (img, i) => (
                <motion.div
                  key={img.src}
                  className="about-gallery__item"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
                >
                  <img
                    src={media(img.src, 600, 500)}
                    alt={img.alt}
                    loading="lazy"
                  />
                </motion.div>
              )
            )}
          </div>
          <div className="about-gallery__cta">
            <Link to="/galerias" className="btn btn--outline">
              <span className="icon-circle">
                <ArrowRight size={14} />
              </span>
              Ver galería completa
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="about-contact">
        <div className="about-contact__image">
          <img
            src={media(HOME_GALLERY[5]?.src || '/media/29073/finca-hotel-casa-baquero-villavicencio-b5.jpg', 800, 700)}
            alt="Atardecer en Casa Baquero"
            loading="lazy"
          />
        </div>
        <div className="about-contact__content">
          <span className="about-contact__eyebrow">Estamos para servirte</span>
          <h2 className="about-contact__title">¿Tienes alguna pregunta?</h2>
          <p className="about-contact__desc">
            Nuestro equipo está listo para ayudarte a planear la estadía perfecta.
            Contáctanos por cualquiera de estos medios.
          </p>
          <div className="about-contact__info">
            <a
              href={`tel:${SITE.phones.landline}`}
              className="contact-info-item"
            >
              <Phone size={18} strokeWidth={1.5} />
              <span>{SITE.phones.landline}</span>
            </a>
            <a
              href={`https://wa.me/${SITE.phones.whatsappDigits}`}
              target="_blank"
              rel="noreferrer"
              className="contact-info-item"
            >
              <Phone size={18} strokeWidth={1.5} />
              <span>{SITE.phones.whatsapp}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="contact-info-item"
            >
              <Mail size={18} strokeWidth={1.5} />
              <span>{SITE.email}</span>
            </a>
            <div className="contact-info-item">
              <MapPin size={18} strokeWidth={1.5} />
              <span>{SITE.locationShort}</span>
            </div>
          </div>
          <div className="about-contact__ctas">
            <Link to="/contacto" className="btn btn--primary">
              Contactar ahora
            </Link>
            <Link to="/reservar" className="btn btn--outline">
              Reservar estadía
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
