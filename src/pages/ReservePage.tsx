import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { RoomSlug } from '../data/rooms';
import { useBooking } from '../hooks/useBooking';
import { BookingWizard } from '../components/booking/BookingWizard';
import './ReservePage.scss';

export function ReservePage() {
  const location = useLocation();
  const { update } = useBooking();
  const state = location.state as { roomSlug?: RoomSlug } | null;

  useEffect(() => {
    if (state?.roomSlug) {
      update({ roomSlug: state.roomSlug });
    }
  }, [state?.roomSlug, update]);

  return (
    <div className="reserve-page">
      <BookingWizard />
    </div>
  );
}
