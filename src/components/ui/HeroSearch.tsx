import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import './HeroSearch.scss';

export function HeroSearch() {
  return (
    <div className="hero-search surface">
      <div className="hero-search__fields">
        <div className="hero-search__field">
          <span className="hero-search__label">Entrada</span>
          <span className="hero-search__value">
            <Calendar size={16} aria-hidden />
            Agregar fecha
          </span>
        </div>
        <div className="hero-search__divider" aria-hidden />
        <div className="hero-search__field">
          <span className="hero-search__label">Salida</span>
          <span className="hero-search__value">
            <Calendar size={16} aria-hidden />
            Agregar fecha
          </span>
        </div>
        <div className="hero-search__divider" aria-hidden />
        <div className="hero-search__field">
          <span className="hero-search__label">Huéspedes</span>
          <span className="hero-search__value">
            <Users size={16} aria-hidden />2 huéspedes
          </span>
        </div>
      </div>
      <Link to="/reservar" className="btn btn--accent hero-search__cta">
        Buscar
      </Link>
    </div>
  );
}
