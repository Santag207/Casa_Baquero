import { Link } from 'react-router-dom';
import type { Room } from '../../data/rooms';
import type { Translations } from '../../i18n/types';
import { formatCOP } from '../../utils/pricing';
import { useLanguage } from '../../context/LanguageContext';
import './RoomDetailPanel.scss';

interface RoomDetailPanelProps {
  room: Room;
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

export function RoomDetailPanel({ room }: RoomDetailPanelProps) {
  const { t } = useLanguage();
  const rd = t.roomsData[SLUG_TO_KEY[room.slug]];
  return (
    <div className="room-detail-panel">
      <span className="room-detail-panel__promo">{rd?.name ?? room.name}</span>
      <h2>{rd?.shortName ?? room.shortName}</h2>
      <p className="room-detail-panel__description">{rd?.description ?? room.description}</p>

      <div className="room-detail-panel__highlights">
        <div className="room-detail-panel__highlight">
          <span className="room-detail-panel__label">{t.rooms.capacity}</span>
          <strong>{t.rooms.persons.replace('{n}', String(room.maxGuests))}</strong>
        </div>
        <div className="room-detail-panel__highlight">
          <span className="room-detail-panel__label">{t.rooms.breakfast}</span>
          <strong>{room.includesBreakfast ? t.rooms.included : t.rooms.notIncluded}</strong>
        </div>
      </div>

      <ul className="room-detail-panel__amenities">
        {(rd?.amenities ?? room.amenities).map((amenity) => (
          <li key={amenity}>{amenity}</li>
        ))}
      </ul>

      <div className="room-detail-panel__price-box">
        <p className="price">
          {t.rooms.from.replace('{price}', formatCOP(room.basePrice))}
        </p>
        <p className="note">{t.booking.priceBreakdown}</p>
        {(rd?.extraGuestNote ?? room.extraGuestNote) && <p className="note note--accent">{rd?.extraGuestNote ?? room.extraGuestNote}</p>}
        <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--primary btn--lg">
          {t.rooms.book}
        </Link>
      </div>
    </div>
  );
}
