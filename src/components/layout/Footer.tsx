import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { media } from '../../data/media';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src={media('/media/29039/logo-hotel-casa-baquero.png', 160)} alt={SITE.name} />
          <p>{SITE.tagline}</p>
          <div className="site-footer__social">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
        <nav className="site-footer__nav" aria-label="Pie de página">
          <div>
            <h4>Explorar</h4>
            <ul>
              <li><Link to="/habitaciones">Habitaciones</Link></li>
              <li><Link to="/plan-romantico">Plan Romántico</Link></li>
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/mascotas">Mascotas</Link></li>
            </ul>
          </div>
          <div>
            <h4>Experiencias</h4>
            <ul>
              <li><Link to="/el-llano">El Llano</Link></li>
              <li><Link to="/recorrido-virtual">Recorrido Virtual</Link></li>
              <li><Link to="/galerias">Galerías</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>{SITE.phones.landline}</li>
              <li>
                <a href={`https://wa.me/${SITE.phones.whatsappDigits}`} target="_blank" rel="noreferrer">
                  WhatsApp: {SITE.phones.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>{SITE.locationShort}</li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container site-footer__bottom">
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
    </footer>
  );
}
