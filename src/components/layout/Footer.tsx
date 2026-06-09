import { Link } from 'react-router-dom';
import { HelpCircle, AlertCircle, Clock, Utensils, MessageCircle } from 'lucide-react';
import { SITE } from '../../data/site';
import { media } from '../../data/media';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__col">
          <img src={media('/media/28995/logo-hotel-casa-baquero.png', 160)} alt={SITE.name} className="site-footer__logo" />
          <h3>Acerca de nosotros</h3>
          <p>El refugio perfecto en el corazón del Llano, combinando la paz del campo con la comodidad que mereces.</p>
        </div>
        
        <div className="site-footer__col">
          <h3>Contacto</h3>
          <p className="site-footer__label">Línea de atención WhatsApp</p>
          <a href={`https://wa.me/${SITE.phones.whatsappDigits}`} className="site-footer__link">
            {SITE.phones.whatsapp}
          </a>
          <br /><br />
          <p className="site-footer__label">Correo electrónico</p>
          <a href={`mailto:${SITE.email}`} className="site-footer__link">
            {SITE.email}
          </a>
        </div>
        
        <div className="site-footer__col">
          <h3>Menú rápido</h3>
          <ul className="site-footer__nav-list">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/habitaciones">Habitaciones</Link></li>
            <li><Link to="/actividades">Actividades</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
          </ul>
        </div>
        
        <div className="site-footer__col">
          <h3>Más información</h3>
          <ul className="site-footer__nav-list">
            <li><a href="#">Tratamiento de datos personales</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
          
          <div className="site-footer__buttons">
            <Link to="/faq" className="btn btn--white btn--sm">
              <HelpCircle size={16} /> Preguntas Frecuentes
            </Link>
            <Link to="/reglas" className="btn btn--white btn--sm">
              <AlertCircle size={16} /> Reglas del lugar
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container site-footer__schedules">
        <div className="schedule-card">
          <div className="schedule-card__icon"><Clock size={32} strokeWidth={1.5} /></div>
          <div className="schedule-card__info">
            <h4>Atención en recepción</h4>
            <p>7:00 am a 10:00 pm</p>
          </div>
        </div>
        <div className="schedule-card">
          <div className="schedule-card__icon"><Utensils size={32} strokeWidth={1.5} /></div>
          <div className="schedule-card__info">
            <h4>Horario de desayuno</h4>
            <p>Desayuno 7:30 a.m. a 10:00 a.m.</p>
          </div>
        </div>
        <div className="schedule-card">
          <div className="schedule-card__icon"><Utensils size={32} strokeWidth={1.5} /></div>
          <div className="schedule-card__info">
            <h4>Horario de Restaurante</h4>
            <p>Almuerzo y Cena 12:30 p.m. a 9:00 p.m.</p>
          </div>
        </div>
      </div>
      
      <div className="container site-footer__bottom">
        <p className="site-footer__legal-text">
          Casa Baquero con RNT del Ministerio de Comercio, Industria y Turismo, rechaza la explotación sexual y otras formas de abuso infantil de conformidad con las leyes colombianas 679 de 2001, 1336 de 2009, 1098 de 2006 y 1329 de 2009. En el mismo también es contra el trabajo infantil. Advertimos a nuestros clientes que estas formas de comportamiento están sujetas a sanciones penales y administrativas, de conformidad con las leyes vigentes en Colombia.
        </p>
        <div className="site-footer__copyright">
          <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
        </div>
      </div>
      
      <a 
        href={`https://wa.me/${SITE.phones.whatsappDigits}`} 
        className="whatsapp-float"
        target="_blank" 
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </footer>
  );
}
