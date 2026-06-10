import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
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

type CapacityOption = 'all' | 2 | 3 | 4 | 5 | 6;

export function RoomsListPage() {
  const { t } = useLanguage();
  const [selectedCapacity, setSelectedCapacity] = useState<CapacityOption>('all');

  const capacityOptions = [
    { value: 'all' as const, label: t.roomsPage.all },
    { value: 2 as const, label: t.rooms.persons.replace('{n}', '2') },
    { value: 3 as const, label: t.rooms.persons.replace('{n}', '3') },
    { value: 4 as const, label: t.rooms.persons.replace('{n}', '4') },
    { value: 5 as const, label: t.rooms.persons.replace('{n}', '5') },
    { value: 6 as const, label: t.rooms.persons.replace('{n}', '6') },
  ];

  const filteredRooms = selectedCapacity === 'all'
    ? ROOMS
    : ROOMS.filter((room) => room.maxGuests === selectedCapacity);

  const activeLabel =
    selectedCapacity === 'all'
      ? t.roomsPage.all
      : t.rooms.persons.replace('{n}', String(selectedCapacity));

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
            {t.roomsPage.pageEyebrow}
          </span>
          <h1>{t.roomsPage.pageTitle}</h1>
          <p>{t.roomsPage.pageSubtitle}</p>
        </motion.div>
      </header>
      <section className="section-pad">
        <div className="container">
          <div className="room-filter">
            <div className="room-filter__header">
              <p className="room-filter__title">{t.roomsPage.filterTitle}</p>
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
            <div className="room-empty">{t.roomsPage.emptyState}</div>
          )}
        </div>
      </section>
    </>
  );
}
