import { Link } from 'react-router-dom';
import { HelpCircle, AlertCircle, Clock, Utensils, MessageCircle } from 'lucide-react';
import { SITE } from '../../data/site';
import { media } from '../../data/media';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.scss';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__col">
          <img src={media('/images/hero/logo-hotel-casa-baquero.png')} alt={SITE.name} className="site-footer__logo" />
          <h3>{t.footer.aboutTitle}</h3>
          <p>{t.footer.aboutText}</p>
        </div>
        
        <div className="site-footer__col">
          <h3>{t.footer.contactTitle}</h3>
          <p className="site-footer__label">{t.footer.whatsappLabel}</p>
          <a href={`https://wa.me/${SITE.phones.whatsappDigits}`} className="site-footer__link">
            {SITE.phones.whatsapp}
          </a>
          <br /><br />
          <p className="site-footer__label">{t.footer.emailLabel}</p>
          <a href={`mailto:${SITE.email}`} className="site-footer__link">
            {SITE.email}
          </a>
        </div>
        
        <div className="site-footer__col">
          <h3>{t.footer.quickMenu}</h3>
          <ul className="site-footer__nav-list">
            <li><Link to="/">{t.nav.home}</Link></li>
            <li><Link to="/habitaciones">{t.nav.rooms}</Link></li>
            <li><Link to="/actividades">{t.nav.activities}</Link></li>
            <li><Link to="/nosotros">{t.nav.about}</Link></li>
          </ul>
        </div>
        
        <div className="site-footer__col">
          <h3>{t.footer.moreInfo}</h3>
          <ul className="site-footer__nav-list">
            <li><a href="#">{t.footer.dataTreatment}</a></li>
            <li><a href="#">{t.footer.privacyPolicy}</a></li>
          </ul>
          
          <div className="site-footer__buttons">
            <Link to="/faq" className="btn btn--white btn--sm">
              <HelpCircle size={16} /> {t.footer.faqBtn}
            </Link>
            <Link to="/reglas" className="btn btn--white btn--sm">
              <AlertCircle size={16} /> {t.footer.rulesBtn}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container site-footer__schedules">
        <div className="schedule-card">
          <div className="schedule-card__icon"><Clock size={32} strokeWidth={1.5} /></div>
          <div className="schedule-card__info">
            <h4>{t.footer.receptionTitle}</h4>
            <p>{t.footer.receptionHours}</p>
          </div>
        </div>
        <div className="schedule-card">
          <div className="schedule-card__icon"><Utensils size={32} strokeWidth={1.5} /></div>
          <div className="schedule-card__info">
            <h4>{t.footer.breakfastTitle}</h4>
            <p>{t.footer.breakfastHours}</p>
          </div>
        </div>
        <div className="schedule-card">
          <div className="schedule-card__icon"><Utensils size={32} strokeWidth={1.5} /></div>
          <div className="schedule-card__info">
            <h4>{t.footer.restaurantTitle}</h4>
            <p>{t.footer.restaurantHours}</p>
          </div>
        </div>
      </div>
      
      <div className="container site-footer__bottom">
        <p className="site-footer__legal-text">{t.footer.legal}</p>
        <div className="site-footer__copyright">
          <p>{t.footer.copyright.replace('{year}', String(new Date().getFullYear()))}</p>
        </div>
      </div>
      
      <a 
        href={`https://wa.me/${SITE.phones.whatsappDigits}`} 
        className="whatsapp-float"
        target="_blank" 
        rel="noreferrer"
        aria-label={t.footer.whatsappAria}
      >
        <MessageCircle size={32} />
      </a>
    </footer>
  );
}
