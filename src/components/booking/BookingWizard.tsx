import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../hooks/useBooking';
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
            <small>{label}</small>
            <span>{i + 1}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {state.step === 1 && (
          <motion.div key="s1" className="booking-wizard__panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <span className="section-header__eyebrow">Paso 01</span>
            <h2>Selecciona tus fechas</h2>
            <p>El calendario muestra temporadas y disponibilidad en tiempo real.</p>
            <AvailabilityCalendar
              checkIn={state.checkIn}
              checkOut={state.checkOut}
              onRangeSelect={(start, end) => update({ checkIn: start, checkOut: end })}
            />
            <div className="booking-wizard__row">
              <label>
                Número de habitaciones
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={state.roomsCount}
                  onChange={(e) => update({ roomsCount: Number(e.target.value) })}
                />
              </label>
              <label>
                Total de huéspedes
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
          <motion.div key="s2" className="booking-wizard__panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <span className="section-header__eyebrow">Paso 02</span>
            <h2>Elige tu alojamiento</h2>
            <p>Contamos con opciones desde habitaciones estándar hasta cabañas familiares.</p>
            <div className="booking-wizard__rooms">
              {ROOMS.map((r) => (
                <button
                  key={r.slug}
                  type="button"
                  className={`booking-wizard__room ${state.roomSlug === r.slug ? 'selected' : ''}`}
                  onClick={() => update({ roomSlug: r.slug })}
                >
                  <img src={media(r.heroImage, 600, 400)} alt="" />
                  <div className="room-info">
                    <span>Desde {formatCOP(r.basePrice)} + IVA</span>
                    <strong>{r.shortName}</strong>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {state.step === 3 && (
          <motion.div key="s3" className="booking-wizard__panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <span className="section-header__eyebrow">Paso 03</span>
            <h2>Detalles del huésped</h2>
            <p>Por favor completa tu información de contacto para coordinar tu llegada.</p>
            <div className="booking-wizard__form">
              <label>
                Nombre y Apellido
                <input value={state.guestName} onChange={(e) => update({ guestName: e.target.value })} required placeholder="Ej: Juan Pérez" />
              </label>
              <label>
                Email
                <input type="email" value={state.guestEmail} onChange={(e) => update({ guestEmail: e.target.value })} required placeholder="juan@ejemplo.com" />
              </label>
              <label>
                WhatsApp
                <input type="tel" value={state.guestPhone} onChange={(e) => update({ guestPhone: e.target.value })} required placeholder="+57 ..." />
              </label>
              <label>
                Notas adicionales
                <textarea value={state.notes} onChange={(e) => update({ notes: e.target.value })} rows={3} placeholder="Peticiones especiales, horario estimado..." />
              </label>
            </div>
          </motion.div>
        )}

        {state.step === 4 && room && price && (
          <motion.div key="s4" className="booking-wizard__panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <span className="section-header__eyebrow">Paso 04</span>
            <h2>Revisión final</h2>
            <div className="booking-wizard__summary">
              <div>
                <h3>{room.name}</h3>
                <p><strong>Estancia:</strong> {state.checkIn} al {state.checkOut}</p>
                <p><strong>Duración:</strong> {price.nights} noche(s)</p>
                <p><strong>Ocupación:</strong> {state.guests} persona(s) · {state.roomsCount} hab.</p>
                <p style={{ marginTop: '1rem', color: 'var(--color-accent)' }}>Temporada: {price.seasonLabel}</p>
              </div>
              <div className="booking-wizard__totals">
                <p>
                  <span>Tarifa noche</span> {formatCOP(price.adjustedPerNight)}
                </p>
                <p>
                  <span>IVA (19%)</span> {formatCOP(price.iva)}
                </p>
                <p className="total">
                  <span>Total estimado</span> {formatCOP(price.total)}
                </p>
              </div>
            </div>
            <p className="booking-wizard__disclaimer">
              Este es un resumen de tu solicitud. Al hacer clic en el botón inferior, se abrirá WhatsApp para finalizar la reserva directamente con nuestro equipo.
            </p>
            <button type="button" className="btn btn--primary btn--lg booking-wizard__whatsapp" onClick={submitWhatsApp}>
              Confirmar vía WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="booking-wizard__nav">
        {state.step > 1 && (
          <button type="button" className="btn btn--ghost" onClick={() => setStep((state.step - 1) as 1 | 2 | 3 | 4)}>
            Regresar
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
