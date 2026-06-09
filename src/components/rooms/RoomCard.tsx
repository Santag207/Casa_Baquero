import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Room } from '../../data/rooms';
import { media } from '../../data/media';
import { formatCOP } from '../../utils/pricing';
import './RoomCard.scss';

interface RoomCardProps {
  room: Room;
  index?: number;
  variant?: 'default' | 'compact';
}

export function RoomCard({ room, index = 0, variant = 'default' }: RoomCardProps) {
  const highlights = [
    `Hasta ${room.maxGuests} personas`,
    room.includesBreakfast ? 'Desayuno incluido' : 'Baño privado',
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
          <img src={media(room.heroImage, 640, 480)} alt={room.name} loading="lazy" />
        </Link>
        <div className="room-card__badge">
          <span>{room.shortName}</span>
          <span>{room.maxGuests} pax</span>
        </div>
      </div>
      <div className="room-card__body">
        <div className="room-card__meta">
          <p className="room-card__eyebrow">{room.tagline}</p>
          <h3>
            <Link to={`/habitaciones/${room.slug}`}>{room.name}</Link>
          </h3>
          <p className="room-card__summary">{room.summary}</p>
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
              <span className="room-card__per"> / noche</span>
            </p>
            <p className="room-card__note">+ IVA · Reserva directa</p>
          </div>
          <div className="room-card__actions">
            <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--primary btn--sm">
              Reservar
            </Link>
            <Link to={`/habitaciones/${room.slug}`} className="link-underline">
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
