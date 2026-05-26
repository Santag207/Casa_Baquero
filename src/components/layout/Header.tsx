import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { SITE } from '../../data/site';
import { ROOMS } from '../../data/rooms';
import { media } from '../../data/media';
import './Header.scss';

const discover = [
  { to: '/plan-romantico', label: 'Plan romántico' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/el-llano', label: 'El llano' },
  { to: '/mascotas', label: 'Mascotas' },
  { to: '/galerias', label: 'Galerías' },
  { to: '/recorrido-virtual', label: 'Tour 360°' },
];

export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`site-header ${transparent ? 'site-header--transparent' : 'site-header--solid'}`}
    >
      <nav className="site-header__inner container" aria-label="Principal">
        <Link to="/" className="site-header__brand" onClick={() => setOpen(false)}>
          <img
            src={media('/media/28995/logo-hotel-casa-baquero.png', 140)}
            alt={SITE.name}
            width={140}
            height={56}
          />
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          <span className="sr-only">Menú</span>
        </button>

        <div id="main-menu" className={`site-header__menu ${open ? 'is-open' : ''}`}>
          <ul className="site-header__links">
            <li
              className="has-dropdown has-dropdown--rooms"
              onMouseEnter={() => setRoomsOpen(true)}
              onMouseLeave={() => setRoomsOpen(false)}
            >
              <NavLink to="/habitaciones" className="site-header__link-nav" onClick={() => setOpen(false)}>
                Habitaciones
              </NavLink>
              <ul className="site-header__mobile-sub">
                {ROOMS.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/habitaciones/${r.slug}`} onClick={() => setOpen(false)}>
                      {r.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
              <AnimatePresence>
                {roomsOpen && (
                  <motion.div
                    className="site-header__panel site-header__panel--desktop"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ul>
                      {ROOMS.map((r) => (
                        <li key={r.slug}>
                          <Link to={`/habitaciones/${r.slug}`}>{r.shortName}</Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li
              className="has-dropdown has-dropdown--discover"
              onMouseEnter={() => setDiscoverOpen(true)}
              onMouseLeave={() => setDiscoverOpen(false)}
            >
              <button
                type="button"
                className="site-header__link-btn site-header__link-btn--desktop"
                aria-expanded={discoverOpen}
              >
                Descubre <ChevronDown size={14} aria-hidden />
              </button>
              <span className="site-header__mobile-label">Descubre</span>
              <ul className="site-header__mobile-sub">
                {discover.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <AnimatePresence>
                {discoverOpen && (
                  <motion.div
                    className="site-header__panel site-header__panel--desktop"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ul>
                      {discover.map((item) => (
                        <li key={item.to}>
                          <Link to={item.to}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li>
              <NavLink to="/contacto" onClick={() => setOpen(false)}>Contacto</NavLink>
            </li>
          </ul>
          <Link to="/reservar" className="btn btn--accent btn--sm site-header__cta" onClick={() => setOpen(false)}>
            Reservar ahora
          </Link>
        </div>
      </nav>
    </header>
  );
}
