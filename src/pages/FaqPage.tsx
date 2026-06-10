import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  BedDouble,
  CreditCard,
  Waves,
  UtensilsCrossed,
  MapPin,
  Dog,
  HelpCircle,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { SITE } from '../data/site';
import { media } from '../data/media';
import { HOME_GALLERY } from '../data/galleries';
import { useLanguage } from '../context/LanguageContext';
import './FaqPage.scss';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  icon: React.ReactNode;
  label: string;
  faqs: FaqItem[];
}

const CATEGORY_IDS = ['reservas', 'pagos', 'instalaciones', 'restaurante', 'ubicacion', 'mascotas'];

const CATEGORY_ICONS: React.ReactNode[] = [
  <BedDouble size={22} strokeWidth={1.5} />,
  <CreditCard size={22} strokeWidth={1.5} />,
  <Waves size={22} strokeWidth={1.5} />,
  <UtensilsCrossed size={22} strokeWidth={1.5} />,
  <MapPin size={22} strokeWidth={1.5} />,
  <Dog size={22} strokeWidth={1.5} />,
];

const CATEGORY_COUNTS = [5, 3, 2, 2, 3, 4];

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-accordion__item ${isOpen ? 'is-open' : ''}`}>
      <button className="faq-accordion__trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-accordion__question">{item.q}</span>
        <span className="faq-accordion__chevron">
          <ChevronDown size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-accordion__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="faq-accordion__answer">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPage() {
  const { t } = useLanguage();

  const FAQ_CATEGORIES: FaqCategory[] = t.faq.categories.map((label, i) => {
    const start = CATEGORY_COUNTS.slice(0, i).reduce((a, b) => a + b, 0);
    const count = CATEGORY_COUNTS[i];
    return {
      id: CATEGORY_IDS[i],
      icon: CATEGORY_ICONS[i],
      label,
      faqs: t.faq.questions.slice(start, start + count),
    };
  });

  const [activeCategory, setActiveCategory] = useState<string>('reservas');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  const toggleItem = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="faq-page">
      <header
        className="faq-hero page-hero"
        style={{
          backgroundImage: `url(${media(
            '/media/29473/a-hotel-villavicencio-casa-baquero-18bb.jpg',
            1920,
            1080
          )})`,
        }}
      >
        <div className="container faq-hero__content">
          <motion.span
            className="faq-hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.faq.heroEyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t.faq.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t.faq.heroText}
          </motion.p>
        </div>
        <div className="faq-hero__wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </header>

      <section className="faq-main">
        <div className="container faq-main__inner">
          <aside className="faq-sidebar">
            <p className="faq-sidebar__title">{t.faq.sidebarTitle}</p>
            <nav className="faq-sidebar__nav">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`faq-sidebar__btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span className="faq-sidebar__btn-icon">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </nav>

            <div className="faq-contact-card">
              <HelpCircle size={28} strokeWidth={1.5} />
              <h4>{t.faq.noAnswerTitle}</h4>
              <p>{t.faq.noAnswerText}</p>
              <a
                href={`https://wa.me/${SITE.phones.whatsappDigits}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                <MessageCircle size={16} /> {t.faq.whatsappBtn}
              </a>
            </div>
          </aside>

          <main className="faq-content">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="faq-content__header">
                <span className="faq-content__icon">{currentCategory.icon}</span>
                <h2 className="faq-content__title">{currentCategory.label}</h2>
              </div>

              <div className="faq-accordion">
                {currentCategory.faqs.map((item, i) => (
                  <AccordionItem
                    key={i}
                    item={item}
                    isOpen={openIndex === i}
                    onToggle={() => toggleItem(i)}
                  />
                ))}
              </div>
            </motion.div>

            <div className="faq-category-chips">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`faq-chip ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </main>
        </div>
      </section>

      <section className="faq-intro-bar">
        <div className="container faq-intro-bar__grid">
          {[
            { value: t.faq.stat1, label: t.faq.stat1Label },
            { value: t.faq.stat2, label: t.faq.stat2Label },
            { value: t.faq.stat3, label: t.faq.stat3Label },
          ].map((s) => (
            <div key={s.label} className="faq-intro-stat">
              <span className="faq-intro-stat__value">{s.value}</span>
              <span className="faq-intro-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-cta">
        <div
          className="faq-cta__image"
          style={{
            backgroundImage: `url(${media(HOME_GALLERY[4]?.src || '/media/29466/a-hotel-villavicencio-casa-baquero-9bb.jpg', 900, 700)})`,
          }}
        />
        <div className="faq-cta__content">
          <span className="faq-cta__eyebrow">{t.faq.ctaEyebrow}</span>
          <h2 className="faq-cta__title">{t.faq.ctaTitle}</h2>
          <p className="faq-cta__desc">{t.faq.ctaText}</p>
          <div className="faq-cta__actions">
            <Link to="/reservar" className="btn btn--primary btn--lg">
              {t.faq.bookBtn}
            </Link>
            <Link to="/reglas" className="faq-cta__link">
              {t.faq.rulesLink} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
