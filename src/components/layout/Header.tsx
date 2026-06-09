import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SITE } from '../../data/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <motion.div
        className="header__inner container"
        initial={false}
        animate={{ paddingBlock: scrolled ? '0.75rem' : '1.25rem' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="header__brand">
          <span className="header__name">{SITE.name}</span>
          <span className="header__tag">{SITE.tagline}</span>
        </Link>

        <nav className="header__nav" aria-label="Principal">
          {NAV_LINKS.map((link) =>
            link.to === '/' ? (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `header__link${isActive ? ' header__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
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
            )
          )}
        </nav>

        <Link to="/reservar" className="btn btn--primary header__cta">
          Reservar
        </Link>

        <button
          type="button"
          className="header__menu-btn"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
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
            aria-label="Menú móvil"
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
            <Link to="/reservar" className="btn btn--primary header__mobile-cta">
              Reservar
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
