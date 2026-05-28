import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { RoomSlug } from '../data/rooms';
import { useBooking } from '../hooks/useBooking';
import { BookingWizard } from '../components/booking/BookingWizard';
import { media } from '../data/media';
import './ReservePage.scss';

export function ReservePage() {
  const location = useLocation();
  const { update } = useBooking();
  const state = location.state as { roomSlug?: RoomSlug } | null;

  useEffect(() => {
    if (state?.roomSlug) {
      update({ roomSlug: state.roomSlug, step: 2 });
    }
  }, [state?.roomSlug, update]);

  return (
    <div className="reserve-page">
      <header
        className="page-hero reserve-page__hero"
        style={{
          backgroundImage: `url(${media('/media/29444/a-hotel-villavicencio-casa-baquero-1a.jpg', 1600)})`,
        }}
      >
        <div className="container">
          <span className="section-header__eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Reservas
          </span>
          <h1>Tu estadía</h1>
          <p>Selecciona fechas, habitación y confirma por WhatsApp.</p>
        </div>
      </header>
      <section className="section-pad">
        <div className="container">
          <BookingWizard />
        </div>
      </section>
    </div>
  );
}
