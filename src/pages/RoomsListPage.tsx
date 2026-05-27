import { motion } from 'framer-motion';
import { ROOMS } from '../data/rooms';
import { RoomCard } from '../components/rooms/RoomCard';
import { media } from '../data/media';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function RoomsListPage() {
  return (
    <>
      <header
        className="page-hero"
        style={{
          backgroundImage: `url(${media('/media/28777/background-rooms-hotel-casa-baquero.jpg', 1920)})`,
        }}
      >
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="section-header__eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Alojamiento
          </span>
          <h1>Habitaciones</h1>
          <p>Nueve espacios con vista a jardines y piscina en el piedemonte llanero.</p>
        </motion.div>
      </header>
      <section className="section-pad">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gap: '4rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            }}
          >
            {ROOMS.map((r, i) => (
              <RoomCard key={r.slug} room={r} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
