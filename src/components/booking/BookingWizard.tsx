import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { ROOMS } from '../../data/rooms';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { calculateStay, formatCOP } from '../../utils/pricing';
import { buildWhatsAppMessage, openWhatsAppReservation } from '../../utils/whatsapp';
import { media } from '../../data/media';
import './BookingWizard.scss';

const STEPS = ['Fechas', 'Habitación', 'Huésped', 'Confirmar'];

export function BookingWizard() {
  const { state, room, setStep, update } = useBooking();

  const price = useMemo(() => {
    if (!room || !state.checkIn || !state.checkOut) return null;
    const ci = new Date(state.checkIn + 'T12:00:00');
    const co = new Date(state.checkOut + 'T12:00:00');
    if (co <= ci) return null;
    return calculateStay(room, ci, co, state.guests, state.roomsCount);
  }, [room, state]);

  const canNext = () => {
    if (state.step === 1) return Boolean(state.checkIn && state.checkOut);
    if (state.step === 2) return Boolean(state.roomSlug);
    if (state.step === 3)
      return Boolean(state.guestName && state.guestEmail && state.guestPhone);
    return true;
  };

  const submitWhatsApp = () => {
    if (!room || !price || !state.checkIn || !state.checkOut) return;
    const msg = buildWhatsAppMessage({
      guestName: state.guestName,
      guestEmail: state.guestEmail,
      guestPhone: state.guestPhone,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
      roomsCount: state.roomsCount,
      room,
      price,
      notes: state.notes,
    });
    openWhatsAppReservation(msg);
  };

  return (
    <div className="booking-wizard">
      <div className="booking-wizard__progress" role="progressbar" aria-valuenow={state.step} aria-valuemin={1} aria-valuemax={4}>
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`booking-wizard__step ${state.step > i + 1 ? 'done' : ''} ${state.step === i + 1 ? 'active' : ''}`}
          >
            <span>{i + 1}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {state.step === 1 && (
          <motion.div key="s1" className="booking-wizard__panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Selecciona tus fechas</h2>
            <p>Elige entrada y salida en el calendario. Los colores indican temporada y disponibilidad.</p>
            <AvailabilityCalendar
              checkIn={state.checkIn}
              checkOut={state.checkOut}
              onRangeSelect={(start, end) => update({ checkIn: start, checkOut: end })}
            />
            <div className="booking-wizard__row">
              <label>
                Habitaciones
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={state.roomsCount}
                  onChange={(e) => update({ roomsCount: Number(e.target.value) })}
                />
              </label>
              <label>
                Huéspedes
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={state.guests}
                  onChange={(e) => update({ guests: Number(e.target.value) })}
                />
              </label>
            </div>
          </motion.div>
        )}

        {state.step === 2 && (
          <motion.div key="s2" className="booking-wizard__panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Elige tu habitación</h2>
            <div className="booking-wizard__rooms">
              {ROOMS.map((r) => (
                <button
                  key={r.slug}
                  type="button"
                  className={`booking-wizard__room ${state.roomSlug === r.slug ? 'selected' : ''}`}
                  onClick={() => update({ roomSlug: r.slug })}
                >
                  <img src={media(r.heroImage, 200, 140)} alt="" />
                  <div>
                    <strong>{r.shortName}</strong>
                    <span>Desde {formatCOP(r.basePrice)} + IVA</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {state.step === 3 && (
          <motion.div key="s3" className="booking-wizard__panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Datos del huésped</h2>
            <div className="booking-wizard__form">
              <label>
                Nombre completo *
                <input value={state.guestName} onChange={(e) => update({ guestName: e.target.value })} required />
              </label>
              <label>
                Correo electrónico *
                <input type="email" value={state.guestEmail} onChange={(e) => update({ guestEmail: e.target.value })} required />
              </label>
              <label>
                Teléfono / WhatsApp *
                <input type="tel" value={state.guestPhone} onChange={(e) => update({ guestPhone: e.target.value })} required />
              </label>
              <label>
                Notas o solicitudes especiales
                <textarea value={state.notes} onChange={(e) => update({ notes: e.target.value })} rows={4} placeholder="Plan romántico, mascota, horario de llegada..." />
              </label>
            </div>
          </motion.div>
        )}

        {state.step === 4 && room && price && (
          <motion.div key="s4" className="booking-wizard__panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Confirma tu reserva</h2>
            <div className="booking-wizard__summary">
              <div>
                <h3>{room.name}</h3>
                <p>
                  📅 {state.checkIn} → {state.checkOut} ({price.nights} noches)
                </p>
                <p>
                  👤 {state.guests} huésped(es) · {state.roomsCount} habitación(es)
                </p>
                <p>{price.seasonLabel}</p>
              </div>
              <div className="booking-wizard__totals">
                <p>
                  <span>Tarifa/noche</span> {formatCOP(price.adjustedPerNight)} + IVA
                </p>
                <p>
                  <span>Subtotal</span> {formatCOP(price.subtotal)}
                </p>
                <p>
                  <span>IVA 19%</span> {formatCOP(price.iva)}
                </p>
                <p className="total">
                  <span>Total estimado</span> {formatCOP(price.total)}
                </p>
              </div>
            </div>
            <p className="booking-wizard__disclaimer">
              No procesamos pagos en línea. Al enviar, abrirás WhatsApp con un mensaje listo para el hotel.
            </p>
            <button type="button" className="btn btn--accent booking-wizard__whatsapp" onClick={submitWhatsApp}>
              Enviar reserva por WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="booking-wizard__nav">
        {state.step > 1 && (
          <button type="button" className="btn btn--ghost" onClick={() => setStep((state.step - 1) as 1 | 2 | 3 | 4)}>
            Atrás
          </button>
        )}
        {state.step < 4 && (
          <button
            type="button"
            className="btn btn--primary"
            disabled={!canNext()}
            onClick={() => setStep((state.step + 1) as 1 | 2 | 3 | 4)}
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}
