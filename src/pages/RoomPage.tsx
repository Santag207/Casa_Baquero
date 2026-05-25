import { Link, Navigate, useParams } from 'react-router-dom';
import { getRoom } from '../data/rooms';
import { SITE } from '../data/site';
import { media } from '../data/media';
import { formatCOP } from '../utils/pricing';
import { PhotoGallery } from '../components/gallery/PhotoGallery';
import './RoomPage.scss';

export function RoomPage() {
  const { slug } = useParams();
  const room = slug ? getRoom(slug) : undefined;

  if (!room) return <Navigate to="/habitaciones" replace />;

  const photos = room.images.map((src) => ({ src, alt: room.name }));

  return (
    <article className="room-page">
      <header
        className="page-hero"
        style={{ backgroundImage: `url(${media(room.heroImage, 1600, 900)})` }}
      >
        <div className="container">
          <h1>{room.name}</h1>
          <p>{room.tagline}</p>
          <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--outline-light">
            Reservar
          </Link>
        </div>
      </header>

      <section className="section-pad container room-page__detail">
        <div className="room-page__info">
          <p className="room-page__promo">Reserva ahora con la Mejor Tarifa Garantizada</p>
          <h2>Ven a Villavo</h2>
          <p>{room.description}</p>
          <ul className="room-page__amenities">
            {room.amenities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <div className="room-page__price-box">
            <p className="price">
              Desde {formatCOP(room.basePrice)} + IVA <span>/ noche</span>
            </p>
            <p className="note">(Precios de temporada baja)</p>
            {room.extraGuestNote && <p className="note">{room.extraGuestNote}</p>}
            <p>
              Check-in: {SITE.checkIn} · Check-out: {SITE.checkOut}
            </p>
            <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--primary">
              Reservar
            </Link>
          </div>
        </div>
        <PhotoGallery photos={photos} columns={2} />
      </section>
    </article>
  );
}
