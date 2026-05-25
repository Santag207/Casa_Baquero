import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { media } from '../../data/media';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <img src={media('/media/29039/logo-hotel-casa-baquero.png', 120)} alt={SITE.name} width={120} />
          <p>{SITE.tagline}</p>
        </div>
        <nav className="site-footer__nav" aria-label="Pie de página">
          <div>
            <h3>Explorar</h3>
            <ul>
              <li><Link to="/habitaciones">Habitaciones</Link></li>
              <li><Link to="/reservar">Reservar</Link></li>
              <li><Link to="/recorrido-virtual">Tour 360°</Link></li>
              <li><Link to="/mascotas">Mascotas</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <ul>
              <li>{SITE.phones.landline}</li>
              <li>
                <a href={`https://wa.me/${SITE.phones.whatsappDigits}`} target="_blank" rel="noreferrer">
                  {SITE.phones.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} {SITE.name}</p>
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
    </footer>
  );
}
