import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        style={{ backgroundImage: `url(${media(room.heroImage, 1920, 1080)})` }}
      >
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="section-header__eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>Alojamiento Premium</span>
          <h1>{room.name}</h1>
          <p>{room.tagline}</p>
          <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--outline-light btn--lg">
            Ver disponibilidad
          </Link>
        </motion.div>
      </header>

      <section className="section-pad container room-page__detail">
        <motion.div
          className="room-page__info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="room-page__promo">Experiencia Casa Baquero</span>
          <h2>Detalles de la estancia</h2>
          <p>{room.description}</p>

          <ul className="room-page__amenities">
            {room.amenities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <div className="room-page__price-box">
            <p className="price">
              Desde {formatCOP(room.basePrice)} <span>/ noche + IVA</span>
            </p>
            <p className="note">Tarifa garantizada para temporada baja</p>
            {room.extraGuestNote && <p className="note" style={{ color: 'var(--color-accent)' }}>{room.extraGuestNote}</p>}
            <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem' }}>
              <strong>Entrada:</strong> {SITE.checkIn} · <strong>Salida:</strong> {SITE.checkOut}
            </p>
            <Link to="/reservar" state={{ roomSlug: room.slug }} className="btn btn--primary btn--lg">
              Reservar ahora
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="room-page__gallery"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <PhotoGallery photos={photos} columns={2} />
        </motion.div>
      </section>
    </article>
  );
}
