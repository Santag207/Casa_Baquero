import { useEffect, useState } from 'react';
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
import { useLanguage } from '../hooks/useLanguage';
import './AboutPage.scss';

/* ─── COMPONENTE ─── */
const galleryImages = [
  ...HOME_GALLERY.slice(0, 3),
  ...GALLERY_GROUPS[2].images.slice(0, 3),
];

export function AboutPage() {
  const { t } = useLanguage();
  const [galleryIndex, setGalleryIndex] = useState(0);

  const values = [
    {
      icon: <Heart size={32} strokeWidth={1.5} />,
      title: t.about.values[0]?.title ?? '',
      description: t.about.values[0]?.desc ?? '',
    },
    {
      icon: <Leaf size={32} strokeWidth={1.5} />,
      title: t.about.values[1]?.title ?? '',
      description: t.about.values[1]?.desc ?? '',
    },
    {
      icon: <Users size={32} strokeWidth={1.5} />,
      title: t.about.values[2]?.title ?? '',
      description: t.about.values[2]?.desc ?? '',
    },
    {
      icon: <Star size={32} strokeWidth={1.5} />,
      title: t.about.values[3]?.title ?? '',
      description: t.about.values[3]?.desc ?? '',
    },
  ];

  const milestones = t.about.milestones.map((m) => {
    const parts = m.year.split(' — ');
    return {
      year: parts[0],
      label: parts[1] || m.year,
      desc: m.desc,
    };
  });

  const teamImages = [
    '/media/2273/tranquilidad-finca-hotel-casa-baquero-villavicencio.jpg',
    '/media/2248/celebracion-finca-hotel-casa-baquero-villavicencio.jpg',
    '/media/29226/finca-hotel-casa-baquero-villavicencio-eventos-7.jpg',
  ];

  const team = t.about.team.map((m, i) => ({
    name: m.name,
    role: m.role,
    quote: m.quote,
    image: teamImages[i] || teamImages[0],
  }));

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;
    const interval = setInterval(() => setGalleryIndex((i) => (i + 1) % galleryImages.length), 4500);
    return () => clearInterval(interval);
  }, []);

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
            {t.about.heroEyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            {t.about.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            {t.about.heroText}
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
              {t.about.story.title}
            </h2>
            {t.about.story.paragraphs.map((p, i) => (
              <p key={i} className="about-intro__desc">{p}</p>
            ))}
            <Link to="/reservar" className="btn btn--primary">
              <span>{t.about.bookBtn}</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TEAL STATS BAR ── */}
      <section className="about-stats">
        <div className="container about-stats__grid">
          {[
            { value: t.about.stats.years, label: t.about.stats.yearsLabel },
            { value: t.about.stats.rooms, label: t.about.stats.roomsLabel },
            { value: t.about.stats.guests, label: t.about.stats.guestsLabel },
            { value: t.about.stats.rating, label: t.about.stats.ratingLabel },
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
            <span className="about-values__eyebrow">{t.about.valuesEyebrow}</span>
            <h2 className="about-values__title">{t.about.valuesTitle}</h2>
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
            <span className="about-timeline__eyebrow">{t.about.historyEyebrow}</span>
            <h2 className="about-timeline__title">{t.about.historyTitle}</h2>
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
            <span className="about-team__eyebrow">{t.about.teamEyebrow}</span>
            <h2 className="about-team__title">{t.about.teamTitle}</h2>
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
            <span className="about-gallery__eyebrow">{t.about.galleryEyebrow}</span>
            <h2 className="about-gallery__title">{t.about.galleryTitle}</h2>
          </div>
          <div className="about-gallery__carousel">
            <div className="about-gallery__viewport">
              <div
                className="about-gallery__track"
                style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
              >
                {galleryImages.map((img) => (
                  <div key={img.src} className="about-gallery__item">
                    <img src={media(img.src, 600, 500)} alt={img.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="about-gallery__btn about-gallery__btn--prev"
              aria-label={t.common.previous}
              onClick={() =>
                setGalleryIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))
              }
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              type="button"
              className="about-gallery__btn about-gallery__btn--next"
              aria-label={t.common.next}
              onClick={() =>
                setGalleryIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1))
              }
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>

            <div className="about-gallery__dots">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`about-gallery__dot${i === galleryIndex ? ' about-gallery__dot--active' : ''}`}
                  aria-label={t.common.goTo.replace('{n}', String(i + 1))}
                  onClick={() => setGalleryIndex(i)}
                />
              ))}
            </div>
          </div>
          <div className="about-gallery__cta">
            <Link to="/galerias" className="btn btn--outline">
              <span className="icon-circle">
                <ArrowRight size={14} />
              </span>
              {t.about.galleryLink}
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
          <span className="about-contact__eyebrow">{t.about.ctaEyebrow}</span>
          <h2 className="about-contact__title">{t.about.ctaTitle}</h2>
          <p className="about-contact__desc">
            {t.about.ctaText}
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
              {t.about.contactBtn}
            </Link>
            <Link to="/reservar" className="btn btn--outline">
              {t.about.bookBtn}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
