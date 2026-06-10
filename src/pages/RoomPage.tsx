import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getRoom } from '../data/rooms';
import { SITE } from '../data/site';
import { PhotoGallery } from '../components/gallery/PhotoGallery';
import { RoomDetailPanel } from '../components/rooms/RoomDetailPanel';
import './RoomPage.scss';

export function RoomPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const room = slug ? getRoom(slug) : undefined;

  if (!room) return <Navigate to="/habitaciones" replace />;

  const photos = room.images.map((src) => ({ src, alt: room.name }));

  return (
    <article className="room-page">
      <section className="section-pad container room-page__detail">
        <motion.div
          className="room-page__info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <RoomDetailPanel room={room} />
          <p className="room-page__checkin">
            {t.rooms.checkInOut.replace('{checkIn}', SITE.checkIn).replace('{checkOut}', SITE.checkOut)}
          </p>
        </motion.div>

        <motion.div
          className="room-page__gallery"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <PhotoGallery photos={photos} />

          <div className="room-page__tour">
            <h3>{t.rooms.virtualTour}</h3>
            <p>{t.rooms.virtualTourDesc}</p>
            <iframe
              title={`Tour virtual ${room.name}`}
              src={SITE.kuulaTour}
              allow="xr-spatial-tracking; gyroscope; accelerometer"
              allowFullScreen
            />
          </div>
        </motion.div>
      </section>
    </article>
  );
}
