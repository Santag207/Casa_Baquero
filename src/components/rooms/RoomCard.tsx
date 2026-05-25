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
  return (
    <motion.article
      className={`room-card room-card--${variant}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
    >
      <Link to={`/habitaciones/${room.slug}`} className="room-card__media">
        <img src={media(room.heroImage, 640, 480)} alt={room.name} loading="lazy" />
      </Link>
      <div className="room-card__body">
        <div className="room-card__meta">
          <h3>
            <Link to={`/habitaciones/${room.slug}`}>{room.shortName}</Link>
          </h3>
          {variant === 'default' && <p className="room-card__summary">{room.summary}</p>}
        </div>
        <div className="room-card__footer">
          <p className="room-card__price">
            <span className="room-card__amount">{formatCOP(room.basePrice)}</span>
            <span className="room-card__per"> / noche + IVA</span>
          </p>
          <p className="room-card__note">Temporada baja</p>
        </div>
        {variant === 'default' && (
          <div className="room-card__actions">
            <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--primary btn--sm">
              Reservar
            </Link>
            <Link to={`/habitaciones/${room.slug}`} className="link-underline">
              Detalles
            </Link>
          </div>
        )}
      </div>
    </motion.article>
  );
}
