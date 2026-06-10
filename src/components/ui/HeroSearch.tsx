import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './HeroSearch.scss';

export function HeroSearch() {
  const { t } = useLanguage();
  return (
    <div className="hero-search surface">
      <div className="hero-search__fields">
        <div className="hero-search__field">
          <span className="hero-search__label">{t.booking.searchLabel}</span>
          <span className="hero-search__value">
            <Calendar size={16} aria-hidden />
            {t.booking.searchDate}
          </span>
        </div>
        <div className="hero-search__divider" aria-hidden />
        <div className="hero-search__field">
          <span className="hero-search__label">{t.booking.searchLabel}</span>
          <span className="hero-search__value">
            <Calendar size={16} aria-hidden />
            {t.booking.searchDate}
          </span>
        </div>
        <div className="hero-search__divider" aria-hidden />
        <div className="hero-search__field">
          <span className="hero-search__label">{t.booking.guestsLabel}</span>
          <span className="hero-search__value">
            <Users size={16} aria-hidden />2 {t.booking.guestsLabel.toLowerCase()}
          </span>
        </div>
      </div>
      <Link to="/reservar" className="btn btn--accent hero-search__cta" aria-label={t.common.goTo}>
        {t.booking.searchLabel}
      </Link>
    </div>
  );
}
