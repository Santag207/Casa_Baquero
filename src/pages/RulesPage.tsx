import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  Volume2,
  Flame,
  Dog,
  Cigarette,
  Waves,
  Music2,
  Shield,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { media } from '../data/media';
import { HOME_GALLERY } from '../data/galleries';
import { useLanguage } from '../context/LanguageContext';
import './RulesPage.scss';

/* ─── COMPONENTE ─── */
export function RulesPage() {
  const { t } = useLanguage();

  const RULE_SECTIONS = [
    {
      id: 'horarios',
      icon: <Clock size={28} strokeWidth={1.5} />,
      title: t.rules.sections[0].title,
      color: '#14b8a6',
      rules: [
        { text: t.rules.sections[0].items[0], type: 'info' as const },
        { text: t.rules.sections[0].items[1], type: 'info' as const },
        { text: t.rules.sections[0].items[2], type: 'info' as const },
        { text: t.rules.sections[0].items[3], type: 'restrict' as const },
        { text: t.rules.sections[0].items[4], type: 'info' as const },
        { text: t.rules.sections[0].items[5], type: 'allow' as const },
        { text: t.rules.sections[0].items[6], type: 'allow' as const },
      ],
    },
    {
      id: 'silencio',
      icon: <Volume2 size={28} strokeWidth={1.5} />,
      title: t.rules.sections[1].title,
      color: '#a68b5c',
      rules: [
        { text: t.rules.sections[1].items[0], type: 'info' as const },
        { text: t.rules.sections[1].items[1], type: 'allow' as const },
        { text: t.rules.sections[1].items[2], type: 'restrict' as const },
        { text: t.rules.sections[1].items[3], type: 'info' as const },
        { text: t.rules.sections[1].items[4], type: 'restrict' as const },
      ],
    },
    {
      id: 'piscina',
      icon: <Waves size={28} strokeWidth={1.5} />,
      title: t.rules.sections[2].title,
      color: '#0284c7',
      rules: [
        { text: t.rules.sections[2].items[0], type: 'allow' as const },
        { text: t.rules.sections[2].items[1], type: 'allow' as const },
        { text: t.rules.sections[2].items[2], type: 'info' as const },
        { text: t.rules.sections[2].items[3], type: 'restrict' as const },
        { text: t.rules.sections[2].items[4], type: 'restrict' as const },
        { text: t.rules.sections[2].items[5], type: 'restrict' as const },
        { text: t.rules.sections[2].items[6], type: 'restrict' as const },
      ],
    },
    {
      id: 'bbq',
      icon: <Flame size={28} strokeWidth={1.5} />,
      title: t.rules.sections[3].title,
      color: '#ea580c',
      rules: [
        { text: t.rules.sections[3].items[0], type: 'allow' as const },
        { text: t.rules.sections[3].items[1], type: 'allow' as const },
        { text: t.rules.sections[3].items[2], type: 'restrict' as const },
        { text: t.rules.sections[3].items[3], type: 'allow' as const },
        { text: t.rules.sections[3].items[4], type: 'info' as const },
      ],
    },
    {
      id: 'mascotas',
      icon: <Dog size={28} strokeWidth={1.5} />,
      title: t.rules.sections[4].title,
      color: '#7c3aed',
      rules: [
        { text: t.rules.sections[4].items[0], type: 'allow' as const },
        { text: t.rules.sections[4].items[1], type: 'info' as const },
        { text: t.rules.sections[4].items[2], type: 'restrict' as const },
        { text: t.rules.sections[4].items[3], type: 'info' as const },
        { text: t.rules.sections[4].items[4], type: 'info' as const },
        { text: t.rules.sections[4].items[5], type: 'allow' as const },
      ],
    },
    {
      id: 'fumadores',
      icon: <Cigarette size={28} strokeWidth={1.5} />,
      title: t.rules.sections[5].title,
      color: '#dc2626',
      rules: [
        { text: t.rules.sections[5].items[0], type: 'restrict' as const },
        { text: t.rules.sections[5].items[1], type: 'restrict' as const },
        { text: t.rules.sections[5].items[2], type: 'info' as const },
        { text: t.rules.sections[5].items[3], type: 'restrict' as const },
        { text: t.rules.sections[5].items[4], type: 'allow' as const },
      ],
    },
    {
      id: 'eventos',
      icon: <Music2 size={28} strokeWidth={1.5} />,
      title: t.rules.sections[6].title,
      color: '#0f3d2e',
      rules: [
        { text: t.rules.sections[6].items[0], type: 'info' as const },
        { text: t.rules.sections[6].items[1], type: 'allow' as const },
        { text: t.rules.sections[6].items[2], type: 'info' as const },
        { text: t.rules.sections[6].items[3], type: 'restrict' as const },
        { text: t.rules.sections[6].items[4], type: 'info' as const },
      ],
    },
    {
      id: 'general',
      icon: <Shield size={28} strokeWidth={1.5} />,
      title: t.rules.sections[7].title,
      color: '#475569',
      rules: [
        { text: t.rules.sections[7].items[0], type: 'allow' as const },
        { text: t.rules.sections[7].items[1], type: 'allow' as const },
        { text: t.rules.sections[7].items[2], type: 'restrict' as const },
        { text: t.rules.sections[7].items[3], type: 'restrict' as const },
        { text: t.rules.sections[7].items[4], type: 'info' as const },
        { text: t.rules.sections[7].items[5], type: 'info' as const },
        { text: t.rules.sections[7].items[6], type: 'restrict' as const },
      ],
    },
  ];

  return (
    <div className="rules-page">
      {/* ── HERO ── */}
      <header
        className="rules-hero page-hero"
        style={{
          backgroundImage: `url(${media(
            '/media/29471/a-hotel-villavicencio-casa-baquero-15bb.jpg',
            1920,
            1080
          )})`,
        }}
      >
        <div className="container rules-hero__content">
          <motion.span
            className="rules-hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.rules.heroEyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t.rules.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t.rules.heroText}
          </motion.p>
        </div>
        <div className="rules-hero__wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </header>

      {/* ── NOTICE BANNER ── */}
      <section className="rules-notice">
        <div className="container rules-notice__inner">
          <AlertTriangle size={20} />
          <p>{t.rules.notice}</p>
        </div>
      </section>

      {/* ── LEGEND ── */}
      <section className="rules-legend">
        <div className="container rules-legend__inner">
          <div className="legend-item">
            <CheckCircle2 size={18} className="legend-icon legend-icon--allow" />
            <span>{t.rules.allowed}</span>
          </div>
          <div className="legend-item">
            <XCircle size={18} className="legend-icon legend-icon--restrict" />
            <span>{t.rules.prohibited}</span>
          </div>
          <div className="legend-item">
            <AlertTriangle size={18} className="legend-icon legend-icon--info" />
            <span>{t.rules.important}</span>
          </div>
        </div>
      </section>

      {/* ── RULES GRID ── */}
      <section className="rules-grid-section">
        <div className="container">
          <motion.div
            className="rules-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
            }}
          >
            {RULE_SECTIONS.map((section, si) => (
              <motion.div
                key={section.id}
                className="rule-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: si * 0.06 }}
              >
                <div
                  className="rule-card__header"
                  style={{ '--rule-color': section.color } as React.CSSProperties}
                >
                  <div className="rule-card__icon">{section.icon}</div>
                  <h2 className="rule-card__title">{section.title}</h2>
                </div>
                <ul className="rule-card__list">
                  {section.rules.map((rule, ri) => (
                    <li key={ri} className={`rule-item rule-item--${rule.type}`}>
                      {rule.type === 'allow' && (
                        <CheckCircle2 size={16} className="rule-item__icon" />
                      )}
                      {rule.type === 'restrict' && (
                        <XCircle size={16} className="rule-item__icon" />
                      )}
                      {rule.type === 'info' && (
                        <AlertTriangle size={16} className="rule-item__icon" />
                      )}
                      <span>{rule.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HORARIOS CARDS (estilo Footer) ── */}
      <section className="rules-schedules">
        <div className="container rules-schedules__grid">
          {[
            { icon: <Clock size={32} strokeWidth={1.5} />, title: t.rules.scheduleCheckIn, value: t.rules.scheduleCheckInValue },
            { icon: <Clock size={32} strokeWidth={1.5} />, title: t.rules.scheduleCheckOut, value: t.rules.scheduleCheckOutValue },
            { icon: <Waves size={32} strokeWidth={1.5} />, title: t.rules.schedulePool, value: t.rules.schedulePoolValue },
            { icon: <Volume2 size={32} strokeWidth={1.5} />, title: t.rules.scheduleSilence, value: t.rules.scheduleSilenceValue },
          ].map((s) => (
            <div key={s.title} className="rules-schedule-card">
              <div className="rules-schedule-card__icon">{s.icon}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPLIT CTA ── */}
      <section className="rules-cta">
        <div
          className="rules-cta__image"
          style={{
            backgroundImage: `url(${media(
              HOME_GALLERY[1]?.src || '/media/23214/finca-hotel-casa-baquero-villavicencio-piscina-2.jpeg',
              900,
              700
            )})`,
          }}
        />
        <div className="rules-cta__content">
          <span className="rules-cta__eyebrow">{t.rules.ctaEyebrow}</span>
          <h2 className="rules-cta__title">{t.rules.ctaTitle}</h2>
          <p className="rules-cta__desc">{t.rules.ctaText}</p>
          <div className="rules-cta__actions">
            <Link to="/reservar" className="btn btn--primary btn--lg">
              {t.rules.bookBtn}
            </Link>
            <Link to="/faq" className="rules-cta__link">
              {t.rules.faqLink} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}