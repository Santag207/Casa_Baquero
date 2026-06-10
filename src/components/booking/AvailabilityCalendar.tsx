import { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import type { FormEvent } from 'primereact/ts-helpers';
import { addLocale } from 'primereact/api';
import { formatCOP } from '../../utils/pricing';
import { useLanguage } from '../../context/LanguageContext';
import './AvailabilityCalendar.scss';

addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  today: 'Hoy',
  clear: 'Limpiar',
});

interface Props {
  checkIn?: string;
  checkOut?: string;
  onRangeSelect: (start: string, end: string) => void;
}

/* Precios referenciales por temporada (base hab. más económica) */
const BASE_PRICE = 120000;

export function AvailabilityCalendar({ checkIn, checkOut, onRangeSelect }: Props) {
  const { t } = useLanguage();
  const [dates, setDates] = useState<(Date | null)[] | null>(null);

  const SEASONS = [
    { id: 'baja' as const, label: t.calendar.lowSeason, multiplier: 1, color: '#0f3d2e' },
    { id: 'media' as const, label: t.calendar.midSeason, multiplier: 1.2, color: '#cc6e0d' },
    { id: 'alta' as const, label: t.calendar.highSeason, multiplier: 1.35, color: '#b22d12' },
  ];

  useEffect(() => {
    if (checkIn && checkOut) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDates([new Date(checkIn + 'T12:00:00'), new Date(checkOut + 'T12:00:00')]);
    } else {
      setDates(null);
    }
  }, [checkIn, checkOut]);

  const handleChange = (e: FormEvent<(Date | null)[]>) => {
    const v = e.value;
    setDates(v as (Date | null)[]);
    if (v && Array.isArray(v) && v.length === 2 && v[0] && v[1]) {
      onRangeSelect(
        v[0].toISOString().slice(0, 10),
        v[1].toISOString().slice(0, 10),
      );
    }
  };

  return (
    <div className="availability-calendar">
      <Calendar
        value={dates}
        onChange={handleChange}
        selectionMode="range"
        readOnlyInput
        hideOnRangeSelection
        locale="es"
        dateFormat="dd/mm/yy"
        minDate={new Date()}
        numberOfMonths={1}
      />
      <div className="bw-season-pricing">
        {SEASONS.map((s) => (
          <div key={s.id} className="bw-season-pricing__item">
            <span className={`bw-season-pricing__dot bw-season-pricing__dot--${s.id}`} />
            <span className="bw-season-pricing__label">
              {s.label}
              <span className="bw-season-pricing__price">
                {formatCOP(Math.round(BASE_PRICE * s.multiplier))}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
