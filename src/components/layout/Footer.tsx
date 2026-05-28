import { Link } from 'react-router-dom';
import { Camera, Share2, Mail, Phone, MapPin, Send } from 'lucide-react';
import { SITE } from '../../data/site';
import { media } from '../../data/media';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img
            src={media('/media/29039/logo-hotel-casa-baquero.png', 140)}
            alt={SITE.name}
            className="site-footer__logo"
          />
          <p className="site-footer__tagline">{SITE.tagline}</p>
          <div className="site-footer__social">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Camera size={20} />
            </a>
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Share2 size={20} />
            </a>
          </div>
        </div>

        <div className="site-footer__nav-col">
          <h3>Navegación</h3>
          <ul>
            <li><Link to="/habitaciones">Habitaciones</Link></li>
            <li><Link to="/reservar">Reservar ahora</Link></li>
            <li><Link to="/el-llano">El Llano</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/mascotas">Mascotas</Link></li>
          </ul>
        </div>

        <div className="site-footer__nav-col">
          <h3>Contacto</h3>
          <ul className="site-footer__contact-info">
            <li>
              <MapPin size={16} />
              <span>{SITE.locationShort}</span>
            </li>
            <li>
              <Phone size={16} />
              <a href={`tel:${SITE.phones.landline}`}>{SITE.phones.landline}</a>
            </li>
            <li>
              <Mail size={16} />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
        </div>

        <div className="site-footer__newsletter">
          <h3>Boletín</h3>
          <p>Recibe ofertas exclusivas y noticias del Llano.</p>
          <form className="site-footer__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Tu correo electrónico" required />
            <button type="submit" aria-label="Suscribirse">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
          <ul className="site-footer__legal">
            {SITE.policies.map((p) => (
              <li key={p.href}>
                <a href={p.href} target="_blank" rel="noreferrer">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
