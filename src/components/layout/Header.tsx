import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SITE } from '../../data/site';
import { media } from '../../data/media';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { LANGUAGE_NAMES } from '../../i18n';
import type { Language } from '../../i18n/types';
import './Header.scss';

const LANGUAGES: Language[] = ['es', 'en', 'it', 'fr'];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  useCart();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <motion.div
        className="header__inner container"
        initial={false}
        animate={{ paddingBlock: scrolled ? '0.75rem' : '1.25rem' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="/"
          className="header__brand"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
        >
          <img
            src={media('/images/hero/logo-hotel-casa-baquero.png')}
            alt={SITE.name}
            className="header__logo"
          />
          <span className="header__brand-text">
            <span className="header__name">{SITE.name}</span>
            <span className="header__tag">{SITE.tagline}</span>
          </span>
        </a>

        <nav className="header__nav" aria-label={t.header.navAria}>
          {NAV_LINKS.map((link) =>
            link.to === '/' ? (
              <a
                key={link.to}
                href="/"
                className="header__link"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                }}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={false}
                className={({ isActive }) =>
                  `header__link${isActive ? ' header__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="header__actions">
          {/* Theme toggle */}
          <button
            type="button"
            className="header__icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t.header.themeDark : t.header.themeLight}
            title={theme === 'light' ? t.header.themeDark : t.header.themeLight}
          >
            {theme === 'light' ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
          </button>

          {/* Language selector */}
          <div className="header__lang" ref={langRef}>
            <button
              type="button"
              className="header__icon-btn header__lang-btn"
              onClick={() => setLangOpen((v) => !v)}
              aria-label={t.header.languageLabel}
              title={t.header.languageLabel}
            >
              <Globe size={18} strokeWidth={1.5} />
              <span className="header__lang-code">{lang.toUpperCase()}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className="header__lang-dropdown"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`header__lang-option${l === lang ? ' header__lang-option--active' : ''}`}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                    >
                      {LANGUAGE_NAMES[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/reservar" className="btn btn--primary header__cta">
            {t.header.book}
          </Link>
        </div>

        <button
          type="button"
          className="header__menu-btn"
          aria-label={open ? t.header.closeMenu : t.header.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="header__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            aria-label={t.header.mobileNavAria}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `header__mobile-link${isActive ? ' header__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}

            {/* Mobile theme & language */}
            <div className="header__mobile-actions">
              <button
                type="button"
                className="header__mobile-action-btn"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                {theme === 'light' ? t.header.themeDark : t.header.themeLight}
              </button>
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`header__mobile-action-btn${l === lang ? ' header__mobile-action-btn--active' : ''}`}
                  onClick={() => { setLang(l); setOpen(false); }}
                >
                  {LANGUAGE_NAMES[l]}
                </button>
              ))}
            </div>

            <Link to="/reservar" className="btn btn--primary header__mobile-cta" onClick={() => setOpen(false)}>
            {t.header.book}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
