import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Room } from '../../data/rooms';
import type { Translations } from '../../i18n/types';
import { media } from '../../data/media';
import { formatCOP } from '../../utils/pricing';
import { useLanguage } from '../../context/LanguageContext';
import './RoomCard.scss';

interface RoomCardProps {
  room: Room;
  index?: number;
  variant?: 'default' | 'compact';
}

const SLUG_TO_KEY: Record<string, keyof Translations['roomsData']> = {
  'doble-estandar': 'dobleEstandar',
  'doble-premium': 'doblePremium',
  'doble-deluxe': 'dobleDeluxe',
  triple: 'triple',
  cuadruple: 'cuadruple',
  familiar: 'familiar',
  'cabana-6': 'cabana6',
};

export function RoomCard({ room, index = 0, variant = 'default' }: RoomCardProps) {
  const { t } = useLanguage();
  const rd = t.roomsData[SLUG_TO_KEY[room.slug]];
  const highlights = [
    t.rooms.persons.replace('{n}', String(room.maxGuests)),
    room.includesBreakfast ? t.rooms.included : t.rooms.notIncluded,
  ];

  return (
    <motion.article
      className={`room-card room-card--${variant}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: 'easeOut' }}
    >
      <div className="room-card__media-wrap">
        <Link to={`/habitaciones/${room.slug}`} className="room-card__media">
          <img src={media(room.heroImage, 640, 480)} alt={rd?.name ?? room.name} loading="lazy" />
        </Link>
        <div className="room-card__badge">
          <span>{rd?.shortName ?? room.shortName}</span>
          <span>{t.rooms.persons.replace('{n}', String(room.maxGuests))}</span>
        </div>
      </div>
      <div className="room-card__body">
        <div className="room-card__meta">
          <p className="room-card__eyebrow">{rd?.tagline ?? room.tagline}</p>
          <h3>
            <Link to={`/habitaciones/${room.slug}`}>{rd?.name ?? room.name}</Link>
          </h3>
          <p className="room-card__summary">{rd?.summary ?? room.summary}</p>
        </div>

        <div className="room-card__highlights">
          {highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <div className="room-card__footer">
          <div className="room-card__price-block">
            <p className="room-card__price">
              <span className="room-card__amount">{formatCOP(room.basePrice)}</span>
              <span className="room-card__per"> {t.rooms.perNight}</span>
            </p>
            <p className="room-card__note">{t.rooms.plusIva}</p>
          </div>
          <div className="room-card__actions">
            <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--primary btn--sm">
              {t.rooms.book}
            </Link>
            <Link to={`/habitaciones/${room.slug}`} className="link-underline">
              {t.rooms.details}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
