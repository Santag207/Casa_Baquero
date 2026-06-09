import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ROOMS } from '../data/rooms';
import { RoomCard } from '../components/rooms/RoomCard';
import { media } from '../data/media';
import './RoomsListPage.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const capacityOptions = [
  { value: 'all', label: 'Todas' },
  { value: 2, label: '2 personas' },
  { value: 3, label: '3 personas' },
  { value: 4, label: '4 personas' },
  { value: 5, label: '5 personas' },
  { value: 6, label: '6 personas' },
] as const;

type CapacityOption = (typeof capacityOptions)[number]['value'];

export function RoomsListPage() {
  const [selectedCapacity, setSelectedCapacity] = useState<CapacityOption>('all');

  const filteredRooms = useMemo(() => {
    if (selectedCapacity === 'all') return ROOMS;
    return ROOMS.filter((room) => room.maxGuests === selectedCapacity);
  }, [selectedCapacity]);

  const activeLabel =
    selectedCapacity === 'all'
      ? 'Mostrando todas las habitaciones'
      : `Mostrando habitaciones para ${selectedCapacity} personas`;

  return (
    <>
      <header
        className="page-hero rooms-hero"
        style={{
          backgroundImage: `url(${media('/media/28777/background-rooms-hotel-casa-baquero.jpg', 1920)})`,
        }}
      >
        <motion.div
          className="container rooms-hero__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="section-header__eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Alojamiento
          </span>
          <h1>Habitaciones</h1>
          <p>Espacios pensados para descansar con comodidad, privacidad y vistas al jardín y la piscina.</p>
        </motion.div>
      </header>
      <section className="section-pad">
        <div className="container">
          <div className="room-filter">
            <div className="room-filter__header">
              <p className="room-filter__title">Filtra por capacidad</p>
              <p className="room-filter__subtitle">{activeLabel}</p>
            </div>
            <div className="room-filter__chips">
              {capacityOptions.map((option) => {
                const isActive = selectedCapacity === option.value;
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    className={`room-filter__chip ${isActive ? 'is-active' : ''}`}
                    onClick={() => setSelectedCapacity(option.value)}
                    aria-pressed={isActive}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredRooms.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="room-grid"
            >
              {filteredRooms.map((r, i) => (
                <RoomCard key={r.slug} room={r} index={i} />
              ))}
            </motion.div>
          ) : (
            <div className="room-empty">No hay habitaciones disponibles para esa capacidad en este momento.</div>
          )}
        </div>
      </section>
    </>
  );
}
