import { useEffect, useState } from 'react';
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
import { useLanguage } from '../context/LanguageContext';
import './ActivitiesPage.scss';

/* ─── COMPONENTE ─── */
export function ActivitiesPage() {
  const { t } = useLanguage();
  const [mosaicIndex, setMosaicIndex] = useState(0);
  const galleryImages = [
    ...HOME_GALLERY.slice(0, 4),
    ...GALLERY_GROUPS[1].images.slice(0, 4),
  ];

  const activityMeta = [
    { icon: <Waves size={32} strokeWidth={1.5} />, image: '/media/23214/finca-hotel-casa-baquero-villavicencio-piscina-2.jpeg' },
    { icon: <Flame size={32} strokeWidth={1.5} />, image: '/media/29466/a-hotel-villavicencio-casa-baquero-9bb.jpg' },
    { icon: <Dumbbell size={32} strokeWidth={1.5} />, image: '/media/29464/a-hotel-villavicencio-casa-baquero-7bb.jpg' },
    { icon: <TreePine size={32} strokeWidth={1.5} />, image: '/media/29243/finca-hotel-casa-baquero-villavicencio-b2.jpg' },
    { icon: <Fish size={32} strokeWidth={1.5} />, image: '/media/29245/finca-hotel-casa-baquero-villavicencio-cascadas-b1.jpg' },
    { icon: <Bike size={32} strokeWidth={1.5} />, image: '/media/29247/finca-hotel-casa-baquero-villavicencio-b5.jpg' },
  ];

  const activities = t.activities.activities.map((act, i) => ({
    ...act,
    icon: activityMeta[i].icon,
    image: activityMeta[i].image,
  }));

  const attractionEmojis = ['🦜', '💧', '🏙️', '✈️', '🏊', '🌅'];

  const nearbyAttractions = t.activities.attractions.map((attr, i) => ({
    ...attr,
    icon: attractionEmojis[i],
  }));

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;
    const timer = setInterval(() => setMosaicIndex((i) => (i + 1) % galleryImages.slice(0, 6).length), 4500);
    return () => clearInterval(timer);
  }, []);

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
            {t.activities.heroEyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            {t.activities.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            {t.activities.heroText}
          </motion.p>
          <motion.div
            className="activities-hero__ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <Link to="/reservar" className="btn btn--primary btn--lg">
              {t.activities.bookBtn}
            </Link>
            <Link to="/contacto" className="btn btn--outline-light btn--lg">
              {t.activities.consultBtn}
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
              {t.activities.experiencesEyebrow}
            </span>
            <h2 className="activities-grid-section__title">
              {t.activities.experiencesTitle}
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
                  <p className="activity-card__desc">{act.desc}</p>
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
            {t.activities.highlightsEyebrow}
          </span>
          <h2 className="activities-highlights__title">
            {t.activities.highlightsTitle}
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
          <span className="activities-mosaic__eyebrow">
            {t.activities.galleryEyebrow}
          </span>
          <h2 className="activities-mosaic__title">
            {t.activities.galleryTitle}
          </h2>
        </div>
        <div className="activities-mosaic__carousel container">
          <div className="activities-mosaic__viewport">
            <div
              className="activities-mosaic__track"
              style={{ transform: `translateX(-${mosaicIndex * 100}%)` }}
            >
              {galleryImages.slice(0, 6).map((img, i) => (
                <div
                  key={img.src}
                  className={`mosaic-item mosaic-item--${i + 1}`}
                >
                  <img src={media(img.src, 800, 600)} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="activities-mosaic__btn activities-mosaic__btn--prev"
            aria-label={t.common.previous}
            onClick={() => setMosaicIndex((i) => (i === 0 ? galleryImages.slice(0, 6).length - 1 : i - 1))}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            type="button"
            className="activities-mosaic__btn activities-mosaic__btn--next"
            aria-label={t.common.next}
            onClick={() => setMosaicIndex((i) => (i === galleryImages.slice(0, 6).length - 1 ? 0 : i + 1))}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          <div className="activities-mosaic__dots">
            {galleryImages.slice(0, 6).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`activities-mosaic__dot${i === mosaicIndex ? ' activities-mosaic__dot--active' : ''}`}
                aria-label={t.common.goTo.replace('{n}', String(i + 1))}
                onClick={() => setMosaicIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="activities-mosaic__cta container">
          <Link to="/galerias" className="btn btn--outline">
            <span className="icon-circle">
              <ArrowRight size={14} />
            </span>
            {t.activities.galleryLink}
          </Link>
        </div>
      </section>

      {/* ── NEARBY ATTRACTIONS ── */}
      <section className="activities-nearby">
        <div className="container">
          <div className="activities-nearby__inner">
            <div className="activities-nearby__text">
              <span className="activities-nearby__eyebrow">
                <MapPin size={14} /> {t.activities.locationEyebrow}
              </span>
              <h2 className="activities-nearby__title">
                {t.activities.locationTitle}
              </h2>
              <p className="activities-nearby__desc">
                {t.activities.locationText}
              </p>
              <a
                href="https://maps.google.com/?q=Casa+Baquero+Villavicencio"
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                {t.activities.locationBtn}
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
            <Star size={14} /> {t.activities.ctaEyebrow}
          </span>
          <h2 className="activities-split-cta__title">
            {t.activities.ctaTitle}
          </h2>
          <p className="activities-split-cta__desc">
            {t.activities.ctaText}
          </p>
          <div className="activities-split-cta__actions">
            <Link to="/reservar" className="btn btn--primary btn--lg">
              {t.activities.reserveBtn}
            </Link>
            <Link to="/plan-romantico" className="activities-split-cta__link">
              {t.activities.romanticLink} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
