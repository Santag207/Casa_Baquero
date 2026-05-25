import { useCallback, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateSelectArg, EventClickArg, EventMountArg } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { seasonFromEventTitle } from '../../utils/seasons';
import './AvailabilityCalendar.scss';

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY ?? '';
const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID ?? '';

interface AvailabilityCalendarProps {
  checkIn?: string;
  checkOut?: string;
  onRangeSelect: (start: string, end: string) => void;
  occupiedDates?: Set<string>;
}

function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function AvailabilityCalendar({
  checkIn,
  checkOut,
  onRangeSelect,
  occupiedDates = new Set(),
}: AvailabilityCalendarProps) {
  const eventSources = useMemo(() => {
    if (API_KEY && CALENDAR_ID) {
      return [
        {
          googleCalendarId: CALENDAR_ID,
          className: 'gcal-feed',
        },
      ];
    }
    return [];
  }, []);

  const eventDidMount = useCallback((info: EventMountArg) => {
    const title = info.event.title ?? '';
    const season = seasonFromEventTitle(title);
    if (season) {
      info.el.classList.add(`fc-event-season-${season}`);
    } else if (/ocupad|reserv|bloque/i.test(title)) {
      info.el.classList.add('fc-event-occupied');
    }
  }, []);

  const selectAllow = useCallback(
    (info: { start: Date; end: Date }) => {
      const cur = new Date(info.start);
      const end = new Date(info.end);
      while (cur < end) {
        if (occupiedDates.has(dateKey(cur))) return false;
        cur.setDate(cur.getDate() + 1);
      }
      return true;
    },
    [occupiedDates],
  );

  const handleSelect = (arg: DateSelectArg) => {
    const start = arg.startStr.slice(0, 10);
    const endDate = new Date(arg.end);
    endDate.setDate(endDate.getDate() - 1);
    const end = endDate.toISOString().slice(0, 10);
    onRangeSelect(start, end);
  };

  const handleEventClick = (arg: EventClickArg) => {
    arg.jsEvent.preventDefault();
  };

  return (
    <div className="availability-calendar">
      <div className="availability-calendar__legend">
        <span>
          <i className="dot dot--alta" /> Alta
        </span>
        <span>
          <i className="dot dot--media" /> Media
        </span>
        <span>
          <i className="dot dot--baja" /> Baja
        </span>
        <span>
          <i className="dot dot--occupied" /> Ocupado
        </span>
      </div>
      {!API_KEY && (
        <p className="availability-calendar__hint">
          Configure <code>VITE_GOOGLE_CALENDAR_API_KEY</code> y{' '}
          <code>VITE_GOOGLE_CALENDAR_ID</code> en Vercel. Mientras tanto, las temporadas se calculan
          automáticamente al elegir fechas.
        </p>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth',
        }}
        selectable
        selectMirror
        selectOverlap={false}
        selectAllow={selectAllow}
        select={handleSelect}
        googleCalendarApiKey={API_KEY || undefined}
        eventSources={eventSources}
        eventDidMount={eventDidMount}
        eventClick={handleEventClick}
        height="auto"
        validRange={{ start: new Date().toISOString().slice(0, 10) }}
        events={!API_KEY ? generateDemoSeasonEvents() : undefined}
      />
      {(checkIn || checkOut) && (
        <p className="availability-calendar__selection">
          Selección: <strong>{checkIn || '—'}</strong> → <strong>{checkOut || '—'}</strong>
        </p>
      )}
      {CALENDAR_ID && API_KEY && (
        <a
          className="availability-calendar__subscribe"
          href={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}`}
          target="_blank"
          rel="noreferrer"
        >
          Ver calendario completo en Google
        </a>
      )}
    </div>
  );
}

/** Eventos demo de temporadas cuando no hay API (visualización local) */
function generateDemoSeasonEvents() {
  const year = new Date().getFullYear();
  return [
    { title: 'Temporada Alta', start: `${year}-12-01`, end: `${year + 1}-02-01`, display: 'background', classNames: ['fc-event-season-alta'] },
    { title: 'Temporada Alta', start: `${year}-06-15`, end: `${year}-07-31`, display: 'background', classNames: ['fc-event-season-alta'] },
    { title: 'Temporada Baja', start: `${year}-02-01`, end: `${year}-05-31`, display: 'background', classNames: ['fc-event-season-baja'] },
    { title: 'Temporada Baja', start: `${year}-08-01`, end: `${year}-11-30`, display: 'background', classNames: ['fc-event-season-baja'] },
  ];
}
