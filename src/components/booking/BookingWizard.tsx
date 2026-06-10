import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, CalendarDays, Sun, User, X } from 'lucide-react';
import { useBooking } from '../../hooks/useBooking';
import { ROOMS } from '../../data/rooms';
import { SITE } from '../../data/site';
import { media } from '../../data/media';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { BookingExtras } from './BookingExtras';
import { calculateStay, formatCOP } from '../../utils/pricing';
import { buildWhatsAppMessage } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';
import './BookingWizard.scss';

function fmtDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function formatTime(iso: string): string {
  if (!iso) return '—';
  return new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function BookingWizard() {
  const { t } = useLanguage();
  const { state, room, update } = useBooking();
  const [showReceipt, setShowReceipt] = useState(false);
  const [sending, setSending] = useState(false);

  const nights = useMemo(() => {
    if (!state.checkIn || !state.checkOut) return 0;
    const ci = new Date(state.checkIn + 'T12:00:00');
    const co = new Date(state.checkOut + 'T12:00:00');
    return Math.max(0, Math.round((co.getTime() - ci.getTime()) / (1000 * 60 * 60 * 24)));
  }, [state.checkIn, state.checkOut]);

  const price = useMemo(() => {
    if (!room || !state.checkIn || !state.checkOut) return null;
    const ci = new Date(state.checkIn + 'T12:00:00');
    const co = new Date(state.checkOut + 'T12:00:00');
    if (co <= ci) return null;
    return calculateStay(room, ci, co, state.guests, state.roomsCount, state.extras);
  }, [room, state]);

  const roomLabel = ROOMS.find((r) => r.slug === state.roomSlug)?.shortName ?? '—';
  const canSubmit = Boolean(state.checkIn && state.checkOut && state.roomSlug && state.guestName && state.guestEmail && state.guestPhone && room && price);

  const openReceipt = () => {
    if (!canSubmit || !room || !price) return;
    setShowReceipt(true);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    setSending(false);
  };

  const sendToWhatsApp = () => {
    if (!room || !price) return;
    setSending(true);
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
    const url = `https://api.whatsapp.com/send?phone=${SITE.phones.whatsappDigits}&text=${encodeURIComponent(msg)}`;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
    setTimeout(() => setSending(false), 2000);
  };

  return (
    <div className="booking-wizard">
      <header className="bw-hero">
        <div className="container">
          <span className="bw-hero__label">{t.booking.eyebrow}</span>
          <h1 className="bw-hero__title">{t.booking.title}</h1>
          <p className="bw-hero__sub">
            {t.booking.subtitle}
          </p>
        </div>
      </header>

      <section className="section-pad--tight">
        <div className="container bw-grid">

          {/* ─── FORM FIELDS ─── */}
          <div className="bw-form-fields">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

              <fieldset className="bw-fieldset">
                <legend className="bw-fieldset__legend">
                  <User size={16} /> {t.booking.yourData}
                </legend>
                <div className="bw-form-row">
                  <label className="bw-field">
                    <span className="bw-field__label">{t.booking.fullName}</span>
                    <input
                      type="text"
                      autoComplete="name"
                      value={state.guestName}
                      onChange={(e) => update({ guestName: e.target.value })}
                      className="bw-field__input"
                      required
                    />
                  </label>
                  <label className="bw-field">
                    <span className="bw-field__label">WhatsApp</span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={state.guestPhone}
                      onChange={(e) => update({ guestPhone: e.target.value })}
                      className="bw-field__input"
                      placeholder="+57 300 123 4567"
                      required
                    />
                  </label>
                </div>
                <label className="bw-field">
                  <span className="bw-field__label">{t.booking.email}</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={state.guestEmail}
                    onChange={(e) => update({ guestEmail: e.target.value })}
                    className="bw-field__input"
                    required
                  />
                </label>
              </fieldset>

              <fieldset className="bw-fieldset">
                <legend className="bw-fieldset__legend">
                  <CalendarDays size={16} /> {t.booking.dates}
                </legend>
                <AvailabilityCalendar
                  checkIn={state.checkIn}
                  checkOut={state.checkOut}
                  onRangeSelect={(start, end) => update({ checkIn: start, checkOut: end })}
                />
                <div className="bw-form-row">
                  <label className="bw-field">
                    <span className="bw-field__label">{t.booking.rooms}</span>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={state.roomsCount}
                      onChange={(e) =>
                        update({ roomsCount: Math.max(1, Math.min(5, Number(e.target.value)) || 1) })
                      }
                      className="bw-field__input"
                    />
                  </label>
                  <label className="bw-field">
                    <span className="bw-field__label">{t.booking.guests}</span>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={state.guests}
                      onChange={(e) =>
                        update({ guests: Math.max(1, Math.min(12, Number(e.target.value)) || 1) })
                      }
                      className="bw-field__input"
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="bw-fieldset">
                <legend className="bw-fieldset__legend">
                  <Sun size={16} /> {t.booking.room}
                </legend>
                <div className="bw-rooms">
                  {ROOMS.map((r) => (
                    <button
                      key={r.slug}
                      type="button"
                      className={`bw-room ${state.roomSlug === r.slug ? 'selected' : ''}`}
                      onClick={() => update({ roomSlug: r.slug })}
                    >
                      <img src={media(r.heroImage, 400, 300)} alt="" loading="lazy" />
                      <div className="bw-room__info">
                        <span className="bw-room__price">Desde {formatCOP(r.basePrice)} + IVA</span>
                        <strong className="bw-room__name">{r.shortName}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="bw-fieldset">
                <legend className="bw-fieldset__legend">{t.booking.extras}</legend>
                <BookingExtras
                  extras={state.extras}
                  onChange={(extras) => update({ extras })}
                />
              </fieldset>

              <fieldset className="bw-fieldset">
                <legend className="bw-fieldset__legend">{t.booking.notes}</legend>
                <label className="bw-field">
                  <span className="bw-field__label">{t.booking.notesPlaceholder}</span>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={state.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    className="bw-field__input bw-field__textarea"
                  />
                </label>
              </fieldset>

            </motion.div>
          </div>

          {/* ─── SUMMARY ─── */}
          <aside className="bw-summary-col">
            <motion.div
              className="bw-summary"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <h3 className="bw-summary__title">{t.booking.summary}</h3>

              <div className="bw-summary__card">
                <p className="bw-summary__property">{SITE.name}</p>
                <p className="bw-summary__location">{SITE.locationShort}</p>

                <dl className="bw-summary__list">
                  <div>
                    <dt>{t.booking.checkIn}</dt>
                    <dd>{fmtDate(state.checkIn)}</dd>
                  </div>
                  <div>
                    <dt>{t.booking.checkOut}</dt>
                    <dd>{fmtDate(state.checkOut)}</dd>
                  </div>
                  {nights > 0 && (
                    <div>
                      <dt>{t.booking.nights}</dt>
                      <dd>{nights}</dd>
                    </div>
                  )}
                  <div>
                    <dt>{t.booking.guests}</dt>
                    <dd>{state.guests} · {state.roomsCount} {state.roomsCount !== 1 ? t.booking.rooms.toLowerCase() : t.booking.room.toLowerCase()}</dd>
                  </div>
                  {state.roomSlug && (
                    <div>
                      <dt>{t.booking.room}</dt>
                      <dd>{roomLabel}</dd>
                    </div>
                  )}
                </dl>

                {price && (
                  <div className="bw-summary__pricing">
                    <h4 className="bw-summary__pricing-title">{t.booking.priceBreakdown}</h4>
                    <ul className="bw-summary__breakdown">
                      <li>
                        <span>{t.booking.ratePerNight.replace('{season}', price.seasonLabel)}</span>
                        <span>{formatCOP(price.adjustedPerNight)}</span>
                      </li>
                      <li>
                        <span>{t.booking.subtotal} ({nights} {t.booking.nights.toLowerCase()})</span>
                        <span>{formatCOP(price.subtotal)}</span>
                      </li>
                      <li>
                        <span>{t.booking.iva}</span>
                        <span>{formatCOP(price.iva)}</span>
                      </li>
                      <li className="bw-summary__line--total">
                        <span>{t.booking.lodging}</span>
                        <span>{formatCOP(price.total)}</span>
                      </li>
                      {price.extras.length > 0 && (
                        <>
                          <li className="bw-summary__line--extras-head">
                            <span>{t.booking.extrasHeader}</span>
                            <span>{formatCOP(price.extrasTotal)}</span>
                          </li>
                          {price.extras.map((ex) => (
                            <li key={ex.name} className="bw-summary__line--extras-item">
                              <span>{ex.name} ×{ex.quantity}</span>
                              <span>{formatCOP(ex.total)}</span>
                            </li>
                          ))}
                        </>
                      )}
                      <li className="bw-summary__grand">
                        <span>{t.booking.total}</span>
                        <strong>{formatCOP(price.grandTotal)}</strong>
                      </li>
                    </ul>
                  </div>
                )}

                {!price && (state.checkIn || state.checkOut) && (
                  <p className="bw-summary__empty">{t.booking.emptySummary}</p>
                )}
              </div>

              <div className="bw-summary__call">
                <h4 className="bw-summary__call-title">{t.booking.callTitle}</h4>
                <p className="bw-summary__call-text">{t.booking.callText}</p>
                <a href={`tel:${SITE.phones.landline.replace(/[^\d]/g, '')}`} className="bw-summary__phone">
                  <Phone size={18} />
                  {SITE.phones.landline}
                </a>
              </div>
            </motion.div>
          </aside>

          {/* ─── SUBMIT ─── */}
          <div className="bw-submit-wrap">
            <button
              type="button"
              className="btn btn--primary btn--lg bw-submit"
              disabled={!canSubmit}
              onClick={openReceipt}
            >
              <MessageCircle size={20} />
              {t.booking.viewReceipt}
            </button>
            <p className="bw-form__footnote">
              {t.booking.footnote}
            </p>
          </div>

        </div>
      </section>

      {/* ─── RECEIPT MODAL ─── */}
      <AnimatePresence>
        {showReceipt && room && price && (
          <motion.div
            className="bw-receipt-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeReceipt}
          >
            <motion.div
              className="bw-receipt"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="bw-receipt__close" onClick={closeReceipt}>
                <X size={20} />
              </button>

              <div className="bw-receipt__header">
                <h2>{t.booking.receiptTitle.replace('{name}', SITE.name)}</h2>
                <p className="bw-receipt__subtitle">{t.booking.receiptSubtitle}</p>
              </div>

              <div className="bw-receipt__body">
                {/* Guest info */}
                <section className="bw-receipt__section">
                  <h3>{t.booking.guestData}</h3>
                  <div className="bw-receipt__row">
                    <span>{t.booking.fullName}</span>
                    <strong>{state.guestName}</strong>
                  </div>
                  <div className="bw-receipt__row">
                    <span>{t.booking.email}</span>
                    <strong>{state.guestEmail}</strong>
                  </div>
                  <div className="bw-receipt__row">
                    <span>WhatsApp</span>
                    <strong>{state.guestPhone}</strong>
                  </div>
                </section>

                {/* Stay details */}
                <section className="bw-receipt__section">
                  <h3>{t.booking.stay}</h3>
                  <div className="bw-receipt__row">
                    <span>{t.booking.checkIn}</span>
                    <strong>{formatTime(state.checkIn)} — 3:00 p.m.</strong>
                  </div>
                  <div className="bw-receipt__row">
                    <span>{t.booking.checkOut}</span>
                    <strong>{formatTime(state.checkOut)} — 1:00 p.m.</strong>
                  </div>
                  <div className="bw-receipt__row">
                    <span>{t.booking.nights}</span>
                    <strong>{nights}</strong>
                  </div>
                  <div className="bw-receipt__row">
                    <span>{t.booking.guests}</span>
                    <strong>{state.guests}</strong>
                  </div>
                  <div className="bw-receipt__row">
                    <span>{t.booking.rooms}</span>
                    <strong>{state.roomsCount}</strong>
                  </div>
                </section>

                {/* Room */}
                <section className="bw-receipt__section">
                  <h3>{t.booking.lodging}</h3>
                  <div className="bw-receipt__row">
                    <span>{t.booking.bookingRoom}</span>
                    <strong>{room.name}</strong>
                  </div>
                  <div className="bw-receipt__row">
                    <span>{t.booking.season}</span>
                    <strong>{price.seasonLabel}</strong>
                  </div>
                </section>

                {/* Extras */}
                {price.extras.length > 0 && (
                  <section className="bw-receipt__section">
                    <h3>{t.booking.extrasHeader}</h3>
                    {price.extras.map((ex) => (
                      <div key={ex.name} className="bw-receipt__row">
                        <span>{ex.name} × {ex.quantity}</span>
                        <strong>{formatCOP(ex.total)}</strong>
                      </div>
                    ))}
                    <div className="bw-receipt__row bw-receipt__row--total">
                      <span>{t.booking.totalExtras}</span>
                      <strong>{formatCOP(price.extrasTotal)}</strong>
                    </div>
                  </section>
                )}

                {/* Notes */}
                {state.notes && (
                  <section className="bw-receipt__section">
                    <h3>{t.booking.notes}</h3>
                    <p className="bw-receipt__notes">{state.notes}</p>
                  </section>
                )}

                {/* Pricing */}
                <div className="bw-receipt__totals">
                  <div className="bw-receipt__row">
                    <span>{t.booking.ratePerNight.replace('{season}', price.seasonLabel)}</span>
                    <span>{formatCOP(price.adjustedPerNight)}</span>
                  </div>
                  <div className="bw-receipt__row">
                    <span>{t.booking.subtotal} ({nights} {t.booking.nights.toLowerCase()})</span>
                    <span>{formatCOP(price.subtotal)}</span>
                  </div>
                  <div className="bw-receipt__row">
                    <span>{t.booking.iva}</span>
                    <span>{formatCOP(price.iva)}</span>
                  </div>
                  <div className="bw-receipt__row bw-receipt__row--divider">
                    <span>{t.booking.lodging}</span>
                    <strong>{formatCOP(price.total)}</strong>
                  </div>
                  {price.extrasTotal > 0 && (
                    <div className="bw-receipt__row">
                      <span>{t.booking.extrasHeader}</span>
                      <strong>{formatCOP(price.extrasTotal)}</strong>
                    </div>
                  )}
                  <div className="bw-receipt__grand">
                    <span>{t.booking.total}</span>
                    <strong>{formatCOP(price.grandTotal)}</strong>
                  </div>
                </div>
              </div>

              <div className="bw-receipt__actions">
                <button
                  type="button"
                  className="btn btn--primary btn--lg bw-receipt__btn"
                  disabled={sending}
                  onClick={sendToWhatsApp}
                >
                  <MessageCircle size={20} />
                  {sending ? t.booking.openingWhatsapp : t.booking.sendWhatsapp}
                </button>
                <button
                  type="button"
                  className="btn btn--outline bw-receipt__btn bw-receipt__btn--outline"
                  onClick={closeReceipt}
                >
                  {t.booking.backToForm}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
