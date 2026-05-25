import { ROOMS } from '../data/rooms';
import { RoomCard } from '../components/rooms/RoomCard';
import { media } from '../data/media';

export function RoomsListPage() {
  return (
    <>
      <header
        className="page-hero"
        style={{
          backgroundImage: `url(${media('/media/28777/background-rooms-hotel-casa-baquero.jpg', 1600)})`,
        }}
      >
        <div className="container">
          <span className="section-header__eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Alojamiento
          </span>
          <h1>Habitaciones</h1>
          <p>Nueve espacios con vista a jardines y piscina en el piedemonte llanero.</p>
        </div>
      </header>
      <section className="section-pad">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
          >
            {ROOMS.map((r, i) => (
              <RoomCard key={r.slug} room={r} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
