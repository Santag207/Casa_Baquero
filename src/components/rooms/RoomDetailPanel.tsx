import { Link } from 'react-router-dom';
import type { Room } from '../../data/rooms';
import { formatCOP } from '../../utils/pricing';
import './RoomDetailPanel.scss';

interface RoomDetailPanelProps {
  room: Room;
}

export function RoomDetailPanel({ room }: RoomDetailPanelProps) {
  return (
    <div className="room-detail-panel">
      <span className="room-detail-panel__promo">Experiencia Casa Baquero</span>
      <h2>{room.shortName}</h2>
      <p className="room-detail-panel__description">{room.description}</p>

      <div className="room-detail-panel__highlights">
        <div className="room-detail-panel__highlight">
          <span className="room-detail-panel__label">Capacidad</span>
          <strong>Hasta {room.maxGuests} personas</strong>
        </div>
        <div className="room-detail-panel__highlight">
          <span className="room-detail-panel__label">Desayuno</span>
          <strong>{room.includesBreakfast ? 'Incluido' : 'No incluido'}</strong>
        </div>
      </div>

      <ul className="room-detail-panel__amenities">
        {room.amenities.map((amenity) => (
          <li key={amenity}>{amenity}</li>
        ))}
      </ul>

      <div className="room-detail-panel__price-box">
        <p className="price">
          Desde {formatCOP(room.basePrice)} <span>/ noche + IVA</span>
        </p>
        <p className="note">Tarifa garantizada para temporada baja</p>
        {room.extraGuestNote && <p className="note note--accent">{room.extraGuestNote}</p>}
        <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--primary btn--lg">
          Reservar ahora
        </Link>
      </div>
    </div>
  );
}
